/*
 * @Author: dengqiang
 * @Date: 2021-06-13 09:15:52
 * @LastEditTime: 2021-06-19 00:17:32
 * @LastEditors: dengqiang
 * @Description: bot config
 */
exports.BOT_NAME = '糖果丶BOT';
exports.NOTFOUND_MATCH_MESSAGE =
  'o(╥﹏╥)o 我不明白你的意思，技能点已不足，让我再学习学习';
exports.EMPTY_MESSAGE = '⊙(・◇・)？what are you 弄啥累？';
exports.FRAUD_PREVENTION_MESSAGE =
  '================ \n ★★★ 注意防骗 ★★★ \n ================ \n 不要给陌生人账号密码，家族内有骗子请及时联系老大举报';
exports.NOTICE_MESSAGE = `《🍭 🍭  吃糖家族大家庭  🍭 🍭》
(๑°3°๑)家族成员注意互相搞好关系.配合集体团结.和谐互助.不知道的问一问大家.感谢对糖族的支持和贡献!!! 
---------------- 
家族YY164414443 
---------------- 
各位班长(自己找几个队长协助)和自己班里的糖员多熟悉一起玩.遇到集体活动组织一下大家.
家族群不要随意拉人要了解的.原则上收110以上的.常在线条件可以放宽.
拒绝乱发与幻想无关的任意小程序.
发现影响家族团结或者是骗子的请举报开除.绝不姑息！谢谢…`;
exports.NOT_PERMISSION_MESSAGE = '( p′︵‵。) 你没有权限哦，请联系老大吧';
exports.ROOM_JOIN_MESSAGE = '✿(。◕ᴗ◕。)✿ 欢迎加入爱吃糖家族 \n';
exports.ROOM_LEAVE_MESSAGE = '(▼ヘ▼#) 有人离家出走了，希望他们尽快回来';
exports.HELP_MESSAGE = `================ \n ★★★ 帮助 ★★★ \n ================
艾特我并发送关键字就可以得到回复。
--------------------------------
【常用关键字】
关键字：公告、防骗、欢迎、艾特军哥
关键字：SS技能、ZS技能、JK技能、CK技能、YS技能
关键字：经验，1，150  说明：计算等级经验值使用逗号分隔等级范围
关键字：升级  说明：推荐升级地点
--------------------------------
【班级相关】
关键字：班级  说明：班级简略信息
关键字：所有班级  说明：班级详细信息
关键字：我在几班  说明：查询所在班级
--------------------------------
【游戏相关】 糖果谜语、糖果猜谜语
--------------------------------
【商人相关】 贝贝、李彬、明后、靓号之王、鸣哥、太子商务、张家港的小白、真能扯沃德天、至若初见、子哥`;
exports.CLAZZ_HELP_MESSAGE = `================ \n ★★★ 班级帮助 ★★★ \n ================
★ 以下关键字之间必须用逗号并且需要权限 ★ 
---------------- 
关键字：添加班级，班级名 
说明：添加一个新班级 
---------------- 
关键字：删除班级，班级名 
说明：删除一个班级 
---------------- 
关键字：加入班级，班级名，玩家名 
说明：把一个玩家加入到班级里 
---------------- 
关键字：退出班级，班级名，玩家名 
说明：把一个玩家加入到班级里 
---------------- 
关键字：设置班长，班级名，玩家名 
说明：把一个玩家设置成班长，如果没有玩家名该班级会去掉班长`;
exports.REQUEST_ERROR_MESSAGE = `!!!∑(ﾟДﾟノ)ノ 请求错误了，请联系管理员`;
exports.REQUEST_FAILED_MESSAGE = `!!!∑(ﾟДﾟノ)ノ 请求失败了，请联系管理员`;
exports.GAME_TIME_DOWN = 60; // 60S
exports.REQUEST_MAX_COUNT_MESSAGE = `…(﹂_﹂)… 我太累了，明天再找我玩吧`;
exports.UPDATE_MESSAGE = `(oﾟ▽ﾟ)o 更新完成，新功能计算经验值和升级地点，试试我说新指令：
指令：经验，1，150  说明：使用逗号分隔等级范围
指令：升级  说明：推荐升级地点`;
exports.BOT_MESSAGE = [
  {
    test: /^更新$/i,
    reply: exports.UPDATE_MESSAGE,
    replyType: 'text',
    lv: 1
  },
  {
    test: /^(帮助|查询|功能)$/i,
    reply: exports.HELP_MESSAGE,
    replyType: 'text',
    lv: 1
  },
  {
    test: /^班级帮助$/i,
    reply: exports.CLAZZ_HELP_MESSAGE,
    replyType: 'text',
    lv: 1
  },
  {
    test: /(你好(鸭|呀|吖|丫)?)|(好)|(hi)|(hello)/i,
    reply: '你好鸭',
    replyType: 'text',
    lv: 1
  },
  {
    test: /((你的名字)|(你是(谁|哪个|哪位|那个|那位|啥|什么)?)|((你叫什么)?名字)|(你叫啥))(\?)?/i,
    reply: `我叫${exports.BOT_NAME}`,
    replyType: 'text',
    lv: 1
  },
  {
    test: /^公告$/,
    reply: `@所有人 \n ${exports.NOTICE_MESSAGE}`,
    replyType: 'text',
    lv: 1
  },
  {
    test: /^防骗$/,
    reply: exports.FRAUD_PREVENTION_MESSAGE,
    replyType: 'text',
    lv: 1
  },
  {
    test: /^欢迎$/,
    reply: `${exports.ROOM_JOIN_MESSAGE} \n ${exports.FRAUD_PREVENTION_MESSAGE} \n ================ \n ${exports.NOTICE_MESSAGE}`,
    replyType: 'text',
    lv: 1
  },
  {
    test: /^艾特军哥$/,
    reply: `军哥来接客了~ ↑ 上宾一位 ↑`,
    replyType: 'text',
    lv: 1,
    mentionList: ['肖**']
  },
  {
    test: /^艾特(老大|猫猫|小猫猫|小猫猫爱吃糖|小白兔爱吃糖)$/,
    reply: `(((((((((((っ•ω•)っ Σ(σ｀•ω•´)σ 起飞！ \n 大长腿正在路上，5秒钟到达战场`,
    replyType: 'text',
    lv: 1,
    mentionList: ['香蕉不香']
  },
  {
    test: /^我通过了你的朋友验证请求/,
    reply: `你好鸭`,
    replyType: 'text',
    lv: 1
  },
  {
    test: /^升级$/,
    reply: `60-66级：无泪盆地
    66-70级：幻幽平原一
    70-74级：幻幽平原二
    74-78级：幻幽平原三
    78-89级：心岛
    89-95级：空灵平原四
    95-102级：镜穴四
    102-105级：云荒一
    105-115级：云荒六
    115-124级：奴奴火山一
    125-135级：流花径
    135-141级：悲羽山
    141-150级：永恒之地，巨木树窟`,
    replyType: 'text',
    lv: 1
  },
  {
    test: /经验([,，]\d+){0,2}/,
    reply: ``,
    replyType: 'text',
    lv: 1,
    callType: '经验'
  },
  // 班级管理
  {
    test: /^所有班级$/,
    reply: ``,
    replyType: 'clazz-management',
    lv: 1
  },
  {
    test: /^班级$/,
    reply: ``,
    replyType: 'clazz-management',
    lv: 1
  },
  {
    test: /^[一二三四五六七八九十百千万]+班$/,
    reply: ``,
    replyType: 'clazz-management',
    lv: 1
  },
  {
    test: /^我在几班$/,
    reply: ``,
    replyType: 'clazz-management',
    lv: 1
  },
  {
    test: /^添加班级$/,
    reply: ``,
    replyType: 'clazz-management',
    lv: 1,
    permission: ['香蕉不香', '辣手摧花。。。', '不帅不温柔']
  },
  {
    test: /^删除班级$/,
    reply: ``,
    replyType: 'clazz-management',
    lv: 1,
    permission: ['香蕉不香', '辣手摧花。。。', '不帅不温柔']
  },
  {
    test: /^加入班级$/,
    reply: ``,
    replyType: 'clazz-management',
    lv: 1,
    permission: ['香蕉不香', '辣手摧花。。。', '不帅不温柔']
  },
  {
    test: /^退出班级$/,
    reply: ``,
    replyType: 'clazz-management',
    lv: 1,
    permission: ['香蕉不香', '辣手摧花。。。', '不帅不温柔']
  },
  {
    test: /^设置班长$/,
    reply: ``,
    replyType: 'clazz-management',
    lv: 1,
    permission: ['香蕉不香', '辣手摧花。。。', '不帅不温柔']
  },
  // 技能书
  {
    test: /^(SS|术士|法师)(书|刷书|技能|技能点|技能书)$/i,
    reply: `https://qqfo.webdqd.com/public/book/book-ss.jpg`,
    replyType: 'file',
    lv: 1
  },
  {
    test: /^(ZS|战士)(书|刷书|技能|技能点|技能书)$/i,
    reply: `https://qqfo.webdqd.com/public/book/book-zs.jpg`,
    replyType: 'file',
    lv: 1
  },
  {
    test: /^(JK|剑客)(书|刷书|技能|技能点|技能书)$/i,
    reply: `https://qqfo.webdqd.com/public/book/book-jk.jpg`,
    replyType: 'file',
    lv: 1
  },
  {
    test: /^(CK|刺客)(书|刷书|技能|技能点|技能书)$/i,
    reply: `https://qqfo.webdqd.com/public/book/book-ck.jpg`,
    replyType: 'file',
    lv: 1
  },
  {
    test: /^(YS|药师)(书|刷书|技能|技能点|技能书)$/i,
    reply: `https://qqfo.webdqd.com/public/book/book-ys.jpg`,
    replyType: 'file',
    lv: 1
  },
  // 商人
  {
    test: /^贝贝$/,
    reply: `https://qqfo.webdqd.com/public/businessman/%E8%B4%9D%E8%B4%9D.jpg`,
    replyType: 'file',
    lv: 1
  },
  {
    test: /^李彬$/,
    reply: `https://qqfo.webdqd.com/public/businessman/%E4%B8%8D%E8%B4%A5%E7%A5%9E%E8%AF%9D%E6%9D%8E%E5%BD%AC.jpg`,
    replyType: 'file',
    lv: 1
  },
  {
    test: /^明后$/,
    reply: `https://qqfo.webdqd.com/public/businessman/%E6%96%97%E9%B1%BC%E6%98%8E%E5%90%8E.jpg`,
    replyType: 'file',
    lv: 1
  },
  {
    test: /^靓号之王$/,
    reply: `https://qqfo.webdqd.com/public/businessman/%E9%9D%93%E5%8F%B7%E4%B9%8B%E7%8E%8B.jpg`,
    replyType: 'file',
    lv: 1
  },
  {
    test: /^鸣哥$/,
    reply: `https://qqfo.webdqd.com/public/businessman/%E9%B8%A3%E5%93%A5.jpg`,
    replyType: 'file',
    lv: 1
  },
  {
    test: /^(太子商务|太子)$/,
    reply: `https://qqfo.webdqd.com/public/businessman/%E5%A4%AA%E5%AD%90%E5%95%86%E5%8A%A1.jpg`,
    replyType: 'file',
    lv: 1
  },
  {
    test: /^(张家港的小白|小白)$/,
    reply: `https://qqfo.webdqd.com/public/businessman/%E5%BC%A0%E5%AE%B6%E6%B8%AF%E7%9A%84%E5%B0%8F%E7%99%BD.jpg`,
    replyType: 'file',
    lv: 1
  },
  {
    test: /^真能扯沃德天$/,
    reply: `https://qqfo.webdqd.com/public/businessman/%E7%9C%9F%E8%83%BD%E6%89%AF%E6%B2%83%E5%BE%B7%E5%A4%A9.jpg`,
    replyType: 'file',
    lv: 1
  },
  {
    test: /^至若初见$/,
    reply: `https://qqfo.webdqd.com/public/businessman/%E8%87%B3%E8%8B%A5%E5%88%9D%E8%A7%81.jpg`,
    replyType: 'file',
    lv: 1
  },
  {
    test: /^子哥$/,
    reply: `https://qqfo.webdqd.com/public/businessman/%E5%AD%90%E5%93%A5.jpg`,
    replyType: 'file',
    lv: 1
  }
];
exports.BOT_GAME_MESSAGE = [
  {
    test: /^糖果(猜谜|谜语|猜谜语)$/,
    reply: `猜谜语游戏开始`,
    replyType: 'text',
    lv: 1,
    isGame: true,
    gameType: 'riddle'
  }
];
