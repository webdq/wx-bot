/*
 * @Author: dengqiang
 * @Date: 2021-06-13 16:32:35
 * @LastEditTime: 2021-06-15 00:17:58
 * @LastEditors: dengqiang
 * @Description: replyMessage
 */
// const { UrlLink } = require('wechaty');
const { FileBox } = require('file-box');
const { replyMentionList } = require('./replyMentionList');
const { clazzManagement } = require('./clazzManagement');
const {
  BOT_MESSAGE,
  BOT_GAME_MESSAGE,
  NOTFOUND_MATCH_MESSAGE,
  EMPTY_MESSAGE
} = require('../../config/bot');

const checkMessage = async ({ text, match, talker, room, bot }) => {
  let reply = null;
  let mentionList = null;
  if (match.test.test(text)) {
    switch (match.replyType) {
      case 'text':
        reply = match.reply;
        if (room) {
          mentionList = await replyMentionList({
            match,
            room,
            talker
          });
        }
        break;
      case 'file':
        reply = FileBox.fromUrl(match.reply);
        break;
      // case 'urllink':
      // reply = new UrlLink({
      //   description: match.replyDescription,
      //   thumbnailUrl: match.replyThumbnailUrl,
      //   title: match.replyTitle,
      //   url: match.reply
      // });
      // break;
      // case 'contact':
      //   try {
      //     reply = await bot.Contact.find({ name: match.reply });
      //   } catch (err) {
      //     reply = `(￢_￢) 联系人不存在鸭`;
      //   }
      //   break;
      case 'clazz-management':
        reply = await clazzManagement({ text, match, talker, room });
        break;
    }
  }
  return { reply, mentionList };
};

const checkGame = ({ text }) => {
  const len = BOT_GAME_MESSAGE.length;
  for (let i = 0; i < len; i++) {
    let match = BOT_GAME_MESSAGE[i];
    if (match.test.test(text)) {
      return { reply: match.reply, mentionList: null, matched: true, match };
    }
  }
};

const replyMessage = async ({ text, talker, room, bot }) => {
  if (text === '') {
    let mentionList = null;
    if (room) {
      mentionList = await replyMentionList({ match: {}, room, talker });
    }
    return { reply: EMPTY_MESSAGE, mentionList, matched: true };
  } else {
    const len = BOT_MESSAGE.length;
    for (let i = 0; i < len; i++) {
      let match = BOT_MESSAGE[i];
      const { reply, mentionList } = await checkMessage({
        text,
        match,
        talker,
        room,
        bot
      });
      if (reply) {
        return { reply, mentionList, matched: true };
      }
    }
  }

  return { reply: NOTFOUND_MATCH_MESSAGE, mentionList: null, matched: false };
};

exports.replyMessage = replyMessage;
exports.checkGame = checkGame;
