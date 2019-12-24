1. vue-cli 的地址代理，可以将 url 映射成目标 url；本质是在本地虚拟一个服务端接收你的请求，并代你发送该请求。不过只能在开发环境下实现跨域。

在 config/index.js 下，找到 proxyTable

proxyTable: {
'/api':{
target: 'http://xxx.com',
changeOrigin: true,
pathRewrite: {
'^/api': '/api'
}
}
},

表示，本地所有/api 开头的服务，都将转发到http://xxx.com/api那里
不过这个只适用于开发模式

2. 服务端设置响应头，允许接受来自\*\*\*\*的请求

router.all('\*', function (req, res, next) {
res.header("Access-Control-Allow-Origin", "\*\*\*\*");
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
next();
});
