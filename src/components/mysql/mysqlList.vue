<template xmlns="http://www.w3.org/1999/html">

  <div>
    <div class="title">

      <span>区域：</span>
      <el-select v-model="value8" filterable placeholder="请选择可用区" :filter-method="filterMethod()">
      <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
      </el-option>
      </el-select>
      <span>关键字：</span>
      <el-input v-model="input" class="el-input" placeholder="请输入关键词"></el-input>
      <el-button type="primary">搜索</el-button>
      <template>
        <el-table
          :data="serviceList"
          border
          style="width: 100%">
          <el-table-column
            fixedID
            prop="service_id"
            label="服务ID"
            width="100">
          </el-table-column>
          <el-table-column
            prop="db_service_name"
            label="服务名称"
            width="120">
          </el-table-column>
          <el-table-column
            prop="mysql_group_id"
            label="实例组"
            width="120">
          </el-table-column>
          <el-table-column
            prop="service_class_name"
            label="服务规格"
            width="100">
          </el-table-column>
          <el-table-column
            prop="create_time"
            label="创建时间"
            width="150">
          </el-table-column>
          <el-table-column
            prop="monitor"
            label="监控"
            width="70">
          </el-table-column>
          <el-table-column
            prop="uptime"
            label="Uptime"
            width="120">
          </el-table-column>
          <el-table-column
            prop="qps"
            label="QPS"
            width="80">
          </el-table-column>
          <el-table-column
            prop="zone_name"
            label="可用区名"
            width="120">
          </el-table-column>
          <el-table-column
            prop="run_status"
            label="运行状态"
            width="120">
          </el-table-column>
          <el-table-column
            prop="uguard_status"
            label="高可用状态"
            width="120">
          </el-table-column>
          <el-table-column
            prop="own_user_name"
            label="用户"
            width="120">
          </el-table-column>
          <el-table-column
            prop="temp_instances"
            label="临时实例"
            width="120">
          </el-table-column>
          <el-table-column
            prop="archite"
            label="架构"
            width="100">
          </el-table-column>

          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  查看<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <router-link :to="'/mysql_list/mysql_overview?service_id='+scope.row.service_id">
                    <el-dropdown-item>概览</el-dropdown-item>
                  </router-link>
                  <router-link :to="'/mysql_list/mysql_monitor?service_id='+scope.row.service_id">
                    <el-dropdown-item>监控</el-dropdown-item>
                  </router-link>
                  <router-link :to="'/mysql_list/mysql_report?service_id='+scope.row.service_id">
                    <el-dropdown-item>巡检报告</el-dropdown-item>
                  </router-link>
                  <router-link :to="'/mysql_list/mysql_backupset?service_id='+scope.row.service_id">
                    <el-dropdown-item>备份集</el-dropdown-item>
                  </router-link>
                  <router-link :to="'/mysql_list/mysql_params_change?service_id='+scope.row.service_id">
                    <el-dropdown-item>参数变更</el-dropdown-item>
                  </router-link>
                </el-dropdown-menu>
              </el-dropdown>
              <el-dropdown trigger="click" @command="handCommand">
                <span class="el-dropdown-link">
                  操作<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="a" @click.native="test">停用数据库</el-dropdown-item>
                  <el-dropdown-item command="b">停用高可用</el-dropdown-item>
                  <el-dropdown-item command="c">手工备份</el-dropdown-item>
                  <el-dropdown-item command="d">恢复到备份</el-dropdown-item>
                  <el-dropdown-item command="e">恢复到时间点</el-dropdown-item>
                  <el-dropdown-item command="f">销毁</el-dropdown-item>
                  <el-dropdown-item command="g">水平扩展</el-dropdown-item>
                  <el-dropdown-item command="h">修改告警对象</el-dropdown-item>
                  <el-dropdown-item command="i">修改实例规格</el-dropdown-item>
                  <el-dropdown-item command="j">重置用户密码</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
  </div>
</template>

<script>
  import Table from './components/c_table.vue'
  import {serviceList} from './model/mysql_list_model.js'

  export default {
    components: {
      Table
    },
    created(){
      this.serviceList = serviceList
    },
    data() {
      return {
        options: [{
          value: '选项1',
          label: '全部'
        }, {
          value: '选项2',
          label: '示例'
        }, {
          value: '选项3',
          label: '新增可用区'
        }],
        value8: '',
        input: '',
        serviceList: []


      }
    },
    methods: {
      filterMethod() {
        console.log('获取对应可用区主机');

      },
      handleClick(row) {
        console.log(row);
        console.log(this.tableData);
      },
      handCommand(command) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      test(){
        console.log('测试点击事件');
      }
    }
  }
</script>
<style lang="css" scoped>
  .title {
    padding: 10px;
    background-color: white;
  }

  .el-select {
    margin-right: 20px;
  }

  .el-input {
    width: 217px;
  }

  .el-button {
    margin-left: 15px;
  }

  .el-dropdown > span {
    color: #409EFF;
  }

</style>
