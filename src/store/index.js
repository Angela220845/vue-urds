import Vue from 'vue'
import Vuex from 'vuex'
import {
  Axios
} from "../common/base/Axios";

Vue.use(Vuex)
let axiosApi = new Axios()

export default new Vuex.Store({
  state: {
    zoneList: [],
    userList: [],
    userAccount:{}
  },
  mutations: {
    initZoneList(state, payload) {
      state.zoneList = payload
    },
    initUserList(state, payload) {
      state.userList = payload
    },
    initLoginAccount(state,payload){
      state.userAccount = payload
    }

  },
  actions: {
    getZoneList({
      commit
    }) {
      return new Promise((resolve, reject) => {
        axiosApi.get("v3/zone/list")
          .then(res => {
            res.unshift({
              zone_id: "",
              zone_name: "全部"
            })
            commit('initZoneList', res)
            resolve(res)

          })
          .catch(error => {
            reject(error)
          });
      })
    },
    getUserList({
      commit
    }) {
      return new Promise((resolve, reject) => {
        axiosApi.get('support/user_list').then(res => {
          commit('initUserList', res)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getLoginAccount({commit}){
      return new Promise((resolve,reject)=>{
        axiosApi.get('v3/user/login_account').then(res=>{
          commit('initLoginAccount',res)
          resolve(res)
        }).catch(error=>{
          reject(error)
        })
      })
    }
  }
})
