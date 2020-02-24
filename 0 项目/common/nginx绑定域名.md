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

然后重启 nginx
sudo service nginx reload

## https 配置

```conf
upstream billing_server {
  server 127.0.0.1:8001;
}

server {
  listen 80;
    server_name billingapi.digua.pro;
    # rewrite ^(.*) https://$host$1 permanent;
    return 301 https://billingapi.digua.me$request_uri; # 如果访问http则强制转发到https
}

server {
  listen 443;
    server_name billingapi.digua.pro; #绑定域名
    ssl on;
    ssl_certificate /www/ssl/1_billingapi.digua.pro_bundle.crt;  # 证书文件
    ssl_certificate_key /www/ssl/2_billingapi.digua.pro.key;   # 私钥文件
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

    proxy_pass http://billing_server;
    proxy_redirect off;
  }
}
```
