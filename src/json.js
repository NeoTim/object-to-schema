'use strict';
/**
 * JS Object to JSON Schema
 */

const _ = require('lodash');

module.exports = jts;

const rules = [
  [ _.isNull, value => ({ type: 'null', value }) ],
  [ _.isNumber, value => ({ type: 'number', default: value }) ],
  [ _.isBoolean, value => ({ type: 'boolean', default: value }) ],
  [ _.isString, value => ({ type: 'string', default: value }) ],
  [ _.isRegExp, pattern => ({ type: 'string', pattern }) ],

  // Empty array -> array of any items
  [ data => _.isArray(data) && !data.length, () => ({ type: 'array' }) ],

  [ _.isArray, items => ({ type: 'array', items: jts(items[0]) }) ],
  [
    _.isPlainObject,
    object => ({
      type: 'object',
      required: _.keys(object),
      properties: _.mapValues(object, jts),
    }),
  ],
];

function jts(data) {
  for (const [ isMatch, makeSchema ] of rules) {
    if (isMatch(data)) {
      return makeSchema(data);
    }
  }

  throw new TypeError(data);
}
