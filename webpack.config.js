const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const base = require('./webpack.base');
const argv = require('yargs-parser')(process.argv.slice(2));  //获取环境变量
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin"); //显示打包具体时间
const smp = new SpeedMeasurePlugin();
// const env = require('env2')('./.env');


// console.log(process.env.NODE_ENV);

//console.log("环境变量"+process.env.NODE_ENV);


let other = '';

if (process.env.NODE_ENV === 'development') {
  other = require('./webpack.dev.config');
} else {
  other = require('./webpack.prod.config');
}

module.exports = smp.wrap(merge(base, other));
