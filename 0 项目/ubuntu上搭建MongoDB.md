## 基本操作

mongod --port 端口号 // 无密码时连接
mongo mongo地址/数据库名 -u 用户名 -p 密码 // 有密码的情况下连接数据库

exit // 退出

sudo service mongod start // 开启mongo服务
sudo service mongod stop // 停止mongo服务
sudo service mongod restart // 重启mongo服务

mongo --host mongo地址 数据库名 --eval "db.dropDatabase()" // 删除数据库

## 安装

https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/#install-mongodb-community-edition

跟着上面的步骤走，执行完以后

sudo service mongod start

然后输入mongo试试能否连接成功


## 修改mongod端口

sudo vi /etc/mongod.conf

找到 # network interfaces

修改端口后保存退出，然后重启mongo服务

mongo --port 端口号


## 数据库迁移（整库迁移）

- 备份本地数据库

mongodump -h mongo地址 -d 数据库名 -o 导出文件夹（导出的文件夹是命令行当前所在目录）

// 无密码
mongodump -h 127.0.0.1:27017 -d billing -o 1187www

// 有密码
mongodump -h 127.0.0.1:27017 -d billing -u 备份用户 -p 密码 -o 1187www

- 备份成功之后打包

tar zcvf billing.tar.gz billing

- 上传文件到服务器

scp -P 服务器端口号 本地目录位置 服务器地址:服务器路径

scp -P 11875 ./billing.tar.gz digua@173.254.200.100:/home/digua/dbbackup

- 从服务器下载文件（备份数据在服务器的情况）
scp -P 11875 digua@200.245.122.33:/home/digua/backup/xxxx.tar.gz

- 解压压缩包

tar xvf billing.tar.gz

- 导入数据库文件到mongo

mongorestore --host 数据库地址 -d 数据库名 数据库还原目录

// 无密码
(我是直接在还原目录的上层操作的)
mongorestore --host 127.0.0.1:29572 -d billing ./billing

// 有密码
mongorestore --host 127.0.0.1:29572 -d billing -u 用户名 -p 密码 还原目录

OK.

也可以参考下文：

https://www.runoob.com/mongodb/mongodb-mongodump-mongorestore.html

## 数据表迁移（单表迁移）（无权限情况）

- 本地导出数据

mongoexport -d 数据库名 -c 数据库表 -o ./表名.json

- 传输文件到服务器

- 导入数据表到mongo

mongoimport --host 数据库地址 -d 数据库名 -c 数据库表 ./表名.json

OK.

## mongo权限

### 给mongo设置超级权限

进入命令行

use admin

db.createUser({user: 'digua', pwd: 'digua123', roles: [{role: 'userAdminAnyDatabase', db: 'admin'}]})

### 给数据库设置独立用户权限

use admin

// 授权操作是必须的
db.auth('digua', 'digua233')

// 重点，切换到目标数据库再操作
use 目标数据库

// 设置读写用户
db.createUser({user: 'digua_billing', pwd: 'diguabilling233', roles: [{role: 'readWrite', db: 'billing'}]})

// 设置备份用户
db.createUser({user: 'digua_billing_back', pwd: 'diguabilling333', roles: [{role: 'read', db: 'billing'}]})

### 开启用户验证模式

sudo vi /etc/mongod.conf

找到 #security:

去掉注释，改为如下，然后保存，重启即可：

security:
  authorization: 'enabled'

## 数据库定时备份

### 创建上传到七牛的脚本

cd ~/tasks

npm install qiniu

vi upload.js

```
var qiniu = require("qiniu");

var accessKey = '你的ak'; // ak
var secretKey = '你的sk'; // sk
var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

var options = {
  scope: '你的空间名', //要上传的空间名
};
var putPolicy = new qiniu.rs.PutPolicy(options);
var uploadToken = putPolicy.uploadToken(mac);

var config = new qiniu.conf.Config();

config.zone = qiniu.zone.Zone_z2; // 华南机房
// 是否使用https域名
//config.useHttpsDomain = true;
// 上传是否使用cdn加速
//config.useCdnDomain = true;

// 本地的上传目录和文件名
var parts = process.env.NODE_ENV.split('@');
var file = parts[1] + '.tar.gz';
var filePath = parts[0]+ '/' + file;

var localFile = filePath;
var formUploader = new qiniu.form_up.FormUploader(config);
var putExtra = new qiniu.form_up.PutExtra();

// 上传到七牛后的命名
var key=file;

// 文件上传（表单方式）
formUploader.putFile(uploadToken, key, localFile, putExtra, function(respErr, respBody, respInfo) {
  if (respErr) {
    console.log(respErr);
  }
  if (respInfo.statusCode == 200) {
    console.log(respBody);
  } else {
    console.log(respInfo.statusCode);
    console.log(respBody);
  }
});
```

### 创建备份脚本

在用户根目录
创建 ~/backup/billing
然后在tasks里面
vi billing.backup.sh

```
#!/bin/sh

backUpFolder=/home/digua/backup/billing
date_now=`date +%Y_%m_%d_%H_%M`
backFileName=billing_$date_now

cd $backUpFolder
mkdir -p $backFileName

mongodump -h 127.0.0.1:端口号 -d 数据库 -u 备份帐号 -p 密码 -o $backFileName

tar zcvf $backFileName.tar.gz $backFileName

rm -rf $backFileName

NODE_ENV=$backUpFolder@$backFileName node /home/digua/tasks/upload.js
```

大概讲解一下：
第一行，声明是可执行脚本，之后三行，分别定义备份目录，当前日期，备份名

移动到备份目录，创建备份名的文件夹

进行备份指定数据库操作

压缩备份好的数据，删除掉备份好的临时目录里的数据

最后一行执行七牛的上传脚本

// 测试一下脚本
sudo sh /home/digua/tasks/billing.backup.sh

### 创建定时任务

// 启动系统定时任务设定
crontab -e

输入2并回车

然后创建定时任务了：
分别是凌晨3点，以及中午12点各执行一次脚本
00 3 * * * sh /home/digua/tasks/billing.backup.sh
00 12 * * * sh /home/digua/tasks/billing.backup.sh

用的是nano编辑器，保存操作：

ctrl+x
按y
回车