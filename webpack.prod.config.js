const path = require('path');
const webpack = require('webpack');
const glob = require("glob");
const CleanWebpackPlugin = require('clean-webpack-plugin'); //打包的先删除dist目录
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin'); //css压缩
const PurifyCssWebpack = require('purifycss-webpack');  //打包的时候删除无用的css

module.exports = {
  devtool: "source-map",
  plugins: [
    new CleanWebpackPlugin([path.join(__dirname, 'dist')]),
    new optimizeCssAssetsWebpackPlugin(),
    new PurifyCssWebpack({
      paths: glob.sync(path.join(__dirname, './src/pages/**/*.html'))
    })
  ]
};
