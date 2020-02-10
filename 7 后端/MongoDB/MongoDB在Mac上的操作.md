# MongoDB 在 Mac 上的操作

## 安装

https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/

brew install mongodb
brew uninstall mongodb
brew services ls #查看所有安装的服务

备注：如果 mongodb 不行，那么试试 mongodb-community

## 启动和停止

这里建议使用 homebrew 操作

brew services start mongodb
brew services restart mongodb
brew services stop mongodb

备注：mac 的默认配置貌似有点问题，本地调试的时候试试

mongod --config /usr/local/etc/mongod.conf

https://blog.csdn.net/tymatlab/article/details/78532176

## 默认配置

the configuration file (/usr/local/etc/mongod.conf)
the log directory path (/usr/local/var/log/mongodb)
the data directory path (/usr/local/var/mongodb)
