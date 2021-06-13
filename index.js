/*
 * @Author: dengqiang
 * @Date: 2021-06-08 19:50:21
 * @LastEditTime: 2021-06-11 00:13:09
 * @LastEditors: dengqiang
 * @Description: index
 */
const bot = require('./src/bot');

async function main() {
  try {
    await bot.start();
  } catch (err) {
    console.log(err);
  }
}

main();
