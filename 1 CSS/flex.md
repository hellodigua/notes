## Flex 布局

任何元素都可以指定为 flex 布局

    display: flex;
    对于行内元素，应指定为
    display: inline-flex;

## 基本概念介绍

采用 Flex 布局的元素，称为 flex container，简称"容器"。
它的所有子元素自动成为容器成员，称为 flex item，简称"项目"。

## 容器属性介绍

- flex-flow：是 flex-direction 和 flex-wrap 属性的速记属性，控制伸缩方向和是否强制换行（默认 row nowrap）
  row：第一个参数，表示行方向。。
  column：第一个参数，表示列方向。。
  nowrap：第二个参数，表示容器只允许单行
  wrap：第二个参数，表示容器允许多行

- flex-wrap: 主要用来控制伸缩容器是单行还是多行
  nowrap: flex-wrap 的默认值，表示的是伸缩容器为单行。
  wrap: 表示的是伸缩容器为多行。

- align-items: 容器的水平对齐方式
  flex-start: 伸缩项目在侧轴起点边的外边距紧靠住该行在侧轴起点的边（人话：默认的顶对齐）
  flex-end: 在与 flex-start 相反的一边对齐
  center: 居中对齐

- justify-content: 容器的垂直对齐方式
  主要用来设置伸缩项目沿主轴的对齐方式，以及调整伸缩项目之间的间距
  flex-start: 默认的顶部对齐
  flex-end: 对齐到尾部
  center: 整体居中
  space-between: 平均分布在一行里，最左和最右贴在边框
  space-around: 平均分布在一行里，但是最左和最右仍有边距

align-content: 跟 justify-content 相似，用来设置伸缩项目沿副轴……

## 项目属性介绍

- order
  属性定义项目的排列顺序。数值越小，排列越靠前，默认为 0。

- flex-grow
  定义项目的放大比例，默认为 0，即如果存在剩余空间，也不放大。

- flex-shrink
  定义了项目的缩小比例，默认为 1，即如果空间不足，该项目将缩小。

- flex-basis
  属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。

- flex
  flex 属性是 flex-grow, flex-shrink 和 flex-basis 的简写，默认值为 0 1 auto。后两个属性可选。

- align-self
  align-self 属性允许单个项目有与其他项目不一样的对齐方式，可覆盖 align-items 属性。

# 技巧

- 让元素绝对居中

将 justify-content 与 align-items 的值为 center
