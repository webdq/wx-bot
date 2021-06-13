/*
 * @Author: dengqiang
 * @Date: 2021-06-13 13:25:17
 * @LastEditTime: 2021-06-13 14:40:58
 * @LastEditors: dengqiang
 * @Description: db
 */
const path = require('path');
const { Low, JSONFile } = require('./lowdb');

// Use JSON file for storage
const file = path.join(__dirname, 'data.json');
const adapter = new JSONFile(file);
const db = new Low(adapter);

module.exports = db;
