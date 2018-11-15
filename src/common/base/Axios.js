import axios from 'axios';
export class Axios {
  isArray(o) {
    return Object.prototype.toString.call(o) == '[object Array]';
  }
  isObject(o) {
    return (typeof o == 'object') && (typeof o.length != 'number')
  }
  get(url, data = {}) {
    return new Promise((resolve, reject) => {
      axios
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
                console.log('对象')
                if(this.isArray(res.data.data)){
                  resolve(res.data.data)
                }
                resolve(res.data)
              } else if (res.data.data == null) {
                console.log(3)
                res.data.data = []
                resolve(res.data.data)

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
      axios
        .post(url, params)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  delete(url, params = {}) {
    return new Promise((resolve, reject) => {
      axios
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
      axios
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
      axios
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
    return axios.all(params);
  }
  spread(fun) {
    return axios.spread(fun);
  }
  config(config) {
    return axios(config);
  }
}
