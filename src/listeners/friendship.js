/*
 * @Author: dengqiang
 * @Date: 2021-06-07 11:36:35
 * @LastEditTime: 2021-06-08 23:58:34
 * @LastEditors: dengqiang
 * @Description: on-friend
 */
const { Friendship } = require('wechaty');

async function onFriendship(friendship) {
  if (friendship.type() === Friendship.Type.Receive) {
    // 1. receive new friendship request from new contact
    const contact = friendship.contact();
    let result = await friendship.accept();
    if (result) {
      console.log(`Request from ${contact.name()} is accept successfully!`);
    } else {
      console.log(`Request from ${contact.name()} failed to accept!`);
    }
  } else if (friendship.type() === Friendship.Type.Confirm) {
    // 2. confirm friendship
    console.log(`new friendship confirmed with ${contact.name()}`);
  }
}

module.exports = onFriendship;
