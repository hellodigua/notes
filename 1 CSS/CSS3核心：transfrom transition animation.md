# CSS3核心：transfrom transition animation

# 介绍

## Transform，变形

transform属性是静态属性，一旦写到style里面，将会直接显示作用，无任何变化过程。
transform的主要用途是用来做元素的特殊变形，简单的来说就是css 的图形变形工具。

- 如果需要使用3d模式，必须先指定style为3d，并在任意父元素上增加 perspective 及 perspective-origin 来指定透视点。


## Transition，过渡

transition属性是一个简单的动画属性，可以说它是animation的简化版本

## Animation，动画

从效果上可以“肤浅”地认为它是Transition跟Transform（或者普通CSS属性）的组合。

不同：Animation可以通过keyframe显式控制当前帧的属性，什么时候干什么完全能说了算，比Transition更灵活；Transition在过渡之后会改变元素的属性（它会让元素从原始属性变为目标属性），而Animation只是模拟元素的属性改变并在一定时间内按照一定速率来PLAY动画，动画结束了元素原本长啥样就显示啥样。

# API

## Transform

主要包含以下几个变换方式：

none 表示不进行变换；
rotate 旋转            transform:rotate(20deg) 旋转角度可以为负数。需要先有transform-origin定义旋转的基点可为left top center right bottom 或坐标值（50px 70px）。
skew  扭曲             transform:skew(30deg,30deg)  skew(相对x轴倾斜,相对y轴倾斜)
scale  缩放             transform:scale(2,3) 横向放大2倍，纵向放大3倍。如等比放大写一个参数即可。
translate 移动        transform:translate(50px, 50px);
matrix 矩阵变形     基本语法transform: matrix(a, c, b, d, tx, ty);其中a, c, b, d是一个二维矩阵:

## Transition

主要包含四个属性值：

transition-property： 执行变换的属性；
transition- duration：变换延续的时间：
transition-timing-function：在延续时间段，变换的速率变化；
transition- delay ：变换延迟时间

## Animation

用来创建一个动画帧

@-webkit-keyframes wobble {
  0% {
    margin-left: -100%;
  }
  100% {
    margin-left: 0;
  }
}

.demo {
  -webkit-animation-name:'wobble'; /*动画属性名*/
  -webkit-animation-duration: 10s; /*动画持续时间*/
  -webkit-animation-timing-function: ease-in-out; /*动画频率，和transition-timing-function是一样的*/
  -webkit-animation-delay: 2s; /*动画延迟时间*/
  -webkit-animation-iteration-count: 10; /*定义循环次数，infinite为无限次*/
  -webkit-animation-direction: alternate; /*定义动画方式*/
}
