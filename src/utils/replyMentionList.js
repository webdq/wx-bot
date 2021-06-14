/*
 * @Author: dengqiang
 * @Date: 2021-06-13 16:31:06
 * @LastEditTime: 2021-06-14 10:03:07
 * @LastEditors: dengqiang
 * @Description: replyMentionList
 */
const replyMentionList = async ({ match, room, talker }) => {
  let mention = [];
  if (match.mentionAll && room) {
    const memberAll = await room.memberAll();
    mention = memberAll.filter((item) => item.name() !== BOT_NAME);
  } else if (room) {
    const memberList =
      (match.mentionList &&
        match.mentionList.map((name) => room.member({ name }))) ||
      [];
    const contactList = (await Promise.all(memberList))
      .filter(Boolean)
      .filter((item) => item.name() !== talker.name());
    if (match.enableMentionTalker) contactList.push(talker);
    mention = contactList;
  }
  return mention;
};

exports.replyMentionList = replyMentionList;
