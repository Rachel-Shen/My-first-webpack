const path = require('path');

module.exports = {
  //devtool: "source-map",
  devServer: {
    contentBase: './dist',
    host: 'localhost',
    port: 9090,
    compress: true,   //开发服务器是否启动gzip等压缩
    open: true,
    overlay: true,    //当存在编译器错误或警告时，在浏览器中显示全屏覆盖
    inline: true,
    openPage: 'html/index.html'   //默认打开哪个页面
  }
};
