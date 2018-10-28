<template>
  <div id="app">
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark"></div>
      </el-col>
    </el-row>
  
    <div class="aside_nav">
      <!-- <el-row class="tac"> -->
  
      <el-col :span="12">
        <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
          <router-link to="/resource_statistics">
            <el-menu-item index="1">
              <i class="icon iconfont icon-resource"></i>
              <span slot="title">资源统计</span>
            </el-menu-item>
          </router-link>
          <router-link to="/mysql_list">
            <el-menu-item index="2">
              <i class="icon iconfont icon-mysql"></i>
              <span slot="title">MySQL服务</span>
            </el-menu-item>
          </router-link>
          <router-link to="/mongodb_list">
            <el-menu-item index="3">
              <i class="icon iconfont icon-mongodb"></i>
              <span slot="title">MongoDB服务</span>
            </el-menu-item>
          </router-link>
          <router-link to="/data_archive">
            <el-menu-item index="4">
              <i class="icon iconfont icon-digital"></i>
              <span slot="title">数据归档</span>
            </el-menu-item>
          </router-link>
          <router-link to="log_analysis">
            <el-menu-item index="5">
              <i class="icon iconfont icon-rizhi"></i>
              <span slot="title">慢日志分析</span>
            </el-menu-item>
          </router-link>
          <router-link to="/Warning">
            <el-menu-item index="6">
              <i class="icon iconfont icon-gaojingtai"></i>
              <span slot="title">告警</span>
            </el-menu-item>
          </router-link>
          <router-link to="/approval">
            <el-menu-item index="7">
              <i class="icon iconfont icon-shengpi"></i>
              <span slot="title">审批</span>
            </el-menu-item>
          </router-link>
          <router-link to="/sql_review_online">
            <el-menu-item index="8">
              <i class="icon iconfont icon-fabu"></i>
              <span slot="title">SQL上线</span>
            </el-menu-item>
          </router-link>
          <router-link to="/user">
            <el-menu-item index="9">
              <i class="icon iconfont icon-yonghu"></i>
              <span slot="title">用户</span>
            </el-menu-item>
          </router-link>
        </el-menu>
      </el-col>
  
  
      <!-- </el-row> -->
    </div>
    <router-view></router-view>
  
  </div>
</template>

<script>
  export default {
    name: "App",
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  };
</script>

<style>
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  .bg-purple-dark {
    height: 40px;
    background-color: #5c678a;
  }
  
  * {
    margin: 0;
    padding: 0;
  }
  
  body {
    position: relative;
    background-color: lightgray;
  }
  
  .el-col-12 {
    width: 201px;
  }
  
  .aside_nav>div:nth-child(2) {
    margin-left: 201px;
    padding: 10px;
  }
  
  .el-menu {
    border: none;
  }
  
  .el-menu-item,
  .el-submenu__title {
    height: 104px;
    line-height: 104px;
  }
  
  .el-menu-item span {
    margin-left: 5px;
  }
  
  
  /* 更改样式 */
  
  .aside_nav ul {
    background-color: #e9ebe3;
    border-right: 5px solid #ccc;
  }
</style>
