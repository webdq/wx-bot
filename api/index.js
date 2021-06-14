/*
 * @Author: dengqiang
 * @Date: 2021-06-14 14:39:17
 * @LastEditTime: 2021-06-15 00:55:46
 * @LastEditors: dengqiang
 * @Description: api
 */
const request = require('./request');

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
