# TypeScript

## 简介

TypeScript 是 JavaScript 的一个超集，主要提供了类型系统和对 ES6 的支持。

### 为什么选择 TypeScript

#### TypeScript 增加了代码的可读性和可维护性

- 类型系统实际上是最好的文档，大部分的函数看看类型的定义就可以知道如何使用了。
- 可以在编译阶段就发现大部分错误，这总比在运行时候出错好。
- 增强了编辑器和 IDE 的功能，包括代码补全、接口提示、跳转到定义、重构等。

#### TypeScript 非常包容

- TypeScript 是 JavaScript 的超集，.js 文件可以直接重命名为 .ts 即可
- 即使不显式的定义类型，也能够自动做出类型推论
- 可以定义从简单到复杂的几乎一切类型
- 即使 TypeScript 编译报错，也可以生成 JavaScript 文件
- 兼容第三方库，即使第三方库不是用 TypeScript 写的，也可以编写单独的类型文件供 TypeScript 读取

#### TypeScript 拥有活跃的社区

- 大部分第三方库都有提供给 TypeScript 的类型定义文件
- TypeScript 拥抱了 ES6 规范，也支持部分 ESNext 草案的规范
- 主流前端框架均已支持 TypeScript 开发

### 缺点

- 有一定的学习成本，需要理解接口（Interfaces）、泛型（Generics）、类（Classes）、枚举类型（Enums）等前端工程师可能不是很熟悉的概念
- 短期可能会增加一些开发成本，毕竟要多写一些类型的定义，不过对于一个需要长期维护的项目，TypeScript 能够减少其维护成本
- 集成到构建流程需要一些工作量
- 可能和一些库结合的不是很完美

### 安装

```js
npm i -g typescript
```

编译一个 TypeScript 文件很简单：

```ts
tsc hello.ts
```
