import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      component: resolve =>
        require(['../components/login.vue'], resolve),
      meta: {
        title: '登录'
      }

    },
    {
      path: '/index',
      component: resolve =>
        require(['../components/index/index.vue'], resolve),
      meta: {
        title: '首页'
      },
      children: [{
          path: '/index',
          redirect: '/resource_statistics'
        },
        {
          path: '/resource_statistics',
          component: resolve =>
            require(['../components/resourceStatistics/resourceStatistics.vue'], resolve),
          meta: {
            title: '资源统计'
          }
        },
        {
          path: '/mysql_list',
          component: resolve =>
            require(['../components/mysql/mysqlList.vue'], resolve),
          meta: {
            title: 'MySql服务列表'
          },

        },
        {
          path: '/mysql_list/mysql_overview',
          component: resolve =>
            require(['../components/mysql/mysqlOverview.vue'], resolve),
          meta: {
            title: '概览'
          }
        },
        {
          path: '/mysql_list/mysql_monitor',
          component: resolve =>
            require(['../components/mysql/monitor.vue'], resolve),
          meta: {
            title: '监控'
          }
        },
        {
          path: '/mysql_list/mysql_report',
          component: resolve =>
            require(['../components/mysql/report/report.vue'], resolve),
          meta: {
            title: '巡检报告'
          }
        },
        {
          path: '/mysql_list/mysql_report/diagnosis_report',
          component: resolve =>
            require(['../components/mysql/report/diagnosisReport.vue'], resolve),
          meta: {
            title: '巡检报告详情'
          }
        },
        {
          path: '/mysql_list/mysql_backupset',
          component: resolve =>
            require(['../components/mysql/backup.vue'], resolve),
          meta: {
            title: '备份集'
          }
        },
        {
          path: '/mysql_list/mysql_params_change',
          component: resolve =>
            require(['../components/mysql/paramsChange.vue'], resolve),
          meta: {
            title: '参数变更'
          }
        },
        {
          path: '/mongodb_list',
          component: resolve =>
            require(['../components/mongodb/mongodbList.vue'], resolve),
          meta: {
            title: 'MongoDB服务列表'
          }
        },
        {
          path: '/mongodb_list/mongodb_overview',
          component: resolve =>
            require(['../components/mongodb/mongodbOverview.vue'], resolve),
          meta: {
            title: '概览'
          }
        },
        {
          path: '/mongodb_list/mongodb_monitor',
          component: resolve =>
            require(['../components/mongodb/monitor.vue'], resolve),
          meta: {
            title: '概览'
          }
        },
        {
          path: '/data_archive',
          component: resolve =>
            require(['../components/dataArchive/dataArchive.vue'], resolve),
          meta: {
            title: '数据归档'
          }
        },
        {
          path: '/log_analysis',
          component: resolve =>
            require(['../components/logAnalysis/logAnalysis.vue'], resolve),
          meta: {
            title: '慢日志分析'
          }
        },
        {
          path: '/Warning',
          component: resolve =>
            require(['../components/warning/warning.vue'], resolve),
          meta: {
            title: '告警'
          }
        },
        {
          path: '/approval',
          component: resolve =>
            require(['../components/approval/approval.vue'], resolve),
          meta: {
            title: '审批'
          }
        },
        {
          path: '/sql/release',
          component: resolve =>
            require(['../components/sql/sqlRelease.vue'], resolve),
          meta: {
            title: 'SQL审核上线'
          }
        },
        {
          path: '/sql/history',
          component: resolve =>
            require(['../components/sql/sqlHistory.vue'], resolve),
          meta: {
            title: '历史记录'
          }
        },
        {
          path: '/user/user',
          component: resolve =>
            require(['../components/user/user.vue'], resolve),
          meta: {
            title: '用户管理'
          }
        },
        {
          path: '/user/profile',
          component: resolve =>
            require(['../components/user/profile.vue'], resolve),
          meta: {
            title: '个人中心'
          }
        }
      ]
    },
    {
      path: '/config',
      component: resolve =>
        require(['../components/config/config.vue'], resolve),
      meta: {
        title: '管理页面'
      },
      children: [{
          path: '/config',
          redirect: '/admin'
        },
        {
          path: '/server',
          component: resolve => require(['../components/server/server.vue'], resolve),
          meta: {
            title: '主机'
          }
        },
        {
          path: '/proxy',
          component: resolve => require(['../components/proxy/proxy.vue'], resolve),
          meta: {
            title: '流量入口中间件'
          }
        },
        {
          path: '/sip',
          component: resolve => require(['../components/sip/sip.vue'], resolve),
          meta: {
            title: 'SIP'
          }
        },
        {
          path: '/zone',
          component: resolve => require(['../components/zone/zone.vue'], resolve),
          meta: {
            title: '可用区'
          }
        },
        {
          path: '/admin',
          component: resolve => require(['../components/admin/admin.vue'], resolve),
          meta: {
            title: '用户管理'
          }
        },
        {
          path: '/system_config',
          component: resolve => require(['../components/systemConfig/systemConfig.vue'], resolve),
          meta: {
            title: '系统配置'
          }
        },
        {
          path: '/template/mysql',
          component: resolve => require(['../components/template/mysqlTemplate.vue'], resolve),
          meta: {
            title: 'mysql模板设置'
          }
        },
        {
          path: '/template/mongodb',
          component: resolve => require(['../components/template/mongodbTemplate.vue'], resolve),
          meta: {
            title: 'mongodb模板设置'
          }
        },
        {
          path: '/template/mongodb',
          component: resolve => require(['../components/template/mongodbTemplate.vue'], resolve),
          meta: {
            title: '模板设置'
          }
        },
        {
          path: '/log',
          component: resolve => require(['../components/log/log.vue'], resolve),
          meta: {
            title: '平台日志'
          }
        },
        {
          path: '/service_list/mysql',
          component: resolve => require(['../components/serviceList/mysqlServiceList.vue'], resolve),
          meta: {
            title: '服务列表'
          }
        },
        {
          path: '/service_list/mongodb',
          component: resolve => require(['../components/serviceList/mongodbServiceList.vue'], resolve),
          meta: {
            title: '服务列表'
          }
        }
      ]
    }
  ]
})
