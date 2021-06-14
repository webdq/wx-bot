/*
 * @Author: dengqiang
 * @Date: 2021-06-14 10:11:14
 * @LastEditTime: 2021-06-15 01:07:24
 * @LastEditors: dengqiang
 * @Description: replyRobotMessage
 */
const request = require('../../api/index');
const { responseCode, maxRequestCount } = require('../../config/tianapi');
const {
  REQUEST_FAILED_MESSAGE,
  REQUEST_ERROR_MESSAGE
} = require('../../config/bot');
const urlencode = require('urlencode');
const { FileBox } = require('file-box');
const db = require('../../db');
const moment = require('moment');

const replyRobotMessage = async ({ gameType, text, talker, room, bot }) => {
  const dbData = await db.read();
  let { requestDate, requestCount } = dbData.tianapi[gameType];
  let today = moment().format('YYYY-MM-DD');
  requestDate = requestDate || today;

  if (requestDate < today) {
    dbData.tianapi[gameType].requestDate = today;
    dbData.tianapi[gameType].requestCount = 0;
  }

  if (requestDate === today && requestCount > maxRequestCount) {
    return { reply: REQUEST_MAX_COUNT_MESSAGE, mentionList: null };
  } else {
    let reply = '';
    let mentionList = null;
    try {
      let { code, newslist } = await request[gameType]({
        question: urlencode(text),
        mode: 1
      });
      if (responseCode[code]) {
        reply = REQUEST_FAILED_MESSAGE;
        console.log(responseCode[code]);
      } else {
        let { datatype, reply: replyMessage } = newslist[0];
        if (datatype === 'text') {
          reply = replyMessage;
        } else if (datatype === 'view') {
          reply = replyMessage.map((item) => item.title).join('\n');
        } else if (datatype === 'image') {
          reply = FileBox.fromUrl(replyMessage);
        }

        dbData.tianapi[gameType].requestDate = requestDate;
        dbData.tianapi[gameType].requestCount += 1;
        await db.write(dbData);
      }
    } catch (err) {
      reply = REQUEST_ERROR_MESSAGE;
      console.log('replyRobotMessage err: ', err);
    }
    return { reply, mentionList };
  }
};

exports.replyRobotMessage = replyRobotMessage;
