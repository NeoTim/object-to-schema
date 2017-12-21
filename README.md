# object-to-schema

> Convert JS Object to leaf api schema


## Installation

```bash
$ npm i object-to-schema -S
```

## Usage


```js
const ots = require('object-to-schema');

const obj = {
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
};

const jsonSchema = ots.json(obj);
const apiSchema = ots.api(obj);

console.log(JSON.stringify(jsonSchema, null, 2));

```
