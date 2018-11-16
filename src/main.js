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
import {
  Status
} from './instanceStatus';
// import echarts from 'echarts'
// Vue.prototype.$echarts = echarts
import {
  Axios
} from "./common/base/Axios";
import store from './store/index'
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
Vue.prototype.instanceStatus = new Status();
Vue.prototype.axiosApi = new Axios()
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

new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
