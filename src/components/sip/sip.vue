<template>
<div class="title">
    <div class="action_btn">
        <el-button type="primary">添加SIP</el-button>
        <el-button type="danger" @click="showSipDetail">删除SIP</el-button>
    </div>
    <el-table
    :data="sipData"
    style="width: 100%"
    :default-sort = "{prop: 'date', order: 'descending'}"
    @row-click="sipDetails"
    :highlight-current-row="true"
    >
    <el-table-column
      prop="sip_id"
      label="SIP"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="status"
      label="状态"
      sortable
      width="180"
      :formatter="formatStatus"
      >
    </el-table-column>
    <el-table-column
      prop="instance_group_id"
      label="实例组ID">
    </el-table-column>
    <el-table-column
      prop="zone_names"
      label="所属可用区"
      :formatter="formatZone"
      >
    </el-table-column>
  </el-table>
  <delete-dialog :showDialog="isShow"></delete-dialog>
</div>
</template>

<script>
import deleteDialog from "./components/dialog";
export default {
  components: {
    deleteDialog
  },
  created() {
    this.getSipData();
  },
  computed: {},
  data() {
    return {
      sipData: [],
      sipDetail: [],
      isShow: false,
      select_tr: "select_tr"
    };
  },
  methods: {
    getSipData() {
      this.axiosApi.get("v3/sip/list").then(res => {
        this.sipData = res;
      });
    },
    formatStatus(row, column) {
      if (row[column.property] == "unused") {
        return "未使用";
      } else {
        return "已使用";
      }
    },
    formatZone(row, column) {
      if (row[column.property].length == 0) {
        return "";
      } else {
        return row[column.property].join(",");
      }
    },
    sipDetails(row, event, column) {
      this.sipDetail = row;
      console.log(row);
    },
    showSipDetail() {
      console.log(this.sipDetail.sip_id);
      this.isShow = true;
    },
    tableRowClassName({ row, rowIndex }) {
      //把每一行的索引放进row
      row.index = rowIndex;
    }
  }
};
</script>
<style scoped>
.title {
  padding-left: 205px;
}
.action_btn {
  line-height: 55px;
  background-color: white;
  margin-bottom: 12px;
  height: 55px;
}
.action_btn button {
  padding: 9px 6px;
  float: right;
  margin-top: 10px;
  margin: 10px 10px 0px 0;
}
</style>
