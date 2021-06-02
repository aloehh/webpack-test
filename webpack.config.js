const path  = require('path')
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
// 清理webpack编译时输出的无用信息
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

console.log('process.env', process.env.NODE_ENV);
module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist')
  },
  mode: "development",
  resolveLoader: {
    modules: ["node_modules", "./myLoaders"]
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{
            loader: 'style-loader',
            options: {
              injectType: "singletonStyleTag" // 将所有的style标签 合并为一个
            }
          }, 'css-loader']
      },
      {
        test: /\.less$/,
        use: [
        // 'style-loader',
          {
          loader: MiniCssExtractPlugin.loader,
          // options: {
          //   hmr: true  // 模块热替换， 仅在开发环境开启
          // }
        }, 'css-loader', "postcss-loader", 'less-loader']
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: {
          loader: 'url-loader', // file-loader的扩展
          options: {
            name: "[name].[ext]", // [ext]⽼资源模块的后缀
            outputPath: "assets/images/",
            limit: 3 * 1024 // 对小体积的资源图片进行管理，小图片转成base64,减少请求数量
          }
        }
      },
      {
        test: /\.(eot|ttf|woff|woff2|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: "[name]_[contenthash:8].[ext]",
            outputPath: "assets/font/"
          }
        }
      },
      {
        test: /\.js$/,
        use: [
          "replaceLoader",
          {
            loader: "replaceLoaderAsync",
            options: {
              name: '星期一'
            }
          }
        ]
      },
    ]
  }, // 总结: loader 处理webpack不支持的格式文件，模块;一个loader 只处理一件事情;loader有执行顺序: 从下到上, 从右到左
  devtool: "inline-source-map",
  devServer: {
    historyApiFallback: true,
    contentBase: "./dist",
    host: 'localhost',
    port: 8081,
    open: true,
    overlay: true,
    inline: true,
    progress: true,
    quiet: true,
    proxy: {
      "/api": {
        target: "http://localhost:9092",
      },
    },
  },
  plugins: [
    new htmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      
    }),
    new htmlWebpackPlugin({
      template: "./src/home/index.html",
      filename: "home.html",
      chunks: ['home']
    }),
    new htmlWebpackPlugin({
      template: "./src/detail/index.html",
      filename: "detail.html",
      chunks: ['detail']
    }),
    new MiniCssExtractPlugin({
      filename: "[name][chunkhash:8].css",// 防止缓存
      chunkFilename: '[name].[contenthash:8].css'
    }),
    new CleanWebpackPlugin(),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
          messages: [
            `Your application is running: http://localhost:8081`
          ]
      },
      clearConsole: true
    }),
    // new webpack.HotModuleReplacementPlugin(),
  ],
}