# git

标签（空格分隔）： tools

---

# git常用术语解释

HEAD
这是当前分支版本顶端的别名，也就是在当前分支你最近的一个提交

Index
index也被称为staging area，是指一整套即将被下一个提交的文件集合。他也是将成为HEAD的父亲的那个commit

Working Copy
working copy代表你正在工作的那个文件集

# 公司git项目配置

首先在项目拉取以后设置公司邮箱和用户名

git config user.name "xxx"
git config user.email "xxx@qq.com"

# 团队协作

1. git commit 自己的所有本地修改的文件
2. git pull 远程文件
3. git push 所有

# git生成ssh

ssh-keygen -t rsa -b 4096 -C "hellodigua@gmail.com"


# github 删除分支

本地执行

    git branch -D master

在github项目 > Settings > Branchs中，设置其他分支为默认分支；
推送删除分支

    git push -u origin :master

# git clone 加速

本地使用代理，然后执行以下命令

git config --global http.proxy 'socks5://127.0.0.1:1080'
git config --global https.proxy 'socks5://127.0.0.1:1080'

### 如果设置代理后出了问题

查询当前设置的代理：

    git config --global http.proxy

取消代理：

    git config --global --unset http.proxy

# git撤销某次commit

首先，使用 git log ，找到需要回退的commit的SHA1值，然后使用下命令进行回退


    git reset --mixed <commit_id>
    // 默认方式，不带任何参数的git reset，它回退到某个版本，只保留源码，回退commit和index信息
    // 用人话说，就是回退到 git add 的前一步
    git reset --soft <commit_id>
    // 回退到某个版本，只回退了commit的信息，不会恢复到index file一级
    // 用人话说，就是回退到git commit 的前一步
    git reset --hard <commit_id>
    // 彻底回退到某个版本，本地的源码也会变为上一个版本的内容
    // 用人话说，就是回退到上一次git push 的时候

# git 使用不同的邮箱不同的ssh-keys

1. 配置两个不同邮箱下的ssh
  1> 生成key命令   ssh-keygen -t rsa -b 4096 -C "your_email"
  2>会提示你输入文件名,可以输入对应的网址的名称,比如id_rsa_gitlab
  3>这样,会生成两个文件,比如id_rsa_gitlab,id_rsa_gitlab.pub
  4> 重复以上步骤,生成id_rsa_github,id_rsa_github.pub

2. 在.ssh下新建config文件并配置

Host    别名
    HostName        主机名
    Port            端口
    User            用户名
    IdentityFile    密钥文件的路径

实例：

Host digua
	HostName github.com
	User hellodigua
	PubkeyAuthentication yes
	IdentityFile ~/.ssh/id_rsa_github

# git 同时部署两个分支

我想要让自己的主页同时push到github和codingpages上，该怎么办呢？

- 添加第一个代码库（github），用通常办法git remote add即可

git remote add origin git@git.coding.net:hellodigua/billing-service.git

- 添加第二个代码库（coding），用set-url

git remote set-url --add origin https://git.duapp.com/appidj175l59kb6

- 添加第三个类似……

git remote set-url --add origin ...

然后用git remote -v 看一下已添加的代码库，会看到类似下文的结果

bucket  git@git.coding.net:xxxxx (fetch)
bucket  git@git.coding.net:xxxxx (push)
bucket  git@gitlab.com:root/XXX.git (push)

这样就可以了，然后试一下push代码到bucket，就可以观察到git按照顺序自动把东西push到了远端

## 其他办法

其实可以手动改.git 下config的代码，可以改成这样子的：

    [remote "origin"]
    	url = git@git.coding.net:hellodigua/billing-service.git
    	fetch = +refs/heads/*:refs/remotes/origin/*
    	pushurl = https://git.duapp.com/appidj175l59kb6
    	pushurl = git@git.coding.net:hellodigua/billing-service.git

也可以改成这样子的：

    [remote "origin"]
    	url = https://github.com/hellodigua/hellodigua.github.io.git
    	fetch = +refs/heads/*:refs/remotes/origin/*
    [remote "origin"]
    	url = git@git.coding.net:hellodigua/digua.me.git
    	fetch = +refs/heads/*:refs/remotes/master/*

# github上的版本和本地版本冲突的解决方法

## 本地覆盖到云端

git push -u origin master -f

-f为强制用本地分支历史覆盖github上已有的分支历史（可能会丢失数据，所以还是请先git pull origin master）

当然，如果两个分支完全不一样的话，其实更好的办法是合并分支的……

## 云端覆盖到本地

- 第一个方法

git fetch origin master

git merge origin/master

- 第二个方法

git pull origin master

上述命令其实相当于git fetch 和 git merge
在实际使用中，git fetch更安全一些，因为在merge前，我们可以查看更新情况，然后再决定是否合并

# 合并本地分支

- 第一个方法

切换到master分支，假如要被合并的分支是dev，那么就是在master上操作

git merge dev

- 第二个方法

git checkout dev
git rebase master

这会将master的commit信息并入dev

## 更改本地和远程分支名称

git branch -m old_branch new_branch
git push origin :old_branch
git push --set-upstream origin new_branch
