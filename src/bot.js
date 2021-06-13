/*
 * @Author: dengqiang
 * @Date: 2021-06-07 11:20:38
 * @LastEditTime: 2021-06-13 18:18:38
 * @LastEditors: dengqiang
 * @Description: bot
 */
const { Wechaty } = require('wechaty');

const bot = Wechaty.instance({
  name: 'wx-bot',
  puppet: 'wechaty-puppet-wechat'
});

const EVENT_LIST = [
  'scan',
  'login',
  'logout',
  'message',
  'friendship',
  // 'room-join',
  // 'room-leave',
  // 'room-topic',
  // 'room-invite',
  'error'
];

EVENT_LIST.forEach((evt) => {
  const listener = require(`./listeners/${evt}`);
  bot.on(evt, listener);
});

module.exports = bot;
