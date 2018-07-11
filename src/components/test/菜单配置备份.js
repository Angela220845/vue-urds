var postData = {
  'update-archite-modal': {
    'url': '/system_config/update_mysql_architecture',
    'single': {
      'title': '修改架构配置',
      'content': '修改架构配置成功！'
    }
  },
  'update-alert-modal': {
    'url': '/alert/update_smtp',
    'single': {
      'title': '增加告警通道',
      'content': '增加告警通道成功！'
    },

    'unrefresh': true
  },
  'update-alert-modal': {
    'url': '/system_config/update_menu_config',
    'single': {
      'title': '修改菜单配置',
      'content': '修改菜单配置成功！'
    },
  }
}
var configList = {
  'single': '单实例',
  'ha': '高可用',
  'ha_rws': '高可用+读写分离',
  'ha_ra': '容灾',
  'ha_rws_ra': '容灾+读写分离',
  'mgr': '三节点MGR（测试版）'
};
var ConfigForm = function () {
  this.$modal = $('#update-archite-modal');
  this.$archite = this.$modal.find('.archite');
  this.$item = '<dl class="formItem"><dt class="item-title"><label>{0}</label></dt><dd class="form-item">{1}</dd></dl>';
  this.$slider = '<span class="item-input sliderItem {0}"><i data-state="true">启用</i><input type="hidden" id="{0}" name="{0}" class="item-input" /><span class="slider"></span><i data-state="false">停用</i></span>';
  this.sliderItem = {};
  this.configTab = null;
  //告警
  this.$alertModal = $('#update-alert-modal');
  // 菜单
  this.$menuModal = $('#update-menu-modal');
  this.$menuWrap = $('.menu-config')
  this.initAction(this);
};

ConfigForm.prototype = new Form(postData);
ConfigForm.prototype.initAction = function (__this) {
  var $item,configTab = new Tab($('.tab'));
  this.configTab = configTab;
  _.each(configList, function (item, name) {
    $item = __this.$item.format(configList[name], __this.$slider.format(name));

    __this.$archite.append($item);
    __this.sliderItem[name] = new SliderItem($('.{0}'.format(name)));
  });
  this.sliderItem['smtp_ssl'] = new SliderItem($('.smtp_ssl'));
};
ConfigForm.prototype.fillArchiteConfig = function (data) {
  var indexFlag, __this = this
  _.each(data, function (item, name) {
    indexFlag = item ? 1 : 0;
    __this.sliderItem[name].setFlagIndex(indexFlag);
  });
  this.configTab.showItems();
};
ConfigForm.prototype.fillAlertConfig = function (data) {
  var __this = this,sslFlag
  _.each(data, function (item, key) {
    __this.$alertModal.find('input[name="{0}"]'.format(key)).val(item);
  });
  sslFlag = Number(data['smtp_ssl']);
  __this.sliderItem['smtp_ssl'].setFlagIndex(sslFlag)
};
// 菜单
ConfigForm.prototype.fillMenuConfig = function (data) {
  var __this = this,$menuItem,
    parentList = {
      "archiver": '数据归档',
      "slow_log": '慢日志分析',
      "mongodb_service": 'MongoDB服务',
      "alert": '告警',
      "sql": 'SQL上线',
      "db_service": 'MySQL服务'
    },
    names = Object.keys(parentList),
    topList = [];

  for (const listName of names) {
    var child = [],
      parent = {};
    for (const item of data) {
      if (item.parent === listName) {
        child.push(item);
      }
    }
    console.log(child, "child");
    parent[parentList[listName]] = child;
    topList.push(parent);
  }

  console.log(topList, "parent");
  this.$menuWrap.append($menuItem)
}
var configForm = new ConfigForm();

var ConfigAction = function () {};
ConfigAction.prototype = new Action();
ConfigAction.prototype.refreshAction = function () {
  var __this = this;
  ajaxQuery.get('/system_config/get_mysql_architecture', function (data) {
    if (data) {
      __this.form.fillArchiteConfig(data);
    }
  });
  ajaxQuery.get('/alert/get_smtp', function (data) {
    if (!data) {
      return
    } else {
      __this.form.fillAlertConfig(data);
    }
  });
  ajaxQuery.get('/system_config/get_menu_config', function (data) {
    if (data) {
      __this.form.fillMenuConfig(data);
    }
  });


};
var configAction = new ConfigAction();
configAction.setForm(configForm);
configAction.refreshAction('init');
