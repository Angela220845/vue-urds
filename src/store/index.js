import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    zoneList: [],
    num: 1
  },
  mutations: {
    saveZone(state) {
      state.num++
      console.log(state.num)
    }

  }
})
