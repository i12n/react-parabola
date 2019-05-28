const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin') //CSS文件单独提取出来

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    index: './example/main.js',
  },
  output: {
    path: resolve('./'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.json'],
    alias: {
      '@': path.resolve(__dirname, '../src/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
        // exclude: /node_modules/,
      },
      {
        test: /\.less$/,
        use: ['css-hot-loader', MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
        include: [resolve('src'), resolve('example')],
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
        },
        resolve: {
          extensions: ['.js', '.jsx'],
        },
        include: [resolve('src'), resolve('example')],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        exclude: /node_modules/,
        loader: 'url-loader',
        options: {
          // limit: 10000,
          name: '[name].[ext]',
          outputPath: 'static/',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          // name: assetsPath('fonts/[name].[hash:7].[ext]')
        },
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        vendors: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].css',
    }),
  ],
};
