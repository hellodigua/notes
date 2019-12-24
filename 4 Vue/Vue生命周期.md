# 生命周期

## 介绍

在 Vue 的整个生命周期中，它提供了一系列的事件，可以让我们在事件触发时注册 js 方法，可以让我们用自己注册的 js 方法控制整个流程。

http://ww1.sinaimg.cn/large/6aedb651gy1fdb6s9vs6bj20xc25s7qv

## 数据和 DOM

beforecreated：el 和 data 并未初始化
created:完成了 data 数据的初始化，el 没有
beforeMount：完成了 el 和 data 初始化
mounted ：完成挂载

## 那么什么地方该用什么呢？

beforecreate : 可以在这加个 loading 事件
created ：在这结束 loading，还做一些初始化，实现函数自执行
mounted ： 在这发起后端请求，拿回数据，配合路由钩子做一些事情
beforeDestory： 你确认删除 XX 吗？ destoryed ：当前组件已被删除，清空相关内容

## 每个钩子在何时触发

- beforeCreate

在实例初始化之后，数据观测(data observer) 和 event/watcher 事件配置之前被调用。

- created

实例已经创建完成之后被调用。在这一步，实例已完成以下的配置：数据观测(data observer)，属性和方法的运算， watch/event 事件回调。然而，挂载阶段还没开始，\$el 属性目前不可见。

- beforeMount

在挂载开始之前被调用：相关的 render 函数首次被调用。

- mounted

el 被新创建的 vm.\$el 替换，并挂载到实例上去之后调用该钩子。

- beforeUpdate

数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。 你可以在这个钩子中进一步地更改状态，这不会触发附加的重渲染过程。

- updated

由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。
当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。然而在大多数情况下，你应该避免在此期间更改状态，因为这可能会导致更新无限循环。

该钩子在服务器端渲染期间不被调用。

- beforeDestroy

实例销毁之前调用。在这一步，实例仍然完全可用。

- destroyed

Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。 该钩子在服务器端渲染期间不被调用。

理解： DOM 元素还在，但是数据更新并不会影响到 DOM 了。
