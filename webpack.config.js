var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: path.resolve(__dirname, 'client/index.jsx'),
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'similar-listings-news.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        include: [path.resolve(__dirname, 'client')],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['babel-plugin-styled-components']
          }
        }
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: './sln-assets/[name].[ext]',
              limit: 10000,
              mimetype: 'application/font-woff',
            },
          },
        ],
      }
    ]
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      PROTOCOL: 'http',
      HOST: 'localhost',
      API_PORT: '80'
    })
  ]
};
