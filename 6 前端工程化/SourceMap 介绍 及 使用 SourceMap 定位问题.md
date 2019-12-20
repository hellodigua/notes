# SourceMap 介绍 及 使用 SourceMap 定位问题

## 由来

Javascript 越来越复杂，大部分源码都需要经过转换才能投入生产环境。

常见的源码转换主要是以下情况：

    1. 压缩，减小体积
    2. 多个文件合并，减少HTTP请求数。
    3. 其他语言编译成JavaScript。

通常，JavaScript 的解释器会告诉我们，第几行第几列代码出错。但是，这对于转换后的代码毫无用处，使用 Webpack 打包后一个文件只有几行，每行上万个字符，所有内部变量都改了名字。只看报错信息根本不知道它所对应的原始位置。

这就是 Source map 想要解决的问题。

## 介绍

SourceMap 就是一个信息文件，里面储存着位置信息。也就是说，转换后的代码的每一个位置，所对应的转换前的位置。

### chrome 调试工具启用 SourceMap

在 Developer Tools 的 Setting 设置中，确认选中"Enable source maps"（默认已启用）

### 项目使用 SourceMap

只要在转换后的代码尾部，加上一行就可以了。

```
//@ sourceMappingURL=/path/to/file.js.map
```

map 文件可以放在网络上，也可以放在本地文件系统。

### SourceMap 的格式

```
{
　　version : 3,
　　file: "out.js",
　　sourceRoot : "",
　　sources: ["foo.js", "bar.js"],
　　names: ["src", "maps", "are", "fun"],
　　mappings: "AAgBC,SAAQ,CAAEA"
}
```

- version：Source map 的版本，目前为 3。
- file：转换后的文件名。
- sourceRoot：转换前的文件所在的目录。如果与转换前的文件在同一目录，该项为空。
- sources：转换前的文件。该项是一个数组，表示可能存在多个文件合并。
- names：转换前的所有变量名和属性名。
- mappings：记录位置信息的字符串，下文详细介绍。

### mappings 属性

它保存了两个文件的各个位置是如何一一对应的的信息。

这是一个很长的字符串，它分成三层：

第一层是行对应，以分号（;）表示，每个分号对应转换后源码的一行。所以，第一个分号前的内容，就对应源码的第一行，以此类推。

第二层是位置对应，以逗号（,）表示，每个逗号对应转换后源码的一个位置。所以，第一个逗号前的内容，就对应该行源码的第一个位置，以此类推。

第三层是位置转换，以 VLQ 编码表示，代表该位置对应的转换前的源码位置。

## 如何解析 SourceMap 为源文件

1. 首先需要获取到 SourceMap 文件

2. 安装 npm 包 reverse-sourcemap

```
npm i -g reverse-sourcemap
```

3. 反解 map 文件

```
reverse-sourcemap -v filename -o dist
```

## 参考链接

[Javascript SourceMap 详解](http://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html)
[使用 SourceMap 调试线上错误](https://yi-jy.com/2018/01/25/sourcemap-debug/)
