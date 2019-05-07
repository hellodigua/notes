# Express.js

## express-generator

express-generator可以快速创建应用程序框架

    npm install express-generator -g
    //安装框架
    
    express myapp
    // 创建应用
    cd myapp
    npm install
    npm start

## 路由

路由用于确定应用程序如何响应对特定端点的客户机请求，包含一个 URI（或路径）和一个特定的 HTTP 请求方法（GET、POST 等）

路由定义：

    app.METHOD(PATH, HANDLER)

app 是 express 的实例。
METHOD 是 HTTP 请求方法。
PATH 是服务器上的路径。
HANDLER 是在路由匹配时执行的函数。

举例：

    // 访问页面
    app.get('/', function (req, res) {
      res.send('Hello World!');
    });

    // POST请求
    app.post('/', function (req, res) {
      res.send('Got a POST request');
    });
    
    // PUT请求
    app.put('/user', function (req, res) {
      res.send('Got a PUT request at /user');
    });
    
    // GET请求
    app.get('/sth', function (req, res) {
      res.send('Got a GET request');
    });
    
### req

req.query： 处理 get 请求，获取 get 请求参数
req.params： 处理 /:xxx 形式的 get 或 post 请求，获取请求参数
req.body： 处理 post 请求，获取 post 请求体
req.param()： 处理 get 和 post 请求，但查找优先级由高到低为 req.params→req.body→req.query

## 静态文件

为了提供诸如图像、CSS 文件和 JavaScript 文件之类的静态文件，应使用 Express 中的 express.static 内置中间件函数。

    //定义目录，静态文件可以放如public目录
    app.use(express.static('public'));
    




