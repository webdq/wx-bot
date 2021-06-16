/*
 * @Author: dengqiang
 * @Date: 2021-06-14 20:52:57
 * @LastEditTime: 2021-06-16 20:49:09
 * @LastEditors: dengqiang
 * @Description: replyGameMessage
 */
const request = require('../../api/tianapi');
const { responseCode } = require('../../config/tianapi');
const {
  REQUEST_MAX_COUNT_MESSAGE,
  REQUEST_FAILED_MESSAGE,
  REQUEST_ERROR_MESSAGE,
  GAME_TIME_DOWN
} = require('../../config/bot');
const db = require('../../db');
const { maxRequestCount } = require('../../config/tianapi');
const moment = require('moment');

let gamePaylod = {};
let gameTimer = null;

const gameTimeDown = ({ sendMessage, room }) => {
  gameTimer = setTimeout(async () => {
    global.isGameOpen = false;
    global.isGameOngoing = false;
    clearTimeout(gameTimer);
    await sendMessage({
      room,
      reply: `╮(╯﹏╰）╭  时间到了，答案是：${gamePaylod.answer}`
    });
  }, GAME_TIME_DOWN * 1000);
};

const clearGame = () => {
  global.isGameOpen = false;
  global.isGameOngoing = false;
  clearTimeout(gameTimer);
};

const checkAnswer = (text) => {
  return gamePaylod.answer === text;
};

const replyGameMessage = async ({
  gameType,
  sendMessage,
  text,
  talker,
  room,
  bot
}) => {
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
      let { code, newslist } = await request[gameType]();
      if (responseCode[code]) {
        reply = REQUEST_FAILED_MESSAGE;
        console.log(responseCode[code]);
      } else {
        let { quest, answer } = newslist[0];
        global.isGameOngoing = true;
        gamePaylod = {
          type: gameType,
          quest,
          answer
        };
        const answerTem = answer[0] + ''.padStart(answer.length - 1, '*');
        reply = `${quest} \n 提示:( ${answerTem} )，倒计时${GAME_TIME_DOWN}秒...`;

        dbData.tianapi[gameType].requestDate = requestDate;
        dbData.tianapi[gameType].requestCount += 1;
        await db.write(dbData);

        gameTimeDown({ sendMessage, room });
        console.log(gamePaylod);
      }
    } catch (err) {
      reply = REQUEST_ERROR_MESSAGE;
      console.log('replyGameMessage err: ', err);
    }

    return { reply, mentionList };
  }
};

exports.replyGameMessage = replyGameMessage;
exports.clearGame = clearGame;
exports.checkAnswer = checkAnswer;
