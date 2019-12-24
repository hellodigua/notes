# CSS3 核心：transfrom transition animation

# 介绍

## Transform，变形

transform 属性是静态属性，一旦写到 style 里面，将会直接显示作用，无任何变化过程。
transform 的主要用途是用来做元素的特殊变形，简单的来说就是 css 的图形变形工具。

- 如果需要使用 3d 模式，必须先指定 style 为 3d，并在任意父元素上增加 perspective 及 perspective-origin 来指定透视点。

## Transition，过渡

transition 属性是一个简单的动画属性，可以说它是 animation 的简化版本

## Animation，动画

从效果上可以“肤浅”地认为它是 Transition 跟 Transform（或者普通 CSS 属性）的组合。

不同：Animation 可以通过 keyframe 显式控制当前帧的属性，什么时候干什么完全能说了算，比 Transition 更灵活；Transition 在过渡之后会改变元素的属性（它会让元素从原始属性变为目标属性），而 Animation 只是模拟元素的属性改变并在一定时间内按照一定速率来 PLAY 动画，动画结束了元素原本长啥样就显示啥样。

# API

## Transform

主要包含以下几个变换方式：

none 表示不进行变换；
rotate 旋转 transform:rotate(20deg) 旋转角度可以为负数。需要先有 transform-origin 定义旋转的基点可为 left top center right bottom 或坐标值（50px 70px）。
skew 扭曲 transform:skew(30deg,30deg) skew(相对 x 轴倾斜,相对 y 轴倾斜)
scale 缩放 transform:scale(2,3) 横向放大 2 倍，纵向放大 3 倍。如等比放大写一个参数即可。
translate 移动 transform:translate(50px, 50px);
matrix 矩阵变形 基本语法 transform: matrix(a, c, b, d, tx, ty);其中 a, c, b, d 是一个二维矩阵:

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
-webkit-animation-name:'wobble'; /_动画属性名_/
-webkit-animation-duration: 10s; /_动画持续时间_/
-webkit-animation-timing-function: ease-in-out; /_动画频率，和 transition-timing-function 是一样的_/
-webkit-animation-delay: 2s; /_动画延迟时间_/
-webkit-animation-iteration-count: 10; /_定义循环次数，infinite 为无限次_/
-webkit-animation-direction: alternate; /_定义动画方式_/
}
