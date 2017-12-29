'use strict';
/**
 * JS Object to JSON Schema
 */

const _ = require('lodash');
const separator = '(@#$%)';
module.exports = objectToSchema;

const rules = [
  [ _.isNull, value => handleValue('null', value) ],
  [ _.isNumber, value => handleValue('number', value) ],
  [ _.isBoolean, value => handleValue('boolean', value) ],
  [ _.isString, value => handleValue('string', value) ],
  [ _.isRegExp, pattern => ({ type: 'string', pattern }) ],

  // Empty array -> array of any items
  [ data => _.isArray(data) && !data.length, () => ({ type: 'array' }) ],

  [ _.isArray, items => ({ type: 'array', items: objectToSchema(items[0]) }) ],
  [ _.isPlainObject, object => handleOjbect(object) ],
];

function handleOjbect(object) {
  const required = _.keys(object).filter(item => item.indexOf('//') < 0);
  return {
    type: 'object',
    required,
    properties: handleProps(object),
  };
}

function handleProps(object) {
  const obj = {};
  _.keys(object).forEach(item => {
    if (item.indexOf('//') > -1) return;
    for (const [ isMatch, makeSchema ] of rules) {
      if (!isMatch(object[item])) {
        continue;
      }

      if (_.isPlainObject(object[item])) {
        obj[item] = makeSchema(object[item]);
        continue;
      }

      if (object[`// ${item}`]) {
        const type = typeOf(object[item]);
        const desc = object[`// ${item}`];
        const value = `${object[item]}${separator}${type}${separator}${desc}`;
        obj[item] = makeSchema(value);
      } else {
        obj[item] = makeSchema(object[item]);
      }
      break;
    }
  });
  return obj;
}

function objectToSchema(data) {
  for (const [ isMatch, makeSchema ] of rules) {
    if (isMatch(data)) {
      return makeSchema(data);
    }
  }

  throw new TypeError(data);
}

// handle this type data: Hackers and Painters|string|book name
function handleValue(type, value) {
  if (!_.isString(value)) {
    return { type, default: value };
  }
  const arr = value.split(separator);
  if (arr.length < 2) {
    return { type, default: value };
  }
  const [ defaultValue, valueType, description ] = arr;

  const maps = {
    null: () => null,
    number: Number,
    boolean: Boolean,
    string: data => data,
  };

  return {
    type: valueType,
    default: maps[valueType](defaultValue),
    description,
  };
}

function typeOf(data) {
  const rules = [
    [ _.isNull, 'null' ],
    [ _.isNumber, 'number' ],
    [ _.isBoolean, 'boolean' ],
    [ _.isString, 'string' ],
    [ _.isRegExp, 'string' ],
  ];
  for (const [ isMatch, value ] of rules) {
    if (isMatch(data)) {
      return value;
    }
  }
}
