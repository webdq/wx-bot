/*
 * @Author: dengqiang
 * @Date: 2021-06-07 11:58:55
 * @LastEditTime: 2021-06-07 12:16:25
 * @LastEditors: dengqiang
 * @Description: on-room-topic
 */

async function onRoomTopic(room, topic, oldTopic, changer) {
  console.log(
    `Room ${room.topic()} topic changed from ${oldTopic} to ${topic} by ${changer.name()}`
  );
}

module.exports = onRoomTopic;
