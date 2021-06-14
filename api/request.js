/*
 * @Author: dengqiang
 * @Date: 2021-06-14 11:01:01
 * @LastEditTime: 2021-06-14 23:55:20
 * @LastEditors: dengqiang
 * @Description: request
 */
const axios = require('axios');
const { baseURL, timeout, APIKEY } = require('../config/tianapi');

class Request {
  constructor() {
    this.instance = null;
    this.defaultOptions = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };
    this.createInstance();
  }
  createInstance() {
    this.instance = axios.create({
      baseURL,
      timeout
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
  formatOptions(options) {
    let method = options.method || 'GET';
    let params = options.params || {};
    let data = options.data || {};
    if (/(GET)|(DELETE)/i.test(method)) {
      params = { ...params, key: APIKEY };
    }
    if (/(POST)|(PUT)/i.test(method)) {
      data = { ...data, key: APIKEY };
    }
    return { ...this.defaultOptions, ...options, params, data };
  }
  request(options = {}) {
    options = this.formatOptions(options);
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

module.exports = new Request();
