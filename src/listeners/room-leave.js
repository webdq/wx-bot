/*
 * @Author: dengqiang
 * @Date: 2021-06-07 12:01:55
 * @LastEditTime: 2021-06-13 18:20:05
 * @LastEditors: dengqiang
 * @Description: on-room-leave
 */
// const { ROOM_LEAVE_MESSAGE } = require('../../config/bot');

async function onRoomLeave(room, leaverList) {
  // const nameList = leaverList.map((c) => c.name()).join(',');
  // const msg = `${ROOM_LEAVE_MESSAGE} \n -------- \n ${nameList}`;
  // await room.say(msg);
  console.log(`Room ${room.topic()} lost member ${nameList}`);
}

module.exports = onRoomLeave;
