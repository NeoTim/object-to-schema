'use strict';

module.exports = {
  basic: {
    title: 'Title for API',
    description: 'Description for API',
    method: 'API method',
    path: 'API path',
  },
  request: {
    headers: {},
    query: {},
    body: {},
  },
  responses: [
    {
      description: '成功返回',
      body: {},
      mock: {
        delay: 100,
        enable: false,
      },
    },
  ],
};
