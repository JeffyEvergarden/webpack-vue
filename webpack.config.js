const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const minicss = require('mini-css-extract-plugin')
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
  },
  resolveLoader: {
    modules: ['node_modules'],
  },
  devtool: 'source-map',
  devServer: {
    port: '8000',
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.vue$/,
        use: ['vue-loader'],
      },
      // less 处理
      {
        test: /\.less$/,
        use: [
          minicss.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      // file-loader 处理图片
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        use: {
          loader: 'file-loader', // 或者用 url-loader (file-loader 加强版内部依赖 file-loader)
          options: {
            name: '[name].[hash].[ext]',
            outputPath: 'images', // 图片输出位置
            publicPath: './images/', // 图片的引用位置, 图片的路径 + 图片的名称
            // limit: 1024 * 11, // 单位 kb 针对url-loader
          },
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(js|vue)$/,
        exclude: /node_modules/,
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          fix: true,
        },
      },
    ],
  },
  plugins: [
    // css 独立出单独文件
    new minicss({
      filename: 'css/[name].[hash].css', // 对hash可以截取[hash:6]
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      favicon: path.resolve(__dirname, './favicon.ico'),
      inject: true,
    }),
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
  ],
}
