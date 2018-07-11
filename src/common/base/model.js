export class ModelBase {
  constructor() {}

  map(data = [], columns = {}) {
    var tableDatas = [];
    data.forEach(item => {
      var tempObj = {};
      for (var key in columns) {
        try {
          var tempArray = columns[key].split('.');
          var str = 'item' + '[\'' + tempArray.join('\'][\'') + '\']';
          // eslint-disable-next-line
          var value = eval(str);
          tempObj[key] = value;
        } catch (e) {
          console.dir(e);
        }
      }
      tableDatas.push(tempObj);
    });
    return tableDatas;
  }
}
