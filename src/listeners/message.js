/*
 * @Author: dengqiang
 * @Date: 2021-06-07 11:34:51
 * @LastEditTime: 2021-06-13 17:22:40
 * @LastEditors: dengqiang
 * @Description: on-message
 */
const { replyMessage } = require('../utils/replyMessage');
const { mentionSelf } = require('../utils/mentionSelf');

async function onMessage(msg) {
  const self = msg.self();
  const talker = msg.talker();
  const to = msg.to();
  const room = msg.room();

  const text = msg.text();
  const isMentionSelf = mentionSelf(text);
  // const mentionSelf = await msg.mentionSelf();
  // if (self || talker === to || (room && !mentionSelf)) return false;
  // let text = mentionSelf ? await msg.mentionText() : msg.text();
  if (self || talker === to || (room && !isMentionSelf)) return false;

  const { reply, mentionList } = await replyMessage({
    text,
    talker,
    room,
    bot: this
  });

  if (room) {
    if (mentionList && mentionList.length) {
      await room.say(reply, ...mentionList);
    } else {
      await room.say(reply);
    }
  } else {
    await msg.say(reply);
  }
  console.log(`message ${msg} received`);
}

module.exports = onMessage;
