/*
 * @Author: dengqiang
 * @Date: 2021-06-13 16:29:37
 * @LastEditTime: 2021-06-13 16:29:54
 * @LastEditors: dengqiang
 * @Description: escapeRegExp
 */
const escapeRegExp = (text) => {
  return text.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
};

exports.escapeRegExp = escapeRegExp;
