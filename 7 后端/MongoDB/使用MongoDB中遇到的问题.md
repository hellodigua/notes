# Mongo问题

标签（空格分隔）： 后端

---

# 服务器相关

数据库地址： /var/lib/mongo
日志地址： /var/log/mongodb/mongod.log
配置地址： /etc/mongod.conf
绑定外网ip：172.247.xx.xx

# 启动命令

systemctl status mongod

systemctl start mongod

systemctl stop mongod

#  Failed to start SYSV: Mongo is a scalable, document-oriented database..

    http://www.cnblogs.com/ee900222/p/mongodb_1.html

# 在centos7上安装mongodb

    https://www.liquidweb.com/kb/how-to-install-mongodb-on-centos-7/

# mongodb磁盘空间不足

    http://blog.csdn.net/csfreebird/article/details/17023947

总之最后的解决办法是：

    cd /usr/bin
    ./mongod --smallfiles

当然了，最后一步命令应替换为

    nohup ./mongod --smaillfiles &

 它的作用是让程序在终端关闭之后仍然能够运行
