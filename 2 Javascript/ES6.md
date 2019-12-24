# ES6

标签（空格分隔）： 前端

---

# 前言

## ES6 是什么

- ECMAScript 6.0（简称 ES6）是 JavaScript 语言的下一代标准，在 2015 年 6 月正式发布。
- ECMAScript 和 JavaScript 的关系是，前者是后者的规格，后者是前者的一种实现。
- ES6 的大部分特性，主流浏览器大部分已经实现。
- Node.js 是 JavaScript 语言的服务器运行环境，对 ES6 的支持度比浏览器更高。

## babel

Babel 是一个广泛使用的 ES6 转码器，可以将 ES6 代码转为 ES5 代码，从而在现有环境执行。这意味着，你可以用 ES6 的方式编写程序，又不用担心现有环境是否支持。

# 基础

## 变量声明

ES5 只有两种声明变量的方法：var 命令和 function 命令。ES6 除了添加 let 和 const 命令，还有 import 命令和 class 命令。所以，ES6 一共有 6 种声明变量的方法。

### let

le 用于申明变量，它的用法类似于 var，但是所声明的变量，只在 let 命令所在的代码块内有效。

- 特性： 不存在变量提升

  var 会发生"变量提升"现象，即变量可以在声明之前使用，值为 undefined
  let 要求变量一定要在声明后使用，否则报错

- 特性： 暂时性死区

  只要块级作用域内存在 let 命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。
  ES6 明确规定，如果区块中存在 let 和 const 命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。
  总之，在代码块内，使用 let 命令声明变量之前，该变量都是不可用的。这在语法上，称为“暂时性死区”

        typeof x; // ReferenceError
        let x;

- 特性： 不允许重复声明

  let 不允许在相同作用域内，重复声明同一个变量

        function () {
          let a = 10; // 报错
          var a = 1;
        }

### const

- const 声明一个只读的常量。一旦声明，常量的值就不能改变。
- const 声明的变量不得改变值，这意味着，const 一旦声明变量，就必须立即初始化，不能留到以后赋值。
- const 的作用域与 let 命令相同：只在声明所在的块级作用域内有效。
- const 命令声明的常量也是不提升，同样存在暂时性死区，只能在声明的位置后面使用。
- const 声明的常量，建议大写

## 块级作用域

ES5 只有全局作用域和函数作用域，没有块级作用域，这带来很多不合理的场景。

