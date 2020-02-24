# Babel AST

## AST 是啥

抽象语法树，是源代码语法结构的一种抽象表示，它以树状的形式表现编程语言的语法结构。

## 工具

[https://astexplorer.net/ 查询 js 的 ast 节点](https://astexplorer.net/)

## 简介

- @babel/generator: 将 ast 转译成代码
- @babel/parser: 将代码转成 ast
- @babel/traverse: 节点操作工具

可以看看慕阳的这个图加深理解：
https://cdn.nlark.com/yuque/0/2019/jpeg/245888/1566529908074-9db99dad-47b7-44ed-ac32-ac35240c797a.jpeg

对应文档：

[@babel/generator](https://babeljs.io/docs/en/babel-generator)
[@babel/parser](https://babeljs.io/docs/en/babel-parser)
[@babel/traverse](https://babeljs.io/docs/en/babel-traverse)
[@babel/types](https://babeljs.io/docs/en/babel-types#api)

参考

[顾重的 babel AST 笔记](https://note.youdao.com/ynoteshare1/index.html?id=1303bb603a088d4c2dc69fc71ef9520b&type=note)
[慕阳的 组件库项目工程化的两个尝试](https://www.yuque.com/xuemuyang/zsevtt/zubg5g#57348f24)
