/*
 * @Author: dengqiang
 * @Date: 2021-06-13 14:19:50
 * @LastEditTime: 2021-06-13 14:20:57
 * @LastEditors: dengqiang
 * @Description:
 */
class MissingAdapterError extends Error {
  constructor() {
    super();
    this.message = 'Missing Adapter';
  }
}
exports.MissingAdapterError = MissingAdapterError;
