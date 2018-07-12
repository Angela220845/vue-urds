<script src="model.js"></script>
<template>
    <div>
      <el-select v-model="service" placeholder="服务">
        <el-option
          v-for="item in serviceTypeList"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
            <el-select v-model="monitorType" placeholder="监控类型">
        <el-option
          v-for="item in monitorTypeList"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>      
      <el-select v-model="queryTime" placeholder="查询时间">
        <el-option
          v-for="item in queryTimeList"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>      
    </div>
</template>
<script>
export default {

data(){
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
    }],
    monitorType: '',
        queryTimeList: [{
      value: '选项1',
      label: '1小时'
    }, {
      value: '选项2',
      label: '1天'
    },
    {
      value: '选项2',
      label: '7天'
    },
    {
      value: '选项2',
      label: '一个月'
    }],
    queryTime: '',
  }
}
}
</script>
