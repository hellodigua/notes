# pm2-gui

软件功能如名字，是一款将Pm2可视化的软件

具体操作可参见github文档

## 我自己的步骤

sudo npm i pm2-gui -g

sudo vi /.../.../pm2-gui.ini

编辑端口，编辑密码

sudo pm2-gui start

# 坑

- 默认配置文件在全局安装的node-modules下

- 全局搜索 sudo find / -name pm2-gui.ini

