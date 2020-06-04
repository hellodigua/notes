# 用 Javascript 下载文件

下载文件是一个非常常见的需求，但由于浏览器的安全策略的限制，我们通常只能通过一个额外的页面，访问某个文件的 url 来实现下载功能，但是这种用户体验很不好，对于图片等资源文件，用户还需要点击才能实现下载。

## 解决方案

1. file-saver
   https://www.npmjs.com/package/file-saver
2. 使用<a>标签的 download 属性
   https://scarletsky.github.io/2016/07/03/download-file-using-javascript/#Blob-%E5%AF%B9%E8%B1%A1
