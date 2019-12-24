# 本地证书生成

## Step 1

创建一个安全套接层（SSL）证书，然后可以使用此根证书为可能为单个域生成的任意数量的证书签名。

执行 createRootCA.sh，系统会要求你输入密码，每次使用此特定密钥生成证书时都需要输入该密码。

其他可选信息可忽略。

rootCA.key RSA-2048 密钥
rootCA.pem 根 SSL 证书

## Step 2

导入证书到系统

## Step 3

```
sh createSelfSigned.sh
```

OK 生成完毕

https://juejin.im/post/5a6db896518825732d7fd8e0
