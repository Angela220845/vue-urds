<template>
  <div>
    <el-button type="primary" @click="this.getZoneList">点击登录</el-button>
    <el-button type="primary" @click="this.getZone">获取可用区</el-button>
  </div>
</template>

<script>
  // import {
  //   NewLeadApi
  // } from './api.js'
  export default {
    created() {},
    data() {
      return {
        // testApi: new NewLeadApi()
      }
    },
    methods: {
      getZoneList() {
        this.$http.post('/api/user/login', {
          'user_group': 'root',
          'user': window.btoa('root'),
          'password': window.btoa('root')
          // 'user': 'admin',
          // 'password': 'admin'
        }).then((res) => {
          console.log(res)
        })
        console.log('登录')

        // console.log(this.testApi.$axios)
      },
      getZone(){
        this.$http.post('/zone/search').then((res) => {
          console.log(res)
        })
      }
    }
  }
</script>
