随着 Coding 被腾讯云战略投资（收做干儿子），国内最后一个可以免费部署静态应用的 Git 托管平台也坏（慢）起来了。

一方面是各厂都在努力商业化，没有什么利润的服务不会投入资源去运营，另一方面是政策也越来越紧，像.me .moe 之类的域名已经不允许在国内备案了，就算你有国内的服务器也没什么办法。

国外的服务器有两个问题，速度快的特别的贵，便宜的速度又快不起来，这让我陷入了两难，谁让我穷呢。

[滑稽的穷人表情]()

<!-- more -->

权衡了好久，最终选择下来的技术栈是这样：

开发方案： Nuxt.js

代码托管： Github

生产环境： Hostker

持续集成： Travis-CI

### Nuxt.js

Nuxt.js 是一个基于 Vue.js 的服务端渲染应用框架，它支持直接生成对应的静态站点，更多介绍可以看[这里](https://zh.nuxtjs.org/guide)

使用 Nuxt 就是为了它的 generate 命令，具体的开发则跟普通的 Vue 项目没有太大区别。

### Github

我们选择创建一个私有仓库，然后将开发好的站点推送上来，至此开发阶段的工作便完毕了。

### Hostker

Hostker 是目前找到的最佳的静态页面托管方案了，支持 Git，香港阿里云高速服务器，每天只要 2 分钱，还有谁！

首先注册 [Hostker](https://www.hostker.com)，然后选择左下角回到旧版，在我的应用列表处新建应用。

然后选择管理，在里面可以查看该应用的 Git 仓库地址，绑定域名，申请 SSL 证书，甚至还有一个 MySQL 服务（惊喜

### Travis-CI

Travis-CI 则是串联它们的核心，它可以根据你的配置文件为你自动运行一些命令，通常用于测试、构建等等。

使用 Github 账号登陆 https://travis-ci.com ，将对应的项目开启，然后在项目下新建 .travis.yml 配置文件，当产生 push 操作时候 Travis 会自动读取这个配置文件。

接下来，它会根据配置文件完成这些操作：拉取代码，安装依赖，生成静态站点，拉取 Hostker 的 Git 仓库，清空仓库内容并复制生成的静态文件到 git 仓库去，然后提交并推送到 Hostker。

Git Push 之后 Hostker 生产环境将会自动拉取 master 分支的文件，其它分支版本目前暂时不支持部署。

具体配置如下：

```yml
language: node_js #Node.js环境

node_js: stable

before_install:
  - git config --global user.name "digua"
  - git config --global user.email "hellodigua@gmail.com"

install:
  - npm install

script:
  - git clone ${GH_REF} public #GH_REF是一个travis环境变量，由于包含 hostker 的账号密码所以不方便写在配置里面，我们可以去 More options > Settings > Environment Variables 选择添加，value的格式是：https://account:password@git-ct.smartgslb.com/appname
  - cd ./public
  - rm -rf !(.git|.|..) #删除除了.git . .. 之外的所有文件
  - cd ../
  - npm run generate #执行nuxt generate

after_script:
  - mv ./dist/* public #复制生成的静态文件到public目录
  - cd public
  - git add --all .
  - git commit -m "update"
  - git push -u origin master

branches:
  only:
    - master
```

## 注意事项

value 真实格式： https://hellodigua%40gmail.com:52hostker@git-ct.smartgslb.com/nichijou
