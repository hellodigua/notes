# PostCSS

## 介绍

PostCSS 深入学习：你需要知道什么：
http://www.w3cplus.com/PostCSS/postcss-deep-dive-what-you-need-to-know.html

PostCSS 是 CSS 变成 JavaScript 的数据，使它变成可操作。PostCSS 是基于 JavaScript 插件，然后执行代码操作。PostCSS 自身并不会改变 CSS，它只是一种插件，为执行任何的转变铺平道路。
简而言之，PostCSS 是一个处理 CSS 的工具，事实上可以把 PostCSS 理解为一个处理器平台，在平台上安装插件以便实现许多功能：

- 优化代码
- 添加未来语法
- 处理兼容性
- 添加变量和逻辑
- 等...

## post-salad

沙拉是一个基于 PostCSS 的 CSS 解决方案，它提供了一系列快捷的 at-rule 和默认语法声明来帮助你快速地搭建项目样式与类库，它只在调用时才输出代码，而不是直接提供 CSS 类库。
