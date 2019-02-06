/**
 * code transpiling
 *
 */
require('babel-register')({
  presets: [['env', {
    targets: {
      node: '11',
    },
  }]],
});

module.exports = require('./src/server/server');
