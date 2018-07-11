<script>
  import { TableModel } from './modelRecord';
  import { CourseTypeRecordApi } from './api';
  import { BossUtil } from './util.js';
  export default {
    watch: {
      pageInfo(val) {
        this.searchData();
      }
    },
    props: {
      pageInfo: Object
    },
    data() {
      return {
        tableData: [],
        columnsName: [],
        tableModel: {},
        api: {}
      };
    },
    methods: {
      initData() {
        this.tableModel = new TableModel();
        this.api = new CourseTypeRecordApi();
        this.columnsName = this.tableModel.columnsNameMapping;
      },
      searchData() {
        this.tableData = [];
        this.api.getRecordTable(this.searchObj).then(res => {
          if (res && res.data && res.data.isSuccess) {
            console.log(res);
            let Newdata = [];
            for (let i = 0; i < res.data.data.length; i++) {
              let arr1 = {'createTime': '', 'outin': 'in', 'LessonTeachMethodName': '', 'LessonTypeName': '', 'LessonCourseTypeName': '', 'GradeName': '', 'LessonCourseName': '', 'SourceHours': '', 'operation': ''};
              let arr2 = JSON.parse(JSON.stringify(arr1));
              arr1.createTime = res.data.data[i].createTime;
              arr1.outin = '转入';
              arr1.LessonTeachMethodName = res.data.data[i].inLessonTeachMethodName;
              arr1.LessonTypeName = res.data.data[i].inLessonTypeName;
              arr1.LessonCourseTypeName = res.data.data[i].inLessonCourseTypeName;
              arr1.LessonCourseName = res.data.data[i].inLessonCourseName;
              arr1.GradeName = res.data.data[i].inGradeName;
              arr1.SourceHours = res.data.data[i].inSourceHours;
              arr1.operation = res.data.data[i].creatorName;
              //
              arr2.createTime = res.data.data[i].createTime;
              arr2.outin = '转出';
              arr2.LessonTeachMethodName = res.data.data[i].outLessonTeachMethodName;
              arr2.LessonTypeName = res.data.data[i].outLessonTypeName;
              arr2.LessonCourseTypeName = res.data.data[i].outLessonCourseTypeName;
              arr2.LessonCourseName = res.data.data[i].outLessonCourseName;
              arr2.GradeName = res.data.data[i].outGradeName;
              arr2.SourceHours = res.data.data[i].outNewHours;
              arr2.operation = res.data.data[i].creatorName;
              Newdata.push(arr2);
              Newdata.push(arr1);
            }
            this.tableData = this.tableModel.map(Newdata, this.tableModel.columnsMapping);
            this.$emit('search', {
              pageNo: res.data.pageNo,
              pageSize: res.data.pageSize,
              total: res.data.totalCount
            });
          }
        });
      },
      operationClick(dataColumns) {
        this.$emit('showRemarkDialog', dataColumns);
      },
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0 || columnIndex === 8 || columnIndex === 9) {
          if (rowIndex % 2 === 0) {
            return {
              rowspan: 2,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      }
    },
    mounted() {
      this.initData();
      // this.searchData();
    },
    computed: {
      userInfo() {
        return this.$store.state.common.userInfo;
      },
      searchObj() {
        let data = {};
        console.log(this.pageInfo);
        BossUtil.deepCopy(this.pageInfo, data);
        BossUtil.deepCopy(this.$route.params, data);
        return data;
      }
    },
    render(h) {
      let elTableColumn = [];
      for (let columns in this.columnsName) {
        let itemValue = this.columnsName[columns];
        let attrs = {
          prop: columns,
          label: itemValue,
          align: 'center',
          'header-align': 'center',
          'class-name': columns,
          'show-overflow-tooltip': true
        };
        elTableColumn.push(
          h('el-table-column', {
            attrs,
            scopedSlots: {
              default: props => {
                let value = props.row[columns];
                if (columns === 'Remarks') {
                  return h('el-button', {
                    domProps: {
                      innerText: '查看'
                    },
                    attrs: {
                      type: 'primary',
                      size: 'small'
                    },
                    style: {
                      border: 'none',
                      backgroundColor: 'transparent',
                      color: '#409eff'
                    },
                    on: {
                      click: e => this.operationClick(props.row)
                    }
                  });
                }
                return value;
              }
            }
          })
        );
      }
      return h(
        'el-table',
        {
          attrs: {
            id: 'changeCourseTypeRecordTable',
            data: this.tableData,
            border: true,
            height: '480',
            'span-method': this.objectSpanMethod
          },
          style: {
            width: '100%'
          }
        },
        elTableColumn
      );
    }
  };
</script>
<style lang="css">
  #changeCourseTypeRecordTable {
    margin-top: 20px;
  }
</style>
