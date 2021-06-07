/*
 * @Author: dengqiang
 * @Date: 2021-06-07 11:20:38
 * @LastEditTime: 2021-06-07 12:21:28
 * @LastEditors: dengqiang
 * @Description: index
 */
const { Wechaty } = require('wechaty');

const onScan = require('./handlers/on-scan');
const onLogin = require('./handlers/on-login');
const onLogout = require('./handlers/on-logout');
const onMessage = require('./handlers/on-message');
const onFriendship = require('./handlers/on-friendship');
const onRoomJoin = require('./handlers/on-room-join');
const onRoomLeave = require('./handlers/on-room-leave');
const onRoomTopic = require('./handlers/on-room-topic');
const onRoomInvite = require('./handlers/on-room-invite');
const onError = require('./handlers/on-error');

const bot = new Wechaty({
  name: 'wx-bot',
  puppet: 'wechaty-puppet-wechat'
});

bot
  .on('scan', onScan)
  .on('login', onLogin)
  .on('logout', onLogout)
  .on('message', onMessage)
  .on('friendship', onFriendship)
  .on('room-join', onRoomJoin)
  .on('room-leave', onRoomLeave)
  .on('room-topic', onRoomTopic)
  .on('room-invite', onRoomInvite)
  .on('error', onError)
  .start()
  .catch((e) => console.error(e));
