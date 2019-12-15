# About-me

## 配置项

### travis-ci

GH_REF: https://hellodigua%40gmail.com:52hostker@git-ct.smartgslb.com/diguame

### webhook

payload url: http://111.231.82.146:4001/webhook
content type: application/json
secret: digua323

## 构建流程

1. 本地开发好代码，推送到github仓库
2. 触发travis-ci进行构建打包
3. 将打包代码推送到hostker

## tips

### 如何观测webhook运行日志

pm2 logs(但是代码中需要打印log)


