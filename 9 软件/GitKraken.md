## 破解 GitKraken

破解方法来源于这个：https://github.com/5cr1pt/GitCracken

1. 修改 hosts 文件避免自动更新

```
sudo vi /etc/hosts

127.0.0.1 release.gitkraken.com // 插入这条
```

2. 执行下面命令

```
git clone https://github.com/5cr1pt/GitCracken.git
cd GitCracken/GitCracken
rm yarn.lock
yarn install
yarn build
```

3. 开始破解（注意破解时 GitKraken 不要登录

node dist/bin/gitcracken.js patcher --asar /Applications/GitKraken.app/Contents/Resources/app.asar

4. 然后重启 GitKraken，如果右下角是 pro 的话就说明破解成功了
