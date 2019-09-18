# Git commit前强制检查各个项目用户名邮箱配置

利用本地的git hooks，可以在git commit前强制检查项目有没有独立的用户名和邮箱配置，这样可以避免公司项目中提交使用自己的私有邮箱又没有发现，具体步骤如下：

在你使用的git程序的安装目录中配置如下模板：

windows10实测为：git安装目录\mingw64\share\git-core\templates\hooks

在这个目录下创建文件 pre-commit，然后创建如下模板

```
#!/bin/sh
#
# A git hook to make sure user.email and user.mail in repository exists before committing

repository_email=$(git config --local --get user.email)
repository_name=$(git config --local --get user.name)

if [ -z "$repository_email" ] || [ -z "$repository_name" ]; then
    # user.email is empty
    echo "ERROR: [pre-commit hook] Aborting commit because user.email or user.name is missing. Configure them for this repository."
    exit 1
else  
    # user.email is not empty
    exit 0
fi 
```

之后你创建所有的git项目，无论是本地创建还是clone，都会在commit前进行检查，如果你的项目没有设置独立的用户名和邮箱，就会报错。
