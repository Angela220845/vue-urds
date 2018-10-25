<template>
  <div id="pagination">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="pagination.pageSizes" layout="total, sizes, prev, pager, next, jumper" :page-size="pagination.pageSize" :total="pagination.total">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    watch: {
      data(val) {
        this.pagination.total = val.total;
        this.pagination.pageNo = val.pageNo;
        this.pagination.pageSize = val.pageSize;
      }
    },
    props: {
      data: Object
    },
    data() {
      return {
        pagination: {
          total: 0,
          pageNo: 1,
          pageSize: 10,
          pageSizes: [10, 30, 50, 100]
        }
      };
    },
    components: {},
    methods: {
      // 更改PageSize时触发
      handleSizeChange(val) {
        this.pagination.pageSize = val;
        this.pagination.pageNo = 1;
        this.$emit('change', this.pagination);
      },
      // 选择当前页
      handleCurrentChange(val) {
        this.pagination.pageNo = val;
        this.$emit('change', this.pagination);
      }
    },
    mounted() {
      this.$emit('change', this.pagination);
    }
  };
</script>
<style lang="css">
  #pagination {
    margin: 20px 0;
  }
</style>
