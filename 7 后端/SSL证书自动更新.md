## 获取并自动更新SSL证书

acme.sh 实现了 acme 协议, 可以从 letsencrypt 生成免费的证书.
安装：

    curl  https://get.acme.sh | sh

验证域名所有权：

    acme.sh  --issue  --dns -d zhangnew.com

获取证书：

    acme.sh  --renew -d zhangnew.com

安装证书到指定位置：

    acme.sh  --installcert  -d  zhangnew.com  --key-file /etc/nginx/ssl/zhangnew.key --fullchain-file /etc/nginx/ssl/zhangnew.cer --reloadcmd  "service nginx force-reload"

证书可以自动更新，按照之前操作的步骤。

详细文档在这里：https://github.com/Neilpang/acme.sh/wiki/%E8%AF%B4%E6%98%8E