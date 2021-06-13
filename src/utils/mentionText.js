/*
 * @Author: dengqiang
 * @Date: 2021-06-13 16:27:45
 * @LastEditTime: 2021-06-13 16:28:51
 * @LastEditors: dengqiang
 * @Description: mentionText
 */
const { BOT_NAME } = require('../../config/bot');
const { escapeRegExp } = require('./escapeRegExp');
const { mentionRegexp } = require('./mentionRegexp');

const mentionText = (text) => {
  const escapedCur = escapeRegExp(BOT_NAME);
  const regex = mentionRegexp(escapedCur);
  text = text.replace(regex, '').trim();
  return text;
};

exports.mentionText = mentionText;
