// 热模块替代或热更新是当今最热门新的技术。它让你保存 JavaScript文件，就把对应的组件实时更新。
// new webpack.HotModuleReplacementPlugin()
// 原来的表现如下：
// 写一个App
// 在浏览器加载，并试用它
// App进入一个状态被Vue所渲染在屏幕
// 这时，你想要一个快速修改或修复一个bug。你需要重新加载页面，操作所有的步骤到那个指定状态。
// 热更新让整个步骤变得简单：
// 打开一个App，操作到指定状态
// 修改源代码并保存
// Webpack识别到代码变化，它重新编译被更改的指定模块
// Webpack利用类似websockets的技术上传代码和更改线上浏览器的效果
// Vue检测新的数据模型和热补丁, 和重新渲染app并保存着完整的状态
var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8080',
    './index.js'
  ],
  output: {
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel-loader?presets[]=es2015&presets[]=react'],
      include: path.join(__dirname, '.')
    }]
  }
};
