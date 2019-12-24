# Webpack

## 介绍

### 是什么

webpack 是一款模块加载器兼打包工具，它能把各种资源（JS/样式/图片等）作为模块来使用和处理。

### 前端模块加载的方式

模块的加载和传输，我们首先能想到两种极端的方式，一种是每个模块文件都单独请求，另一种是把所有模块打包成一个文件然后只请求一次。显而易见，每个模块都发起单独的请求造成了请求次数过多，导致应用启动速度慢；一次请求加载所有模块导致流量浪费、初始化过程慢。

这两种方式都不是好的解决方案，它们过于简单粗暴。

于是 webpack 做到了**分块传输**，按需进行懒加载，在实际用到某些模块的时候再增量更新，这才是较为合理的模块加载方案。

### 优势

- 代码拆分
  Webpack 有两种组织模块依赖的方式，同步和异步。异步依赖作为分割点，形成一个新的块。在优化了依赖树后，每一个异步区块都作为一个文件被打包。

- Loader
  Webpack 本身只能处理原生的 JavaScript 模块，但是 loader 转换器可以将各种类型的资源转换成 JavaScript 模块。这样，任何资源都可以成为 Webpack 可以处理的模块。

- 智能解析
  Webpack 有一个智能解析器，几乎可以处理任何第三方库，无论它们的模块形式是 CommonJS、 AMD 还是普通的 JS 文件。甚至在加载依赖的时候，允许使用动态表达式 require("./templates/" + name + ".jade")。

### 安装

npm install webpack -g

### 主要配置项

```
module.exports = {
  entry: [],
  output: {},
  module: {},
  resolve: {},
  plugins: []
}
```

entry: 入口，定义需要编译的文件
output: 出口，定义打包输出的文件；包括路径，文件名，可能有运行时的访问路径等参数
module: webpack 将所有资源都看做是模块,而模块就需要加载器：也就是一些 loader
resolve: 定义能够被打包的文件，文件后缀名
plugins: 定义额外的插件

### 一个简易的 demo

```
let path = require('path');
let webpack =require('webpack')
module.exports = {
  entry: path.resolve(__dirname, 'app/index.js'),
  //入口文件，需要编译的文件
  output: { //出口文件
      filename: 'bundle.js',//编译后文件名
      path: path.resolve(__dirname, 'build'),//存储地址
      publicPath:'/assets/' //资源文件的指定目录
  },
  devServer:{ //热更新
      inline:true, //inline热更新模式
      port:9000, //自动启动端口
  },
}
```

## 配置

## plugins

plugins 是插件项，这里我们使用了一个 CommonsChunkPlugin 的插件，它用于提取多个入口文件的公共脚本部分，然后生成一个 common.js 来方便多页面之间进行复用。

## entry 和 output

entry 是页面入口文件配置，output 是对应输出项配置，语法大概为：

entry: {
page1: "./page1",
//支持数组形式，将加载数组中的所有模块，但以最后一个模块作为输出
page2: ["./entry1", "./entry2"]
},
output: {
path: "dist/js/page",
filename: "[name].bundle.js"
}

该段代码最终会生成一个 page1.bundle.js 和 page2.bundle.js，并存放到 ./dist/js/page 文件夹下。

## module(loaders)

Loader 可以理解为是模块和资源的转换器，它本身是一个函数，接受源文件作为参数，返回转换的结果。这样，我们就可以通过 require 来加载任何类型的模块或文件，比如 CoffeeScript、 JSX、 LESS 或图片。

loader 的特性：

- Loader 可以通过管道方式链式调用，每个 loader 可以把资源转换成任意格式并传递给下一个 loader ，但是最后一个 loader 必须返回 JavaScript。
- Loader 可以同步或异步执行。
- Loader 运行在 node.js 环境中，所以可以做任何可能的事情。
- Loader 可以接受参数，以此来传递配置项给 loader。
- Loader 可以通过文件扩展名（或正则表达式）绑定给不同类型的文件。
- Loader 可以通过 npm 发布和安装。
- 除了通过 package.json 的 main 指定，通常的模块也可以导出一个 loader 来使用。
- Loader 可以访问配置。
- 插件可以让 loader 拥有更多特性。
- Loader 可以分发出附加的任意文件。

module: {
//加载器配置  
 loaders: [
//.css 文件使用 style-loader 和 css-loader 来处理
{ test: /\.css$/, loader: 'style-loader!css-loader' },
//.js 文件使用 jsx-loader 来编译处理
{ test: /\.js$/, loader: 'jsx-loader?harmony' },
//.scss 文件使用 style-loader、css-loader 和 sass-loader 来编译处理
{ test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
//图片文件使用 url-loader 来处理，小于 8kb 的直接转为 base64
{ test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
]
}

**注意所有的加载器都需要通过 npm 来加载，并建议查阅它们对应的 readme 来看看如何使用。**

## resolve 配置

resolve: {
//查找 module 的话从这里开始查找
root: 'E:/github/flux-example/src', //绝对路径
//自动扩展文件后缀名，意味着我们 require 模块可以省略不写后缀名
extensions: ['', '.js', '.json', '.scss'],
//模块别名定义，方便后续直接引用别名，无须多写长长的地址  
 alias: {
AppStore : 'js/stores/AppStores.js',//后续直接 require('AppStore') 即可
ActionType : 'js/actions/ActionType.js',
AppAction : 'js/actions/AppAction.js'
}
}

参考以下文章更佳：

http://www.jianshu.com/p/15f72e262ec7
