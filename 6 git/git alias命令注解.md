### git

alias g='git'

alias ga='git add'

# 添加所有文件到暂存区

alias gaa='git add --all'
alias gapa='git add --patch'
alias gau='git add --update'

alias gb='git branch'
alias gba='git branch -a'
alias gbd='git branch -d'

# 删除已合并分支

alias gbda='git branch --no-color --merged | command grep -vE "^(\*|\s*(master|develop|dev)\s*\$)" | command xargs -n 1 git branch -d'
alias gbl='git blame -b -w'
alias gbnm='git branch --no-merged'
alias gbr='git branch --remote'
alias gbs='git bisect'
alias gbsb='git bisect bad'
alias gbsg='git bisect good'
alias gbsr='git bisect reset'
alias gbss='git bisect start'

alias gc='git commit -v'
alias gc!='git commit -v --amend'
alias gcn!='git commit -v --no-edit --amend'
alias gca='git commit -v -a'
alias gca!='git commit -v -a --amend'
alias gcan!='git commit -v -a --no-edit --amend'
alias gcans!='git commit -v -a -s --no-edit --amend'
alias gcam='git commit -a -m'
alias gcsm='git commit -s -m'
alias gcb='git checkout -b'
alias gcf='git config --list'
alias gcl='git clone --recursive'
alias gclean='git clean -fd'
alias gpristine='git reset --hard && git clean -dfx'
alias gcm='git checkout master'
alias gcd='git checkout develop'
alias gcmsg='git commit -m'

# 切换分支

alias gco='git checkout'
alias gcount='git shortlog -sn'
compdef \_git gcount
alias gcp='git cherry-pick'
alias gcpa='git cherry-pick --abort'
alias gcpc='git cherry-pick --continue'
alias gcs='git commit -S'

alias gd='git diff'
alias gdca='git diff --cached'
alias gdct='git describe --tags `git rev-list --tags --max-count=1`'
alias gdt='git diff-tree --no-commit-id --name-only -r'
alias gdw='git diff --word-diff'

# 列出所有本地分支

alias gb="git branch"

# 列出所有本地分支和远程分支

alias gba="git branch -a"

# 切换分支

alias gco="git checkout"

# 切换到 develop 分支

alias gcd="gco develop"

# 从远程拉取提交

alias gl="git pull"

# 查看文件变更记录

alias gss="git status -s"

# 推送本地提交记录

alias gp="git push"
alias ga="git add"

# 把暂存区的文件恢复到工作区

alias gcoa="git checkout -- ."

# 提交暂存区到仓库区

alias gcm="git commit -m '\$1'"

# 显示 commit 历史，以及每次 commit 发生变更的文件（最近五个）

alias glg="git log --stat --max-count=5"

# 可视化方式显示 commit 历史

alias glgg="git log --graph --max-count=5"

# 合并指定分支到当前分支

alias gm="git merge"

# 合并指定分支到当前分支

alias gmd="git merge develop"

# 重置当前分支的 HEAD

alias grh="git reset HEAD"

# 重置当前分支的 HEAD 为指定 commit，同时重置暂存区和工作区，与指定 commit 一致

alias grhh="git reset HEAD --hard"

# 合并某个 commit 到当前分支

alias gcp="git cherry-pick"

# 将当前 commit 修改合并至上一个 commit

git commit -a -amend
