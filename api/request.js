/*
 * @Author: dengqiang
 * @Date: 2021-06-14 11:01:01
 * @LastEditTime: 2021-06-16 20:41:05
 * @LastEditors: dengqiang
 * @Description: request
 */
const axios = require('axios');
class Request {
  constructor(config = {}) {
    this.instance = null;
    this.config = { ...config };
    this.defaultOptions = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };
    this.createInstance();
  }
  createInstance() {
    this.instance = axios.create({
      baseURL: '/',
      timeout: 1000 * 60,
      ...this.config
    });
    // 添加请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // 添加响应拦截器
    this.instance.interceptors.response.use(
      (response) => {
        return response.data;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }
  requestUse(onFulfilled = null, onRejected = null) {
    this.instance.interceptors.request.use(onFulfilled, onRejected);
  }
  responseUse(onFulfilled = null, onRejected = null) {
    this.instance.interceptors.response.use(onFulfilled, onRejected);
  }
  request(options = {}) {
    return this.instance.request(options);
  }
  get(url, params = {}, options = {}) {
    return this.request({ url, method: 'GET', params, ...options });
  }
  post(url, data = {}, options = {}) {
    return this.request({ url, method: 'POST', data, ...options });
  }
  delete(url, params = {}, options = {}) {
    return this.request({ url, method: 'DELETE', params, ...options });
  }
  put(url, data = {}, options = {}) {
    return this.request({ url, method: 'PUT', data, ...options });
  }
}

const request = (config) => {
  return new Request(config);
};

module.exports = request;
