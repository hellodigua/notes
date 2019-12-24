# nichijou-server

## 构建流程

1. 本地开发代码，推送到 github 仓库
2. github 触发 webhook 通知
3. 服务器收到通知，拉取 nichijou-prod 代码
4. 安装依赖并重启服务
