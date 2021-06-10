/*
 * @Author: dengqiang
 * @Date: 2021-06-07 11:20:38
 * @LastEditTime: 2021-06-08 23:54:43
 * @LastEditors: dengqiang
 * @Description: bot
 */
const { Wechaty } = require('wechaty');

const bot = new Wechaty({
  name: 'wx-bot',
  puppet: 'wechaty-puppet-wechat'
});

const EVENT_LIST = [
  'scan',
  'login',
  'logout',
  'message',
  'friendship',
  'room-join',
  'room-leave',
  'room-topic',
  'room-invite',
  'error'
];

EVENT_LIST.forEach((eventName) => {
  const listener = require(`./listeners/${eventName}`);
  bot.on(eventName, listener);
});

module.exports = bot;
