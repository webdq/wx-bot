/*
 * @Author: dengqiang
 * @Date: 2021-06-07 11:37:41
 * @LastEditTime: 2021-06-13 18:20:15
 * @LastEditors: dengqiang
 * @Description: on-room-join
 */
// const {
//   ROOM_JOIN_MESSAGE,
//   FRAUD_PREVENTION_MESSAGE
// } = require('../../config/bot');

async function onRoomJoin(room, inviteeList, inviter) {
  // const nameList = inviteeList.map((c) => c.name()).join(',');
  // const msg = `${ROOM_JOIN_MESSAGE} \n -------- \n ${FRAUD_PREVENTION_MESSAGE}`;
  // await room.say(msg, ...inviteeList);
  console.log(
    `Room ${room.topic()} got new member ${nameList}, invited by ${inviter}`
  );
}

module.exports = onRoomJoin;
