# 常见的四种 Content-Type 类型：

application/x-www-form-urlencoded 常见的 form 提交
multipart/form-data 文件提交
application/json 提交 json 格式的数据
text/xml 提交 xml 格式的数据

# 常见的请求类型：（其实一共 8 种）

GET 从服务器取出资源
POST 在服务器新建一个资源
PUT 在服务器更新资源（客户端提供改编后的完整资源）
PATCH 在服务器更新资源（客户端提供改变的属性）
DELETE 从服务器删除资源

# http header 解析

## Request

### Host

一个 HTTP 请求会发送至一个特定的 IP 地址，但是大部分服务器都有在同一 IP 地址下托管多个网站的能力，那么服务器必须知道浏览器请求的是哪个域名下的资源。
Host: rlog.cn
这只是基本的主机名，包含域名和子级域名。

### User-Agent

User-Agent: Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US; rv:1.9.1.5) Gecko/20091102 Firefox/3.5.5 (.NET CLR 3.5.30729)

这个头部可以携带如下几条信息：

- 浏览器名和版本号.
- 操作系统名和版本号.
- 默认语言.

这就是某些网站用来收集访客信息的一般手段。例如，你可以判断访客是否在使用手机访问你的网站，然后决定是否将他们引导至一个在低分辨率下表现良好的移动网站。

### Accept-Language

Accept-Language: en-us,en;q=0.5

这个信息可以说明用户的默认语言设置。如果网站有不同的语言版本，那么就可以通过这个信息来重定向用户的浏览器。

它可以通过逗号分割来携带多国语言。第一个会是首选的语言，其它语言会携带一个“q”值，来表示用户对该语言的喜好程度（0~1）。

### Accept-Encoding

Accept-Encoding: gzip,deflate

大部分的现代浏览器都支持 gzip 压缩，并会把这一信息报告给服务器。这时服务器就会压缩过的 HTML 发送给浏览器。这可以减少近 80%的文件大小，以节省下载时间和带宽。

### If-Modified-Since

如果一个页面已经在你的浏览器中被缓存，那么你下次浏览时浏览器将会检测文档是否被修改过，那么它就会发送这样的头部：

If-Modified-Since: Sat, 28 Nov 2009 06:38:19 GMT

如果自从这个时间以来未被修改过，那么服务器将会返回“304 Not Modified”，而且不会再返回内容。浏览器将自动去缓存中读取内容

### Cookie

顾名思义，他会发送你浏览器中存储的 Cookie 信息给服务器。

Cookie: PHPSESSID=r2t5uvjq435r4q7ib3vtdjq120; foo=bar

它是用分号分割的一组名值对。Cookie 也可以包含 session id。

### Referer

顾名思义, 头部将会包含 referring url 信息。

例如，我访问 Nettuts+的主页并点击了一个链接，这个头部信息将会发送到浏览器：
Referer: http://net.tutsplus.com/

### Authorization

当一个页面需要授权，浏览器就会弹出一个登陆窗口，输入正确的帐号后，浏览器会发送一个 HTTP 请求，但此时会包含这样一个头部：

Authorization: Basic bXl1c2VyOm15cGFzcw==

包含在头部的这部分信息是 base64 encoded。例如，base64_decode(‘bXl1c2VyOm15cGFzcw==’) 会被转化为 ‘myuser:mypass’ 。

## Response

### Cache-Control

w3.org 的定义是：“The Cache-Control general-header field is used to specify directives which MUST be obeyed by all caching mechanisms along the request/response chain.” 其中“caching mechanisms” 包含一些你 ISP 可能会用到的 网关和代理信息。

例如：

Cache-Control: max-age=3600, public

“public”意味着这个响应可以被任何人缓存，“max-age” 则表明了该缓存有效的秒数。允许你的网站被缓存降大大减少下载时间和带宽，同时也提高的浏览器的载入速度。

也可以通过设置 “no-cache” 指令来禁止缓存：

Cache-Control: no-cache

### Content-Type

这个头部包含了文档的”mime-type”。浏览器将会依据该参数决定如何对文档进行解析。例如，一个 html 页面（或者有 html 输出的 php 页面）将会返回这样的东西：

Content-Type: text/html; charset=UTF-8

‘text’ 是文档类型，‘html’则是文档子类型。 这个头部还包括了更多信息，例如 charset。

如果是一个图片，将会发送这样的响应：

Content-Type: image/gif

浏览器可以通过 mime-type 来决定使用外部程序还是自身扩展来打开该文档。如下的例子降调用 Adobe Reader：

Content-Type: application/pdf

直接载入，Apache 通常会自动判断文档的 mime-type 并且添加合适的信息到头部去。并且大部分浏览器都有一定程度的容错，在头部未提供或者错误提供该信息的情况下它会去自动检测 mime-type。

### Content-Disposition

这个头部信息将告诉浏览器打开一个文件下载窗口，而不是试图解析该响应的内容。例如：

Content-Disposition: attachment; filename="download.zip"

### Content-Length

当内容将要被传输到浏览器时，服务器可以通过该头部告知浏览器将要传送文件的大小（bytes）。

Content-Length: 89123

对于文件下载来说这个信息相当的有用。这就是为什么浏览器知道下载进度的原因。

### Etag

这是另一个为缓存而产生的头部信息。它看起来会是这样：

Etag: "pub1259380237;gz"

服务器可能会将该信息和每个被发送文件一起响应给浏览器。该值可以包含文档的最后修改日期，文件大小或者文件校验和。浏览会把它和所接收到的文档一起缓存。下一次当浏览器再次请求同一文件时将会发送如下的 HTTP 请求：

If-None-Match: "pub1259380237;gz"

如果所请求的文档 Etag 值和它一致，服务器将会发送 304 状态码，而不是 2oo。并且不返回内容。浏览器此时就会从缓存加载该文件

### Last-Modified

顾名思义，这个头部信息用 GMT 格式表明了文档的最后修改时间：

Last-Modified: Sat, 28 Nov 2009 03:50:37 GMT

$modify_time = filemtime($file);
header("Last-Modified: " . gmdate("D, d M Y H:i:s", \$modify_time) . " GMT");

它提供了另一种缓存机制。浏览器可能会发送这样的请求：

If-Modified-Since: Sat, 28 Nov 2009 06:38:19 GMT

### Location

这个头部是用来重定向的。如果响应代码为 301 或者 302 ，服务器就必须发送该头部。例如，当你访问 http://www.nettuts.com 时浏览器就会收到如下的响应：

HTTP/1.x 301 Moved Permanently
...
Location: http://net.tutsplus.com/
...

### Set-Cookie

当一个网站需要设置或者更新你浏览的 cookie 信息时，它就会使用这样的头部：

Set-Cookie: skin=noskin; path=/; domain=.amazon.com; expires=Sun, 29-Nov-2009 21:42:28 GMT
Set-Cookie: session-id=120-7333518-8165026; path=/; domain=.amazon.com; expires=Sat Feb 27 08:00:00 2010 GMT

每个 cookie 会作为单独的一条头部信息。注意，通过 js 设置 cookie 将不会体现在 HTTP 头中。

### Content-Encoding

这个头部通常会在返回内容被压缩时设置。

Content-Encoding: gzip
