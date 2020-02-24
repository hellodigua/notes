# About-me

## 配置项

### travis-ci

GH_REF: https://hellodigua%40gmail.com:digua0323@e.coding.net/hellodigua/digua.me.git

### webhook

payload url: http://111.231.82.146:4001/webhook
content type: application/json
secret: digua323

## 构建流程

1. 本地开发好代码，推送到 github 仓库
2. 触发 travis-ci 进行构建打包
3. 将打包代码推送到 hostker

## tips

### 如何观测 webhook 运行日志

pm2 logs(但是代码中需要打印 log)
