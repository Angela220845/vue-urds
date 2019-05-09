import axios from 'axios';
import Qs from 'qs'
export class Axios {
  constructor() {
    this.$http = axios.create({
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      transformRequest: [function (data) { //在请求之前对data传参进行格式转换
        data = Qs.stringify(data)
        return data
      }]
    });
  }
  isArray(o) {
    return Object.prototype.toString.call(o) == '[object Array]';
  }
  isObject(o) {
    return (typeof o == 'object') && (typeof o.length != 'number')
  }
  get(url, data = {}) {
    return new Promise((resolve, reject) => {
      this.$http
        .get('/api' + url, {
          params: data
        })
        .then(res => {
          if (res.status == 200) {
            if (this.isArray(res.data)) {
              console.log(1)
              resolve(res.data);

            } else {
              if (this.isObject(res.data)) {
                console.log(res.data)
                if (res.data.data == undefined) {
                  resolve(res.data)
                } else if (this.isArray(res.data.data)) {
                  resolve(res.data.data)
                } else if (res.data.data == null) {
                  res.data.data = []
                  resolve(res.data.data)
                }
                resolve(res.data)
              } else if (res.data.data == null) {
                console.log(3)
                resolve(res.data)

              } else if (res.data.data != undefined) {
                // resolve(res.data)
                if (this.isArray(res.data.data)) {
                  console.log(4)
                  resolve(res.data.data);
                }
              }

            }


          }
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  post(url, params = {}) {
    return new Promise((resolve, reject) => {
      this.$http
        .post('/api' + url, params)
        .then(res => {
          resolve(res);
          console.log('jhh' + url)
        })
        .catch(error => {
          reject(error);
          console.log(url)

        });
    });
  }
  delete(url, params = {}) {
    return new Promise((resolve, reject) => {
      this.$http
        .delete(url, params)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  put(url, params = {}) {
    return new Promise((resolve, reject) => {
      this.$http
        .put(url, params)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  allPost(params) {
    return new Promise((resolve, reject) => {
      this.$http
        .all(params)
        .then(
          axios.spread(res => {
            resolve(res);
          })
        )
        .catch(error => {
          reject(error);
        });
    });
  }
  all(params) {
    return this.$http.all(params);
  }
  spread(fun) {
    return this.$http.spread(fun);
  }
  config(config) {
    return this.$http(config);
  }
}
