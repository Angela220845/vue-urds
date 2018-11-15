<template>
  <div id="app">
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <router-link to="/index">
          <span class="icon iconfont icon-home"></span>
          </router-link>
          <span class="icon iconfont icon-tuichu"></span>
          <span class="icon iconfont icon-liebiao"></span>
          <span class="icon iconfont icon-yun1"></span>
        </div>
      </el-col>
    </el-row>

    <div class="aside_nav">
      <!-- <el-row class="tac"> -->

      <el-col :span="12">
        <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#545c64">
          <router-link to="/server">
            <el-menu-item index="1">
              <i class="icon iconfont icon-zhuji"></i>
              <span slot="title">主机</span>
            </el-menu-item>
          </router-link>
          <router-link to="/proxy">
            <el-menu-item index="2">
              <i class="icon iconfont icon-expansibility"></i>
              <span slot="title">流量入口中间件</span>
            </el-menu-item>
          </router-link>
          <router-link to="/sip">
            <el-menu-item index="3">
              <i class="icon iconfont icon-canshu"></i>
              <span slot="title">SIP</span>
            </el-menu-item>
          </router-link>
          <router-link to="/zone">
            <el-menu-item index="4">
              <i class="icon iconfont icon-ziyuan1"></i>
              <span slot="title">可用区</span>
            </el-menu-item>
          </router-link>
          <router-link to="/admin">
            <el-menu-item index="5">
              <i class="icon iconfont icon-yonghuzu"></i>
              <span slot="title">用户管理</span>
            </el-menu-item>
          </router-link>
          <router-link to="/admin">
            <el-menu-item index="6">
              <i class="icon iconfont icon-shezhi"></i>
              <span slot="title">系统配置</span>
            </el-menu-item>
          </router-link>
          <el-submenu index="1">
            <template slot="title">
            <span>模板设置</span>
            </template>
            <el-menu-item-group>
              <router-link to="/template/mysql">
              <el-menu-item index="1-1">
                <i class="icon iconfont icon-mysql"></i>
                <span>mysql模板设置</span>
              </el-menu-item>
              </router-link>
              <router-link to="/template/mongodb">
              <el-menu-item index="1-2">
                <i class="icon iconfont icon-mongodb"></i>
                <span>mongodb模板设置</span>
                </el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>
              <router-link to="/log">
              <el-menu-item index="7">
                <i class="icon iconfont icon-baogao"></i>
                <span slot="title">平台日志</span>
              </el-menu-item>
              </router-link>
          <el-submenu index="2">
            <template slot="title">
              <span>服务列表</span>
            </template>
            <el-menu-item-group>
              <router-link to="/service_list/mysql">
              <el-menu-item index="2-1">
                <i class="icon iconfont icon-mysql"></i>
                <span>mysql服务列表</span>
              </el-menu-item>
              </router-link>
              <router-link to="/service_list/mongodb">
              <el-menu-item index="2-2">
                <i class="icon iconfont icon-mongodb"></i>
                <span>mongodb服务列表</span>
              </el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>
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

<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.bg-purple-dark {
  height: 40px;
  background-color: #5c678a;
}

.bg-purple-dark span {
  height: 40px;
  width:28px;
  cursor: pointer;
  line-height: 40px;
  color: white;
  text-align: center;
  float: right;
  font-size: 14px;
}
.bg-purple-dark span.icon-yun1{
  font-size: 10px;
}
.bg-purple-dark span.icon-liebiao{
  font-size: 18px;
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
  width: 205px;
}
.el-col-12 .icon,
.el-col-12 li {
  color: white;
}

.aside_nav > div:nth-child(2) {
  margin-left: 201px;
  padding: 10px;
}

.el-menu {
  border: none;
}
.el-menu-item span {
  margin-left: 5px;
}

/* 更改样式 */

.aside_nav ul {
  background-color: #e9ebe3;
  border-right: 5px solid #ccc;
}
.el-submenu__title {
  height: 104px;
  line-height: 104px;
  font-weight: bold;
  color: white;
}
.el-submenu__title span {
  color: white;
  font-size: 16px;
}
.el-menu-item.is-active {
  color: #409eff;
}
.el-menu-item.is-active .icon {
  color: #409eff;
}
</style>
