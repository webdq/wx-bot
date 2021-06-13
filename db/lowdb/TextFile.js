/*
 * @Author: dengqiang
 * @Date: 2021-06-13 14:22:12
 * @LastEditTime: 2021-06-13 14:30:17
 * @LastEditors: dengqiang
 * @Description:
 */
const fs = require('fs');
const { Writer } = require('./steno');
class TextFile {
  constructor(filename) {
    this.filename = filename;
    this.writer = new Writer(filename);
  }
  async read() {
    let data;
    try {
      data = await fs.promises.readFile(this.filename, 'utf-8');
    } catch (e) {
      if (e.code === 'ENOENT') {
        return null;
      }
      throw e;
    }
    return data;
  }
  write(str) {
    return this.writer.write(str);
  }
}
exports.TextFile = TextFile;
