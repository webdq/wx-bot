/*
 * @Author: dengqiang
 * @Date: 2021-06-07 11:37:41
 * @LastEditTime: 2021-06-07 12:14:57
 * @LastEditors: dengqiang
 * @Description: on-room-join
 */

async function onRoomJoin(room, inviteeList, inviter) {
  const nameList = inviteeList.map((c) => c.name()).join(',');
  console.log(
    `Room ${room.topic()} got new member ${nameList}, invited by ${inviter}`
  );
}

module.exports = onRoomJoin;
