/*
 * @Author: dengqiang
 * @Date: 2021-06-13 09:15:52
 * @LastEditTime: 2021-06-13 18:47:17
 * @LastEditors: dengqiang
 * @Description: bot config
 */
exports.BOT_NAME = '糖果丶BOT';
exports.NOTFOUND_MATCH_MESSAGE =
  'o(╥﹏╥)o 我不明白你的意思，技能点已不足，让我再学习学习';
exports.EMPTY_MESSAGE = '⊙(・◇・)？what are you 弄啥累？';
exports.FRAUD_PREVENTION_MESSAGE =
  '================ \n ★★★ 注意防骗 ★★★ \n ================ \n 不要给陌生人账号密码，家族内有骗子请及时联系老大举报';
exports.NOTICE_MESSAGE = `《🍭 🍭  吃糖家族大家庭  🍭 🍭》\n (๑°3°๑)家族成员注意互相搞好关系.配合集体团结.和谐互助.不知道的问一问大家.感谢对糖族的支持和贡献!!! \n 家族YY164414443 \n 各位班长(自己找几个队长协助)和自己班里的糖员多熟悉一起玩.遇到集体活动组织一下大家.家族群不要随意拉人要了解的.原则上收110以上的.常在线条件可以放宽.拒绝乱发与幻想无关的任意小程序.发现影响家族团结或者是骗子的请举报开除.绝不姑息！谢谢…`;
exports.NOT_PERMISSION_MESSAGE = '( p′︵‵。) 你没有权限哦，请联系老大吧';
exports.ROOM_JOIN_MESSAGE = '✿(。◕ᴗ◕。)✿ 欢迎加入爱吃糖家族';
exports.ROOM_LEAVE_MESSAGE = '(▼ヘ▼#) 有人离家出走了，希望他们尽快回来';
exports.BOT_MESSAGE = [
  {
    test: /(你好(鸭|呀|吖|丫)?)|(好)|(hi)|(hello)/i,
    reply: '你好鸭',
    replyType: 'text',
    lv: 1
  },
  {
    test: /((你的名字)|(你是(谁|哪个|哪位|那个|那位)?)|((你叫什么)?名字)|(你叫啥))(\?)?/i,
    reply: `我叫${exports.BOT_NAME}`,
    replyType: 'text',
    lv: 1
  },
  {
    test: /公告/,
    reply: `@所有人 \n ${exports.NOTICE_MESSAGE}`,
    replyType: 'text',
    lv: 1,
    disableMentionTalker: true
  },
  {
    test: /防骗/,
    reply: exports.FRAUD_PREVENTION_MESSAGE,
    replyType: 'text',
    lv: 1,
    disableMentionTalker: true
  },
  {
    test: /欢迎/,
    reply: `${exports.ROOM_JOIN_MESSAGE} \n ================ \n ${exports.FRAUD_PREVENTION_MESSAGE} \n ================ \n ${exports.NOTICE_MESSAGE}`,
    replyType: 'text',
    lv: 1,
    disableMentionTalker: true
  },
  {
    test: /艾特/,
    reply: `你好鸭`,
    replyType: 'text',
    lv: 1,
    mentionList: ['辣手摧花。。。']
  },
  {
    test: /艾特军哥/,
    reply: `军哥来接客了~ ↑ 上宾一位 ↑`,
    replyType: 'text',
    lv: 1,
    mentionList: ['肖**']
  },
  {
    test: /艾特老大/,
    reply: `(((((((((((っ•ω•)っ Σ(σ｀•ω•´)σ 起飞！ \n 大长腿正在路上，5秒钟到达战场`,
    replyType: 'text',
    lv: 1,
    mentionList: ['香蕉不香']
  },
  {
    test: /所有班级/,
    reply: ``,
    replyType: 'clazz-management',
    lv: 1
  },
  {
    test: /班级/,
    reply: ``,
    replyType: 'clazz-management',
    lv: 1
  },
  {
    test: /[一二三四五六七八九十百千万]+班/,
    reply: ``,
    replyType: 'clazz-management',
    lv: 1
  },
  {
    test: /我在几班/,
    reply: ``,
    replyType: 'clazz-management',
    lv: 1
  },
  {
    test: /添加班级/,
    reply: ``,
    replyType: 'clazz-management',
    lv: 1,
    permission: ['香蕉不香', '辣手摧花。。。']
  },
  {
    test: /删除班级/,
    reply: ``,
    replyType: 'clazz-management',
    lv: 1,
    permission: ['香蕉不香', '辣手摧花。。。']
  },
  {
    test: /加入班级/,
    reply: ``,
    replyType: 'clazz-management',
    lv: 1,
    permission: ['香蕉不香', '辣手摧花。。。']
  },
  {
    test: /退出班级/,
    reply: ``,
    replyType: 'clazz-management',
    lv: 1,
    permission: ['香蕉不香', '辣手摧花。。。']
  },
  {
    test: /设置班长/,
    reply: ``,
    replyType: 'clazz-management',
    lv: 1,
    permission: ['香蕉不香', '辣手摧花。。。']
  }
  // {
  //   test: /图片/,
  //   reply: `https://www.baidu.com/img/flexible/logo/pc/result.png`,
  //   replyType: 'file',
  //   lv: 1
  // }
];
