// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Qs from 'qs'
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import '../static/css/reset.css'
import './assets/fonts/iconfont.css';
// import echarts from 'echarts'

// Vue.prototype.$echarts = echarts
Vue.prototype.$http = axios.create({
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  },
  // headers: {'Content-Type':'multipart/form-data'},
  transformRequest: [function (data) { //在请求之前对data传参进行格式转换
    data = Qs.stringify(data)
    return data
  }]
});
Vue.config.productionTip = false
// ***element ui 开始
Vue.use(ElementUI);

//
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
/* eslint-disable no-new */
// 设置全局过滤器
Vue.filter('handleArchite', function (architeObj) {
  let isHaEnable = architeObj["is_ha_enable"],
    isRwsEnable = architeObj["is_rws_enable"],
    isRaEnable = architeObj["is_ra_enable"],
    isMgrEnable = architeObj["is_mgr_enable"],
    data = {},
    origin,
    architecture,
    extend = "";
  if (isMgrEnable) {
    origin = "三节点MGR";
    architecture = "mgr";
    extend = false;
  } else {
    if (isHaEnable && isRwsEnable && isRaEnable) {
      origin = "容灾+读写分离";
      architecture = "ha_rws_ra";
    } else {
      if (!isHaEnable && !isRwsEnable && !isRaEnable) {
        origin = "单实例";
        architecture = "single";
        if (configHa) {
          extend +=
            '<dd class="block-item" extend-archite-id="ha">高可用</dd>';
        }
        if (configHaRws) {
          extend +=
            '<dd class="block-item" extend-archite-id="ha_rws">高可用+读写分离</dd>';
        }
      } else if (isHaEnable) {
        if (!isRwsEnable && !isRaEnable) {
          origin = "高可用";
          architecture = "ha";
          if (configHaRa) {
            extend +=
              '<dd class="block-item" extend-archite-id="ha_ra">容灾</dd>';
          }
        } else {
          if (isRwsEnable && !isRaEnable) {
            origin = "高可用+读写分离";
            architecture = "ha_rws";
            if (configHaRaRws) {
              extend +=
                '<dd class="block-item" extend-archite-id="ha_rws_ra">容灾+读写分离</dd>';
            }
          }
          if (isRaEnable && !isRwsEnable) {
            origin = "容灾";
            architecture = "ha_ra";
          }
        }
      }
    }
    if (extend === "") {
      extend = "no extend";
    }
  }
  data["origin"] = origin;
  data["extend"] = extend;
  data["architecture"] = architecture;
  return data;
})
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
