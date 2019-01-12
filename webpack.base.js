const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');  //生成html文件
const miniCssExtractPlugin = require('mini-css-extract-plugin'); //将css文件单独提取出来
const arrayFolder = fs.readdirSync('./src/pages'); //同步读取pages文件夹下面的一级文件夹,返回一个数组
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');  //编译完了之后系统提示
const progressBarPlugin = require('progress-bar-webpack-plugin'); //webpack编译进度条
const CopyWebpackPlugin = require('copy-webpack-plugin');


let entry = {}; //文件入口

arrayFolder.forEach(item => {
  entry[item] = `./src/pages/${item}/${item}.js`;
});

//循环生成html文件
let htmlPluginTel = arrayFolder.map(item => new HtmlWebpackPlugin({
  template: `./src/pages/${item}/${item}.html`,
  filename: `html/${item}.html`,
  title: `${item}`,
  hash: true,
  chunks: [`${item}`],
  minify: {
    removeAttributeQuotes: true
  }
}));

module.exports = {
  entry: entry,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: "js/[name].[hash:5].js"
  },
  resolve: {
    extensions: [".js", ".css"],
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  externals: {
    $: '$'//如果要在浏览器中运行，那么不用添加什么前缀，默认设置就是global
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        },
        include: path.resolve('./src'),
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg|bmp|eot|woff|woff2|ttf)/,
        loader: {
          loader: "url-loader",
          options: {
            limit: 10 * 1024,
            outputPath: 'images/',
            publicPath: '/images'
          }
        }
      },
      {
        test: /\.(html|htm)/,
        loader: 'html-withimg-loader'
      },
      {
        test: /\.less$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        use: [{
          loader: miniCssExtractPlugin.loader
        }, 'css-loader', 'less-loader']
      }
    ]
  },
  plugins: [
    ...htmlPluginTel,
    new miniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: '[id].css'
    }),
    new WebpackBuildNotifierPlugin({
      title: "你的webpack构建好啦",
      // logo: path.resolve("./img/favicon.png"),
      suppressSuccess: true
    }),
    new progressBarPlugin(),
    new CopyWebpackPlugin([{
      from: path.join(__dirname, './src/json'),
      to: path.join(__dirname, 'dist', 'json')
    }]),
  ]
};
