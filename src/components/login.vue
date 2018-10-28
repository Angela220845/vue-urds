<template>
  <div>
    <el-button type="primary" @click="this.login">点击登录</el-button>
  </div>
</template>

<script>
  export default {
    created() {},
    data() {
      return {};
    },
    methods: {
      login() {
        this.$http
          .post("/api/user/login", {
            user_group: "root",
            user: window.btoa("root"),
            password: window.btoa("root")
          })
          .then(res => {
            console.log(res);
            this.$router.push({
              path: "/resource_statistics"
            }).catch((err) => {
              console.log(err)
            });
          });
        this.$router.push({
          path: "/index"
        })
        console.log("登录");
      }
    }
  };
</script>
