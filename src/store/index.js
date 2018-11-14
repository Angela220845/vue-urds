import Vue from 'vue'
import Vuex from 'vuex'
import {
  Axios
} from "../common/base/Axios";

Vue.use(Vuex)
let axiosApi = new Axios()
export default new Vuex.Store({
  state: {
    zoneList: []
  },
  mutations: {
    initZoneList(state, payload) {
      state.zoneList = payload
    }

  },
  actions: {
    getZoneList({
      commit
    }) {
      return new Promise((resolve, reject) => {
        axiosApi.get("/zone/search")
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
    }
  }
})
