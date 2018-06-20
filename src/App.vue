<template>
  <div id="app">
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark"></div>
      </el-col>
    </el-row>
    <!-- <router-view/> -->
    <div class="aside_nav">
          <!-- <el-row class="tac"> -->
  <el-col :span="12">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">

      <router-link to="/resource_statistics">
      <el-menu-item index="1">
        <i class="el-icon-menu"></i>
        <span slot="title">资源统计</span>
      </el-menu-item>
      </router-link>

      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>MySql服务</span>
        </template>
        <el-menu-item-group>
          <router-link to="/mysql_list">
            <el-menu-item index="2-1">MySql服务列表</el-menu-item>
          </router-link>
          <router-link to="/mysql_overview">
            <el-menu-item index="2-2">概览</el-menu-item>
          </router-link>
          <router-link to="/mysql_monitor">
            <el-menu-item index="2-3">监控</el-menu-item>
          </router-link>
          <router-link to="/mysql_report">
            <el-menu-item index="2-4">巡检报告</el-menu-item>
          </router-link>
          <router-link to="/mysql_backupset">
            <el-menu-item index="2-5">备份集</el-menu-item>
          </router-link>
          <router-link to="/mysql_params_change">
            <el-menu-item index="2-6">参数变更</el-menu-item>
          </router-link>
        </el-menu-item-group>

      </el-submenu>
      <router-link to="/data_archive">
        <el-menu-item index="3">
          <i class="el-icon-document"></i>
          <span slot="title">数据归档</span>
        </el-menu-item>
      </router-link>

      <router-link to="log_analysis">
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">慢日志分析</span>
          </el-menu-item>
      </router-link>

      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>MongoDB服务</span>
        </template>
        <el-menu-item-group>
           <router-link to="/mongodb_list">
            <el-menu-item index="5-1">MongoDB服务列表</el-menu-item>
          </router-link>
          <router-link to="/mongodb_overview">
            <el-menu-item index="5-2">概览</el-menu-item>
          </router-link>
        </el-menu-item-group>
      </el-submenu>
      <router-link to="/Warning">
        <el-menu-item index="6">
          <i class="el-icon-setting"></i>
          <span slot="title">告警</span>
        </el-menu-item>
      </router-link>
      <router-link to="/approval">
        <el-menu-item index="7">
          <i class="el-icon-setting"></i>
          <span slot="title">审批</span>
         </el-menu-item>
      </router-link>
      <el-submenu index="8">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>SQL上线</span>
        </template>
        <el-menu-item-group>
          <router-link to="/sql_review_online">
            <el-menu-item index="8-1">SQL审核上线</el-menu-item>
          </router-link>

          <router-link to="/historical_record">
            <el-menu-item index="8-2">历史记录</el-menu-item>
          </router-link>
        </el-menu-item-group>
      </el-submenu>
      <router-link to="/user">
        <el-menu-item index="9">
          <i class="el-icon-setting"></i>
          <span slot="title">用户</span>
        </el-menu-item>
      </router-link>
    </el-menu>
  </el-col>

            <router-view></router-view>

<!-- </el-row> -->
    </div>
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
.el-col-12{
  width: 201px
}
  .aside_nav>div:nth-child(2){
    margin-left: 201px;
    padding: 10px;
  }
  .el-menu{
    border: none;
  }
</style>
