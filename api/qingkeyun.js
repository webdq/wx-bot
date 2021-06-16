/*
 * @Author: dengqiang
 * @Date: 2021-06-16 19:59:44
 * @LastEditTime: 2021-06-16 20:34:35
 * @LastEditors: dengqiang
 * @Description: qingkeyun
 */
const request = require('./request')({
  baseURL: 'http://api.qingyunke.com/api.php'
});

const robot = (data) => {
  return request.get(`/api.php`, data);
};

exports.robot = robot;
module.exports = {
  robot
};
