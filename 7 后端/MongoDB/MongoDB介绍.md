# MongoDB

标签： 后端

---

# MongoDB 介绍及安装

## 简介

MongoDB 是新的 NoSQL（非关系数据库）

## 为什么选择 MongoDB

1. 无数据结构限制
   没有表结构的概念，每条记录可以有完全不同的结构
   业务开发方便快捷
   sql 数据库需要事先定义表结构再使用
2. 完全的索引支持
   单键索引，多键索引： {x:1, y:1}
   数组索引 ['apple', 'banana']
   全文索引 'hello, wolrd' （不支持中文）
   地理位置索引 2D
3. 方便的冗余与扩展
   复制集保证数据安全
   分片扩展数据规模
4. 良好的支持
   完善的文档
   齐全的驱动支持

## 搭建 Mongodb 运行环境（Windows）

1. 下载
   从[MongoDB 下载中心](https://www.mongodb.com/download-center)下载，windows 有三种可选下载包

- MongoDB for Windows 64-bit
  只能运行在 Windows Server 2008 R2, Windows 7 64-bit 或更新的版本 Windows。此版本使用了 Windows 平台的性能增强，该版本不能运行于老版本的 windows 上。
- MongoDB for Windows 32-bit
  可以运行在任何一个 Windows Vista 之后的 32 位 Windows 上。32 位版本的 MongoDB 仅适用于在旧系统上做测试或开发，它只支持小于 2GB 的数据库。
- MongoDB for Windows 64-bit Legacy
  可以运行于 Windows Vista, Windows Server 2003 和 Windows Server 2008，但是不包括最近的性能增强。

2.  安装
    安装时记得选择 custom，然后自己指定目录，比如安装在 D:\mongodb\
    安装好以后记得将 `D:\Program Files\MongoDB\bin`添加到环境变量中:计算机–属性–高级系统配置–环境变量–系统变量-path

3.  配置
    数据库数据的默认位置是 \data\db ，也可以自己指定一个目录创建
    数据库日志的默认位置是 \data\log，也可以自己指定一个目录创建

4.  创建配置文件
    创建文件 mongod.cfg 在安装目录 D:\mongodb\下，示例
    `logpath=D:\Program Files\MongoDB\data\log\mongod.log dbpath=D:\Program Files\MongoDB\data\db fork=true`
5.  启动 MongoDB
    当数据库位置是默认位置时，使用`mongod`启动
    如果在其他位置，使用`mongod --dbpath '目录位置'`启动
    如果成功启动的话，打开http://localhost:27017/，看看是否有输出信息

6.  连接 MongoDB
    运行`mongo`就可以连接上 MongoDB

7.  添加 mongodb 为 windows 服务
    以管理员权限启动 cmd 1. 创建目录（为数据库文件和日志文件创建目录）
    `md D:\Program Files\mongodb\data\db md D:\Program Files\mongodb\log` 2. 创建配置文件（实际上是第四步的操作，如果已经操作过了，没必要再来的）
    `echo logpath=D:\Program Files\MongoDB\log\mongod.log> "D:\Program Files\MongoDB\mongod.cfg" echo dbpath=D:\Program Files\MongoDB\data\db>> "D:\Program Files\MongoDB\mongod.cfg" echo fork=true>> "D:\Program Files\MongoDB\mongod.cfg"` 3. 添加系统服务

    ```
    sc create mongodb binPath= "\"D:\Program Files\MongoDB\bin\mongod.exe\" --service --config=\"D:\Program Files\MongoDB\mongod.cfg\"" DisplayName= "MongoDB" start= "auto"

        // start设置为auto，每次自动启动，需要手动启动，可以设置为demand
    ```

    ```
    成功后将会输出[SC] CreateService 成功
    做完第8步的'启动服务'之后进行重启

    ```

8.  服务启动、停止、删除

- 启动服务
  `net start mongodb`
- 停止服务
  `net stop mongodb`
- 删除服务
  `sc delete mongodb`

> 参考文章 http://howiefh.github.io/2014/04/26/mongodb-note-1-install-mongodb/

# 使用 MongoDB

## 基本概念

- 文档
  文档是 MongoDB 中数据的基本单元，类似于关系数据库中的行（比行要复杂）
- 集合
  集合就是一组文档，类似于关系型数据库中的表
- 数据库
  数据库由多个集合组成，一个 MongoDB 可以承载多个数据库，它们之间可视为完全独立

### 文档

文档由多个键值对组成，他们具有以下特性

1. 文档中的键/值对是有序的(通常文档中键的顺序并不重要)
2. 文档中的值不仅可以是双引号里的字符串，还可以是其他几种数据类型(甚至可以是整个嵌入的文档)
3. 文档的键是字符串
4. 键/值区分类型和大小写
5. 键不能重复
6. 除了下面少数例外情况，键可以使用任意 UTF-9 字符
   1. 键不能含有\0(空字符)，这个字符用于表示键的结尾
   2. 点(.)和\$有特殊的意义，只能在特定环境下使用
   3. 以下划线"\_"开头的键为保留键

### 集合

MongoDB 的集合有以下特性：

1. 无模式。集合无模式意味着一个集合里的文档可以是各式各样的，但最好根据数据特征或业务需求划分成多个集合
2. 命名，通过名字来标识集合。集合名可以是满足下列条件的任意 UTF-8 字符串：
   1. 集合名不能是空字符串
   2. 集合名不能含有\0 字符(空字符)，这个字符表示集合名的结尾
   3. 集合不能以“system.”开头，这是为系统集合保留的前缀（比如，system.users 保存着数据库的用户信息，system.namespaces 集合保存着所有数据库集合的信息）
   4. 用户创建的集合名不能含有保留字符\$

> 子集合：组织集合的一种惯例是使用"."字符分开的按命名空间划分的子集合。
> 例如，带有博客功能的应用可能包含的两个集合 blog.posts 和 blog.authors。这样可以很清晰的表述 posts 和 authors 是博客应用的一部分，具体 blog 集合是否存在那无关紧要，即 blog 集合和其子集合没有任何关系。在 MongoDB 中推荐使用子集合来组织数据。

### 数据库

1. 一个 MongoDB 实例可以承载多个数据库
2. 它们之间可视为完全独立
3. 每个数据库都有独立的权限控制，即便在磁盘上，它们存放的文件也是不同的
4. 数据库名可以是满足以下条件的任意 UTF-8 字符串：
   1. 不能为空字符串("")
   2. 不能含有‘’(空格)，.(点)，\$，/，\和\0(空字符)
   3. 应全部小写
   4. 最多 64 字节

> 数据库名最终会变成文件系统中的文件，所以才会受到以上条件的限制。有些数据库名是保留的，可以直接访问。比如，拥有所有权限的 admin，该数据库中的用户会自动继承所有数据库的权限。local 数据库用于存储仅限于本地单台服务器的任意集合，这个数据库永远不会被复制。config 数据库用于保存分片的相关信息，当 Mongo 使用分片设置时会用到该数据库。

> 命名空间：数据库名+集合名，长度不能超过 121 字节，实际使用中应该小于 100 字节。

## 数据类型

MongoDB 的文档扩展自 JSON，概念上和 JavaScript 的对象类似，它支持将多种数据类型作为文档中的值。
在保留 JSON 基本键/值对特性的基础上，MongoDB 添加了其他的数据类型。

### 基本数据类型

- null，用于表示空值或不存在的字段，比如，{“x”：null}
- 布尔，含有'true'和'false'两个值，比如，{“x”：true}
- 32 位整数，在 Mongo Shell 中不能使用，因为 JavaScript 仅支持 64 位浮点数，所以 32 为整数会被自动转换
- 64 位整数，在 Mongo Shell 中不支持，shell 会使用一个特殊的内嵌文档来显示 64 位整数
- 64 位浮点数，shell 中的数字都是这种类型，{“x”：3.14}和{"x"：3}都是浮点数
- 字符串，UTF-8 字符串都可表示为字符串类型的数据
- 符号，shell 不支持此类型，shell 会将数据库里的符号类型转换为字符串
- 对象 id，对象 id 是文档的 12 字节的唯一 ID，比如，{“x”：ObjectId()}
- 日期，存储的是从标准纪元开始的毫秒数，不存储时区，比如，{“x”：new Date()}
- 正则表达式，文档中可以包含正则表达式，采用 JS 的正则语法：{“x”：/foobar/i}
- 代码，文档中可以包含 JavaScript 代码
- 二进制数据，可以由任意字节的串组成，shell 中无法使用
- 最大值，BSON 是 MongoDB 采用的文档存储协议，它包含一个特殊类型，表示可能的最大值，shell 中无此类型
- 最小值，BSON 中包括的一个特殊类型，表示可能的最小值，shell 中无此类型
- 未定义，{“x”：undefined}
- 数组，值的集合或列表可以表示成数组，比如，{“x”：[“a”,"b","c"]}
- 内嵌文档，文档可以嵌入文档，比如，{“x”：{“foo”：“bar”}}

> MongoDB 中数字默认为双精度，如果修改文档中的整数，即使保持其值原封不动，它也会经历转化为浮点数的过程，所以尽量不要在 shell 下覆盖整个文档。

### \_id 和 ObjectId

MongoDB 中存储的文档必须有一个\_id 键。这个键的值可以是任何类型，默认为 ObjectId 对象。一个集合中，每个文档都有唯一的\_id 值，它是集合里每个文档的唯一标识。

objectId 是\_id 的默认类型，不同的机器都能用全局唯一的同种方法方便地生成它。ObjectId 使用 12 字节的存储空间，每个字节两位十六进制数字，是一个 24 位字符串。

> 参考文章 http://blog.csdn.net/qbg19881206/article/details/18218729

# MongoDB 操作

## 对数据库的操作

- 查看数据库
  show dbs

- 使用数据库
  use 数据库名

- 创建数据库
  有没有数据库都没关系，直接 use 数据库名 即可，当我们在里面生成集合的时候， 数据库会自动建起来

- 删除数据库
  db.dropDatabase()

### 对数据的操作

- insert()
- find()
-

http://www.kancloud.cn/thinkphp/the-little-mongodb-book/39134
