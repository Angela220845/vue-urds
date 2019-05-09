<template>
    <div class="title">

      <span>区域：</span>
      <el-select v-model="zoneName" filterable placeholder="请选择可用区">
        <el-option v-for="(item,index) in zoneList" :key="index" :label="item.zone_name" :value="item.zone_id">
        </el-option>
      </el-select>
      <span>关键字：</span>
      <el-input v-model="keyword" class="el-input" placeholder="请输入关键词"></el-input>
      <el-button type="primary" @click="getMongodbTableData()">搜索</el-button>
      <template>
                  <el-table
                    :data="mongodbTableData"
                    border
                    style="width: 100%"
                    v-loading="loading">
                    <el-table-column
                      fixedID
                      prop="db_service_id"
                      label="服务ID"
                      width="100">
                    </el-table-column>
                    <el-table-column
                      prop="db_service_name"
                      label="服务名称"
                      width="120">`
                    </el-table-column>
                    <el-table-column
                      prop="group_id"
                      label="实例组ID"
                      width="120"
                      :formatter="formatGroupId"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="service_class"
                      label="服务规格"
                      width="100"
                      :formatter="formatClass"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="create_time"
                      label="创建时间"
                      width="150">
                    </el-table-column>
                    <el-table-column
                      prop="zone_name"
                      label="可用区名"
                      width="120">
                    </el-table-column>
                    <el-table-column
                      prop="run_status"
                      label="运行状态"
                      width="120"
                      >
                      <template slot-scope="scope">
                        <div v-if="scope.row.run_status === 'FAILED'">
                        <span class="run_status fail"><span>审批失败</span></span>
                        </div>
                        <div v-else-if="scope.row.run_status === 'APPROVALING'">
                        <span class="run_status cur"><span>等待审批……</span></span>
                        </div>
                        <div v-else-if="scope.row.run_status === 'REFUSED'">
                        <span class="run_status fail"><span>审批已拒绝</span></span>
                        </div>
                        <div v-else-if="scope.row.run_status === 'DESTROYED'">
                        <span class="run_status destroy"><span>已销毁</span></span>
                        </div>
                        <div v-else-if="scope.row.run_status === 'STATUS_MONGODB_HEALTH_OK'">
                        <span class="run_status run_success"><span>运行</span></span>
                        </div>
                        <div v-else-if="scope.row.run_status === 'STATUS_MONGODB_HEALTH_BAD'">
                        <span class="run_status run_error"><span>停止</span></span>
                        </div>
                        <div v-else-if="scope.row.run_status === 'UNKOWN'||scope.row.run_status==='STATUS_MONGODB_MGR_BAD'||scope.row.run_status==='STATUS_MONGODB_SECONDARY_BAD'">
                        <span class="run_status run_abnormal"><span>异常</span></span>
                        </div>
                        <div v-else-if="scope.row.run_status === 'STATUS_UNKNOWN'">
                        <span class="run_status uknow"><span>未知状态</span></span>
                        </div>
                      </template>
                    </el-table-column>
                      <el-table-column
                      prop="own_group_name"
                      label="用户组"
                      width="120">
                    </el-table-column>
                    <el-table-column
                      prop="own_user_name"
                      label="用户"
                      width="120">
                    </el-table-column>
                    <el-table-column
                      prop="is_cluster_enable"
                      label="架构"
                      width="100"
                      :formatter="formatArchite"
                      >
                    </el-table-column>
                    <el-table-column
                      fixed="right"
                      label="操作"
                      width="100">
                      <template slot-scope="scope">
                      <div v-if="scope.row.run_status in mongodbStopStatus">
                         <el-dropdown trigger="click">
                          <span class="el-dropdown-link">
                            查看
                          </span>
                          <el-dropdown-menu slot="dropdown">
                            <router-link :to="'/mongodb_list/mongodb_overview?db_service_id='+scope.row.db_service_id">
                              <el-dropdown-item>概览</el-dropdown-item>
                            </router-link>
                            <router-link :to="'/mongodb_list/mongodb_monitor?db_service_id='+scope.row.db_service_id">
                              <el-dropdown-item>监控</el-dropdown-item>
                            </router-link>
                            <router-link :to="'/mongodb_list/mongodb_report?db_service_id='+scope.row.db_service_id">
                              <el-dropdown-item>巡检报告</el-dropdown-item>
                            </router-link>
                            <router-link :to="'/mongodb_list/mongodb_backupset?db_service_id='+scope.row.db_service_id">
                              <el-dropdown-item>备份集</el-dropdown-item>
                            </router-link>
                            <router-link :to="'/mongodb_list/mongodb_params_change?db_service_id='+scope.row.db_service_id">
                              <el-dropdown-item>参数变更</el-dropdown-item>
                            </router-link>
                          </el-dropdown-menu>
                        </el-dropdown>
                      </div>
                      <div v-else>
                        <div v-if="scope.row.run_status in mongodbAbnormalRunStatus">
                          <p>--</p>

                        </div>
                        <div v-else>
                        <el-dropdown trigger="click" @command="handCommand" v-show="!(scope.row.run_status in mongodbStopStatus)">
                          <span class="el-dropdown-link">
                            操作
                          </span>
                          <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item :command="scope.row.service_id">停用数据库</el-dropdown-item>
                            <el-dropdown-item :command="scope.row.service_id">停用高可用</el-dropdown-item>
                            <el-dropdown-item :command="scope.row.service_id">手工备份</el-dropdown-item>
                            <el-dropdown-item :command="scope.row.service_id">恢复到备份</el-dropdown-item>
                            <el-dropdown-item :command="scope.row.service_id">恢复到时间点</el-dropdown-item>
                            <el-dropdown-item :command="scope.row.service_id">销毁</el-dropdown-item>
                            <el-dropdown-item :command="scope.row.service_id">水平扩展</el-dropdown-item>
                            <el-dropdown-item :command="scope.row.service_id">修改告警对象</el-dropdown-item>
                            <el-dropdown-item :command="scope.row.service_id">修改实例规格</el-dropdown-item>
                            <el-dropdown-item :command="scope.row.service_id">重置用户密码</el-dropdown-item>
                          </el-dropdown-menu>
                        </el-dropdown>
                        <el-dropdown trigger="click">
                          <span class="el-dropdown-link">
                            查看
                          </span>
                          <el-dropdown-menu slot="dropdown">
                            <router-link :to="'/mongodb_list/mongodb_overview?db_service_id='+scope.row.db_service_id">
                              <el-dropdown-item>概览</el-dropdown-item>
                            </router-link>
                            <router-link :to="'/mongodb_list/mongodb_monitor?db_service_id='+scope.row.db_service_id">
                              <el-dropdown-item>监控</el-dropdown-item>
                            </router-link>
                            <router-link :to="'/mongodb_list/mongodb_report?db_service_id='+scope.row.db_service_id">
                              <el-dropdown-item>巡检报告</el-dropdown-item>
                            </router-link>
                            <router-link :to="'/mongodb_list/mongodb_backupset?db_service_id='+scope.row.db_service_id">
                              <el-dropdown-item>备份集</el-dropdown-item>
                            </router-link>
                            <router-link :to="'/mongodb_list/mongodb_params_change?db_service_id='+scope.row.db_service_id">
                              <el-dropdown-item>参数变更</el-dropdown-item>
                            </router-link>
                          </el-dropdown-menu>
                        </el-dropdown>
                        </div>

                    </div>
                  </template>

          </el-table-column>
        </el-table>
      </template>
      <el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
<!-- <template>
  <step-modal>
  </step-modal>
</template> -->

  <span>这是一段信息</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
    </div>
</template>

<script>
//   import StepModal from "./components/stopHighAvailability.vue";

export default {
  components: {
    //   StepModal
  },
  computed: {
    zoneList() {
      return this.$store.state.zoneList;
    },
    userList() {
      return this.$store.state.userList;
    }
  },
  created() {
    this.getMongodbTableData();
    this.loading = true;
    console.log(this.instanceStatus);
  },
  data() {
    return {
      options: [],
      keyword: "",
      serviceList: [],
      dialogVisible: false,
      mongodbTableData: [],
      zoneName: "",
      loading: false,
      mongodbStopStatus: this.instanceStatus.mongodbStopStatus,
      mongodbAbnormalRunStatus: this.instanceStatus.mongodbAbnormalRunStatus,
      destoryStatus: this.instanceStatus.destroyStatus
    };
  },
  methods: {
    getMongodbTableData() {
      this.axiosApi
        .get("v3/mongodb/list_services", {
          zone_id: this.zoneName,
          order_by: "create_time",
          order: "desc",
          key_word: this.keyword,
          page: 1,
          number: 20
        })
        .then(res => {
          this.mongodbTableData = res;
          this.loading = false;
        })
        .catch(error => {
            console.log(error);
        });
    },
    formatArchite(row, column) {
      let archite = row[column.property] == true ? "三实例集群" : "单实例";
      return archite;
    },
    formatGroupId(row, column) {
      let groupId =
        row.run_status in this.destoryStatus ? "--" : row[column.property];
      return groupId;
    },
    formatClass(row,column){
      return row.service_class.service_class_name
    },
    handleClick(row) {
      console.log(row);
      console.log(this.tableData);
    },
    handCommand(command) {
      this.$confirm("确定停用数据库服务" + command + "?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.dialogVisible = true;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    handleClose() {
      this.dialogVisible = true;
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  }
};
</script>

<style lang="css" scoped>
.title {
  padding-left: 230px;
  background-color: white;
  padding-top: 20px;
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
.el-table.el-table--fit.el-table--border.el-table--scrollable-x.el-table--enable-row-transition {
  margin-top: 20px;
}
span.fail {
  color: #ec6d6d;
  background-color: #fadede;
  display: block;
}
span.cur {
  color: #8a6d3b;
  background-color: #fcf8e3;
  display: block;
}
span.destroy {
  background-color: #ccc;
  display: block;
}
span.run_status > span {
  margin-left: 10px;
}
span.run_success {
  color: #26922b;
}

span.run_error {
  color: #ff5200;
}
span.run_error::before {
  background-color: red;
  display: inline-block;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  content: "";
  -webkit-box-shadow: 2px 2px 6px #c7b852;
  -moz-box-shadow: 2px 2px 6px #c7b852;
  -ms-box-shadow: 2px 2px 6px #c7b852;
  -o-box-shadow: 2px 2px 6px #c7b852;
  box-shadow: 2px 2px 6px #c7b852;
}
span.run_abnormal {
  color: #d0bd50;
}
span.run_abnormal::before {
  background-color: #f1d82f;
  display: inline-block;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  content: "";
  -webkit-box-shadow: 2px 2px 6px #c7b852;
  -moz-box-shadow: 2px 2px 6px #c7b852;
  -ms-box-shadow: 2px 2px 6px #c7b852;
  -o-box-shadow: 2px 2px 6px #c7b852;
  box-shadow: 2px 2px 6px #c7b852;
}
</style>
