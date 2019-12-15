# nichijou

## 代码托管

Github

## 构建流程

1. 本地开发代码，推送到github仓库
2. 触发travis-ci进行构建打包
3. 将打包代码推送到nichijou-prod
4. nichijou-prod触发webhook
5. 服务器拉取nichijou-prod代码
6. 重启并运行项目

## 配置项

### travis-ci

https://travis-ci.com/hellodigua/nichijou/settings

GH_REF: github.com/hellodigua/nichijou-prod.git
GH_TOKEN: https://github.com/settings/tokens/new 5677adc872d3fff191080b855df1d2facf9cd2b9

git地址: https://${GH_TOKEN}@${GH_REF}


### webhook

payload url: http://111.231.82.146:4001/webhook
content type: application/json
secret: digua323
