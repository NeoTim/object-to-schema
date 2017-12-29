'use strict';
/**
 * JS Object to JSON Schema
 */

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _ = require('lodash');
var separator = '(@#$%)';
module.exports = objectToSchema;

var rules = [[_.isNull, function (value) {
  return handleValue('null', value);
}], [_.isNumber, function (value) {
  return handleValue('number', value);
}], [_.isBoolean, function (value) {
  return handleValue('boolean', value);
}], [_.isString, function (value) {
  return handleValue('string', value);
}], [_.isRegExp, function (pattern) {
  return { type: 'string', pattern: pattern };
}],

// Empty array -> array of any items
[function (data) {
  return _.isArray(data) && !data.length;
}, function () {
  return { type: 'array' };
}], [_.isArray, function (items) {
  return { type: 'array', items: objectToSchema(items[0]) };
}], [_.isPlainObject, function (object) {
  return handleOjbect(object);
}]];

function handleOjbect(object) {
  var required = _.keys(object).filter(function (item) {
    return item.indexOf('//') < 0;
  });
  return {
    type: 'object',
    required: required,
    properties: handleProps(object)
  };
}

function handleProps(object) {
  var obj = {};
  _.keys(object).forEach(function (item) {
    if (item.indexOf('//') > -1) return;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = rules[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _ref = _step.value;

        var _ref2 = _slicedToArray(_ref, 2);

        var isMatch = _ref2[0];
        var makeSchema = _ref2[1];

        if (!isMatch(object[item])) {
          continue;
        }

        if (_.isPlainObject(object[item])) {
          obj[item] = makeSchema(object[item]);
          continue;
        }

        if (object['// ' + item]) {
          var type = typeOf(object[item]);
          var desc = getDesc(object['// ' + item]);
          var value = '' + object[item] + separator + type + separator + desc;
          obj[item] = makeSchema(value);
        } else {
          obj[item] = makeSchema(object[item]);
        }
        break;
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
  });
  return obj;
}

function getDesc() {
  var comment = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  if (!_.isArray(comment) || _.isEmpty(comment)) return '';

  return (comment[1] || '').toString().replace(/^\/\//, '').trim();
}

function objectToSchema(data) {
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = rules[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var _ref3 = _step2.value;

      var _ref4 = _slicedToArray(_ref3, 2);

      var isMatch = _ref4[0];
      var makeSchema = _ref4[1];

      if (isMatch(data)) {
        return makeSchema(data);
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  throw new TypeError(data);
}

// handle this type data: Hackers and Painters|string|book name
function handleValue(type, value) {
  if (!_.isString(value)) {
    return { type: type, default: value };
  }
  var arr = value.split(separator);
  if (arr.length < 2) {
    return { type: type, default: value };
  }

  var _arr = _slicedToArray(arr, 3),
      defaultValue = _arr[0],
      valueType = _arr[1],
      description = _arr[2];

  var maps = {
    null: function _null() {
      return null;
    },
    number: Number,
    boolean: Boolean,
    string: function string(data) {
      return data;
    }
  };

  return {
    type: valueType,
    default: maps[valueType](defaultValue),
    description: description
  };
}

function typeOf(data) {
  var rules = [[_.isNull, 'null'], [_.isNumber, 'number'], [_.isBoolean, 'boolean'], [_.isString, 'string'], [_.isRegExp, 'string']];
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = rules[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var _ref5 = _step3.value;

      var _ref6 = _slicedToArray(_ref5, 2);

      var isMatch = _ref6[0];
      var value = _ref6[1];

      if (isMatch(data)) {
        return value;
      }
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3.return) {
        _iterator3.return();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }
}