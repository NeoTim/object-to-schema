'use strict';

const ots = require('../lib');

const obj = {
  '// name': [ null, [ '// user name' ]],
  name: 'Tom',
  times: [ 1, 2, 3 ],
  members: [],
  user: {
    '// age': [ null, [ '// 年龄' ]],
    age: 1,
    '// addr': '地址',
    addr: 'gz',
  },
  books: [
    {
      '// name': '书名',
      name: 'Hackers and Painters',
      author: 'Paul Graham',
    },
  ],
};

const schema = ots.json(obj);

console.log(JSON.stringify(schema, null, 2));
