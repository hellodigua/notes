# 理解call()和apply()

call() 和 apply() 其实是同一个东西，区别只有参数不同：call()方法接受若干个参数的列表，而apply()方法接受的是一个包含多个参数的数组，传递给call()和apply()的第一个参数是相同的(即绑定this值的对象)。

```js
// 函数调用
obj.func();

func.call(this, arg1, arg2);

func.apply(this, [arg1, arg2]);
```

我们通常使用的函数有两种：一种是作为某个对象的方法，一种是作为独立的函数。

当作为对象方法的时候，函数中的this往往指的都是调用它的对象；而如果是一个独立函数，我们通常不会在其中使用this。

普通的函数调用隐式传入 this，call 和 apply 可以显式指定它。

[如何理解和熟练运用js中的call及apply](https://www.zhihu.com/question/20289071)

## 其他

1. call与apply的性能不同，浏览器中的 apply 是借助 call 来实现的（apply 是 call 的语法糖。），这也是call比apply快的原因。一些基础工具库的内部实现会尽可能的使用call，而不是apply。比如说underscore.js中的私有函数optimizeCb。

