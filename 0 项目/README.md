# 项目

## 服务端操作

查看所有容器（包括已中止的）
docker ps -a

删除容器或镜像
docker rm <docker container id>
docker rmi <docker image id>

进入指定的容器中
docker exec -i -t 容器名称或者容器ID bash


## 端口分配

webhook服务 4001

### 静态页面
about-me 3001 - digua.pro
nichijou 3002 - nichijou.digua.pro

### 后端服务
nichijou-server 8001 - nichi.digua.pro


