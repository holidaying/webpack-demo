
16个demo，webpack+react搭配使用
首先教大家2个新技能
* 1.按照正常github地址情况下，你的github本身不能访问目录。

  * 例如要访问vue-demo下的vueCpu文件夹:https://github.com/holidaying/vue-demo/vueCpu（显示404）但是在目录上加上tree/master/：https://github.com/holidaying/vue-demo/tree/master/vueCpu （master是分支名）就可以访问。

* 2.github目录的制作
  * 明确一个问题。一个标题就是一个目录名称
  * 写法\[xx\]\(#题目名称\)#不能少
  * 题目名称的写法规则：abc demo-> abc-demo,Abc-Demo->abc-demo。会忽略:和()即就是题目中所有可见字符的空格均用-连接，中、英文空格要分开，中文空格对应中文-。并且全为小写

## 步骤

首先，install [Webpack](https://www.npmjs.com/package/webpack) 和 [webpack-dev-server](https://www.npmjs.com/package/webpack-dev-server).

```命令行
$ npm i -g webpack webpack-dev-server
```
```命令行
# Linux & Mac
$ git clone git@github.com:holidaying/webpack-demos.git

# Windows
$ git clone https://github.com/holidaying/webpack-demos.git
:
$ cd webpack-demos
$ npm install
```

接下来就可以进行demo演示了.

```命令行
$ cd demo01
$ webpack-dev-server
```

用浏览器访问 http://127.0.0.1:8080.

## 什么是webpack？

Webpack 是前端的打包工具类类似于 Grunt and Gulp.但是有区别，因为它是模块化构建机制，Webpack可以看做是模块打包机：它做的事情是，分析你的项目结构，找到JavaScript模块以及其它的一些浏览器不能直接运行的拓展语言（Scss，TypeScript等），并将其打包为合适的格式以供浏览器使用。
WebPack和Grunt以及Gulp相比有什么特性
其实Webpack和另外两个并没有太多的可比性，Gulp/Grunt是一种能够优化前端的开发流程的工具，而WebPack是一种模块化的解决方案，不过Webpack的优点使得Webpack可以替代Gulp/Grunt类的工具。
Grunt和Gulp的工作方式是：在一个配置文件中，指明对某些文件进行类似编译，组合，压缩等任务的具体步骤，这个工具之后可以自动替你完成这些任务。
[更多信息](http://webpack.github.io/docs/what-is-webpack.html).
```命令行

$ webpack main.js bundle.js
```

它的配置文件是 `webpack.config.js`.

```javascript
// webpack.config.js
module.exports = {
  entry: './main.js',
  output: {
    filename: 'bundle.js'
  }
};
```

有了`webpack.config.js`,你可以不带参数使用webpack

```命令行
$ webpack
```

一些命令行选项你应该知道。

- `webpack` – 构建文件
- `webpack -p` – 发布
- `webpack --watch` – 监听项目
- `webpack -d` – 包含 source maps方便调试
- `webpack --colors` – 让打包界面更好看

去构建你的项目, 你可以把启动项写进package.json

```javascript
// package.json
{
  // ...
  "scripts": {
    "dev": "webpack-dev-server --devtool eval --progress --colors",
    "deploy": "NODE_ENV=production webpack -p"
  },
  // ...
}
```
## 目录

1. [单文件入口](#demo01-单文件入口-源码)
1. [多文件入口](#demo02-多文件入口-源码)
1. [Babel-loader](#demo03-babel-loader-源码)
1. [CSS-loader](#demo04-css-loader-源码)
1. [Image loader](#demo05-image-loader-源码)
1. [CSS Module](#demo06-css-module-源码)
1. [UglifyJs Plugin插件](#demo07-uglifyjs-plugin-源码)
1. [HTML Webpack Plugin and Open Browser Webpack Plugin](#demo08-html-webpack-plugin-and-open-browser-webpack-plugin-源码)
1. [Environment flags环境变量](#demo09-设置环境变量-源码)
1. [Code splitting代码分割](#demo10-code-splitting-源码)
1. [Code splitting with bundle-loader](#通过bundle-loader进行代码分裂-源码)
1. [Common chunk提取公共文件](#demo12-common-chunk-源码)
1. [Vendor chunk提取公共的第三方代码](#demo13-vendor-chunk-源码)
1. [externals全局变量](#demo14-exposing_global-variables-源码)
1. [热模块替代/热更新](#demo15-热模块替换-源码)
1. [React router](#demo16-react-router例子-源码)

## Demo01: 单文件入口 ([源码](https://github.com/holidaying/webpack-demos/tree/master/demo01))

Webpack会入口文件进行打包成bundle.js.

例子, `main.js` 是单文件入口.

```javascript
// main.js
document.write('<h1>Hello World</h1>');
```

index.html

```html
<html>
  <body>
    <script type="text/javascript" src="bundle.js"></script>
  </body>
</html>
```

Webpack follows `webpack.config.js` to build `bundle.js`.

```javascript
// webpack.config.js
module.exports = {
  entry: './main.js',
  output: {
    filename: 'bundle.js'
  }
};
```

启动服务, 访问 http://127.0.0.1:8080 .

```bash
$ webpack-dev-server
```

## Demo02: 多文件入口 ([源码](https://github.com/holidaying/webpack-demos/tree/master/demo02))

多个入口文件，实用于多个页面的应用

```javascript
// main1.js
document.write('<h1>Hello World</h1>');

// main2.js
document.write('<h2>Hello Webpack</h2>');
```

index.html

```html
<html>
  <body>
    <script src="bundle1.js"></script>
    <script src="bundle2.js"></script>
  </body>
</html>
```

webpack.config.js

```javascript
module.exports = {
  entry: {
    bundle1: './main1.js',
    bundle2: './main2.js'
  },
  output: {
    filename: '[name].js'
  }
};
```

## Demo03: Babel-loader ([源码](https://github.com/holidaying/webpack-demos/tree/master/demo03))

通过使用不同的loader，webpack通过调用外部的脚本或工具可以对各种各样的格式的文件进行处理([更多信息](http://webpack.github.io/docs/using-loaders.html)). 例如, [Babel-loader](https://www.npmjs.com/package/babel-loader) Babel其实是一个编译JavaScript的平台可以将 JSX/ES6 文件转换成浏览器可以识别的js文件. 官方文档[loaders](http://webpack.github.io/docs/list-of-loaders.html).

`main.jsx` is a JSX 文件.

```javascript
const React = require('react');
const ReactDOM = require('react-dom');

ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.querySelector('#wrapper')
);
```

index.html

```html
<html>
  <body>
    <div id="wrapper"></div>
    <script src="bundle.js"></script>
  </body>
</html>
```

webpack.config.js

```javascript
module.exports = {
  entry: './main.jsx',
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders:[
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel-loader?presets[]=es2015&presets[]=react'
      },
    ]
  }
};
```

在 `webpack.config.js`, `module.loaders` 区域是用来分配loader的. 像上面的代码片段使用了 `babel-loader` 需要安装插件 [babel-preset-es2015](https://www.npmjs.com/package/babel-preset-es2015) 和 [babel-preset-react](https://www.npmjs.com/package/babel-preset-react) to 编译成 ES6 and React. 可以用query配置参数

```javascript
module: {
  loaders: [
    {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'react']
      }
    }
  ]
}
```

## Demo04: CSS-loader ([源码](https://github.com/holidaying/webpack-demos/tree/master/demo04))

Webpack 允许你在js文件中require CSS , 通过 CSS-loader来预处理css文件.

main.js

```javascript
require('./app.css');
```

app.css

```css
body {
  background-color: blue;
}
```

index.html

```html
<html>
  <head>
    <script type="text/javascript" src="bundle.js"></script>
  </head>
  <body>
    <h1>Hello World</h1>
  </body>
</html>
```

webpack.config.js

```javascript
module.exports = {
  entry: './main.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders:[
      { test: /\.css$/, loader: 'style-loader!css-loader' },
    ]
  }
};
```

但是,你需要使用2中loaders来转换CSS 文件. 第一个是 [CSS-loader](https://www.npmjs.com/package/css-loader) 来读取CSS文件, 另外一个是[Style-loader](https://www.npmjs.com/package/style-loader) 是将style样式插入到html中。 中间用！连接

启动服务后, `index.html` 有内部样式.

```html
<head>
  <script type="text/javascript" src="bundle.js"></script>
  <style type="text/css">
    body {
      background-color: blue;
    }
  </style>
</head>
```

## Demo05: Image loader ([源码](https://github.com/holidaying/webpack-demos/tree/master/demo05))

Webpack 允许你在js文件中require图片 , 通过 url-loader和file-loader来预处理图片文件.

main.js

```javascript
var img1 = document.createElement("img");
img1.src = require("./small.png");
document.body.appendChild(img1);

var img2 = document.createElement("img");
img2.src = require("./big.png");
document.body.appendChild(img2);
```

index.html

```html
<html>
  <body>
    <script type="text/javascript" src="bundle.js"></script>
  </body>
</html>
```

webpack.config.js

```javascript
module.exports = {
  entry: './main.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders:[
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' }
    ]
  }
};
```

[url-loader](https://www.npmjs.com/package/url-loader) 转换图片文件. 如果图片的大小小于 8192 bytes,它将会转成base64位的地址; 相反, 它就是普通地址. 
参数前是用？连接的

启动服务后, `small.png` and `big.png` 将会有一下的地址.

```html
<img src="data:image/png;base64,iVBOR...uQmCC">
<img src="4853ca667a2b8b8844eb2693ac1b2578.png">
```

## Demo06: CSS Module ([源码](https://github.com/holidaying/webpack-demos/tree/master/demo06))

`css-loader?modules` (the query parameter modules) enables the [CSS Modules](https://github.com/css-modules/css-modules) spec.

CSS Module可以开启全局变量和局部变量，:global(...)表示全局变量，可以在全局中使用样式([更多信息](https://css-modules.github.io/webpack-demo/))

index.html

```html
<html>
<body>
  <h1 class="h1">Hello World</h1>
  <h2 class="h2">Hello Webpack</h2>
  <div id="example"></div>
  <script src="./bundle.js"></script>
</body>
</html>
```

app.css

```css
.h1 {
  color:red;
}

:global(.h2) {
  color: blue;
}
```

main.jsx

```javascript
var React = require('react');
var ReactDOM = require('react-dom');
var style = require('./app.css');

ReactDOM.render(
  <div>
    <h1 className={style.h1}>Hello World</h1>
    <h2 className="h2">Hello Webpack</h2>
  </div>,
  document.getElementById('example')
);
```

webpack.config.js

```javascript
module.exports = {
  entry: './main.jsx',
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders:[
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules'
      }
    ]
  }
};
```

启动服务.

```命令行
$ webpack-dev-server
```

访问 http://127.0.0.1:8080 , 你将看到只有第二个 `h1` 是红的,因为它是局部, 同时 `h2` 是蓝色的, 因为是`h2`全局的.

## Demo07: UglifyJs Plugin ([源码](https://github.com/holidaying/webpack-demos/tree/master/demo07))

Webpack 可以去掉本身附加的东西，优化代码 [UglifyJs Plugin](http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin) will minify output(`bundle.js`) JS codes.

main.js

```javascript
var longVariableName = 'Hello';
longVariableName += ' World';
document.write('<h1>' + longVariableName + '</h1>');
```

index.html

```html
<html>
<body>
  <script src="bundle.js"></script>
</body>
</html>
```

webpack.config.js

```javascript
var webpack = require('webpack');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
module.exports = {
  entry: './main.js',
  output: {
    filename: 'bundle.js'
  },
  plugins: [
    new uglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
};
```

启动服务后, `main.js` 将会压缩如下.

```javascript
var o="Hello";o+=" World",document.write("<h1>"+o+"</h1>")
```

## Demo08: HTML Webpack Plugin and Open Browser Webpack Plugin ([源码](https://github.com/holidaying/webpack-demos/tree/master/demo08))

这个例子需要加载三个插件

[html-webpack-plugin](https://github.com/ampedandwired/html-webpack-plugin) 创建 `index.html` ，[open-browser-webpack-plugin](https://github.com/baldore/open-browser-webpack-plugin) 打开浏览器

main.js

```javascript
document.write('<h1>Hello World</h1>');
```

webpack.config.js

```javascript
var HtmlwebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
  entry: './main.js',
  output: {
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlwebpackPlugin({
      title: 'Webpack-demos',
      filename: 'index.html'
    }),
    new OpenBrowserPlugin({
      url: 'http://localhost:8080'
    })
  ]
};
```

启动 `webpack-dev-server`.启动这个需要node7版本以上
```命令行
$ webpack-dev-server
```

不用手写`index.html` 也不用手动打开浏览器 Webpack 可以为你做这些事.

## Demo09: 设置环境变量 ([源码](https://github.com/holidaying/webpack-demos/tree/master/demo09))

你可以利用环境变量来控制特定代码的输出

main.js

```javascript
document.write('<h1>Hello World</h1>');

if (__DEV__) {
  document.write(new Date());
}
```

index.html

```html
<html>
<body>
  <script src="bundle.js"></script>
</body>
</html>
```

webpack.config.js

```javascript
var webpack = require('webpack');

var devFlagPlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
});

module.exports = {
  entry: './main.js',
  output: {
    filename: 'bundle.js'
  },
  plugins: [devFlagPlugin]
};
```

```命令行
# Linux & Mac
$ env DEBUG=true webpack-dev-server

# Windows
$ set DEBUG=true
$ webpack-dev-server
```

## Demo10: Code splitting ([源码](https://github.com/holidaying/webpack-demos/tree/master/demo10))

对于大型项目，把所有代码编译到一个文件并不是有效的, Webpack 允许你把代码分成好多块. 特别是某种情况下，只需要个别代码这些块可以按需加载。
在commonjs中有一个Modules/Async/A规范，里面定义了require.ensure语法。webpack实现了它，作用是可以在打包的时候进行代码分片，并异步加载分片后的代码。用法如下：
require.ensure([], function(require){
    var list = require('./list');
    list.show();
});
此时list.js会被打包成一个单独的chunk文件，大概长这样：
1.fb874860b35831bc96a8.js
可读性比较差。我在上一篇结尾也提到了，给它命名的方式，那就是给require.ensure传递第三个参数，如：
```
require.ensure([], function(require){
    var list = require('./list');
    list.show();
}, 'list');
```
这样就能得到你想要的文件名称：
首先，你需要用 `require.ensure` to 来定义一个分割的点. ([官方文档](http://webpack.github.io/docs/code-splitting.html))

```javascript
// main.js
require.ensure(['./a'], function(require) {
  var content = require('./a');
  document.open();
  document.write('<h1>' + content + '</h1>');
  document.close();
});
```

`require.ensure` 告诉 Webpack  `./a.js` 应该从 `bundle.js` 中分离成一个单独的块

```javascript
// a.js
module.exports = 'Hello World';
```
Now Webpack takes care of the dependencies, output files and runtime stuff. You don't have to put any redundancy into your `index.html` and `webpack.config.js`.

```html
<html>
  <body>
    <script src="bundle.js"></script>
  </body>
</html>
```

webpack.config.js

```javascript
module.exports = {
  entry: './main.js',
  output: {
    filename: 'bundle.js'
  }
};
```

启动服务.

```命令行文件
$ webpack-dev-server
```

在界面上, 你感觉不到任何不一样的地方. 但是, Webpack 已经把 `main.js` 和 `a.js` 编译成(`bundle.js` 和 `1.bundle.js`)的块。

## Demo11: 通过bundle-loader进行代码分裂 ([源码](https://github.com/holidaying/webpack-demos/tree/master/demo11))

dem10是一种，另一种是利用[bundle-loader](https://www.npmjs.com/package/bundle-loader).

```javascript
// main.js

// Now a.js is requested, it will be bundled into another file
var load = require('bundle-loader!./a.js');

// To wait until a.js is available (and get the exports)
//  you need to async wait for it.
load(function(file) {
  document.open();
  document.write('<h1>' + file + '</h1>');
  document.close();
});
```

`require('bundle-loader!./a.js')` tells Webpack to load `a.js` from another chunk.

Now Webpack will build `main.js` into `bundle.js`, and `a.js` into `1.bundle.js`.

## Demo12: Common chunk ([源码](https://github.com/holidaying/webpack-demos/tree/master/demo12))

利用webpack.optimize.CommonsChunkPlugin，你可以共通的组件，代码块分离出来

```javascript
// main1.jsx
var React = require('react');
var ReactDOM = require('react-dom');

ReactDOM.render(
  <h1>Hello World</h1>,
  document.getElementById('a')
);

// main2.jsx
var React = require('react');
var ReactDOM = require('react-dom');

ReactDOM.render(
  <h2>Hello Webpack</h2>,
  document.getElementById('b')
);
```

index.html

```html
<html>
  <body>
    <div id="a"></div>
    <div id="b"></div>
    <script src="init.js"></script>
    <script src="bundle1.js"></script>
    <script src="bundle2.js"></script>
  </body>
</html>
```

webpack.config.js

```javascript
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
module.exports = {
  entry: {
    bundle1: './main1.jsx',
    bundle2: './main2.jsx'
  },
  output: {
    filename: '[name].js'
  },
  module: {
    loaders:[
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      },
    ]
  },
  plugins: [
    new CommonsChunkPlugin('init.js')
  ]
}
```

## Demo13: Vendor chunk ([源码](https://github.com/holidaying/webpack-demos/tree/master/demo13))

利用webpack.optimize.CommonsChunkPlugin，你可以把第三方库抽离出来

main.js

```javascript
var $ = require('jquery');
$('h1').text('Hello World');
```

index.html

```html
<html>
  <body>
    <h1></h1>
    <script src="vendor.js"></script>
    <script src="bundle.js"></script>
  </body>
</html>
```

webpack.config.js

```javascript
var webpack = require('webpack');

module.exports = {
  entry: {
    app: './main.js',
    vendor: ['jquery'],
  },
  output: {
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin(/* chunkName= */'vendor', /* filename= */'vendor.js')
  ]
};
```

If you want a module available as variable in every module, such as making $ and jQuery available in every module without writing `require("jquery")`. You should use `ProvidePlugin` ([官方文档](http://webpack.github.io/docs/shimming-modules.html)).

```javascript
// main.js
$('h1').text('Hello World');


// webpack.config.js
var webpack = require('webpack');

module.exports = {
  entry: {
    app: './main.js'
  },
  output: {
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    })
  ]
};
```
插件会执行两次这个方法，第一次将公共的第三方代码抽离移到vendor的块中，这个过程之前也讲过会将运行时runtime也转移到vendor块中，第二次执行则是将运行时runtime抽离出来转移到manifest块中。这步操作解决了缓存问题。
这样处理，最后会生成3个打包文件chunk，app.js是业务代码，vendor则是公共的第三方代码，manifest.js则是运行时。

## Demo14: Exposing_global variables ([源码](https://github.com/holidaying/webpack-demos/tree/master/demo14))

webpack可以不处理应用的某些依赖库，使用externals配置后，依旧可以在代码中通过CMD、AMD或者window/global全局的方式访问。如果你想引入一些全局变量, 但是不想被加载处理, 你可以在 `webpack.config.js` 使用 `externals` 模块 ([官方文档](http://webpack.github.io/docs/library-and-externals.html)).
有时我们希望我们通过script引入的库，如用CDN的方式引入的jquery，我们在使用时，依旧用require的方式来使用，但是却不希望webpack将它又编译进文件中。
<script src="http://code.jquery.com/jquery-1.12.0.min.js"></script>
例子, `data.js`.

```javascript
var data = 'Hello World';
```

We can expose `data` as a global variable.

```javascript
// webpack.config.js
module.exports = {
  entry: './main.jsx',
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders:[
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      },
    ]
  },
  externals: {
    // require('data') is external and available
    //  on the global var data
    'data': 'data'
  }
};
```

现在, 你可以require `data` 作为模块化引入进来使用. 但是实际上是一个全局变量

```javascript
// main.jsx
var data = require('data');
var React = require('react');
var ReactDOM = require('react-dom');

ReactDOM.render(
  <h1>{data}</h1>,
  document.body
);
```

## Demo15: 热模块替换 ([源码](https://github.com/holidaying/webpack-demos/tree/master/demo15))

[Hot Module Replacement](https://github.com/webpack/docs/wiki/hot-module-replacement-with-webpack) (HMR) exchanges, adds, or removes modules while an application is running **without a page reload**.

通过webpack-dev-server.你可以使用[2中方式](http://webpack.github.io/docs/webpack-dev-server.html#hot-module-replacement) 来进行热模块替换

(1) Specify `--hot` and `--inline` on the command line

```命令行
$ webpack-dev-server --hot --inline
```

参数的意思:

- `--hot`: adds the HotModuleReplacementPlugin and switch the server to hot mode.
- `--inline`: embed the webpack-dev-server runtime into the bundle.
- `--hot --inline`: also adds the webpack/hot/dev-server entry.

(2) 修改 `webpack.config.js`.

- 添加 `new webpack.HotModuleReplacementPlugin()` to the `plugins` 模块
- 添加 `webpack/hot/dev-server` 和 `webpack-dev-server/client?http://localhost:8080` to the `entry` 模块

`webpack.config.js` 如下所示.

```javascript
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
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'react']
      },
      include: path.join(__dirname, '.')
    }]
  }
};
```

启动服务

```命令行
$ webpack-dev-server
```

访问 http://localhost:8080, 你可以在浏览器上看到 'Hello World' .

不要关闭服务.打开终端找到 `App.js`, 同时修改 'Hello World' 为 'Hello Webpack'. 保存后，你就可以在浏览器上看到数据更新了

App.js

```javascript
import React, { Component } from 'react';

export default class App extends Component {
  render() {
    return (
      <h1>Hello World</h1>
    );
  }
}
```

index.js

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
```

index.html

```html
<html>
  <body>
    <div id='root'></div>
    <script src="/static/bundle.js"></script>
  </body>
</html>
```

## Demo16: React router例子 ([源码](https://github.com/holidaying/webpack-demos/tree/master/demo16))

利用webpack做的例子 [React-router](https://github.com/rackt/react-router/blob/0.13.x/docs/guides/overview.md)'s 官方例子.

Let's imagine a little app with a dashboard, inbox, and calendar.

```
+---------------------------------------------------------+
| +---------+ +-------+ +--------+                        |
| |Dashboard| | Inbox | |Calendar|      Logged in as Jane |
| +---------+ +-------+ +--------+                        |
+---------------------------------------------------------+
|                                                         |
|                        Dashboard                        |
|                                                         |
|                                                         |
|   +---------------------+    +----------------------+   |
|   |                     |    |                      |   |
|   | +              +    |    +--------->            |   |
|   | |              |    |    |                      |   |
|   | |   +          |    |    +------------->        |   |
|   | |   |    +     |    |    |                      |   |
|   | |   |    |     |    |    |                      |   |
|   +-+---+----+-----+----+    +----------------------+   |
|                                                         |
+---------------------------------------------------------+
```

```命令行
$ webpack-dev-server --history-api-fallback
```

## 参照文档

- [Webpack docs](http://webpack.github.io/docs/)
- [webpack-howto](https://github.com/petehunt/webpack-howto), by Pete Hunt
- [Diving into Webpack](https://web-design-weekly.com/2014/09/24/diving-webpack/), by Web Design Weekly
- [Webpack and React is awesome](http://www.christianalfoni.com/articles/2014_12_13_Webpack-and-react-is-awesome), by Christian Alfoni
- [Browserify vs Webpack](https://medium.com/@housecor/browserify-vs-webpack-b3d7ca08a0a9), by Cory House
- [React Webpack cookbook](https://christianalfoni.github.io/react-webpack-cookbook/index.html), by Christian Alfoni

## License

MIT
