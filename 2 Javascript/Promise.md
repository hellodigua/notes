# Promise

## 1. Promise 的立即执行性

Promise 对象表示未来某个将要发生的事件，但在创建（new）Promise 时，作为 Promise 参数传入的函数是会被立即执行的，只是其中执行的代码可以是异步代码。有些同学会认为，当 Promise 对象调用 then 方法时，Promise 接收的函数才会执行，这是错误的。因此，代码中"create a promise"先于"after new Promise"输出。

```js
var p = new Promise(function(resolve, reject) {
  console.log('create a promise');
  resolve('success');
});

console.log('after new Promise');

p.then(function(value) {
  console.log(value);
});
```

控制台输出：

```js
'create a promise';
'after new Promise';
'success';
```

## 2. Promise 的三种状态

Promise 的内部实现是一个状态机。Promise 有三种状态：pending，resolved，rejected。当 Promise 刚创建完成时，处于 pending 状态；当 Promise 中的函数参数执行了 resolve 后，Promise 由 pending 状态变成 resolved 状态；如果在 Promise 的函数参数中执行的不是 resolve 方法，而是 reject 方法，那么 Promise 会由 pending 状态变成 rejected 状态。

```js
var p1 = new Promise(function(resolve, reject) {
  resolve(1);
});
var p2 = new Promise(function(resolve, reject) {
  setTimeout(function() {
    resolve(2);
  }, 500);
});
var p3 = new Promise(function(resolve, reject) {
  setTimeout(function() {
    reject(3);
  }, 500);
});

console.log(p1);
console.log(p2);
console.log(p3);
setTimeout(function() {
  console.log(p2);
}, 1000);
setTimeout(function() {
  console.log(p3);
}, 1000);

p1.then(function(value) {
  console.log(value);
});
p2.then(function(value) {
  console.log(value);
});
p3.catch(function(err) {
  console.log(err);
});
```

控制台输出：

```js
Promise {[[PromiseStatus]]: "resolved", [[PromiseValue]]: 1}
Promise {[[PromiseStatus]]: "pending", [[PromiseValue]]: undefined}
Promise {[[PromiseStatus]]: "pending", [[PromiseValue]]: undefined}
1
2
3
Promise {[[PromiseStatus]]: "resolved", [[PromiseValue]]: 2}
Promise {[[PromiseStatus]]: "rejected", [[PromiseValue]]: 3}
```

## 3. Promise 状态的不可逆转性

Promise 状态一旦变成 resolved 或 rejected 时，Promise 的状态和值就固定下来了，不论你后续再怎么调用 resolve 或 reject 方法，都不能改变它的状态和值。因此，p1 中 resolve("success2")并不能将 p1 的值更改为 success2，p2 中 reject("reject")也不能将 p2 的状态由 resolved 改变为 rejected.

## 4. 链式调用

Promise 对象的 then 方法返回一个新的 Promise 对象，因此可以通过链式调用 then 方法。then 方法接收两个函数作为参数，第一个参数是 Promise 执行成功时的回调，第二个参数是 Promise 执行失败时的回调。两个函数只会有一个被调用，函数的返回值将被用作创建 then 返回的 Promise 对象。这两个参数的返回值可以是以下三种情况中的一种：

## 5. Promise.then() 回调异步性

```js
var p = new Promise(function(resolve, reject) {
  resolve('success');
});

p.then(function(value) {
  console.log(value);
});

console.log('which one is called first ?');
```

控制台输出：

```js
'which one is called first ?';
'success';
```

Promise 接收的函数参数是同步执行的，但 then 方法中的回调函数执行则是异步的，因此，"success"会在后面输出。

## 6. Promise 中的异常

Promise 中的异常由 then 参数中第二个回调函数（Promise 执行失败的回调）处理，异常信息将作为 Promise 的值。异常一旦得到处理，then 返回的后续 Promise 对象将恢复正常，并会被 Promise 执行成功的回调函数处理。另外，需要注意 p1、p2 多级 then 的回调函数是交替执行的 ，这正是由 Promise then 回调的异步性决定的。

## 7. Promise.resolve()

Promise.resolve(...)可以接收一个值或者是一个 Promise 对象作为参数。当参数是普通值时，它返回一个 resolved 状态的 Promise 对象，对象的值就是这个参数；当参数是一个 Promise 对象时，它直接返回这个 Promise 参数。

这里有点复杂，建议去下面链接直接看下代码。

## 8. resolve vs reject

这里有点复杂，建议去下面链接直接看下代码。

## 参考链接

[八段代码彻底掌握 Promise](https://juejin.im/post/597724c26fb9a06bb75260e8)
[Promise 对象 - ECMAScript 6 入门](http://es6.ruanyifeng.com/#docs/promise)
