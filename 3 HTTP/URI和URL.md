# URI 和 URL

## 简介

URI（Uniform Resource Identifier）:统一资源标识符,服务器资源名被称为统一资源标识符。
URL（Uniform Resource Locator）:统一资源定位符，描述了一台特定服务器上某资源的特定位置。
URN（Uniform Resource Name）:统一资源名称

- URL 组成：

协议://主机名[:端口]/ 路径/[:参数][?查询]#Fragment

protocol :// hostname[:port] / path / [:parameters][?query]#fragment

- URI,URL,URN 三者关系：

URL 和 URN 是 URI 的子集

## Data URLS

即前缀为 data: 协议的的 URL，其允许内容创建者向文档中嵌入小文件。

Data URLs 由四个部分组成：前缀(data:)、指示数据类型的 MIME 类型、如果非文本则为可选的 base64 标记、数据本身：

```
data:[<mediatype>][;base64],<data>
```

mediatype 是个 MIME 类型的字符串，例如 "image/jpeg" 表示 JPEG 图像文件。如果被省略，则默认值为 text/plain;charset=US-ASCII

目前，Data URI scheme 支持的类型有：

```
data:,                            文本数据
data:text/plain,                    文本数据
data:text/html,                  HTML代码
data:text/html;base64,            base64编码的HTML代码
data:text/css,                    CSS代码
data:text/css;base64,              base64编码的CSS代码
data:text/javascript,              Javascript代码
data:text/javascript;base64,        base64编码的Javascript代码
data:image/gif;base64,            base64编码的gif图片数据
data:image/png;base64,            base64编码的png图片数据
data:image/jpeg;base64,          base64编码的jpeg图片数据
data:image/x-icon;base64,          base64编码的icon图片数据
```

### Data URI Scheme 的优缺点

优点：

1. 减少资源请求链接数。
2. 当访问外部资源很麻烦或受限时，可以很好的利用 Data URI Scheme

缺点：

1. Data URL 形式的图片不会被浏览器缓存，这意味着每次访问这样页面时都被下载一次，
   但可通过在 css 文件的 background-image 样式规则使用 Data URI Scheme，使其随 css 文件一同被浏览器缓存起来）。
2. Base64 编码的数据体积通常是原数据的体积 4/3，
   也就是 Data URL 形式的图片会比二进制格式的图片体积大 1/3。
3. 移动端性能比较低。
