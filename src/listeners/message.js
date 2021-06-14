/*
 * @Author: dengqiang
 * @Date: 2021-06-07 11:34:51
 * @LastEditTime: 2021-06-15 01:07:01
 * @LastEditors: dengqiang
 * @Description: on-message
 */
const { replyMessage, checkGame } = require('../utils/replyMessage');
const { replyRobotMessage } = require('../utils/replyRobotMessage');
const {
  replyGameMessage,
  checkAnswer,
  clearGame
} = require('../utils/replyGameMessage');
const { mentionSelf } = require('../utils/mentionSelf');
const { mentionText } = require('../utils/mentionText');

const sendMessage = async ({ room, reply, mentionList }) => {
  if (room) {
    if (mentionList && mentionList.length) {
      await room.say(reply, ...mentionList);
    } else {
      await room.say(reply);
    }
  } else {
    await msg.say(reply);
  }
};

async function onMessage(msg) {
  const self = msg.self();
  const talker = msg.talker();
  const to = msg.to();
  const room = msg.room();

  const text = msg.text();
  const isMentionSelf = mentionSelf(text);
  const mentionSelfText = mentionText(text);
  const content = isMentionSelf ? mentionSelfText : text;
  // const mentionSelf = await msg.mentionSelf();
  // if (self || talker === to || (room && !mentionSelf)) return false;
  // let text = mentionSelf ? await msg.mentionText() : msg.text();
  if (self || talker === to) return false;

  let gameMessage = checkGame({ text: content });

  if (global.isGameOpen && global.isGameOngoing) {
    const answerRight = checkAnswer(content);
    if (answerRight) {
      clearGame();
      await sendMessage({
        room,
        reply: `(σﾟ∀ﾟ)σ..:*☆ 恭喜你答对了`,
        mentionList: [talker]
      });
    }
  } else if (gameMessage) {
    if (global.isGameOpen) return false;
    // 开启游戏
    global.isGameOpen = true;
    const apiMessage = await replyGameMessage({
      gameType: gameMessage.match.gameType,
      sendMessage,
      text: content,
      talker,
      room,
      bot: this
    });
    await sendMessage({
      room,
      reply: gameMessage.reply,
      mentionList: gameMessage.mentionList
    });
    await sendMessage({
      room,
      reply: apiMessage.reply,
      mentionList: apiMessage.mentionList
    });
  } else {
    if (room && !isMentionSelf) return false;

    // 匹配回复
    const matchMessage = await replyMessage({
      text: content,
      talker,
      room,
      bot: this
    });

    if (matchMessage.matched) {
      await sendMessage({
        room,
        reply: matchMessage.reply,
        mentionList: matchMessage.mentionList
      });
    } else {
      // 接口回复
      const apiMessage = await replyRobotMessage({
        gameType: 'robot',
        text: content,
        talker,
        room,
        bot: this
      });
      await sendMessage({
        room,
        reply: apiMessage.reply,
        mentionList: apiMessage.mentionList
      });
    }
  }
  console.log(`message ${msg} received`);
}

module.exports = onMessage;
