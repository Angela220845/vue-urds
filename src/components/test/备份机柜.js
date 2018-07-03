ajaxQuery.get('user/list_action?view=server', function(data) {
  var size = _.size(data);
  $t.relistButton(data.slice(0, size - 1), $('.actionBtn'));

  var moduleList = {
      'details': '',
      'server_id': '主机',
      'ip': 'IP',
      'rack': '机柜',
      'is_enable': '状态',
      'cpu': 'CPU',
      'memory': '内存',
      'disk': '磁盘',
      'use_cpu': 'CPU使用率',
      'use_memory': '内存使用率',
      'use_disk': '磁盘使用率',
      'zone_id': '可用区',
      'additional': {
        'zone_name': ''
      }
    },
    moduleBtnState = {
      'update-server-btn': {
        enable: function(isSelected) {
          return isSelected;
        },
        'tip': '未选中任何主机'
      },
      'delete-server-btn': {
        enable: function(isSelected) {
          return isSelected;
        },
        'tip': '未选择任何主机'
      },
      'enable-server-btn': {
        show: function() {
          return false;
        }
      }
    },
    controlBtn = {
      'add-server-btn': {
        'modal': 'add-server-modal',
        'prepare': {
          'preName': 'prepareAddServer',
          'preArg': []
        }
      },
      'update-server-btn': {
        'modal': 'update-server-modal',
        'prepare': {
          'preName': 'prepareData',
          'preArg': ['server_id', 'rack', 'cpu', 'memory', 'disk']
        }
      },
      'migrate-mysql-btn': 'migrate-mysql-modal'
    },
    inquiryData = {
      'delete-server-btn': {
        'url': '/server/delete',
        'name': 'server_id',
        'data': {
          '$server_id': 'server_id'
        },
        title: function(name) {
          return '确定删除主机{0}？'.format(name);
        },
        'single': {
          'title': '删除主机',
          'content': '删除主机成功！'
        }
      },
      'enable-server-btn': {
        'url': 'server/enable_server',
        'name': 'server_id',
        'data': {
          '$server_id': 'server_id',
          'node': 'is_enable'
        },
        title: function(name) {
          return '确定修改主机{0}的状态？'.format(name);
        },
        'single': {
          'title': '修改主机状态',
          'content': '修改主机状态成功！'
        }
      }
    },
    postData = {
      'add-server-modal': {
        'url': '/server/add',
        'single': {
          'title': '添加主机',
          'content': '添加主机成功！'
        }
      },
      'update-server-modal': {
        'url': '/server/update',
        'single': {
          'title': '修改主机',
          'content': '修改主机成功！'
        }
      },
      'migrate-mysql-modal': {
        'url': '/db_service/migrate_mysql'
      }
    };

  var serverModule = new Module({
    'moduleList': moduleList
  });

  var ServerTable = function() {
    this.mysqlStatus = {
      'STATUS_MYSQL_MASTER': '主',
      'STATUS_MYSQL_SLAVE': '从',
      'STATUS_UNKNOWN': '未知'
    };
    this.setSortInfo({
      'name': 'server_id',
      'type': 'desc'
    });
    this.sliderList = {};
    this.percentList = { 'use_cpu': 'cpu', 'use_memory': 'memory', 'use_disk': 'disk' };
    this.$enableBtn = $('#enable-server-btn');
    this.$isEnable = null;
    this.initAction(this);
  };
  ServerTable.prototype = new Table();
  ServerTable.prototype.initAction = function(__this) {
    $('body').append('<input type="hidden" name="is_enable" id="is_enable" />');
    this.$isEnable = $('#is_enable');

    var $item, $tr, serverId, enable, sliderItem, isEnable;
    this.$tbody.on('click', '.sliderItem', function(e) {
      e.stopPropagation();
      $item = $(this);
      enable = $item.find('input').val();
      $tr = $item.parent().parent();
      if (!($tr.hasClass('select'))) {
        $tr.trigger('click');
      }
      serverId = $item.attr('data-name');
      sliderItem = __this.sliderList[serverId];
      __this.$isEnable.val(enable == '1' ? 0 : 1);
      __this.$enableBtn.trigger('click');
    });
  };
  ServerTable.prototype.renderTableHeader = function() {
    this.$thead.find('th').eq(0).html('主机详情');
  };
  ServerTable.prototype.fillDetailsAction = function($tr, collapse) {
    var __this = this,
      serverId = $tr.find('[data="server_id"]').data('source'),
      server = { 'use_cpu': 'CPU使用量', 'use_memory': '内存的使用量', 'use_disk': '磁盘的使用量' },
      details = {},
      serverInfo, mysqlInfo, unit, mysqlInst = false,
      status, serviceClass;
    $tr.next().find('td').html('正在查询，请稍候……');
    ajaxQuery.get('/server/detail?server_id=' + serverId, function(data) {
      serverInfo = data['server_info'];
      mysqlInfo = data['mysql_instances'];
      _.each(server, function(v, k) {
        switch (k) {
          case 'use_cpu':
            unit = ' 核';
            break;
          case 'use_memory':
            unit = ' MB';
            break;
          case 'use_disk':
            unit = ' GB';
            break;
        }
        details[v] = serverInfo[k] + unit;
      });
      mysqlInst = false;
      _.each(mysqlInfo, function(item, index) {
        if (index == 0) {
          mysqlInst = '<table><tr><th rowspan="2">别名</th><th rowspan="2">id</th><th rowspan="2">服务ID</th><th rowspan="2">服务名</th><th rowspan="2">角色</th><th colspan="4" style="text-align:center">规格</th><th rowspan="2">操作</th></tr>';
          mysqlInst += '<tr><th>CPU</th><th>内存</th><th>磁盘</th><th>iops限制</th></tr>';
        }
        serviceClass = item['service_class'];
        status = __this.mysqlStatus[item['role']];
        mysqlInst += '<tr><td data="alias">{0}</td><td data="mysql_id">{1}</td><td data="service_id"><a href="/over_view?service_id={6}" target="_blank" style="border-bottom:1px dotted #263892;">{6}</a></td><td>{7}</td><td>{8}</td><td>{2} 核</td><td>{3} MB</td><td>{4} GB</td><td>{5}</td><td><button class="btn s-btn migrate-mysql"><i class="fa fa-arrow-circle-left"></i>水平迁移</button></td></tr>'.format(item['alias'], item['mysql_id'], serviceClass['cpu'], serviceClass['memory'], serviceClass['disk'], serviceClass['iops'], item['service_id'], item['service_name'], status);
      });
      mysqlInst = mysqlInst ? mysqlInst + '</table>' : '尚无实例信息';
      details['MySQL实例列表'] = mysqlInst;
      $tr.attr('data-details', JSON.stringify(details));
      collapse.fillDetails($tr);
    }, function(error) {
      $tr.next().find('td').html('<span class="errTip">{0}</span>'.format($t.renderDesc(error)));
    });
  };
  ServerTable.prototype.renderSlider = function($node) {
    var $tr = $node.parent(),
      type = $node.attr('data-source');
    serverId = $tr.find('[data="server_id"]').attr('data-source'),
      $slider = '<span class="item-input sliderItem" data-name="{0}" style="width:78px; float:left;"><i data-state="1">上架</i><input type="hidden" name="is_enable" /><span class="slider"></span><i data-state="0">下架</i></span>'.format(serverId);
    $node.html($slider);
    var sliderItem = new SliderItem($('[data-name="{0}"]'.format(serverId)));
    sliderItem.setFlagIndex(type);
    this.sliderList[serverId] = sliderItem;
  };
  ServerTable.prototype.renderTableBody = function() {
    this.slider = {};
    var __this = this,
      text, zoneName;
    this.$tbody.find('[data="cpu"]').each(function() {
      text = $(this).data('source') + ' 核';
      $(this).html(text);
    }).end().find('[data="memory"]').each(function() {
      text = $(this).data('source') + ' MB';
      $(this).html(text);
    }).end().find('[data="disk"]').each(function() {
      text = $(this).data('source') + ' GB';
      $(this).html(text);
    }).end().find('[data="zone_id"]').each(function() {
      zoneName = $(this).parent().data('additional')['zone_name'];
      text = $(this).data('source') ? $(this).data('source') + '(' + zoneName + ')' : '未分配';
      $(this).html(text);
    }).end().find('[data="is_enable"]').each(function() {
      __this.renderSlider($(this));
    });

    var $tr, itemName, totalName, $item, $total, itemValue, totalValue, percent, useType, width;
    this.$tbody.find('[data="use_cpu"], [data="use_memory"], [data="use_disk"]').each(function() {
      $item = $(this);
      $tr = $item.parent();
      itemName = $item.attr('data');
      totalName = __this.percentList[itemName];
      $total = $tr.find('[data="{0}"]'.format(totalName));
      itemValue = $item.attr('data-source');
      totalValue = $total.attr('data-source');
      if (isNaN(itemValue) || isNaN(totalValue)) {
        $item.html((itemValue ? itemValue : '') + '/' + (totalValue ? totalValue : ''));
      } else {
        percent = Number(itemValue / totalValue) * 100;
        percent = percent.toFixed(2);
        width = percent >= 100 ? 100 : percent;
        useType = percent <= 80 ? 'use_less' : 'use_more';
        $item.html('<dl class="used_percent"><dt class="percent_number">{0} %</dt><dd class="percent {1}" style="width:{2}%"></dd></dl>'.format(percent, useType, width));
      }
    });
  };
  var serverTable = new ServerTable();

  var ServerForm = function() {
    this.$rackSelect = $('[data-item="rack"]').find('select');
    this.$updateRackSelect = $('[data-item="update_rack"]').find('select');
    this.$serverList = $('#add-server-modal [name="server_id"]');
    this.serversData = [];
    this.tipSelect = null;
    this.initFormAction(this);
  };
  ServerForm.prototype = new Form(postData);
  ServerForm.prototype.initFormAction = function(__this) {
    var selectData = {},
      $serverSelect = $('#server_id'),
      serverSelect = new CommonSelect(this.$form, $serverSelect, null, function() {
        __this.tipSelect = new TipSelect($serverSelect, true);
      });
    selectData['serverSelect'] = serverSelect;
    this.setSelect(selectData);

    var rackDrop = new DropItem($('[data-item="rack"]')),
      updateRackDrop = new DropItem($('[data-item="update_rack"]'));
  };
  ServerForm.prototype.setServerList = function(list) {
    // var options = '<option></option>',rack, option = {};
    //         if (list.length != 0) {
    //     options = ''
    // }
    // _.each(list, function(item) {
    //     rack = item['rack'];
    //     if (!(rack in option)) {
    //         option[rack] = '';
    //         console.log(rack)
    //         options += '<option value="{0}">{0}</option>'.format(rack);
    //     }
    // });
    // ---
    // var options="<option></option>",rack, option = {},rackSort=[];
    // if (list.length != 0) {
    //     options = ''
    // }
    // _.each(list, function(item) {
    //     rack = item['rack'];
    //     if (!(rack in option)) {
    //         rackSort.push(rack);
    //         rackSort.sort((a, b) => a.localeCompare(b, 'zh-Hans-CN', {sensitivity: 'accent'}));
    //             console.log(rackSort) //["", "2", "4", "测一下", "添加"]
    //         option[rack] = '';
    //             console.log(typeof rack)
    //         options += '<option value="{0}">{0}</option>'.format(rack);
    //             console.log(options)
    //     }
    // });
    // // ---
    var options="<option></option>",rack, option = {},rackSort=[];
    if (list.length != 0) {
      options = ''
    }
    console.log(list)
    list.sort($t.sortBy('rack'));
    console.log($t.sortBy('rack'))
    console.log(list)
    _.each(list, function(item) {
      rack = item['rack'];
      if (!(rack in option)) {
        option[rack] = '';
        options += '<option value="{0}">{0}</option>'.format(rack);
      }
    });
    // ---
    this.$rackSelect.html(options);
    this.$updateRackSelect.html(options);
  };
  ServerForm.prototype.updateServersData = function(serversData) {
    this.serversData = serversData;
  };
  ServerForm.prototype.prepareAddServer = function(prepareData, filfun) {
    var serversData = this.serversData,
      $list = this.$serverList,
      $node = $list.parent(),
      tipSelect = this.tipSelect;
    validate.handleErrorAction($node, '正在获取可添加的主机信息，请稍候……');
    ajaxQuery.get('/support/umc_server', function(data) {
      var name, option = '',
        result = _.filter(data, function(item) {
          name = item['Name'];
          return !(_.find(serversData, function(serverData) {
            return serverData['server_id'] == name;
          }));
        });
      result.sort($t.sortBy('Name'));
      _.each(result, function(item) {
        option += '<option value="{0}">{0}({1})</option>'.format(item['Name'], item['addr']);
      });
      $list.html(option);
      tipSelect.fillListAction();
      validate.resetNodeAction($node);
      if (_.size(result) == 0) {
        validate.handleErrorAction($node, '暂无可用主机');
      }
    }, function(error) {
      validate.handleErrorAction($node, $t.renderDesc(error));
    });
    filfun();
  };
  var serverForm = new ServerForm();

  // ·········可用区切换开始
  // 取到元素，注册change事件
  var Zone = function () {
    this.$listZone = $('.zone_list');
    this.zoneId = '';
    this.action = null;
    // 状态
    this.$listEnable = $('.enable_list');
    this.enableStatus = ''
    this.initAction(this);
  };
  Zone.prototype.initAction = function (__this) {
    ajaxQuery.get('/zone/list', function (data) {
      data.sort($t.sortBy('zone_name'));
      __this.fillList(data);
    });
    this.$listZone.on('change', 'select', function () {
      __this.zoneId = $(this).val();
      __this.updateAction();
    });
    // 下拉获取状态参数
    this.$listEnable.on('change', 'select', function () {
      __this.enableStatus = $(this).val();
      __this.updateAction();
    });

  };
  Zone.prototype.fillList = function (data) {
    var size = _.size(data),
      listZone = '<dd><select><option value="">全部</option>';
    if (size) {
      _.each(data, function (item) {
        listZone += '<option value="{0}">{1}</option>'.format(item['zone_id'], item['zone_name']);
      });
    }
    this.$listZone.append(listZone + '</select></dd>');
  };
  // 改变绑定的action的zone_id  改变之后  要进行一次请求  在change事件中调
  Zone.prototype.updateAction = function () {
    // action存在时，才会调用接口，action在initAction中赋值
    if (this.action) {
      this.action.setZoneId(this.zoneId, this.enableStatus);
      // 请求过程
      this.action.refreshAction('init');

    };
  }
  Zone.prototype.setAction = function (action) {
    this.action = action;
  };
  var zone = new Zone();
  // ············可用区切换结束

  // ············Action
  var ServerAction = function () {
    this.keyWord = '';
    this.zoneId = ''
    this.isEnable = ''
    this.$searchBtn = $('.search')
    this.$keyWordInput = $('.screen input')
    this.searchAction(this);
  };
  ServerAction.prototype = new Action($('.actionBtn .btn'));
  ServerAction.prototype.setZoneId = function (zoneId, isEnable) {
    // zoneId，将这个即时id传给后端获取相应数据
    this.zoneId = zoneId;
    this.isEnable = isEnable
  }
  ServerAction.prototype.searchAction = function (__this) {
    __this.$searchBtn.click(function () {
      __this.keyWord = __this.$keyWordInput.val();
      __this.refreshAction();
    })
  };
  ServerAction.prototype.refreshAction = function (init) {
    var __this = this;
    var query = '/server/list?key_word={0}&zone_id={1}&is_enabled={2}'.format(this.keyWord, this.zoneId, this.isEnable);;
    if (!init) {
      query += '&_={0}'.format($.now());
    }
    this.initActionData(query, this, function (data) {
      __this.form.setServerList(data);
      __this.module.setData(data);
      __this.table.fillBody(data);
      __this.table.fillFinished();
      __this.form.updateServersData(data);
    });
  };

  var serverAction = new ServerAction();
  serverAction.setForm(serverForm);
  serverAction.setTable(serverTable);
  serverAction.setModule(serverModule);
  serverAction.setBtnState(moduleBtnState);
  serverAction.setControlBtn(controlBtn);
  serverAction.setInquiryData(inquiryData);
  serverAction.refreshAction('init');
  zone.setAction(serverAction);

  (function() {
    function renderServer(servers) {
      var option = '';
      _.each(servers, function(server) {
        option += '<option value="{0}">{0}</option>'.format(server);
      });
      return option;
    }
    $('body').append('<div id="migrate-mysql-btn" style="display:none;"></div>');
    var $migrate = $('#migrate-mysql-btn'),
      $modal = $('#migrate-mysql-modal'),
      list = ['mysql_id', 'service_id', 'alias'],
      $tr, $item, $modItem, serviceId = '',
      mysql = '';
    $('body').on('click', '.migrate-mysql', function() {
      $migrate.trigger('click');
      $tr = $(this).parent().parent();
      _.each(list, function(item) {
        $item = $tr.find('[data="{0}"]'.format(item));
        $modItem = $modal.find('[name="{0}"]'.format(item));
        $modItem.val($item.text());
        switch (item) {
          case 'service_id':
            serviceId = $item.text();
            break;
          case 'mysql_id':
            mysqlId = $item.text();
            break;
          default:
            break;
        }
      });
      $item = $modal.find('[name="server_id"]');
      $item.html('');
      validate.handleErrorAction($item.parent(), '正在查询可迁移的主机……');
      ajaxQuery.get('/db_service/get_migrate_servers?service_id=' + serviceId + '&mysql_id=' + mysqlId, function(data) {
        validate.resetNodeAction($item.parent());
        if (data) {
          $item.html(renderServer(data));
        } else {
          validate.handleErrorAction($item.parent(), '没有可迁移的主机');
        }
      }, function(error) {
        $item.html('');
      });
    });
  }());
});
