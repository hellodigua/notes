## 笔记

[Token ，Cookie 和 Session 的区别](http://blog.csdn.net/Jmilk/article/details/55686267?locationNum=9&fps=1#cookie)

[快速理解 session/token/cookie 认证方式](http://blog.csdn.net/Jmilk/article/details/55686267?locationNum=9&fps=1#cookie)

## basic auth

简单说就是每次请求 API 时都提供用户的 username 和 password

这种方式优点和缺点都很明显。

不过这种方式已经很少见了，就不谈了。

## Cookie + Session

### Cookie

WebApp 一般以 HTTP 协议作为传输协议但 HTTP 协议是无状态的。

也就是说客户端与服务端一旦数据交换完毕后，两者之间的连接就会被关闭。客户端再次发送请求时需要建立新的连接。

这就意味着服务端和客户端两者之间无法通过 HTTP 的连接来实现会话跟踪。显然这是不合理的因为这样无法保证完成一次 WebApp 业务流程中所产生的若干次请求/响应操作的原子性从而会导致业务逻辑混乱。

cookie 就是为了解决这一问题所引入的会话跟踪机制。

### Session

当客户端请求服务端并通过身份认证后，服务端就会生成并保存身份认证相关的 session 数据，并将对应的 sesssion_id 写入 cookie 然后再响应到客户端，客户端会把 cookie 文件保存在本地。

此后，客户端的所有请求都会附带该 session_id，以确定服务端是否存在对应的 session 数据以及检验 session 数据中的 login-status。

如果存在且 login-status 为 True，则证明客户端是被信任的，无须再次认证身份。否则，需要重新进入身份认证流程。

缺点:

服务端保存 session 数据会增加运维和存储开销
因为一个 session_id 只能被保存有对应 session 数据的 服务端完成认证，所以在拥有多台 服务端集群架构的场景中会降低其扩展性。
如果原生 App 不具备 cookie 功能模块，就会加大其接入 session 认证后端的难度。

## token

token(令牌) 由 uid+time+sign[+固定参数] 组成:

uid: 用户唯一身份标识
time: 当前时间的时间戳
sign: 签名, 使用 hash/encrypt 压缩成定长的十六进制字符串，以防止第三方恶意拼接
固定参数(可选): 将一些常用的固定参数加入到 token 中是为了避免重复查库

### 验证流程

客户端使用用户名跟密码请求登录
服务端收到请求，去验证用户名与密码
验证成功后，服务端会签发一个 Token，再把这个 Token 发送给客户端
客户端收到 Token 以后可以把它存储起来，比如放在 Cookie 里或者 Local Storage 里
客户端每次向服务端请求资源的时候需要带着服务端签发的 Token
服务端收到请求，然后去验证客户端请求里面带着的 Token，如果验证成功，就向客户端返回请求的数据
