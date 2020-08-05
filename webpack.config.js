var path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'public/src'),
  output: {
    path: path.resolve(__dirname, 'public/dist'),
    filename: 'similar-listings-news.bundle.js'
  },
  rules: [
    {
      test: /\.jsx$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react']
        }
      }
    }
  ]
};
