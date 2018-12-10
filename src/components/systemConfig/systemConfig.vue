<template>
<div class="title">
    <el-tabs type="border-card">
      <el-tab-pane label="架构配置">
      <el-switch
        v-model="archite"
        active-color="#13ce66"
        inactive-color="#ff4949">
      </el-switch>
      </el-tab-pane>
      <el-tab-pane label="告警邮箱配置">告警邮箱配置

      </el-tab-pane>
      <el-tab-pane label="角色管理">角色管理

      </el-tab-pane>
      <el-tab-pane label="参数配置">
          <el-table :data="configList" border style="width: 100%" @cell-dblclick="cellClick">
            <el-table-column label="参数名">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.id }}</span>
                </template>
            </el-table-column>
            <el-table-column label="默认参数值" >
              <template slot-scope="scope">
                <span v-if="scope.row.defalt_value.length != undefined" style="margin-left: 10px">{{ scope.row.defalt_value }}</span>
                <div v-else-if="(scope.row.defalt_value!='true' && scope.row.defalt_value!='false') && scope.row.defalt_value.length == undefined" class="editor"></div>
              </template>
            </el-table-column>
            <el-table-column label="自定义参数" >
              <template slot-scope="scope">
                <!-- 字符串 -->
                <div v-if="(scope.row.defalt_value!='true' && scope.row.defalt_value!='false') && scope.row.defalt_value.length != undefined">
                  <span v-show="!scope.row.seen" style="margin-left: 10px">{{ scope.row.value }}</span>
                  <el-input v-show="scope.row.seen" v-model="scope.row.value" @blur="loseFocus(scope.$index, scope.row)"></el-input>
                  <p v-show="scope.row.status == 'validate'" class="errTip">{{scope.row.validateTip}}</p>
                </div>


                <!-- 布尔值 -->
                <div v-else-if="scope.row.defalt_value=='true'||scope.row.defalt_value=='false'">
                  <el-select v-model="scope.row.value" filterable>
                    <el-option v-for="(item,index) in switchList" :key="index" :label="item.value" :value="item.value"></el-option>
                  </el-select>
                </div>
               <!-- 对象 -->
                <div v-else-if="(scope.row.defalt_value!='true' && scope.row.defalt_value!='false') && scope.row.defalt_value.length == undefined" class="editor">

                </div>
              </template>
            </el-table-column>
          </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  created() {
    this.getConfigList();
  },
  data() {
    return {
      archite: false,
      configList: [],
      switchList: [{ value: "" }, { value: "true" }, { value: "false" }]
    };
  },
  methods: {
    getConfigList() {
      this.axiosApi.get("/system_config/get_system_config").then(res => {
        res.map((item, index) => {
          item["seen"] = false;
          item["status"] = "init";
          item["validateTip"] = "";
        });
        this.configList = res;
        console.log(res);
      });
    },
    loseFocus(index, row) {
      let reg = /^[0-9]*[0-9][0-9]*$/,
        validate;
      row.status = "validate";
      row.validateTip = ""; // 第一次验证不通过时，需要失焦进行第二次验证，解决在第二次验证通过时，错误提示不隐藏的问题
      if (
        typeof row.value == "string" &&
        (row.value != "false" && row.value != "true")
      ) {
        // 字符串
        validate = reg.test(Number(row.value));
        if (!validate) {
          row.validateTip = "须输入大于等于0的整数";
        } else if (
          row.id == "automatic-approval" &&
          (row.value != 0 && row.value != 1)
        ) {
          row.validateTip = "只能设置为0或者1";
          return;
        } else {
          this.axiosApi.post("/system_config/update_system_config", {
            id: row.id,
            value:row.value
          }).then(res=>{
            console.log(res)
          }).catch(err=>{
            console.log(err)
          });
          row.seen = false;
        }
      }
    },
    cellClick(row, column) {
      if (column.label == "自定义参数") {
        // 点击事件只对第三列有效
        row.seen = true;
      }
    }
  }
};
</script>
<style lang="css" scoped>
.title {
  padding-left: 230px;
  background-color: white;
}
.errTip {
  color: red;
}
</style>
