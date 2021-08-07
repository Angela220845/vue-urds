<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogFormVisible"
      @close="close"
      :before-close="close"
    >
      <slot name="main" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    close: {
      required: true,
      type: Function
    },
    submit: {
      required: true,
      type: Function
    },
    dialogFormVisible: {
      required: true,
      type: Boolean
    },
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
