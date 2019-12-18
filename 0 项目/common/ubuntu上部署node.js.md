# Ubuntu上部署Node.js程序

## Ubuntu上一些基础命令

```sh
fdisk -l 查看挂载盘
df -h 查看硬盘使用情况（有用）
```

## 购买服务器后的初始化

- 升级更新ubuntu的包

sudo apt-get update
sudo apt-get upgrade
sudo apt-get update && sudo apt-get upgrade

- 常用工具批量安装

sudo apt-get install vim openssl build-essential libssl-dev wget curl git

### 设置子用户并赋予权限

- 切换到root
su root
（如果要输入密码，且没有密码，可以先sudo passwd root）

- 创建用户
adduser user_name
然后输入密码

- 加入sudo组并赋予权限
gpasswd -a user_name sudo
// 给用户权限
vi /etc/sudoers
在root ALL=(ALL:ALL) ALL下面再加一行
user_name ALL=(ALL:ALL) ALL
然后 wq!

### 添加ssh（不输入密码登录）

- 在本地环境的.ssh目录下执行

  ssh-keygen -t rsa -b 4096 -C "hellodigua@gmail.com"
  eval "$(ssh-agent -s)"
  // 跑起来ssh代理
  ssh-add ~/.ssh/id_rsa
  // 添加密钥到代理

- 在服务端

  在当前用户根目录(/home/user)生成公钥
  ssh-keygen -t rsa -b 4096 -C 'hellodigua@gmail.com'
  // 同样是客户端的两个步骤
  eval "$(ssh-agent -s)"
  ssh-add ~/.ssh/id_rsa

  进入.ssh目录
  创建 authorized_keys ，并把本地环境的id_rsa.pub的内容，复制粘贴到authorized_keys里
  chmod 600 authorized_keys // 设置权限
  sudo service ssh restart // 重启

这样本地连接就不再需要输入密码了！！！如果尝试失败请多试几次，我第二次成功了。

### 安全策略

- 修改22端口避免被扫到

  sudo vi /etc/ssh/sshd_config
  找到Port 22，把22改成1025 ~ 65535之间的任何一个即可
  最后加上一行
  AllowUsers user_name

- 安装fail2ban防止ssh暴力破解

sudo apt-get install fail2ban
编辑配置文件
sudo vi /etc/fail2ban/jail.conf

  bantime = 600 #屏蔽时间，该bantime将被[ssh-iptables]中bantime覆盖，可以改成3600
  findtime = 600 #发现时间，在此期间内重试超过规定次数，会激活fail2ban
  maxretry = 3 #默认尝试次数

  destemail #可以改成自己的邮箱

保存退出

sudo service fail2ban status # 查看运行状态
sudo service fail2ban stop
sudo service fail2ban start

## 配置NGINX
作用：通过反向代理实现用域名访问应用

### 安装
sudo apt-get install nginx
- 基本命令
sudo service nginx reload # 重启nginx
nginx -s reload # 重启nginx
- 安全设置
进入 /etc/nginx
vi nginx.conf
取消注释 server_tokens off（就是去掉前面的#，这样在浏览器访问服务的时候隐藏服务器具体信息）

### 应用配置
配置目录在 /etc/nginx/conf.d
配置文件规律
服务端：应用名-server-800*.conf（从8000开始）
网站： 应用名-300*.conf（从3000开始）
创建第一个应用的配置文件并保存
sudo vi billing-server-3000.conf
```
# 负载均衡
upstream about {
  server 127.0.0.1:3000;
}
server {
  listen 80; #监听80就对了，不要特喵乱改
    server_name about.digua.me;
    root /www/about;
  location / {
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forward-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $http_host;
    proxy_set_header X-Nginx-Proxy true;
    proxy_pass http://about;
    proxy_redirect off;
  }
}
```
退出以后，通过以下命令检测配置文件是否错误
sudo nginx -t

## 部署https

### 选择厂商
国内的厂商可以选择阿里云、腾讯云、七牛云、又拍云，它们均提供免费的SSL证书
不过七牛云和又拍云要求必须使用他们家的云服务，所以还是选择阿里云和腾讯云吧，申请流程略。

