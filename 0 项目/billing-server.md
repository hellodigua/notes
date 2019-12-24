# billing-server

## 生产环境启动项目

sudo service mongod start // 开启 mongo 服务

cd /www/billing-server/current

pm2 startOrRestart ecosystem.json --env production // 启动 billing-server
