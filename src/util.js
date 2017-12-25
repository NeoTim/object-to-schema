'use strict';

module.exports = {
  removeSplitLine,
};

function getValue(value) {
  const arr = value.split('|');
  if (arr.length < 2) return value;
  const maps = {
    string: arr[0],
    number: Number(arr[0]),
    boolean: arr[0] === 'true',
  };
  return maps[arr[1]] ? maps[arr[1]] : arr[0];
}

function removeSplitLine(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  const temp = obj.constructor();
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      temp[key] = getValue(obj[key]);
    } else {
      temp[key] = removeSplitLine(obj[key]);
    }
  }

  return temp;
}
