# 域名绑定配置

cd /etc/nginx

配置目录在 /etc/nginx/conf.d
配置文件规律
服务端：应用名-server-800*.conf（从 8000 开始）
网站： 应用名-300*.conf（从 3000 开始）
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
