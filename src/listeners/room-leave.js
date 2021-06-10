/*
 * @Author: dengqiang
 * @Date: 2021-06-07 12:01:55
 * @LastEditTime: 2021-06-07 12:15:50
 * @LastEditors: dengqiang
 * @Description: on-room-leave
 */

async function onRoomLeave(room, leaverList) {
  const nameList = leaverList.map((c) => c.name()).join(',');
  console.log(`Room ${room.topic()} lost member ${nameList}`);
}

module.exports = onRoomLeave;
