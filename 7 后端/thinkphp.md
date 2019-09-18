# thinkphp

标签： 后端

---
## 介绍

thinkphp是国产的一款开源MVC框架。
标准文档可前往[PHP3.2.3完全开发手册](http://www.kancloud.cn/manual/thinkphp)阅读

## 基础

### 特点
1. 基于MVC模式
2. 封装大量常用类库
3. 查询语言丰富
4. 中文文档全面

### 目录结构

www  WEB部署目录（或者子目录）
1. index.php    入口文件
1. README.md    README文件
1. Application  应用目录 （前台网页）
1. Admin        管理目录 （后台网页）
1. Public       资源目录 （前后台公用的资源文件存放）
1. ThinkPHP     框架目录

Application
1. Common         应用公共模块
  1. Common      应用公共函数目录
  1. Conf        应用公共配置文件目录
1. Home           默认生成的Home模块
  1. Conf        模块配置文件目录
  1. Common      模块函数公共目录
  1. Controller  模块控制器目录
  1. Model       模块模型目录
  1. View        模块视图文件目录
1. Runtime        运行时目录
  1. Cache       模版缓存目录
  1. Data        数据目录
  1. Logs        日志目录
  1. Temp        缓存目录

### 入口文件
入口文件主要完成：

载入框架入口文件（必须）
定义框架路径、项目路径（可选）
定义调试模式和应用模式（可选）
定义系统相关常量（可选）

### url访问方式

1. pathinfo模式
  http://域名/入口文件/模块名/方法名/键1/值1/键2/值2
  http://test.com/index.php/User/dosth/name/tom/age/12
2. 普通模式
  http://域名/入口文件?m=模块名&a=方法名&键1=值1&键2=值2
3. REWRITE模式
  http://域名/模块名/方法名/键1/值1/键2/值2
4. 兼容模式
  http://域名/入口文件？s=模块名/方法名/键1/值1/键2/值2

### 控制器调用视图模版

$this -> display()

$this -> display(模板名)

$this -> display(控制器名/模板名)

### 配置文件

ThinkPHP/Conf/convention.php 全局配置

App/Common/Conf/config.php 当前项目的配置

App/Home/Conf/condig.php 当前分组的配置 

### 模板引擎

