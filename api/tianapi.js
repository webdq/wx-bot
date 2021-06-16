/*
 * @Author: dengqiang
 * @Date: 2021-06-16 20:35:23
 * @LastEditTime: 2021-06-16 20:40:38
 * @LastEditors: dengqiang
 * @Description: tianpi
 */
const { baseURL, APIKEY } = require('../config/tianapi');
const request = require('./request')({
  baseURL
});

request.requestUse((config) => {
  let params = config.params || {};
  let data = config.data || {};
  config.params = { ...params, key: APIKEY };
  config.data = { ...data, key: APIKEY };
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
  return config;
});

const robot = (data) => {
  return request.get(`/robot/index`, data);
};

const riddle = (data) => {
  return request.get(`/riddle/index`, data);
};

exports.robot = robot;
exports.riddle = riddle;
module.exports = {
  robot,
  riddle
};
