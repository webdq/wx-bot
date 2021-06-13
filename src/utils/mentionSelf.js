/*
 * @Author: dengqiang
 * @Date: 2021-06-13 16:30:11
 * @LastEditTime: 2021-06-13 16:56:04
 * @LastEditors: dengqiang
 * @Description: mentionSelf
 */
const { BOT_NAME } = require('../../config/bot');
const { escapeRegExp } = require('./escapeRegExp');
const { mentionRegexp } = require('./mentionRegexp');

const mentionSelf = (text) => {
  const escapedCur = escapeRegExp(BOT_NAME);
  const regex = mentionRegexp(escapedCur);
  return !!text.match(regex);
};

exports.mentionSelf = mentionSelf;
