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

https://travis-ci.com/hellodigua/nichijou/settings

GH_REF: github.com/hellodigua/nichijou-prod.git
GH_TOKEN: https://github.com/settings/tokens/new 5677adc872d3fff191080b855df1d2facf9cd2b9

git 地址: https://${GH_TOKEN}@${GH_REF}

### webhook

payload url: http://111.231.82.146:4001/webhook
content type: application/json
secret: digua323
