'use strict';

var json = require('./json');
var tpl = require('./tpl');

module.exports = function (data) {
  var schema = json(data);
  tpl.responses[0].body = schema;
  return tpl;
};