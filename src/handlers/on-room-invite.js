/*
 * @Author: dengqiang
 * @Date: 2021-06-07 12:04:41
 * @LastEditTime: 2021-06-07 12:17:09
 * @LastEditors: dengqiang
 * @Description: on-room-invite
 */

async function onRoomInvite(roomInvitation) {
  try {
    console.log(`received room-invite event.`);
    await roomInvitation.accept();
  } catch (e) {
    console.error(e);
  }
}

module.exports = onRoomInvite;
