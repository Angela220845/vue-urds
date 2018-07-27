<template>
  <div>
    <el-dialog title="提示" :visible.sync="openStatus" @open="doOpen" @close="doClose" :show="openStatus" width="30%" :before-close="handleClose">
      <span></span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="openStatus=false">取 消</el-button>
        <el-button type="primary" @click="openStatus=false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    props: {
      visible: Boolean
    },
    data() {
      return {
        openStatus: this.visible
      };
    },
    watch: {
      visible(val) {
        this.openStatus = val;
      }
    },
    methods: {
      doOpen() {
        console.log('开')//打开弹框的回调（@open）
      },
      doClose() {
        console.log('关');//打开弹框的回调（@close）
        this.$emit('dialogData', false); // 子组件把dialog最新状态返回给父组件
      },
      handleClose(){
        console.log('关闭弹框之前的回调')
      }
    }
  };
</script>
