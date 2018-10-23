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
      path: '/sql_review_online',
      component: resolve =>
        require(['../components/sqlOnline/sqlOnline.vue'], resolve),
      meta: {
        title: 'SQL审核上线'
      }
    },
    {
      path: '/historical_record',
      component: resolve =>
        require(['../components/sqlOnline/historicalRecord.vue'], resolve),
      meta: {
        title: '历史记录'
      }
    },
    {
      path: '/user',
      component: resolve =>
        require(['../components/user/user.vue'], resolve),
      meta: {
        title: '用户'
      }
    }
  ]
})