例子请看 demo [http://es6.ruanyifeng.com/#docs/let#为什么需要块级作用域？](http://es6.ruanyifeng.com/#docs/let#为什么需要块级作用域？)

let 实际上为 JavaScript 新增了块级作用域。

- ES6 允许块级作用域的任意嵌套：

        {{{{{let insane = 'Hello World'}}}}}
        // 代码使用了一个五层的块级作用域。外层作用域无法读取内层作用域的变量。

- 内层作用域可以定义外层作用域的同名变量

        {{{{
          let insane = 'Hello World';
          {
            let insane = 'Hello World'
          }
        }}}}

- 函数可以在块级作用域中声明

        if (true) {
          function f() {} // 不报错
        }

  块级作用域内声明的函数类似于 let，对作用域之外没有影响

### do

本质上，块级作用域是一个语句，将多个操作封装在一起，没有返回值

    {
      let t = f();
      t = t * t + 1;
    }

上面代码中，块级作用域将两个语句封装在一起。但是，在块级作用域以外，没有办法得到 t 的值，因为块级作用域不返回值，除非 t 是全局变量。

do 表达式的作用是，使得块级作用域可以变为表达式，也就是说可以返回值

    let x = do {
      let t = f();
      t * t + 1;
    };
    变量x会得到整个块级作用域的返回值

### 顶层对象

顶层对象，在浏览器环境指的是 window 对象，在 Node 指的是 global 对象。

ES6 中：

var 命令和 function 命令声明的全局变量，依旧是顶层对象的属性
let 命令、const 命令、class 命令声明的全局变量，不属于顶层对象的属性

    var a = 1;
    // 如果在Node的REPL环境，可以写成global.a
    // 或者采用通用方法，写成this.a
    window.a // 1

    let b = 1;
    window.b // undefined

上面代码中，全局变量 a 由 var 命令声明，所以它是顶层对象的属性；全局变量 b 由 let 命令声明，所以它不是顶层对象的属性，返回 undefined。

## 变量的解构赋值

### 数组的解构赋值

- 基本用法

        let [a, b, c] = [1, 2, 3];

上面代码表示，可以从数组中提取值，按照对应位置，对变量赋值。
如果解构不成功，变量的值就等于 undefined。

- 默认值

解构赋值允许指定默认值。

    let [foo = true] = [];
    foo // true

    let [x, y = 'b'] = ['a']; // x='a', y='b'
    let [x, y = 'b'] = ['a', undefined]; // x='a', y='b'

### 对象的解构赋值

    let { foo, bar } = { foo: "aaa", bar: "bbb" };
    foo // "aaa"
    bar // "bbb"

对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。

    let { bar, foo } = { foo: "aaa", bar: "bbb" };
    foo // "aaa"
    bar // "bbb"

    let { baz } = { foo: "aaa", bar: "bbb" };
    baz // undefined

如果变量名与属性名不一致，必须写成下面这样。

    var { foo: baz } = { foo: 'aaa', bar: 'bbb' };
    baz // "aaa"

    let obj = { first: 'hello', last: 'world' };
    let { first: f, last: l } = obj;
    f // 'hello'
    l // 'world'

这实际上说明，对象的解构赋值是下面形式的简写（参见《对象的扩展》一章）。

    let { foo: foo, bar: bar } = { foo: "aaa", bar: "bbb" };

也就是说，对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。真正被赋值的是后者，而不是前者。

### 字符串的解构赋值

字符串也可以解构赋值。这是因为此时，字符串被转换成了一个类似数组的对象。

    const [a, b, c, d, e] = 'hello';
    a // "h"
    b // "e"
    c // "l"
    d // "l"
    e // "o"

类似数组的对象都有一个 length 属性，因此还可以对这个属性解构赋值。

    let {length : len} = 'hello';
    len // 5

### 数组和布尔值的解构赋值

解构赋值的规则是，只要等号右边的值不是对象，就先将其转为对象。

具体请看：[http://es6.ruanyifeng.com/#docs/destructuring#数值和布尔值的解构赋值](http://es6.ruanyifeng.com/#docs/destructuring#数值和布尔值的解构赋值)

### 函数参数的解构赋值

具体请看：[http://es6.ruanyifeng.com/#docs/destructuring#函数参数的解构赋值](http://es6.ruanyifeng.com/#docs/destructuring#函数参数的解构赋值)

### 解构赋值的用途

- 交换变量的值

        let x = 1;
        let y = 2;

        [x, y] = [y, x];

- 从函数返回多个值

函数只能返回一个值，如果要返回多个值，只能将它们放在数组或对象里返回。有了解构赋值，取出这些值就非常方便。

        // 返回一个数组
        function example() {
          return [1, 2, 3];
        }
        let [a, b, c] = example();

        // 返回一个对象
        function example() {
          return {
            foo: 1,
            bar: 2
          };
        }
        let { foo, bar } = example();

- 函数参数的定义

解构赋值可以方便地将一组参数与变量名对应起来。

        // 参数是一组有次序的值
        function f([x, y, z]) { ... }
        f([1, 2, 3]);

        // 参数是一组无次序的值
        function f({x, y, z}) { ... }
        f({z: 3, y: 2, x: 1});

- 提取 JSON 数据

        let jsonData = {
          id: 42,
          status: "OK",
          data: [867, 5309]
        };

        let { id, status, data: number } = jsonData;

        console.log(id, status, number);
        // 42, "OK", [867, 5309]

- 函数参数的默认值

        jQuery.ajax = function (url, {
          async = true,
          beforeSend = function () {},
          cache = true,
          complete = function () {},
          crossDomain = false,
          global = true,
          // ... more config
        }) {
          // ... do stuff
        };

指定参数的默认值，就避免了在函数体内部再写 var foo = config.foo || 'default foo';这样的语句。

- 遍历 Map 结构

任何部署了 Iterator 接口的对象，都可以用 for...of 循环遍历。Map 结构原生支持 Iterator 接口，配合变量的解构赋值，获取键名和键值就非常方便。

var map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

for (let [key, value] of map) {
console.log(key + " is " + value);
}
// first is hello
// second is world

如果只想获取键名，或者只想获取键值，可以写成下面这样。

// 获取键名
for (let [key] of map) {
// ...
}

// 获取键值
for (let [,value] of map) {
// ...
}

- 输入模块的指定方法

加载模块时，往往需要指定输入那些方法。解构赋值使得输入语句非常清晰。

    const { SourceMapConsumer, SourceNode } = require("source-map");
