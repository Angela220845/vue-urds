<template>
    <div>
        <approval-table :formData="formData" :modelData="modelData"></approval-table>
    </div>
</template>
<script>
import ApprovalTable from "../../common-components/mixinTable.vue";
// import IndexTable from './tableRecord.vue';
  import Pagination from './components/pagination.vue';
  import { TableModel } from './model.js';
//   import { studentInfo } from './dataRecord.js';
//   import showRemarkDialog from './components/dialog.vue';
//   import SimpleCustomerInfo from 'component-common/src/components/crm/customer/simpleCustomerInfo.vue';

  export default {
    created() {
    //   this.baseInfo = studentInfo;
    },
    components: {
        ApprovalTable,
      Pagination,
    //   IndexTable,
    //   showRemarkDialog,
    //   SimpleCustomerInfo
    },
    data() {
      return {
        formData: {},
        tableCloumns: new TableModel(),
        pageInfo: {},
        pageInfoData: {},
        baseInfo: {},
        showRemarkDialogVisable: false,
        remarkDetail: {}
      };
    },
    mounted() {
    },
    methods: {
      closeRemarkDialog() {
        this.showRemarkDialogVisable = false;
      },
      showRemarkDialog(dataColumns) {
        this.showRemarkDialogVisable = true;
        this.remarkDetail = dataColumns;
      },
      search(pageInfo) {
        this.pageInfoData = pageInfo;
      },
      change(val) {
        this.pageInfo = {
          pageSize: val.pageSize,
          pageNo: val.pageNo,
          total: val.total
        };
      }
    },
    computed: {
      customerId() {
        return this.$route.params.customerId;
      }
    }
  };
</script>

