# billing-server

## 生产环境启动项目

sudo service mongod start // 开启 mongo 服务

cd /www/billing-server/current

pm2 startOrRestart ecosystem.json --env production // 启动 billing-server

## 构建流程

1. 本地开发代码，推送到 github 仓库
2. 触发 webhook，服务器拉取代码
3. 之行脚本重启并运行项目

### webhook

payload url: http://111.231.82.146:4001/webhook
content type: application/json
secret: digua323
