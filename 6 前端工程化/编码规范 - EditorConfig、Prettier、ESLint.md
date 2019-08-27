# 编码规范

以下如有配置，均基于VSCode。

[风格与品位--3个前端代码规范的工具](https://mp.weixin.qq.com/s/C3w_d5uAU9MQtn5tS6Lrpg)
[组件库项目工程化的两个尝试](https://www.yuque.com/xuemuyang/zsevtt/zubg5g#34827fd5)

## EditorConfig

是什么：统一编辑器风格，用于跨编辑器保持相同代码风格

特点：编辑的时候读取文件格式并遵循定义的样式（起作用于敲代码之前）

## prettier

是什么：统一项目编码风格，用于项目在不同编辑器上保持相同代码风格

特点：保存文件时才会被整理格式（起作用于保存代码之后）

Q: 有了prettier，还用editorConfig吗？
A: 使用。一个是编辑器风格，一个是项目风格，作用不同。editorConfig 起作用于敲代码之前，prettier 起作用于保存代码之后；可以自己试验它们的不同，如以下为 editorConfig 空格设置为4，prettier 空格设置为2的场景，每次回车变成4格，每次保存又变成2格。

## ESLint

是什么：代码问题和错误检查
为什么用：统一编码习惯，避免代码中出现一些低级错误

## styleLint

是什么：CSS 版的 ESLint

## commitizen

是什么：检查commit message 是否符合规范

## husky

是什么：让 gitHooks 变的更简单

## lint-staged

对 stage 文件做一些校验
也就是 git add 之后的区域，暂存区

# 如何使用

## EditorConfig

touch .editorconfig

```
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true


[*.md]
trim_trailing_whitespace = false
```

## Prettier

- 全局安装prettier

```
npm i -g prettier
```

- Vscode安装插件 Prettier-Code formatter

同时配置setting.json中： formatOnSave: true

- 项目配置 .prettierrc 优先级最高，会覆盖默认配置


