/*
 * @Author: dengqiang
 * @Date: 2021-06-14 10:54:46
 * @LastEditTime: 2021-06-15 01:14:54
 * @LastEditors: dengqiang
 * @Description: tian api
 */
exports.APIKEY = `8e7ee7a2bf95b1e00820fb02e4b030e6`;
exports.baseURL = `http://api.tianapi.com/txapi`;
exports.timeout = 1000 * 60;
exports.responseCode = {
  100: '内部服务器错误',
  110: '接口暂时维护中',
  120: 'IP请求来源受限',
  130: '分钟请求频率超限',
  140: 'API没有调用权限',
  150: '接口可用次数不足',
  160: '账号未申请该接口',
  170: 'Referer请求来源受限',
  230: 'key错误或为空',
  240: '缺少key参数',
  250: '数据返回为空',
  260: '参数值不得为空',
  270: '缺少有效数据',
  280: '缺少必要的参数',
  290: '超过最大输入字节限制'
};
exports.maxRequestCount = 10000;
