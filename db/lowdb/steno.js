/*
 * @Author: dengqiang
 * @Date: 2021-06-13 14:29:20
 * @LastEditTime: 2021-06-13 14:29:56
 * @LastEditors: dengqiang
 * @Description:
 */
const fs = require('fs');
const path = require('path');
// Returns a temporary file
// Example: for /some/file will return /some/.file.tmp
function getTempFilename(file) {
  return path.join(path.dirname(file), '.' + path.basename(file) + '.tmp');
}
class Writer {
  constructor(filename) {
    Object.defineProperty(this, 'filename', {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, 'tempFilename', {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, 'locked', {
      enumerable: true,
      configurable: true,
      writable: true,
      value: false
    });
    Object.defineProperty(this, 'prev', {
      enumerable: true,
      configurable: true,
      writable: true,
      value: null
    });
    Object.defineProperty(this, 'next', {
      enumerable: true,
      configurable: true,
      writable: true,
      value: null
    });
    Object.defineProperty(this, 'nextPromise', {
      enumerable: true,
      configurable: true,
      writable: true,
      value: null
    });
    Object.defineProperty(this, 'nextData', {
      enumerable: true,
      configurable: true,
      writable: true,
      value: null
    });
    this.filename = filename;
    this.tempFilename = getTempFilename(filename);
  }
  // File is locked, add data for later
  _add(data) {
    // Only keep most recent data
    this.nextData = data;
    // Create a singleton promise to resolve all next promises once next data is written
    this.nextPromise ||
      (this.nextPromise = new Promise((resolve, reject) => {
        this.next = [resolve, reject];
      }));
    // Return a promise that will resolve at the same time as next promise
    return new Promise((resolve, reject) => {
      var _a;
      (_a = this.nextPromise) === null || _a === void 0
        ? void 0
        : _a.then(resolve).catch(reject);
    });
  }
  // File isn't locked, write data
  async _write(data) {
    var _a, _b;
    // Lock file
    this.locked = true;
    try {
      // Atomic write
      await fs.promises.writeFile(this.tempFilename, data, 'utf-8');
      await fs.promises.rename(this.tempFilename, this.filename);
      // Call resolve
      (_a = this.prev) === null || _a === void 0 ? void 0 : _a[0]();
    } catch (err) {
      // Call reject
      (_b = this.prev) === null || _b === void 0 ? void 0 : _b[1](err);
      throw err;
    } finally {
      // Unlock file
      this.locked = false;
      this.prev = this.next;
      this.next = this.nextPromise = null;
      if (this.nextData !== null) {
        const nextData = this.nextData;
        this.nextData = null;
        await this.write(nextData);
      }
    }
  }
  async write(data) {
    return this.locked ? this._add(data) : this._write(data);
  }
}
exports.Writer = Writer;
