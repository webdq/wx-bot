/*
 * @Author: dengqiang
 * @Date: 2021-06-07 11:41:20
 * @LastEditTime: 2021-06-07 11:43:32
 * @LastEditors: dengqiang
 * @Description: on-scan
 */
const Qrterminal = require('qrcode-terminal');

async function onScan(qrcode, status) {
  Qrterminal.generate(qrcode);
  console.info(`${qrcode}\n[${status}] Scan QR Code in above url to login: `);
}

module.exports = onScan;
