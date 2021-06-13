/*
 * @Author: dengqiang
 * @Date: 2021-06-13 14:18:11
 * @LastEditTime: 2021-06-13 14:23:35
 * @LastEditors: dengqiang
 * @Description:
 */
const { TextFile } = require('./TextFile');
class JSONFile {
  constructor(filename) {
    this.adapter = new TextFile(filename);
  }
  async read() {
    const data = await this.adapter.read();
    if (data === null) {
      return null;
    } else {
      return JSON.parse(data);
    }
  }
  write(obj) {
    return this.adapter.write(JSON.stringify(obj, null, 2));
  }
}
exports.JSONFile = JSONFile;
