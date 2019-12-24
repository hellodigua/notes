# Docker 安装和使用

## 安装 Docker

- mac

```
brew cask install docker
```

或者去官网手动下载安装

- centOS

```sh
curl -fsSL get.docker.com -o get-docker.sh
sudo sh get-docker.sh --mirror Aliyun
```

### 配置镜像加速

- mac

对于使用 macOS 的用户，在任务栏点击 Docker Desktop 应用图标 -> Perferences... -> Daemon -> Registry mirrors。在列表中填写加速器地址 https://dockerhub.azk8s.cn 。修改完成之后，点击 Apply & Restart 按钮，Docker 就会重启并应用配置的镜像地址了。

- centOS

在 /etc/docker/daemon.json 中写入如下内容（如果文件不存在请新建该文件）

```json
{
  "registry-mirrors": ["https://dockerhub.azk8s.cn", "https://reg-mirror.qiniu.com"]
}
```

之后重新启动服务。

```sh
sudo systemctl daemon-reload
sudo systemctl restart docker
```

## 使用 Docker

整体步骤分为 4 步：

1. 写一个 Dockerfile
2. 打包镜像
3. 根据镜像创建容器
4. 启动容器

下面是详细介绍：

### 写一个 Dockerfile

Dockerfile 是一个文本文件，其内包含了一条条的 指令(Instruction)，每一条指令构建一层，因此每一条指令的内容，就是描述该层应当如何构建。

https://yeasy.gitbooks.io/docker_practice/image/build.html

### 打包镜像

使用 docker image build 来将 Dockerfile 打包成镜像

```
cd hello-docker/ # 进入刚刚的目录
docker image build ./ -t hello-docker:1.0.0 # 打包镜像
```

docker image build ./ -t hello-docker:1.0.0 的意思是：基于路径./（当前路径）打包一个镜像，镜像的名字是 hello-docker，版本号是 1.0.0。该命令会自动寻找 Dockerfile 来打包出一个镜像

### 根据镜像创建容器并启动

```
docker run -it -p 2333:3001 hello-docker:1.0.0
```

我们使用 docker run 来创建并启动基于 hello-docker:1.0.0 镜像的一个容器，使用-p 来指定端口绑定——将容器中的 3001 端口绑定在宿主机的 2333 端口

启动后，就能通过访问本机的 2333 端口来达到访问容器内 3001 端口的效果了

## 其他命令

- 列出本地所有容器
  docker image ls

- 查看当前运行的容器
  docker container ls
