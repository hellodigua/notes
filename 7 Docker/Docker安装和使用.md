# Docker安装和使用

## 安装Docker

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

## 配置镜像加速

- mac

对于使用 macOS 的用户，在任务栏点击 Docker Desktop 应用图标 -> Perferences... -> Daemon -> Registry mirrors。在列表中填写加速器地址 https://dockerhub.azk8s.cn。修改完成之后，点击 Apply & Restart 按钮，Docker 就会重启并应用配置的镜像地址了。

- centOS

在 /etc/docker/daemon.json 中写入如下内容（如果文件不存在请新建该文件）

```json
{
  "registry-mirrors": [
    "https://dockerhub.azk8s.cn",
    "https://reg-mirror.qiniu.com"
  ]
}
```

之后重新启动服务。

```sh
sudo systemctl daemon-reload
sudo systemctl restart docker
```

## 基础命令

- 列出本地所有容器
docker image ls

- 运行容器
docker run

示例：

docker run --name server-demo -p 4001:3001 -it demo:0.0.1

上面的 "-p 4001:3001" 表示把宿主的 4001 端口和容器的 3001 端口关联起来，外部访问用 4001 端口。

## 使用Dockerfile定制镜像

Dockerfile 是一个文本文件，其内包含了一条条的 指令(Instruction)，每一条指令构建一层，因此每一条指令的内容，就是描述该层应当如何构建。

https://yeasy.gitbooks.io/docker_practice/image/build.html
