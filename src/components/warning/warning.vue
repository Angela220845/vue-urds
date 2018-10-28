<template>
    <div>
        <div class="title">
          <el-table
                  :data="warnData"
                  border
                  style="width: 100%">
                  <el-table-column
                    fixedID
                    prop="timestamp_unix"
                    label="告警时间"
                    width="100">
                  </el-table-column>
                  <el-table-column
                    prop="code"
                    label="告警代码"
                    width="120">`
                  </el-table-column>
                  <el-table-column
                    prop="level"
                    label="级别"
                    width="120">
                  </el-table-column>
                  <el-table-column
                    prop="server"
                    label="服务器"
                    width="100">
                  </el-table-column>
                  <el-table-column
                    prop="alert_comp_id"
                    label="告警组件ID"
                    width="150">
                  </el-table-column>
                  <el-table-column
                    prop="service_name"
                    label="服务名"
                    width="70">
                  </el-table-column>
                  <el-table-column
                    prop="resolve_timestamp_unix"
                    label="解决状态"
                    width="120">
                  </el-table-column>
                  <el-table-column
                    prop="notify_state"
                    label="通知状态"
                    width="80">
                  </el-table-column>
                  <el-table-column
                    prop="detail"
                    label="告警内容"
                    width="120">
                  </el-table-column>
                  <el-table-column
                    prop="server_ip"
                    label="主机"
                    width="120">
                  </el-table-column>
        </el-table>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            warnData:[]
        }
    },
  created() {
    this.getWarnData();
  },
  methods: {
    getWarnData() {
      this.$http.get("/api/alert/list_limit", {
        page: 1,
        number: 50,
        order_by: "resolve_timestamp",
        order: "desc",
        unresolve: 0,
        key_word: "",
        informing: 0
      }).then((res)=>{
if(res.status==200){
    this.warnData = res.data.data;
}
      });
    }
  }
};
</script>

