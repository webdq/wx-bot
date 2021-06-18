/*
 * @Author: dengqiang
 * @Date: 2021-06-13 16:32:35
 * @LastEditTime: 2021-06-19 00:25:27
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
const {
  LEVEL,
  LEVEL_MIN,
  LEVEL_MAX,
  LEVEL_TOTAL
} = require('../../config/level');
const { Decimal } = require('decimal.js');
const chinaUnitNum = require('china-unit-num');

const checkMessage = async ({ text, match, talker, room, bot }) => {
  let reply = null;
  let mentionList = null;
  if (match.test.test(text)) {
    switch (match.replyType) {
      case 'text':
        if (match.callType === '经验') {
          try {
            const val = text.replace(/[,，]/g, ',');
            let [, start, end] = val.split(',');
            let s = LEVEL_MIN,
              e = LEVEL_MAX;
            if (start) {
              s = Number(start);
              s = isNaN(s) ? LEVEL_MIN : s;
              s = Math.min(Math.max(s, LEVEL_MIN), LEVEL_MAX);
            }
            if (end) {
              e = Number(end);
              e = isNaN(e) ? LEVEL_MAX : e;
              e = Math.max(Math.min(e, LEVEL_MAX), LEVEL_MIN);
            }
            if (start && end && e <= s) {
              e = e + 1;
            }
            if (start && end && s === LEVEL_MIN && e === LEVEL_MAX) {
              const lv = chinaUnitNum(LEVEL_TOTAL);
              reply = `${LEVEL_MAX}级 经验约等于：${lv}`;
            } else {
              const lvList = LEVEL.slice(s - 1, e - 1);
              const lvDecimal = lvList.reduce((prev, cur) => {
                return Decimal.add(prev, cur);
              }, new Decimal(0));
              const lv = chinaUnitNum(lvDecimal.toNumber());
              reply = `${s}-${e}级 经验约等于：${lv}`;
            }
          } catch (err) {
            reply = `(；′⌒”) 太难了，2年级都算不出来`;
          }
        } else {
          reply = match.reply;
        }
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
