export default {
  data() {
    return {

    }
  },
  mounted() {},
  methods: {
    getServiceClasses() {
      return this.axiosApi.get("/v3/template/list?db_type=mysql").then(res => {
        this.serviceClasses = res;
      });
    },
  },
}
