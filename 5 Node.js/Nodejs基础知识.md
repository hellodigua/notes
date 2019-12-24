# Node.js

标签（空格分隔）： 后端

---

# 基础知识

## 什么是 commonJS

官方 JavaScript 标准定义的 API 是为了构建基于浏览器的应用程序。然而，并没有定于一个用于更广泛的应用程序的标准库。
CommonJS API 定义很多普通应用程序（主要指非浏览器的应用）使用的 API，从而填补了这个空白。它的终极目标是提供一个类似 Python，Ruby 和 Java 标准库。这样的话，开发者可以使用 CommonJS API 编写应用程序，然后这些应用可以运行在不同的 JavaScript 解释器和不同的主机环境中。

## 使用 CNPM 加速下载

npm install -g cnpm --registry=https://registry.npm.taobao.org

其实就是 cnpm === npm，但是是从淘宝源下载包

## 管理 npm 的工具 nvm

建议使用 nvm 管理 node，所以先从 github 下次 nvm

    windows: https://github.com/coreybutler/nvm-windows

下载 nvm 以后，使用 nvm 安装 node 的版本

为了加快速度，使用淘宝源吧：

    npm config set registry https://registry.npm.taobao.org

# 基于 nodejs 的应用

- node-webkit 开发桌面应用平台的程序
- appjd 开发桌面应用平台的程序
- jade 管理后台 html 模板
- grunt 跑 js 的任务工具，通过各种插件，实现样式编译、语法检查、脚本压缩合并、自动化测试、图片处理
- express.js web 应用框架
- log.io 浏览器里实时监控项目日志
- cheerio 是 nodejs 的爬虫模块，是快速、零活的 jQuery 核心实现（基本语法跟 jq 差不多）

# 代码规范

1. 缩进：2 个空格的缩进，不要使用 tab 和空格混合的方法
2. 换行：换行使用 unix 风格的换行，即每行以(\n)，而不是 windows 的(\r\n)
3. 无拖尾空白：永远不要在一行后面留空格
4. 使用分号：根据传统，不要滥用纠错机制
5. 使用单引号：只有在 json 中才使用双引号（因为 JavaScript 中包含双引号的字符串几乎到处都是，这样你就不需要转义了。）
6. 方法链（调用链）：确保每行只调用一个方法
   User.findOne({ name: 'foo'})
   .populate('bar')
   .exec(function(err, user){
   return true;
   });
7. 每行声明一个变量：每个 var 只声明一个变量，因为它可以更容易的重新排序
8. 变量属性和函数首字母小写：变量属性和函数命名时候，应该使用首字母小写（小骆驼拼写法）
9. 常量大写：常量应该被声明为普通变量或静态类的属性，全部使用大写字母
10. 早点从函数返回：避免 if 语句的深层嵌套

# 模块分类

模块分为 核心模块、文件模块、第三方模块

1. 核心模块 差不多是系统模块的意思，如 http fs path 等...
1. 文件模块 开发者自己定义的模块，var util = require(./util.js)
1. 第三方模块 引入的第三方开发者开发的模块 var promise = require('bluebird')

## 使用模块的流程

创建模块 创建 teacher.js
导出模块 exports.add = funciton(){}
加载模块 var teacher = require('./teacher.js')
使用模块 teacher.add('Tom')

## URL 地址解析

url.parse 用于解析 url
url.format 用于生成 url
url.resolve 用于拼接 url

## queryString

querystring.stringify 把数组对象拼接成字符串
querystring.parse 把 url 上带的参数串转成数组对象
querystring.escape 参数转义
querystring.unescape 参数反转义

## http 模块

### 常用参数

1. host 将要请求的服务器的域名/ip 地址
1. hostname host 的别名
1. port 远端服务器的端口，默认 80
1. localAddress 用户绑定本地连接的接口
1. method 指定 http 请求方法的字符串，默认 get
1. path 请求的路径（如果有查询的字符串则需要在后面追加参数）
1. headers 包含请求头的对象
1. auth 用户计算基本的认证，一般是 user&password
1. agent 代理
1. keepAlive 默认 false

### request 方法

## process 对象

process 对象用于处理与当前进程相关的事情，它是一个全局对象，可以在任何地方直接访问到它而无需引入额外模块。

process.pid：当前进程的进程号。
process.version：Node 的版本，比如 v0.10.18。
process.platform：当前系统平台，比如 Linux。
process.title：默认值为“node”，可以自定义该值。
process.argv：当前进程的命令行参数数组。
process.env：指向当前 shell 的环境变量，比如 process.env.HOME。
process.execPath：运行当前进程的可执行文件的绝对路径。
process.stdout：指向标准输出。
process.stdin：指向标准输入。
process.stderr：指向标准错误。

## 事件模块(events)

Node.js 被认为是实现并发的最佳方法。事件模块是 Node.js 的核心，许多其他模块用它来围绕着事件架构功能。由于 Node.js 运行于单一的线程中，任何同步代码都是阻塞的。

## Promise（很重要的知识点，之后回来看）

Promise 是 javascript 针对异步操作的解决方案，被加入到了 ES6 中，它是 ES6 中最重要的特性之一
Promise 就是一个对象，对象的三种状态 pengding（未完成） fulfilled（已完成） rejected（失败） 不可逆
Promise 最大的特点就是可以写成规范的链式的写法，程序流程可以很清楚。

### 如何使用

在最新的 chrome 和 firefox 中已经实现
在最新的 nodejs 中，已经引入了这个模块

### 在什么场景下使用

只要是异步编程，都可以使用 Promise

### Promise 库

bluebird
Q
then.js
es6-promise
...

# nvm

## 安装

http://blog.csdn.net/tyro_java/article/details/51232458

## 使用

nvm install 版本

nvm use 版本

nvm list // 查看版本
