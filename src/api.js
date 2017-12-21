'use strict';

const json = require('./json');
const tpl = require('./tpl');

module.exports = data => {
  const schema = json(data);
  tpl.responses[0].body = schema;
  return tpl;
};
