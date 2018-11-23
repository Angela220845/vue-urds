<template>
  <div>
    <div class="title">
      <template>
                  <el-table
                    :data="mysqlTableData"
                    border
                    style="width: 100%"
                    v-loading="loading"
                    @row-click="sipDetails"
                    :highlight-current-row="true"
                    @cell-click="showForm"
                    >
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
                      label="实例组ID"
                      width="120"
                      :formatter="formatGroupId"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="zone_name"
                      label="可用区名"
                      width="120">
                    </el-table-column>
                      <el-table-column
                      prop="group_name"
                      label="用户组"
                      width="120">
                    </el-table-column>
                    <el-table-column
                      prop="own_user_name"
                      label="用户"
                      width="120">
                    </el-table-column>
                  </el-table>
      </template>
      <detail-modal :rowData="rowData" :isShow="isShow"></detail-modal>
    </div>
  </div>
</template>

<script>
import DetailModal from "./form";

export default {
  components: {
    DetailModal
  },
  created() {
    this.getMysqlTableData();
    // this.getMonitorData();
    this.loading = true;
  },
  data() {
    return {
      options: [],
      isShow:false,
      keyword: "",
      zoneList: [],
      serviceList: [],
      dialogVisible: false,
      mysqlTableData: [],
      zoneName: "",
      loading: false,
      mysqlIdStr: [],
      uguardStatusObj: {},
      rowData:{}
    };
  },
  methods: {
    sipDetails(row, column, cell, event) {
      console.log(row)
      this.isShow = true
      this.rowData = row
    },
    showForm(row, column, cell, event) {

    },
    getMysqlTableData() {
      let mysqlIdList = [];
      this.axiosApi
        .get("/db_service/search", {
          zone_id: "",
          order_by: "create_time",
          order: "desc",
          key_word: "",
          page: 1,
          number: 20
        })
        .then(res => {
          this.mysqlTableData = res;
          this.loading = false;
          res.map(item => {
            mysqlIdList.push(item.service_id);
          });
        });
    },
    formatClass(row, column) {
      return row.service_class.service_class_name;
    },
    formatArchite(row, column) {
      let architeObj = {
          is_ha_enable: row.is_ha_enable,
          is_mgr_enable: row.is_mgr_enable,
          is_ra_enable: row.is_ra_enable,
          is_rws_enable: row.is_rws_enable
        },
        archite = "",
        extend = "",
        architecture = "";
      archite = this.instanceStatus.mysqlArchite(architeObj).origin;
      extend = this.instanceStatus.mysqlArchite(architeObj).extend;
      architecture = this.instanceStatus.mysqlArchite(architeObj).architecture;
      return archite;
    },
    formatGroupId(row) {
      let groupId =
        row.run_status in this.instanceStatus.destroyStatus
          ? "--"
          : row.mysql_group_id;
      return groupId;
    },
    formatUptime(row) {},
    formatHaStatus(row, column) {
      return row[column.property];
    },
    showTip(row, column, cell, event) {
      // console.log(row);
      // console.log(column);
      // console.log(cell);
      // console.log(event);
    }
  }
};
</script>

<style lang="css" scoped>
.title {
  padding-left: 230px;
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
.view_temp_inst,
.destroy_temp_inst {
  border-bottom: 1px dotted green;
}
.run_checkout {
  color: green;
}

.run_not_checkout {
  color: #d0bd50;
}

.run_malfunction {
  color: red;
}

.run_not_configuration {
  color: gray;
}
</style>
