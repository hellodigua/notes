# NPM

## 目录

- 如何开发一个组件
- 在NPM上发布一个包
- NPM 社区版本规范

## 如何开发一个Vue组件

以Vue插件为例，插件一般有以下几种形式导入：

```
ES6
import vuePayKeyboard from 'vue-pay-keyboard'

//  通过require 导入
var vuePayKeyboard = require('vuePayKeyboard')

// 通过use挂载
Vue.use(vuePayKeyboard)

// 或者直接导入js文件
<script src="./dist/vue-pay-keyboard.js"></script>
```

好吧我们可以直接看官方说明：
https://cn.vuejs.org/v2/guide/plugins.html#开发插件

然后可以使用vue init webpack-simple初始化项目

好吧自己写的很垃圾，还是看别人的总结吧：

http://www.imooc.com/article/19691.%E7%9C%9F%E7%9A%84%E6%9C%892333

## 在NPM上发布一个包

npm adduser // 创建一个用户

npm whoami // 查看自己到底是谁

npm login // 登录

npm publish // 提交模块

npm unpublish <package>@<version> // 撤销发布自己发布过的某个版本代码

npm cache clear // 清空npm本地缓存

## NPM 社区版本规范

主版号.次版号.修订号

版号递增规则如下：
  主版号：当你做了不相容的 API 修改，
  次版号：当你做了向下相容的功能性新增，
  修订号：当你做了向下相容的问题修正。

npm 会根据 new version 指定的类型更新 package.json 中的 version 字段，然后进行一次 commit，最后打上一个该版本号的 tag：

升级补丁版本号：npm version patch
升级小版本号：npm version minor
升级大版本号：npm version major

## npm报错处理

### npm权限问题

On npm install: Unhandled rejection Error: EACCES: permission denied
https://stackoverflow.com/questions/50639690/on-npm-install-unhandled-rejection-error-eacces-permission-denied

解决方案：

sudo chown -R $USER:$GROUP ~/.npm
sudo chown -R $USER:$GROUP ~/.config
