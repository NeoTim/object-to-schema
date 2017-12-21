# leaf-jts

> Convert JS Object to leaf api schema


## Installation

```bash
$ npm i leaf-jts -S
```

## Usage


```js
const jts = require('leaf-jts');

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

const jsonSchema = jts.json(obj);
const apiSchema = jts.api(obj);

console.log(JSON.stringify(jsonSchema, null, 2));

```
