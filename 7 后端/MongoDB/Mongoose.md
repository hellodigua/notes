# Mongoose

## 介绍

一般我们不直接用 MongoDB 的函数来操作 MongoDB 数据库，Mongose 就是一套操作 MongoDB 数据库的接口.

Mongoose 增查改删学习笔记： https://segmentfault.com/a/1190000008245062
Mongoose 参考手册： https://cnodejs.org/topic/548e54d157fd3ae46b233502
Mongoose 全面理解： http://www.cnblogs.com/jayruan/p/5123754.html
Mongoose 文档： http://www.nodeclass.com/api/mongoose.html#quick_start

### 概念

- Schema

一种以文件形式存储的数据库模型骨架，无法直接通往数据库端，也就是说它不具备对数据库的操作能力.可以说是数据属性模型(传统意义的表结构)，又或着是“集合”的模型骨架

- Model

由 Schema 构造生成的模型，除了 Schema 定义的数据库骨架以外，还具有数据库操作的行为，类似于管理数据库属性、行为的类

- Entity

由 Model 创建的实体，使用 save 方法保存数据，Model 和 Entity 都有能影响数据库的操作，但 Model 比 Entity 更具操作性

## API

### 查询

model.find({}, callback)

### 创建

model.create(文档数据, callback)

### 更新

参数：查询条件, 更新对象

model.update(conditions, update, function(error))

### 删除

参数：查询条件

model.remove(conditions, callback)

### 修改器和更新器

### where

## 实例

db.admin.find({}) 查询当前数据库下面 admin 文档的所有内容

db.admin.remove({}) 删除 admin 下面所有内容

db.admin.insert({})
插入新的值

    db.update(query, val， upsert，more)
    第一个参数为查询条件
    第二个为操作方式 可以全部替换 也可以新添加值
    "$inc": {"age": 1}  给age 加1  $inc 用于数字的增加和减少
    "$set": {"age": 3}  修改age 为3   $set 用于更新修改某个值
    "$unset": {"age": 3}  修改age 为3  删除age键  $unset  用于删除某个键
    "$push”: {"lists": 1}   lists  数组添加1位1   $push 同于像数组里面新增选项
    "$addToset": {"lists": {"$each": [3, 4, 5]}} 像lists里面添加3,4,5$addToset不会添加重复的
    "$pop" {"lists": 1} } 1表示从数组末尾删除一位  -1表示从数组前面删除一位
    "$pull" {"lists": 1} } 1表示从lists 里面匹配到1 然后删除

第三个参数 upsert
表示如果能成功更新 则正常更新 否则 创建新的

第四个参数 more
默认只更新匹配到的第一个
true 则更新匹配到的所有
