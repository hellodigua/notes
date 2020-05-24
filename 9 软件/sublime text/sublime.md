# sublime

标签（空格分隔）： tools

---

# 安装 sublime 以后要做的

## 侧边栏背景色

安装包 SyncedSidebarBg ，安装好以后等 30 秒就好了

##

# 在 sublime text 中设置某种扩展名文件的默认语法

比如说 vm 文件，那么就点击右下角的模板选择，然后最上面有个选择 open all with current extension as，然后从打开的列表里选择对应想要解析的模板就行了

# 修改侧边栏字体大小

1. 安装这个插件 PackageResourceViewer
2. ctrl+shift+p，输入 PackageResourceViewer，选择 open Resource 回车
3. 选择 theme-default 回车
4. 选择 default.sublimt-theme(或者是自己现在正在使用的主题) 回车

那么就找到文件了，我们现在需要改两个地方：

1. 字体
   搜索 sidebar_label ， 在最后面改为 "font.size": 16 ~ 18

2. 高度
   搜索 sidebar_tree ， 将里面的"row_padding"的值改为 [8, 4]

# 添加到右键菜单（mac）

http://weishu.me/2015/12/31/add-sublime-editor-to-finder-context-menu/