### 部署证书
- 上传证书
利用xftp或者命令等方式，将下载下来的证书上传到/www/ssl里
上传： scp -P 端口号 文件 用户@ip:/路径
下载： scp -P 端口号 -r 用户@ip:/远程目录 本地目录 (-r即下载目录，不带则下载文件)
记得先上传到自己的用户目录，其他目录没权限……
- 修改nginx配置
将下面代码覆盖到nginx里对应的配置文件里
```
upstream resume {
  server 127.0.0.1:3000;
}
server {
  listen 80;
    server_name resume.digua.me;
    # rewrite ^(.*) https://$host$1 permanent;
    return 301 https://resume.digua.me$request_uri; # 如果访问http则强制转发到https
}
server {
  listen 443;
    server_name resume.digua.me; #绑定域名
    ssl on;
    ssl_certificate /www/ssl/1_resume.digua.me_bundle.crt; # 证书文件
    ssl_certificate_key /www/ssl/2_resume.digua.me.key; # 私钥文件
    ssl_session_timeout 5m;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
    ssl_prefer_server_ciphers on;
  if ($ssl_protocol = ""){
        rewrite ^(.*) https://$host$1 permanent;
  }
  location / {
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forward-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $http_host;
    proxy_set_header X-Nginx-Proxy true;
    proxy_pass http://resume;
    proxy_redirect off;
  }
}
```
那么应该就成功了

## 配置Node

### 安装Node环境

用nvm安装node.js有风险，强烈不建议使用！！
首先安装node.js
sudo apt-get install nodejs-legacy
安装好以后，nodejs 在apt-get上还是4.+的版本，而现在官方都更新到8了，所以还需要继续更新。
把下面的8改成对应的位数，即可更新对应的版本
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
然后执行如下命令增加系统文件监控数目
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p 
最后安装常用npm包就可以开始了
sudo npm install cnpm yarn pm2 webpack gulp http-server -g
- 如果是国内服务器，那么可以把npm源指定为淘宝源
npm --registry=https://registry.npm.taobao.org install -g npm

## pm2 （node持久化运行）
安装就是正常的安装 npm install pm2 -g
- 常用命令
pm2 list # 查看所有node应用
pm2 logs # 查看所有日志
pm2 monit # 查看资源消耗
pm2 web # 开启api访问，在web中查看（通过9615端口）
- 对单个应用的操作（通过app_name和appId均可）
pm2 start app_name # 启动应用
pm2 restart app_name # 重启应用
pm2 stop app_name # 停止应用
pm2 delete app_name # 删除应用进程
pm2 show app_name # 查看应用的具体信息
pm2 describe app_name # 查看应用详细部署状态，3是App Id

## 项目部署发布
部署发布的本质是，本地和服务器同时部署了一个git仓库，然后通过pm2，本地提交了代码以后，服务器自动拉取代码然后执行若干命令，这样就完成了代码的自动部署发布

## 利用coding.net实现代码同步

1. 在coding新建仓库
2. 把本地的公钥粘贴到coding的公钥设置里去（id_rsa.pub）
2. 把服务器的公钥粘贴到coding的**项目的公钥设置**里去（coding的项目公钥只具备可读权限）
3. 本地push代码到coding仓库
4. 服务器新建一个目录并拉取代码

## 利用pm2发送指令到服务端

首先在服务端新建目录/www/billing-server并赋予读写权限
mkdir /www
cd /www
mkdir billing-server
chmod 777 billing-server
在本地的项目里新建一个pm2的配置文件 
pm2 ecosystem
```json
{
  "apps": [
    {
      "name": "billing-server",
      "script": "start.js",
      "env": {
        "COMMON_VARIABLE": "true"
      },
      "env_production": {
        "NODE_ENV": "production"
      }
    }
  ],
  "deploy": {
    "production": {
      "user": "digua",
      "host": ["173.254.200.100"],
      "port": "11875",
      "ref": "origin/master",
      "repo": "git@git.coding.net:hellodigua/billing-server-production.git",
      "path": "/www/billing-server",
      "ssh_options": "StrictHostKeyChecking=no",
      "env": {
        "NODE_ENV": "production"
      }
    }
  }
}
```
然后在本地环境的项目根目录下执行：
pm2 deploy ecosystem.json production setup
这时候服务器上/www/service下应该会部署上去文件了
注意的是，第一次需要加上setup，以后就不需要了
pm2 deploy ecosystem.json production
- 为了ssh发布方便避免提前返回，同时需要进行如下操作
cd ~
vi .bashrc
注销如下片段（7 - 10行）
```
case $- in
    *i*);;
    *) return;;
esac
```