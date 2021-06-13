/*
 * @Author: dengqiang
 * @Date: 2021-06-13 16:32:35
 * @LastEditTime: 2021-06-14 00:28:31
 * @LastEditors: dengqiang
 * @Description: replyMessage
 */
// const { UrlLink } = require('wechaty');
const { FileBox } = require('file-box');
const { replyMentionList } = require('./replyMentionList');
const { clazzManagement } = require('./clazzManagement');
const {
  BOT_MESSAGE,
  NOTFOUND_MATCH_MESSAGE,
  EMPTY_MESSAGE
} = require('../../config/bot');

const checkMessage = async ({ text, match, talker, room, bot }) => {
  let checkedReply = null;
  let checkedMentionList = [];
  if (match.test.test(text)) {
    switch (match.replyType) {
      case 'text':
        checkedReply = match.reply;
        if (room) {
          checkedMentionList = await replyMentionList({
            match,
            room,
            talker
          });
        }
        break;
      case 'file':
        checkedReply = FileBox.fromUrl(match.reply);
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
        checkedReply = await clazzManagement({ text, match, talker, room });
        break;
    }
  }
  return { checkedReply, checkedMentionList };
};

const replyMessage = async ({ text, talker, room, bot }) => {
  const len = BOT_MESSAGE.length;
  let reply = '';
  let mentionList = [];

  if (text === '') {
    reply = EMPTY_MESSAGE;
    if (room) {
      mentionList = await replyMentionList({ match: {}, room, talker });
    }
  } else {
    for (let i = 0; i < len; i++) {
      let match = BOT_MESSAGE[i];
      const { checkedReply, checkedMentionList } = await checkMessage({
        text,
        match,
        talker,
        room,
        bot
      });
      if (checkedReply) {
        reply = checkedReply;
        mentionList = checkedMentionList;
        break;
      }
    }
    reply = reply || NOTFOUND_MATCH_MESSAGE;
  }

  return {
    reply,
    mentionList
  };
};

exports.replyMessage = replyMessage;
