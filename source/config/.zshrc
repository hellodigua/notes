#! /usr/bin/env zsh

export LC_ALL=en_US.UTF-8
export LANG=en_US.UTF-8

# Path to your oh-my-zsh installation.
export ZSH=/Users/digua/.oh-my-zsh
export NVM_DIR="$HOME/.nvm"
# ssh
# export SSH_KEY_PATH="~/.ssh/rsa_id"

# nvm 懒加载
if [[ ! -a ~/.zsh-async ]]; then
  git clone git@github.com:mafredri/zsh-async.git ~/.zsh-async
fi
source ~/.zsh-async/async.zsh

function load_nvm() {
    [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
    [ -s "$NVM_DIR/bash_completion" ] && . "$NVM_DIR/bash_completion"
}

async_start_worker nvm_worker -n
async_register_callback nvm_worker load_nvm
async_job nvm_worker sleep 0.1

# 目录跳转 z
eval "$(lua ~/scripts/z.lua --init zsh)"

# zsh theme(https://github.com/robbyrussell/oh-my-zsh/wiki/Themes)
ZSH_THEME="robbyrussell"

# 禁用双周自动更新检查
DISABLE_AUTO_UPDATE="true"
# export UPDATE_ZSH_DAYS=13

# 启用命令自动更正
ENABLE_CORRECTION="true"

# zsh plugins (plugins can be found in ~/.oh-my-zsh/plugins/*)
plugins=(
  git
)

source $ZSH/oh-my-zsh.sh

# User configuration

# export MANPATH="/usr/local/man:$MANPATH"

# python 别名
alias python='python3.6'

# 快速启动开发
alias dev='yarn run dev'

# 打开项目
alias code='/Applications/Visual\ Studio\ Code.app/Contents/Resources/app/bin/code'

# 打开笔记
alias note='/Applications/Visual\ Studio\ Code.app/Contents/Resources/app/bin/code ~/Desktop/notes'
alias life='/Applications/Visual\ Studio\ Code.app/Contents/Resources/app/bin/code ~/Desktop/life'

# 删除到回收站
alias rmm='rmtrash'

# 连接服务器
alias digua='ssh digua@111.231.82.146 -p 11875'

# 上传文件到服务器
alias fileupload='_a(){ scp -P 11875 -r $1 digua@111.231.82.146:/home/digua/sync }; _a'

alias pm2init='pm2 deploy ecosystem.json production setup'
alias pm2pub='pm2 deploy ecosystem.json production'

alias useproxy='git config --global http.proxy "socks5://127.0.0.1:1080" && git config --global https.proxy "socks5://127.0.0.1:1080"'
alias resetproxy='git config --global --unset http.proxy'

# nvm加载速度优化 https://zhuanlan.zhihu.com/p/112984829
