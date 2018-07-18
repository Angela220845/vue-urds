<template>
  <div>
    <div class="title">
      <el-select v-model="serviceType" placeholder="服务">
        <el-option v-for="item in serviceTypeList" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="monitorType" placeholder="监控类型">
        <el-option v-for="item in monitorTypeList" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <Datepicker></Datepicker>
      <div id="resourceChart" :style="{width: '1200px', height: '400px'}"></div>
    </div>
  </div>
</template>

<script>
  import {
    monitor
  } from './model/monitor.js';
  import Datepicker from './components/datepicker.vue'
  export default {
    components: {
      Datepicker
    },
    created() {
      this.monitorData = monitor
      this.serviceTypeList = monitor[0].selectList[0].serviceTypeList
      this.monitorTypeList = monitor[0].selectList[0].monitorTypeList
      this.echartsData = monitor[0].echartsOption
      console.log(monitor)
    },
    mounted() {
      this.drawResourceChart();
    },
    data() {
      return {
        monitorData: [],
        serviceType: '服务类型值',
        monitorType: '监控类型值',
        monitorTypeList: [],
        monitorTypeList: [],
        resourceChartsData: {}
      };
    },
    methods: {
      drawResourceChart() {
        let resourceChart = this.$echarts.init(document.getElementById('resourceChart'))
        resourceChart.setOption(this.echartsData);
      }
    }
  }
</script>

<style lang="css" scoped>
  .title {
    padding: 10px;
    background-color: white;
  }
  
  #myChart {
    border: 1px dashed gray;
    margin-top: 20px;
  }
</style>
