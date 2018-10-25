import { BaseApi } from '../common/base/base'
export class TableApi extends BaseApi {
  constructor() {
    super();
  }
  getTableData(url, data) {
    return this.axios.post(url, data);
  }
}
