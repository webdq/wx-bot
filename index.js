/*
 * @Author: dengqiang
 * @Date: 2021-06-08 19:50:21
 * @LastEditTime: 2021-06-10 19:43:58
 * @LastEditors: dengqiang
 * @Description: index
 */
const bot = require('./src/bot');

async function main() {
  await bot.start();
}

main();
