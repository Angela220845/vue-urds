<template>
  <div>
    <el-button type="primary" @click="this.getZoneList">点击登录</el-button>
  </div>
</template>

<script>
  // import {
  //   NewLeadApi
  // } from './api.js'
  export default {
    data() {
      return {
        // testApi: new NewLeadApi()
      }
    },
    methods: {
      getZoneList() {
        // this.$http.get('/zone/list').then((res) => {
        //   console.log(res)
        // })
      console.log('登录')

        // console.log(this.testApi.$axios)
      }
    }
  }
</script>
