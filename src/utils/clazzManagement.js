/*
 * @Author: dengqiang
 * @Date: 2021-06-13 16:25:42
 * @LastEditTime: 2021-06-13 17:56:14
 * @LastEditors: dengqiang
 * @Description: clazz
 */
const { mentionText } = require('./mentionText');
const db = require('../../db');
const {
  NOT_PERMISSION_MESSAGE,
  NOTFOUND_MATCH_MESSAGE
} = require('../../config/bot');

const clazzManagement = async ({ text, match, talker, room }) => {
  const isPermission = (match.permission || []).includes(talker.name());
  let content = mentionText(text);
  let [action = '', clazzName = '', playerName = ''] = content
    .replace(/\,|\，/g, ',')
    .split(',');
  let result = '';

  if (/[一二三四五六七八九十百千万]+班/.test(action)) {
    result = await clazzFind({ text });
    return result;
  }

  switch (action) {
    case '所有班级':
      result = await clazzListAll();
      break;
    case '班级':
      result = await clazzList();
      break;
    case '我在几班':
      result = await clazzQuery({ talker, room });
      break;
    case '添加班级':
      if (isPermission) {
        result = await clazzAdd({ clazzName });
      } else {
        result = NOT_PERMISSION_MESSAGE;
      }
      break;
    case '删除班级':
      if (isPermission) {
        result = await clazzRemove({ clazzName });
      } else {
        result = NOT_PERMISSION_MESSAGE;
      }
      break;
    case '加入班级':
      if (isPermission) {
        result = await clazzJoin({ clazzName, playerName });
      } else {
        result = NOT_PERMISSION_MESSAGE;
      }
      break;
    case '退出班级':
      if (isPermission) {
        result = await clazzLeave({ clazzName, playerName });
      } else {
        result = NOT_PERMISSION_MESSAGE;
      }
      break;
    case '设置班长':
      if (isPermission) {
        result = await clazzLeader({ clazzName, playerName });
      } else {
        result = NOT_PERMISSION_MESSAGE;
      }
      break;
    default:
      result = NOTFOUND_MATCH_MESSAGE;
  }
  return result;
};

// 查询单个班级信息
const clazzFind = async ({ text }) => {
  const dbData = await db.read();
  const clazz = dbData.clazz.find((item) => item.name === text);
  let result = '';
  if (clazz) {
    result = [clazz]
      .map((item) => {
        const player = item.player.join('\n');
        return `【 ${item.name} 】 班长: ${item.leader} \n ${player}`;
      })
      .join(`\n ================ \n `);
  } else {
    result = '班级不存在';
  }
  return result;
};

// 班级简略信息
const clazzList = async () => {
  const dbData = await db.read();
  return dbData.clazz
    .map((item) => {
      return `【 ${item.name} 】 班长: ${item.leader}`;
    })
    .join(`\n ================ \n `);
};

// 班级详细信息
const clazzListAll = async () => {
  const dbData = await db.read();
  dbData.clazz
    .map((item) => {
      const player = item.player.join('\n');
      return `【 ${item.name} 】 班长: ${item.leader} \n ${player}`;
    })
    .join(`\n ================ \n `);
};

// 我在几班
const clazzQuery = async ({ talker, room }) => {
  let playerName = talker.name();
  if (room) {
    const alias = await room.alias(talker);
    if (alias) playerName = alias;
  }

  const dbData = await db.read();
  const clazz = dbData.clazz.find((item) => {
    return item.player.find((name) => name === playerName);
  });
  if (clazz) {
    return `${playerName}，你在【${clazz.name}】`;
  } else {
    return `(●—●) 你没有加入班级哦`;
  }
};

// 添加班级
const clazzAdd = async ({ clazzName }) => {
  const dbData = await db.read();
  let result = '';
  if (clazzName === '') {
    result = '班级名称不能为空';
  } else {
    dbData.clazz.push({ name: clazzName, leader: '', player: [] });
    try {
      await db.write(dbData);
      result = `${clazzName} 添加成功`;
    } catch (err) {
      result = `${clazzName} 添加失败`;
    }
  }
  return result;
};

// 删除班级
const clazzRemove = async ({ clazzName }) => {
  const dbData = await db.read();
  let result = '';
  if (clazzName === '') {
    result = '班级名称不能为空';
  } else {
    dbData.clazz = dbData.clazz.filter((item) => item.name !== clazzName);
    try {
      await db.write(dbData);
      result = `${clazzName} 删除成功`;
    } catch (err) {
      result = `${clazzName} 删除失败`;
    }
  }
  return result;
};

// 加入班级
const clazzJoin = async ({ clazzName, playerName }) => {
  const dbData = await db.read();
  let result = '';
  if (clazzName === '') {
    result = '班级名称不能为空';
  } else if (playerName === '') {
    result = '玩家名称不能为空';
  } else {
    const clazz = dbData.clazz.find((item) => item.name === clazzName);
    if (clazz) {
      clazz.player.push(playerName);
      try {
        await db.write(dbData);
        result = `${clazzName} : ${playerName} 加入成功`;
      } catch (err) {
        result = `${clazzName} : ${playerName} 加入失败`;
      }
    } else {
      result = '班级不存在';
    }
  }
  return result;
};

// 退出班级
const clazzLeave = async ({ clazzName, playerName }) => {
  const dbData = await db.read();
  let result = '';
  if (clazzName === '') {
    result = '班级名称不能为空';
  } else if (playerName === '') {
    result = '玩家名称不能为空';
  } else {
    const clazz = dbData.clazz.find((item) => item.name === clazzName);
    if (clazz) {
      clazz.player = clazz.player.filter((item) => item !== playerName);
      try {
        await db.write(dbData);
        result = `${clazzName} : ${playerName} 退出成功`;
      } catch (err) {
        result = `${clazzName} : ${playerName} 退出失败`;
      }
    } else {
      result = '班级不存在';
    }
  }
  return result;
};

// 设置班长
const clazzLeader = async ({ clazzName, playerName }) => {
  const dbData = await db.read();
  let result = '';
  if (clazzName === '') {
    result = '班级名称不能为空';
  } else {
    const clazz = dbData.clazz.find((item) => item.name === clazzName);
    if (clazz) {
      clazz.leader = playerName;
      try {
        await db.write(dbData);
        result = `${clazzName} : ${playerName} 设置班长成功`;
      } catch (err) {
        result = `${clazzName} : ${playerName} 设置班长失败`;
      }
    } else {
      result = '班级不存在';
    }
  }
  return result;
};

exports.clazzManagement = clazzManagement;
