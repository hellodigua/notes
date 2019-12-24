# head 头属性列举

# 示例代码

        <!DOCTYPE html>
        <html lang="zh-CN">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
            <meta name="renderer" content="webkit">
            <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
            <title>xxx</title>
            <meta name="description" content="博客">
            <meta name="keywords" content="关键字">
            <link rel="shortcut icon" href="http://xxx.com/favicon.ico">
            <link rel="apple-touch-icon-precomposed" href="http://xxx.com/avatar.png">
            <link rel="stylesheet" type="text/css" href="main.css">
        </head>

# 解释

## 文档类型

        <!DOCTYPE html>

申明文档类型是 html5

## 文档语言

        <html lang="zh-cmn-Hans">

向浏览器申明页面是简体中文页面！
繁体中文页面：html lang=zh-cmn-Hant
英语页面：html lang=en
单一的 zh 和 zh-CN 均属于废弃用法！ // 现在持保留态度
参见知乎问答: https://www.zhihu.com/question/20797118/answer/63480740

## 文档编码

        <meta charset="UTF-8">

声明文档的字符编码方式

## 设置浏览器版本

        <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">

优先使用 IE 的最新版本和 chrome

## 双核浏览器

        <meta name="renderer" content="webkit">

国内的双核浏览器会在读取到这个标签后，切换对应的极速核

## 移动端显示

        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">

viewport 可以让布局在移动端更好的显示;
device-width:宽度是设备屏幕的宽度;
initial-scale:初始的缩放比例;
user-scalable:用户是否可以手动缩放

## title

        <title>xxx</title>

网页标题

## 网页描述

        <meta name="description" content="博客">

网页描述

## 关键词

        <meta name="keywords" content="关键字">

网页的关键词

## 图标

        <link rel="shortcut icon" href="http://xxx.com/favicon.ico">

网页的 icon

## 图标 for 苹果

        <link rel="apple-touch-icon-precomposed" href="http://xxx.com/avatar.png">

苹果浏览器的私有属性，可以让用户将网站添加到主屏幕上

## 引用 style

        <link rel="stylesheet" type="text/css" href="main.css">

引用 css 文件

# 模板

然后我们就可以抽离出一个 head 部分的模板了(_¯ ︶ ¯_)

        <!DOCTYPE html>
        <html lang="zh-cmn-Hans">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
            <meta name="renderer" content="webkit">
            <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
            <title></title>
            <meta name="description" content="">
            <link rel="shortcut icon" href="favicon.ico">
            <link rel="stylesheet" type="text/css" href="">
        </head>
