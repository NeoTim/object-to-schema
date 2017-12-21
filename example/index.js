'use strict';

const jts = require('..');

const obj = [
  {
    id: 100,
    owner: {
      show: true,
      login: 'japsu',
    },
    name: 'Tom',
    books: [
      {
        name: 'Hackers and Painters',
        author: 'Paul Graham',
      },
    ],
  },
];

const schema = jts(obj);

console.log(JSON.stringify(schema, null, 2));
