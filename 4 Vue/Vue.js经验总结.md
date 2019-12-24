# Vue.js 经验总结

标签（空格分隔）： 前端

---

# 如何引入 jQuery

    npm install jquery --save-dev

然后在需要用到的 vue 组件里

    import $ from 'jQuery'

那么，如何全局引入呢？
暂时还不知道= =

# 生命周期

一个 Vue 对象成功创建，会依次执行从 created 到 ready 4 个方法

created -> beforeCompile -> compiled -> ready -> beforeDestroy -> destroyed

# 引入 SCSS

npm install --save-dev sass-loader
//sass-loader 依赖于 node-sass
npm install --save-dev node-sass

然后在需要引入的地方添加 lang="scss"

# Vue 自定义全局组件

http://www.cnblogs.com/yesyes/p/6658611.html

# render 报错

babel-plugin-transform-vue-jsx
https://github.com/vuejs/babel-plugin-transform-vue-jsx

# 理解 \$nextTick 的作用

Vue 实现响应式并不是数据发生变化之后 DOM 立即变化，而是按一定的策略进行 DOM 的更新。

$nextTick 是在下次 DOM 更新循环结束之后执行延迟回调，在修改数据之后使用 $nextTick，则可以在回调中获取更新后的 DOM。

# Vuex

## 理解概念

- state 应用状态，可以理解为公用 data
- getters 可以理解为 state 的过滤属性，用来过滤 state 的数据
- mutations 更改应用状态的方法，只能通过 mutation 改变 state
- actions 存放处理数据提交的方法的集合，并提交给 mutation

## 怎么用

- state
  mapState 的作用是把全局的 state 和 getters 映射到当前组件的 computed 计算属性中，this.\$store.state

- getters
  可以在 store 中定义 getters，第一个参数是 state，也可以接受其他的 getters 作为第二个参数
  mapGetters 的作用是将 store 中的 getters 映射到局部计算属性中，用法和 mapState 类似

- mutations
  载荷（payload）：简单的理解就是往 handler(stage)中传参 handler(stage,pryload)；一般是个对象
  commit： 在组件中使用 this.\$store.commit('xxx') 提交 mutation

- actions
  分发 actions：store.dispatch('increment')
