'use strict';

const jts = require('../lib');

const obj = {
  id: 100,
  owner: {
    show: 'true|Boolean|is show',
    login: 'japsu',
  },
  name: 'Tom',
  books: [
    {
      name: 'Hackers and Painters|string|book name',
      author: 'Paul Graham',
    },
  ],
};

const schema = jts.json(obj);

console.log(JSON.stringify(schema, null, 2));
