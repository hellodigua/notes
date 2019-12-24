# jade

标签（空格分隔）： 前端

---

# 介绍

## 概念

Jade 是一个高性能的模板引擎，它是使用 Javascript 实现的，并且可以用 Nodejs 使用，模板引擎是一种将动静部分糅合的一种实现机制或者技术。

## 特点

1. 超强的可读性
2. 灵活易用的缩进
3. 简洁易懂
4. 性能很好
5. 可以命令行实现...

## jade 解决的问题

主要是为了解决超长的 dom 结构

## 安装

首先得有 node，然后
npm install -g jade 就好了

# 基本规则

1. 各类标签不需要写尖括号
2. 子元素相对于父元素需要保持缩进
3. 标签和文本需要空格分开

# 基本语法

## 标签

### 各类标签只需要写首单词

html 转换为

  <html></html>
  pre 转换为
  <pre></pre>

### 选择器 id

div#container 转换为

  <div id="container"></div>

### 选择器 class

div.foo 转换为

  <div class="foo"></div>

### 多个选择器

div#foo.bar.baz 转换为

  <div id="foo" class="bar baz"></div>
  .foo
  .bar 转换为
  <div class="foo"></div><div class="bar"></div>

### div 是个特例

怎么说呢，如果标签是 div 的话，那么 div 就可以省略不写了
div.container 可以简写成
.container

### 文本

p helloworld 转换为

  <p>helloworld</p>

### 多行文本

p
| 1. aa
| 2. bb
| 3. cc
或者
p. 1. aa 2. bb 3. cc

### 多行文本中插入字符

p
| 1. aa
strone aaa
| 2. bb
| 3. cc
或者
p. 1. aa
<strong>aaa</strong> 2. bb 3. cc

### 属性

使用()作为属性分隔符，里面不同的属性可以用, 分隔
input(type="checkbox", checked)
a(href='http://baidu.com/', target='\_blank')
div(class="foo", id="for")

## 样式

style.
body{background: #fff}

## 注释

### 单行注释

// this is some paragraphs
// this is another paragraphs

### 块注释

//
#content
h1 emample 会被渲染为

<!--
      <div id="content">
        <h1>Example</h1>
      </div>
    -->

### 条件注释

//if IE
a(href='http://baidu.com/') something 会被渲染为

  <!--[if IE]>
      <a href="http://baidu.com/">something</a>
  <![endif]-->

# 代码

Jade 目前支持三种类型的可执行代码。第一种是前缀 -， 这是不会被输出的；一种是使用 =， 但=输出的代码默认是转义的；如果想要输出不转义的值的话，可以使用!=

## 循环

- var items = ["one", "two", "three"] //定义一个数组
  each item in items //循环语句
  li= item //赋值进 li 标签
  渲染为：
    <li>one</li>
    <li>two</li>
    <li>three</li>

## 条件语句

# 其他

## 文档声明

doctype html

## 引入资源文件

script(src='/vendor/jquery.js')
link(rel="stylesheet", href="http://static.baidu.com/style.css")

## 包含

    ./layout.jade
    ./includes/
      ./head.jade
      ./tail.jade

## 命令行

### 使用

jade [option][dir|file]

### 选项

-w --watch 监视文件改变
-p --path <path> 在处理 stdio 时，查找包含文件时的查找路径
-P --pretty 格式化 html 输出（带缩进）
-h --version 输出帮助信息
-v --version 输出版本号
-o --out <dir> 输出编译后的 html 到<dir>
-O --obj <str> javascript 选项
-c --client 编译浏览器端可用的 runtime.js
-D --no-debug 关闭编译的调试选项（函数会更小）
