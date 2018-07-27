<template>
  <div>
    <div class="title">

      <span>区域：</span>
      <el-select v-model="zoneName" filterable placeholder="请选择可用区" :filter-method="filterMethod()">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <span>关键字：</span>
      <el-input v-model="keyword" class="el-input" placeholder="请输入关键词"></el-input>
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
                        width="120">`
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
                              查看
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
                          <el-dropdown trigger="click">
                            <span class="el-dropdown-link">
                              操作
                            </span>
                            <el-dropdown-menu slot="dropdown">
                              <el-dropdown-item>
                                <span @click="stopDatabase(scope.row.service_id)">停用数据库</span>
                              </el-dropdown-item>
                              <el-dropdown-item>
                                <span @click="stopHighAvailable(scope.row.service_id)">停用高可用</span>
                              </el-dropdown-item>
                              <el-dropdown-item>
                                <span @click="backup(scope.row.service_id)">手工备份</span>
                              </el-dropdown-item>
                              <el-dropdown-item>
                                <span @click="restoreBackup(scope.row.service_id)">恢复到备份</span>
                              </el-dropdown-item>
                              <el-dropdown-item>
                                <span @click="restoreTime(scope.row.service_id)">恢复到时间点</span>
                              </el-dropdown-item>
                              <el-dropdown-item>
                                <span @click="destroy(scope.row.service_id)">销毁</span>
                              </el-dropdown-item>
                              <el-dropdown-item>
                                <span @click="horizontalExtend(scope.row.service_id)">水平扩展</span>
                              </el-dropdown-item>
                              <el-dropdown-item>
                                <span @click="updateAlarmObject(scope.row.service_id)">修改告警对象</span>
                              </el-dropdown-item>
                              <el-dropdown-item>
                                <span @click="updateInstanceSize(scope.row.service_id)">修改实例规格</span>
                              </el-dropdown-item>
                              <el-dropdown-item>
                                <span @click="resetPassword(scope.row.service_id)">重置用户密码</span>
                              </el-dropdown-item>
                            </el-dropdown-menu>
                          </el-dropdown>
</template>
          </el-table-column>
        </el-table>
      </template>
          <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
    <template>
      <step-modal>
      </step-modal>
    </template>

      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    </div>
  </div>
</template>

<script>
import StepModal from "./components/stopHighAvailability.vue";

import { serviceList, zoneList } from "./model/mysql_list_model.js";

export default {
  components: {
    StepModal
  },
  created() {
    this.serviceList = serviceList;
    this.options = zoneList.options;
    this.zoneName = zoneList.value8;
    this.keyword = zoneList.keyword;
  },
  data() {
    return {
      options: [],
      kerword: "",
      zoneName: "",
      serviceList: [],
      dialogVisible: false
    };
  },
  methods: {
    filterMethod() {
      console.log("获取对应可用区主机");
    },
    handleClick(row) {
      console.log(row);
      console.log(this.tableData);
    },
    handleClose() {
      this.dialogVisible = true;
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    stopDatabase(service_id) {
      this.dialogVisible = true;
      console.log("停用数据库" + service_id + "吗？");
    },
    stopHighAvailable(service_id) {
      console.log("停用高可用" + service_id);
      this.dialogVisible = true;
    },
    backup(service_id) {
      console.log(service_id);
      this.dialogVisible = true;
    },
    restoreBackup(service_id) {
      console.log(service_id);
      this.dialogVisible = true;
    },
    restoreTime(service_id) {
      console.log(service_id);
      this.dialogVisible = true;
    },
    destroy(service_id) {
      console.log(service_id);
      this.dialogVisible = true;
    },
    horizontalExtend(service_id) {
      console.log(service_id);
      this.dialogVisible = true;
    },
    updateAlarmObject(service_id) {
      console.log(service_id);
      this.dialogVisible = true;
    },
    updateInstanceSize(service_id) {
      console.log(service_id);
      this.dialogVisible = true;
    },
    resetPassword(service_id) {
      console.log(service_id);
      this.dialogVisible = true;
    }
  }
};
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
  color: #409eff;
}

.el-dropdown:hover {
  cursor: pointer;
}

.el-dropdown:nth-child(1) {
  margin-right: 15px;
}

.el-dialog__wrapper > .el-dialog {
  width: 70%;
}
</style>
