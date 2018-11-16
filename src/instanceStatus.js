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
  mysqlArchite(architeObj) {
    let isHaEnable = architeObj["is_ha_enable"],
      isRwsEnable = architeObj["is_rws_enable"],
      isRaEnable = architeObj["is_ra_enable"],
      isMgrEnable = architeObj["is_mgr_enable"],
      data = {},
      origin,
      architecture,
      extend = "";
    if (isMgrEnable) {
      origin = "三节点MGR";
      architecture = "mgr";
      extend = false;
    } else {
      if (isHaEnable && isRwsEnable && isRaEnable) {
        origin = "容灾+读写分离";
        architecture = "ha_rws_ra";
      } else {
        if (!isHaEnable && !isRwsEnable && !isRaEnable) {
          origin = "单实例";
          architecture = "single";
          // if (configHa) {
          //   extend +=高可用';
          // }
          // if (configHaRws) {
          //   extend +=高可用+读写分离
          // }
        } else if (isHaEnable) {
          if (!isRwsEnable && !isRaEnable) {
            origin = "高可用";
            architecture = "ha";
            // if (configHaRa) {
            //   extend +='容灾';
            // }
          } else {
            if (isRwsEnable && !isRaEnable) {
              origin = "高可用+读写分离";
              architecture = "ha_rws";
              // if (configHaRaRws) {
              //   extend +=容灾+读写分离;
              // }
            }
            if (isRaEnable && !isRwsEnable) {
              origin = "容灾";
              architecture = "ha_ra";
            }
          }
        }
      }
      if (extend === "") {
        extend = "no extend";
      }
    }
    data["origin"] = origin;
    data["extend"] = extend;
    data["architecture"] = architecture;
    return data;
  }
};
