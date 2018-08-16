const path = require('path');

module.exports = {
  entry          : './src/index.js',
  output         : {
    filename       : 'index.js',
    path           : __dirname + '/dist/'
  },
  module:{
    rules : [
      {
        test: /\.js$/,
        include: [
          __dirname + '/src/'
        ],
        loader: 'babel-loader',
        options: {
          presets: [ 'babel-preset-env' ]
        }
      }
    ]
  }
};

