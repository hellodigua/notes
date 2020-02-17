# nichijou

## 构建流程

1. 本地开发代码，推送到 github 仓库
2. 触发 travis-ci 进行构建打包
3. 将打包代码推送到 nichijou-prod
4. nichijou-prod 触发 webhook
5. 服务器拉取 nichijou-prod 代码
6. 重启并运行项目

## 配置项

### travis-ci

GH_REF: https://hellodigua%40gmail.com:52hostker@git-ct.smartgslb.com/nichijou

## 构建流程

1. 本地开发好代码，推送到 github 仓库
2. 触发 travis-ci 进行构建打包
3. 将打包代码推送到 hostker
