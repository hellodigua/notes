# 项目

## 服务端操作

查看所有容器（包括已中止的）
docker ps -a

删除容器或镜像
docker rm <docker container id>
docker rmi <docker image id>

进入指定的容器中
docker exec -i -t 容器名称或者容器 ID bash

## 端口分配

webhook 服务 4001

### 静态页面

### 后端服务

billing-server 8001 - billing.digua.pro
nichijou-server 8002 - nichi.digua.pro
