<template>
  <div>
    <div class="title">
      <span>MYSQL服务：</span>
      <el-select v-model="mysqlServiceId" filterable placeholder="请选择Mysql服务" :filter-method="filterMethod()">
        <el-option v-for="item in mysqlIdList" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-table :data="paramsList" border style="width: 100%">
        <el-table-column prop="option" label="参数名">
        </el-table-column>
        <el-table-column prop="default_value" label="参数默认值">
        </el-table-column>
        <el-table-column prop="wait_timeout" label="运行参数值">
        </el-table-column>
        <el-table-column prop="is_need_restart" label="是否重启">
        </el-table-column>
        <el-table-column prop="scope" label="可修改参数值">
        </el-table-column>
        <el-table-column prop="desc" label="参数描述">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>


<script>
  import {
    paramsList,
    mysqlIdList
  } from './model/change_params_model'
  export default {
    created() {
      this.paramsList = paramsList
      this.mysqlIdList = mysqlIdList
    },
    data() {
      return {
        paramsList: [],
        mysqlIdList: [],
        mysqlServiceId: ''
      }
    },
    methods: {
      filterMethod() {
        console.log(this.mysqlServiceId)
      }
    }
  }
</script>

<style lang="css" scoped>
  a {
    color: #409EFF
  }
</style>
