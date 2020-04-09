const path = require('path');

module.exports = {
  mode: 'development',
  entry: './js/src/main.js',
  output: {
    path: path.resolve(__dirname, 'js/dist'),
    filename: 'build.js'
  }
};