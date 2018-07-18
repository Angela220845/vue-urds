export const monitor = [{
  selectList: [{
    serviceType: '',
    serviceTypeList: [{
        value: "选项1",
        label: "主"
      },
      {
        value: "选项2",
        label: "从"
      }
    ],
    monitorType: "",
    monitorTypeList: [{
        value: "选项1",
        label: "资源消耗"
      },
      {
        value: "选项2",
        label: "MySQL数据库请求状态"
      },
      {
        value: "选项3",
        label: "MySQL数据库连接状态"
      },
      {
        value: "选项4",
        label: "MySQL数据库数据状态"
      },
    ]
  }],
  echartsOption: {
    title: {
      text: '资源消耗',
      x: 'center',
      y: 'top',
      textStyle: {
        fontWeight: 'normal',
        color: '#409EFF'
      }
    },
    tooltip: {},
    xAxis: {
      data: ["2018/7/6", "2018/7/7", "2018/7/8", "2018/7/9", "2018/7/10", "2018/7/11", "2018/7/12", "2018/7/13", "2018/7/14"]
    },
    yAxis: {},
    series: [{
      name: '销量',
      type: 'line',
      data: [5, 10, 36, 10, 21, 20, 34, 13, 12]
    }]
  }
}]
