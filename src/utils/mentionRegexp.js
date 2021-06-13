/*
 * @Author: dengqiang
 * @Date: 2021-06-13 16:28:54
 * @LastEditTime: 2021-06-13 16:29:24
 * @LastEditors: dengqiang
 * @Description: mentionRegexp
 */
const mentionRegexp = (escapedCur) => {
  const regex = new RegExp(`@${escapedCur}(\u2005|\u0020|$)`);
  return regex;
};

exports.mentionRegexp = mentionRegexp;
