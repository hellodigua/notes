# Promise

## 1. Promise的立即执行性

Promise对象表示未来某个将要发生的事件，但在创建（new）Promise时，作为Promise参数传入的函数是会被立即执行的，只是其中执行的代码可以是异步代码。有些同学会认为，当Promise对象调用then方法时，Promise接收的函数才会执行，这是错误的。因此，代码中"create a promise"先于"after new Promise"输出。

```js
var p = new Promise(function(resolve, reject){
  console.log("create a promise");
  resolve("success");
});

console.log("after new Promise");

p.then(function(value){
  console.log(value);
});
```

控制台输出：

```js
"create a promise"
"after new Promise"
"success"
```

## 2. Promise的三种状态

Promise的内部实现是一个状态机。Promise有三种状态：pending，resolved，rejected。当Promise刚创建完成时，处于pending状态；当Promise 中的函数参数执行了resolve后，Promise 由pending 状态变成resolved状态；如果在Promise 的函数参数中执行的不是resolve方法，而是reject方法，那么Promise 会由pending 状态变成rejected状态。

```js
var p1 = new Promise(function(resolve,reject){
  resolve(1);
});
var p2 = new Promise(function(resolve,reject){
  setTimeout(function(){
    resolve(2);
  }, 500);
});
var p3 = new Promise(function(resolve,reject){
  setTimeout(function(){
    reject(3);
  }, 500);
});

console.log(p1);
console.log(p2);
console.log(p3);
setTimeout(function(){
  console.log(p2);
}, 1000);
setTimeout(function(){
  console.log(p3);
}, 1000);

p1.then(function(value){
  console.log(value);
});
p2.then(function(value){
  console.log(value);
});
p3.catch(function(err){
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

Promise 状态一旦变成 resolved 或rejected时，Promise的状态和值就固定下来了，不论你后续再怎么调用 resolve或 reject方法，都不能改变它的状态和值。因此，p1中resolve("success2")并不能将p1的值更改为success2，p2中reject("reject")也不能将p2的状态由 resolved改变为 rejected.

## 4. 链式调用

Promise 对象的then 方法返回一个新的Promise对象，因此可以通过链式调用then方法。then方法接收两个函数作为参数，第一个参数是Promise执行成功时的回调，第二个参数是Promise执行失败时的回调。两个函数只会有一个被调用，函数的返回值将被用作创建then 返回的Promise对象。这两个参数的返回值可以是以下三种情况中的一种：

## 5. Promise.then() 回调异步性

```js
var p = new Promise(function(resolve, reject){
  resolve("success");
});

p.then(function(value){
  console.log(value);
});

console.log("which one is called first ?");
```

控制台输出：

```js
"which one is called first ?"
"success"
```

Promise接收的函数参数是同步执行的，但then方法中的回调函数执行则是异步的，因此，"success"会在后面输出。

## 6. Promise中的异常

Promise中的异常由 then参数中第二个回调函数（Promise执行失败的回调）处理，异常信息将作为Promise的值。异常一旦得到处理，then返回的后续 Promise对象将恢复正常，并会被Promise执行成功的回调函数处理。另外，需要注意p1、p2 多级then的回调函数是交替执行的 ，这正是由Promise then回调的异步性决定的。

## 7. Promise.resolve()

Promise.resolve(...)可以接收一个值或者是一个Promise对象作为参数。当参数是普通值时，它返回一个resolved 状态的Promise对象，对象的值就是这个参数；当参数是一个Promise对象时，它直接返回这个Promise参数。

这里有点复杂，建议去下面链接直接看下代码。

## 8. resolve vs reject

这里有点复杂，建议去下面链接直接看下代码。

## 参考链接

[八段代码彻底掌握Promise](https://juejin.im/post/597724c26fb9a06bb75260e8)
[Promise对象 - ECMAScript 6入门](http://es6.ruanyifeng.com/#docs/promise)