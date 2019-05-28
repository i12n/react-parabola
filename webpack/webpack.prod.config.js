const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 生成html的插件
const webpack = require('webpack');
const merge = require('webpack-merge');

const baseConfig = require('./webpack.base.config');

const prodWebpackConfig = merge(baseConfig, {
  plugins: [
    // 多入口的html文件用chunks这个参数来区分
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', 'example', 'index.html'),
      filename: 'index.html',
      hash: true,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
  ],
});

module.exports = prodWebpackConfig;
