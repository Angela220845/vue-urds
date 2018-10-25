import axios from 'axios';
export class Axios {
  static get(url, data = {}) {
    return new Promise((resolve, reject) => {
      axios
        .get(url, { params: data })
        .then(res => {
          resolve(res);
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
