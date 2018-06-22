<template>
<<<<<<< HEAD
  <div>
    <div class="wraper">
      <div class="server">
        <div class="resource">主机</div>
        <div class="resource">CPU
          <el-progress :percentage="80" color="red"></el-progress>
        </div>
        <div class="resource">磁盘
          <el-progress :percentage="20" color="blue"></el-progress>
        </div>
        <div class="resource">内存
          <el-progress :percentage="30" color="#8e71c7"></el-progress>
        </div>
      </div>
      <div class="service">
        <div class="resource">MySQL
        </div>
        <div class="resource">MongoDB

        </div>
      </div>
      <div class="consumption">
        <div class="resource">暂无消费数据，请稍后再查</div>
      </div>
=======
    <div>
        资源统计改变
>>>>>>> resource
    </div>
  </div>
</template>
<script>
  export default {
    methods: {
      getEmail() {
        this.$http.get('/alert/get_smtp').then(res => {
          if (res) {
            console.log(res)
          }

        })
      }
    }
  }
</script>
<style lang="css">
  .wraper > div > div {
    border-radius: 5px;
  }

  .resource {
    height: 90px;
    background-color: white;
    float: left;
    padding: 15px 10px;
    box-sizing: border-box;

  }

  .server .resource {
    width: 24%;
    margin-right: 16px;
  }

  .service .resource {
    width: 49%;
    margin-right: 16px;
    margin-top: 20px;
  }

  .consumption .resource {
    width: 99%;
    margin-top: 20px;
    text-align: center;
    color: gray;
    line-height: 56px;
    font-size: 14px;

  }
</style>
