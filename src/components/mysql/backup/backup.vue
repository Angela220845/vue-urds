<template>
  <div>
    <div class="title">
      <span>MYSQL服务：</span>
      <el-select v-model="mysqlServiceId" filterable placeholder="请选择Mysql服务" :filter-method="filterMethod()">
        <el-option v-for="item in mysqlIdList" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-table :data="backupList" border style="width: 100%">
        <el-table-column prop="instId" label="MySQL实例">
        </el-table-column>
        <el-table-column prop="gtid" label="备份集ID">
        </el-table-column>
        <el-table-column prop="setId" label="gtid">
        </el-table-column>
        <el-table-column prop="backupTime" label="备份时间">
        </el-table-column>
        <el-table-column prop="operating" label="操作">
          <template slot-scope="scope">
            <span @click="" class="backup">手工备份</span>
          </template>
        </el-table-column>
      </el-table>
      <Dialog></Dialog>

    </div>
  </div>
</template>


<script>
  import {
    backupList,
    mysqlIdList
  } from '../model/backupsets_model.js'
  import Dialog from './component/dialog.vue'

  export default {
    components: {
      Dialog
    },
    created() {
      this.backupList = backupList
      this.mysqlIdList = mysqlIdList
    },
    data() {
      return {
        backupList: [],
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
  .backup {
    color: #409EFF;
    cursor: pointer;
  }
</style>
