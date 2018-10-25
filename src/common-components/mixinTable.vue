<script>
import { TableApi } from "./table";
import { BossUtil } from "../common/util/util";
// import {TableModel} from ""
export default {
  watch: {
    formData(val) {
      this.searchData();
    }
  },
  props: {
    modelData: {
      type: Object,
      default: {}
    },
    formData: {
      type: Object,
      default: {}
    },
    handleRowData: {
      type: Function,
      default: function() {}
    },
    apiUrl: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      tableData: [],
      columnsName: {},
      api: {},
      tableModel: {},
      loading: {}
    };
  },
  methods: {
    initData() {
      let TableModel = this.modelData;
      this.api = new TableApi();
      this.tableModel = new TableModel();
      this.columnsName = this.tableModel.columnsNameMapping;
    },
    rowClick(row) {
      this.$emit("row-click", row);
    },
    searchData() {
      this.tableLoading();
      this.tableData = [];
      this.api.getTableData(this.apiUrl, this.searchObj).then(res => {
        if (res && res.data && res.data.isSuccess) {
          this.tableData = this.tableModel.map(
            res.data.data,
            this.tableModel.cloumsMapping
          );
        }
        this.loading.close();
      });
    },
    tableLoading() {
      if (!this.$refs.tableRef) return;
      this.loading = this.$loading({
        target: this.$refs.tableRef.$el,
        body: true
      });
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.common.userInfo;
    },
    searchObj() {
      let data = {};
      BossUtil.deepCopy(this.formData, data);
      return data;
    }
  },
  created() {
    this.initData();
  },
  render(h) {}
};
</script>
