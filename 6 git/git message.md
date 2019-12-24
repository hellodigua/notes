原文： http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html

# Commit Messages

格式化的 Commit message，有几个好处：

1. 提供更多的历史信息，方便快速浏览。

2. 可以过滤某些 commit（比如文档改动），便于快速查找信息。

3. 可以直接从 commit 生成 Change log。

## commit message 的格式

每次提交，Commit message 都包括三个部分：Header，Body 和 Footer。
其中，Header 是必需的，Body 和 Footer 可以省略。（以下仅说明 Header 部分）
不管是哪一个部分，任何一行都不得超过 72 个字符（或 100 个字符）。这是为了避免自动换行影响美观。

### type（header）

用于说明 commit 的类别，只允许使用下面 7 个标识。

feat：新功能（feature）
fix：修补 bug
docs：文档（documentation）
style： 格式（不影响代码运行的变动）
refactor：重构（即不是新增功能，也不是修改 bug 的代码变动）
test：增加测试
chore：构建过程或辅助工具的变动

### subject（header）

subject 是 commit 目的的简短描述，不超过 50 个字符。
以动词开头，使用第一人称现在时，比如 change，而不是 changed 或 changes
第一个字母小写
结尾不加句号（.）

### body

Body 部分是对本次 commit 的详细描述，可以分成多行。

### footer

不需要，略

## Commitizen

Commitizen 是一个撰写合格 Commit message 的工具。

安装：

    npm install -g commitizen

在项目内初始化：

    commitizen init cz-conventional-changelog --save-dev --save-exact

以后，凡是用到 git commit 命令，一律改为使用 git cz。这时，就会出现选项，用来生成符合格式的 Commit message。

# Change Log

如果你的所有 Commit 都符合格式，那么发布新版本时， Change log 就可以用脚本自动生成。
生成的文档包括以下三个部分。

New features
Bug fixes
Breaking changes
