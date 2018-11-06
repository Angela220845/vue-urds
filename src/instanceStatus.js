export class Status {
  constructor() {
    this.destroyStatus = {
        'APPROVALING': '待审批',
        'FAILED': '审批失败',
        'DESTROYED': '已销毁',
        'REFUSED': '拒绝审批'
      },
      this.mysqlAbnormalRunStatus = {
        'APPROVALING': '待审批',
        'FAILED': '审批失败',
        'DESTROYED': '已销毁',
        'REFUSED': '拒绝审批',
        'STATUS_MYSQL_HA_BAD': '停止',
        'STATUS_MYSQL_RA_BAD': '停止',
        'STATUS_MYSQL_HEALTH_BAD': '停止'
      },
      this.mysqlStopStatus = {
        'STATUS_MYSQL_HA_BAD': '停止',
        'STATUS_MYSQL_RA_BAD': '停止',
        'STATUS_MYSQL_HEALTH_BAD': '停止'
      },
      this.mongodbAbnormalRunStatus = {
        'APPROVALING': '待审批',
        'FAILED': '审批失败',
        'DESTROYED': '已销毁',
        'REFUSED': '拒绝审批',
        'STATUS_MONGODB_HEALTH_BAD': '停止'
      },
      this.mongodbStopStatus = {
        'STATUS_MONGODB_HEALTH_BAD': '停止'
      }
  }
};
