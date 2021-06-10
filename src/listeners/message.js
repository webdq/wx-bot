/*
 * @Author: dengqiang
 * @Date: 2021-06-07 11:34:51
 * @LastEditTime: 2021-06-08 23:56:42
 * @LastEditors: dengqiang
 * @Description: on-message
 */

async function onMessage(msg) {
  const from = msg.from();
  const to = msg.to();
  const room = msg.room();
  const text = msg.text();
  console.log(from, to, room, text);
  console.log(`message ${msg} received`);
}

module.exports = onMessage;
