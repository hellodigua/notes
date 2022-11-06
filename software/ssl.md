# 代理问题

## git clone 加速

[https://feyoudao.cn/pages/a782fe/](https://feyoudao.cn/pages/a782fe/)

clashX Pro 开启增强模式，然后复制终端代理命令后在终端执行，可以让终端走代理流量

## homebrew 更换镜像加速

[使用 阿里云 的 Homebrew 镜像源进行加速](https://learnku.com/cs/wikis/39228)

## Failed to connect to github.com port 443: Operation timed out

1. 访问 [https://websites.ipaddress.com/github.com](https://websites.ipaddress.com/github.com)
2. 找到可以 ping 通的 ip
3. 在 hosts 中编辑`xxx.xx.xxx.xx github.com`

ps: github.global.ssl.fastly.net 这个也可以搜搜

## Failed to connect to 127.0.0.1 port 1080: Connection refused

终端输入以下命令打开 ~/.curlrc 文件，并删除里面的配置：socks5 = "127.0.0.1:1080"即可。

```
open ~/.curlrc
```
