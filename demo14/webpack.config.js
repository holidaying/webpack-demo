//用模块化代替全局变量的获取方式，挺有意思的挺有意思的挺有意思的挺有意思的 cdn上挂载
module.exports = {
  entry: './main.jsx',
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders:[
      { test: /\.js[x]?$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react' },
    ]
  },
  externals: {
    // require("jquery") is external and available
    //  on the global var jQuery
    "jQuery": "window.$",
    'data2': 'data'
  }
};
