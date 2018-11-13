import axios from 'axios';
export class Axios {
  static isArray(o) {
    return Object.prototype.toString.call(o) == '[object Array]';
  }
  static get(url, data = {}) {
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
              if (res.data.data == null) {
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
  static post(url, params = {}) {
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
  static delete(url, params = {}) {
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
  static put(url, params = {}) {
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
  static allPost(params) {
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
  static all(params) {
    return axios.all(params);
  }
  static spread(fun) {
    return axios.spread(fun);
  }
  static config(config) {
    return axios(config);
  }
}
