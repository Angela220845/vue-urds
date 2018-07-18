<template>
  <div>
    <el-select v-model="service" placeholder="服务">
      <el-option v-for="item in serviceTypeList" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
    <el-select v-model="monitorType" placeholder="监控类型">
      <el-option v-for="item in monitorTypeList" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
    <el-date-picker v-model="value2" type="datetime" placeholder="选择日期时间" align="right" :picker-options="pickerOptions1">
    </el-date-picker>
    <div id="myChart" :style="{width: '100%', height: '400px'}"></div>

  </div>
</template>

<script>
  export default {

    data() {
      return {
        serviceTypeList: [{
          value: '选项1',
          label: '主'
        }, {
          value: '选项2',
          label: '从'
        }],
        service: '',
        monitorTypeList: [{
            value: '选项1',
            label: '资源消耗'
          }, {
            value: '选项2',
            label: 'MySQL数据库请求状态'
          },
          {
            value: '选项3',
            label: 'MySQL数据库连接状态'
          },
          {
            value: '选项4',
            label: 'MySQL数据库数据状态'
          }
        ],
        monitorType: '',
        queryTime: '',
        pickerOptions1: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        value1: '',
        value2: '',
        value3: '',
        time: [],
        resource: [],
        option :{
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [820, 932, 901, 934, 1290, 1330, 200],
            type: 'line'
          }]
        }
      }
    },
    methods: {
      getData() {
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        myChart.setOption({
          title: {
            text: '资源消耗',
            left: 'center'
          },
          tooltip: {},
          xAxis: {
            data: this.option.xVipData
          },
          yAxis: {},
          series: [{
            name: '每月会员增长曲线折线图',
            type: 'line',
            data: this.option.yVipData
          }]
        })
      }
    }
  }
</script>
