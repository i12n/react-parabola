const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 生成html的插件
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config');

const devWebpackConfig = merge(baseConfig, {
  output: {
    publicPath: '/',
  },
  devtool: 'eval-source-map',
  devServer: {
    inline: true,
    hot: true,
    contentBase: path.join(__dirname, '..', 'dist'),
    port: 8080, // 端口
    host: '127.0.0.1',
    overlay: true,
    compress: false,
    historyApiFallback: true,
  },
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 500,
    poll: 1000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', 'example','index.html'),
      filename: 'index.html',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
});

module.exports = devWebpackConfig;
