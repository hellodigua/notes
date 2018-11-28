# CommonJS规范

标签（空格分隔）： 知识理论

---

# CommonJS介绍

- CommonJS 是一个有志于构建 JavaScript 生态圈的组织，整个社区致力于提高 JavaScript 程序的可移植性和可交换性，无论是在服务端还是浏览器端。

- CommonJS规范定义很多普通应用程序（主要指非浏览器的应用）使用的API，从而填补了这个空白。

- CommonJS的终极目标是提供一个类似Python，Ruby和Java标准库。这样的话，开发者可以使用CommonJS API编写应用程序，然后这些应用可以运行在不同的JavaScript解释器和不同的主机环境中。

## NodeJS和CommonJS的关系

CommonJS是一种规范，NodeJS是这种规范的实现。

## CommonJS的核心思想

允许模块通过 require 方法来同步加载所要依赖的其他模块，然后通过 exports 或 module.exports 来导出需要暴露的接口。

# 概述

Node应用由模块组成，采用CommonJS模块规范。

根据这个规范，每个文件就是一个模块，有自己的作用域。在一个文件里面定义的变量、函数、类，都是私有的，对其他文件不可见。

    // example.js
    var x = 5;
    var addX = function (value) {
      return value + x;
    };
    
上面的代码中，变量x和函数addX，是当前文件example.js私有的，其他文件不可见。

CommonJS规范规定，每个模块内部，module变量代表当前模块。这个变量是一个对象，它的exports属性（即module.exports）是对外的接口。加载某个模块，其实是加载该模块的module.exports属性。

## CommonJS模块的特点

- 所有代码都运行在模块作用域，不会污染全局作用域。
- 模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果就被缓存了，以后再加载，就直接读取缓存结果。要想让模块再次运行，必须清除缓存。
- 模块加载的顺序，按照其在代码中出现的顺序。

# Module对象

Node内部提供一个Module构建函数。所有模块都是Module的实例。
每个模块内部，都有一个module对象，代表当前模块。它有以下属性。

- module.id 模块的识别符，通常是带有绝对路径的模块文件名。
- module.filename 模块的文件名，带有绝对路径。
- module.loaded 返回一个布尔值，表示模块是否已经完成加载。
- module.parent 返回一个对象，表示调用该模块的模块。
- module.children 返回一个数组，表示该模块要用到的其他模块。
- module.exports 表示模块对外输出的值。

## module.exports

module.exports属性表示当前模块对外输出的接口，其他文件加载该模块，实际上就是读取module.exports变量。

# require命令

require命令的基本功能是，读入并执行一个JavaScript文件，然后返回该模块的exports对象。如果没有发现指定模块，会报错。



