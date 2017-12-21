'use strict';

module.exports = {
  info: {
    title: 'Title for API',
    description: 'Description for API',
    method: 'API method',
    path: 'API path'
  },
  request: {
    headers: {},
    query: {},
    body: {}
  },
  responses: [{
    scene: {
      status: '200',
      active: true
    },
    mock: {
      delay: 100,
      enable: false
    },
    description: '成功返回',
    body: {}
  }]
};