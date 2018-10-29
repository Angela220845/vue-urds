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
      <div id="cpuChart" :style="{width: '875px', height: '300px'}"></div>
      <div id="ramChart" :style="{width: '875px', height: '300px'}"></div>
      <div id="flowChart" :style="{width: '875px', height: '300px'}"></div>
      <div id="diskChart" :style="{width: '875px', height: '300px'}"></div>
    </div>
  </div>
</template>

<script>
  // import {
  //   monitor
  // } from './model/monitor.js';
  import Datepicker from '../mysql/components/datepicker.vue'

  export default {
    components: {
      Datepicker
    },
    created() {
      this.monitorData = monitor
      this.serviceTypeList = monitor[0].selectList[0].serviceTypeList
      this.monitorTypeList = monitor[0].selectList[0].monitorTypeList
      this.cpuData = monitor[0].cpuOption
      this.ramData = monitor[0].ramOption
      this.flowData = monitor[0].flowOption
      this.diskData = monitor[0].diskOption
      console.log(monitor[0].cpuOption.title)
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
        let cpuChart = this.$echarts.init(document.getElementById('cpuChart'))
        let ramChart = this.$echarts.init(document.getElementById('ramChart'))
        let flowChart = this.$echarts.init(document.getElementById('flowChart'))
        let diskChart = this.$echarts.init(document.getElementById('diskChart'))
        cpuChart.setOption(this.cpuData);
        ramChart.setOption(this.ramData);
        flowChart.setOption(this.flowData);
        diskChart.setOption(this.diskData);
      }
    }
  }
</script>

<style lang="css" scoped>
  .title {
    padding: 10px;
    background-color: white;
    height: 906px;
    overflow: auto;
  }
  #cpuChart {
    margin-top: 20px;
  }

</style>
