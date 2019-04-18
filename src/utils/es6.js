if (!Array.prototype.includes) {
  Array.prototype.includes = function (searchElement, fromIndex) {
    if (this === null) {
      throw new TypeError('"this" is null or not defined');
    }
    let that = Object(this), len = that.length >>> 0, param = arguments, index = fromIndex | 0;

    if (len === 0) { return false; }

    startIndex = Math.max(index >= 0 ? index : len - Math.abs(index), 0);

    while (startIndex < len) {
      if (String(that[startIndex]) === String(param[0])) return true;
      startIndex++
    }
    return false;
  }
}
