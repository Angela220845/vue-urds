import { BaseApi } from '../../../common/base/api.js'
export class CourseTypeRecordApi extends BaseApi {
  constructor() {
    super();
  }
  getRecordTable(data) {
    return this.$axios.post('/learningCard/changeRecord', data);
  }
}
