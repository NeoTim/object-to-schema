'use strict';
/**
 * JS Object to JSON Schema
 */

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _ = require('lodash');

module.exports = jts;

var rules = [[_.isNull, function (value) {
  return { type: 'null', value: value };
}], [_.isNumber, function (value) {
  return { type: 'number', default: value };
}], [_.isBoolean, function (value) {
  return { type: 'boolean', default: value };
}], [_.isString, function (value) {
  return { type: 'string', default: value };
}], [_.isRegExp, function (pattern) {
  return { type: 'string', pattern: pattern };
}],

// Empty array -> array of any items
[function (data) {
  return _.isArray(data) && !data.length;
}, function () {
  return { type: 'array' };
}], [_.isArray, function (items) {
  return { type: 'array', items: jts(items[0]) };
}], [_.isPlainObject, function (object) {
  return {
    type: 'object',
    required: _.keys(object),
    properties: _.mapValues(object, jts)
  };
}]];

function jts(data) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = rules[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _ref = _step.value;

      var _ref2 = _slicedToArray(_ref, 2);

      var isMatch = _ref2[0];
      var makeSchema = _ref2[1];

      if (isMatch(data)) {
        return makeSchema(data);
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  throw new TypeError(data);
}