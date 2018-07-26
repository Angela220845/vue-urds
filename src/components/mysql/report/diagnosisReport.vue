<template>
  <div>
    <div class="title">
      <h2>巡检报告详情</h2>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.getDetailsData();
  },
  data() {
    return {
      params: {
        key: "",
        service_id: ""
      }
    };
  },
  methods: {
    getDetailsData() {
      this.params.key = this.$route.query.key
      this.params.service_id = this.$route.query.service_id
      console.log(this.params);//请求参数
    }
  }
};
</script>
