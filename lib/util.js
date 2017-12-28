'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = {
  removeSplitLine: removeSplitLine
};

function getValue(value) {
  var arr = value.split('|');
  if (arr.length < 2) return value;
  var maps = {
    string: arr[0],
    number: Number(arr[0]),
    boolean: arr[0] === 'true'
  };
  return maps[arr[1]] ? maps[arr[1]] : arr[0];
}

function removeSplitLine(obj) {
  if (obj === null || (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object') {
    return obj;
  }

  var temp = obj.constructor();
  for (var key in obj) {
    if (typeof obj[key] === 'string') {
      temp[key] = getValue(obj[key]);
    } else {
      temp[key] = removeSplitLine(obj[key]);
    }
  }

  return temp;
}