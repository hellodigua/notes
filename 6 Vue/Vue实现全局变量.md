# vue实现全局变量

- 方法1

使用特定模块来组织全局变量，需要引入的地方导入该模块

- 方法2

全局变量挂载到Vue.prototype里

import sth from './sth'
Vue.prototype.GLOBAL = sth

示例：

```
exports.install = function (Vue, options) {
    Vue.prototype.ajax = function (){
        alert('aaaaaaa');
    };
};

// main.js 入口
import xxxx from './commons/xxxx'
Vue.use(xxxx);
```

