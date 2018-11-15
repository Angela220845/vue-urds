<template>
  <div>
    <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="get()">取 消</el-button>
        <el-button type="primary" @click="get()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>


<script>
export default {
  props: ["showDialog"],
  created() {
    console.log(this.$props.showDialog);
  },
  data() {
    return {
      dialogVisible: false
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    get() {
      // this.dialogVisible = this.$props.showDialog;
      if(this.$props.showDialog){
        this.dialogVisible = true
      }else{
        this.dialogVisible = false
      }
    }
  }
};
</script>
