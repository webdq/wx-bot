/*
 * @Author: dengqiang
 * @Date: 2021-06-13 14:18:28
 * @LastEditTime: 2021-06-13 14:46:13
 * @LastEditors: dengqiang
 * @Description:
 */
const { MissingAdapterError } = require('./MissingAdapterError');
class Low {
  constructor(adapter) {
    this.data = null;
    if (adapter) {
      this.adapter = adapter;
    } else {
      throw new MissingAdapterError();
    }
  }
  async read() {
    this.data = await this.adapter.read();
    return this.data;
  }
  async write(data) {
    // if (this.data) {
    //   await this.adapter.write(this.data);
    // }
    await this.adapter.write(data);
  }
}
exports.Low = Low;
