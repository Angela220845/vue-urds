/**
 * Created by Arno on 2017/9/5.
 */
import { ModelBase } from '../../common/base/model';

class ColumnsMapping {
  constructor() {
    this.changeTime = 'createTime';
    this.changeType = 'outin';
    this.changeSubject = 'LessonCourseName';
    this.teachMethods = 'LessonTeachMethodName';
    this.subjectType = 'LessonTypeName';
    this.grade = 'GradeName';
    this.LessonsPeriodType = 'LessonCourseTypeName';
    this.changeNumber = 'SourceHours';
    this.Remarks = '';
    this.Handler = 'operation';
  }
}

class ColumnsNameMapping { // 列名
  constructor() {
    this.changeTime = '时间';
    this.changeType = '转出/转入';
    this.changeSubject = '科目';
    this.teachMethods = '授课方式';
    this.subjectType = '课程类别';
    this.grade = '年级';
    this.LessonsPeriodType = '课时类型';
    this.changeNumber = '转移课时数';
    this.Remarks = '备注';
    this.Handler = '操作人';
  }
}

export class TableModel extends ModelBase {
  constructor() {
    super();
    this.columnsMapping = new ColumnsMapping();
    this.columnsNameMapping = new ColumnsNameMapping();
  }
}
