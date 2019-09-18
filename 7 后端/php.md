# php基础知识

##echo

基本的输出语句
<?php 
  echo 'www';
  echo "hello";
?>

## 字符串连接符
使用.可以连接两个字符串
<?php 
  echo 'Hello'.'world';
  echo 'hello'.23;
?>

# php基础语法

## 变量
php用 $varname来定义变量
$var = 222;
$hello = "world";
echo $hello;

### 变量命名规则
1. 必须以字母或下划线开头
2. 子还能由字母、数字、下划线组成
3. 变量区分大小写

### 变量的数据类型

#### 布尔类型 
ture false 
用echo输出时，如果是true则输出1，false则不输出，可以使用 var_dump()来获取真正的类型

####整形 
即整数
$int1 = 123;
$int2 = -23;
$int3 = 0123; //八进制
$int4 = 0x1a; //十六进制

#### 浮点型
即小数
$flo1 = 1.23;
$flo2 = 1.2e3;

#### 字符串
$str1 = '我是字符串'; //可以用单引号
$str2 = "我也是字符串";  //也可以用双引号
以下四个例子表示，当字符串中有引号时，单引号包围双引号、双引号包围单引号是允许的，但是单引号包围单引号时，被包围的引号需要转义字符
$str3 = '甲："1111"';  // 甲："1111"
$str4 = "乙：'2222'";  //乙：'2222'
$str5 = '甲：\'3333\'';  //甲:'3333'
$str6 = "乙：\"4444\"";  //乙:"4444"

注意：
当单引号中包含变量时，变量会被当做字符串输出。
当双引号中包含变量时，则正常。

对于长字符串，需要在赋值符号后跟定界符 <<<，然后是标识符GOD，举例：

$str7 = <<<GOD
我有一只小毛驴，我从来也不骑。
有一天我心血来潮，骑着去赶集。
我手里拿着小皮鞭，我心里正得意。
不知怎么哗啦啦啦啦，我摔了一身泥.
GOD;

#### 特殊类型-资源类型
资源是由专门的函数来建立和使用的，例如打开文件、数据连接、图形画布。我们可以对资源进行操作（创建、使用和释放）。
举例：<?php
$file=fopen("f.txt","r");   //打开文件
$con=mysql_connect("localhost","root","root");  //连接数据库
$img=imagecreate(100,100);//图形画布
?>

#### 特殊类型-空类型
NULL是空类型，对大小写不敏感
当被赋值为null，或者未被赋值，或者被unset()，这三种情况变量被认为是NULL

## 常量

### 常量的定义
常量可以理解为不变的量，即常量被定义后，在脚本的其他任何地方都不可以被改变。PHP中的常量分为自定义常量和系统常量。

### 自定义常量
自定义常量是根据我们开发的需要，而定义的常量，它通过使用PHP中的函数的define()定义。
define($constant_name, value[, case_sensitive = true]);
第一个量为必选参数，即常量的名称
第二个量为必选参数，即常量的值
第三个量为可选参数，指定是否大小写敏感，true则不敏感，默认为false

举例：
define("PI",3.14);
define($p,3.14);

### 自定义常量的作用
常量主要功效是可以避免重复定义，篡改变量值。在进行团队开发时，或者代码量很大的时候，对于一些第一次定义后不改变的量，如果我们使用变量，在不知情的情况下，使用同一变量名时，变量值就会被替换掉，从而会引发服务器执行错误的任务。

### 系统常量
系统常量是PHP已经定义好的常量，我们可以直接拿来使用，常见的系统常量有：
1. __FILE__ :php程序文件名。它可以帮助我们获取当前文件在服务器的物理位置。
2. __LINE__ :PHP程序文件行数。它可以告诉我们，当前代码在第几行。
3. PHP_VERSION:当前解析器的版本号。它可以告诉我们当前PHP解析器的版本号，我们可以提前知道我们的PHP代码是否可被该PHP解析器解析。
4. PHP_OS：执行当前PHP版本的操作系统名称。它可以告诉我们服务器所用的操作系统名称，我们可以根据该操作系统优化我们的代码。

### 常量的取值
1. 使用常量名直接获取值
2. 使用constant()函数，它和直接使用常量名输出的效果是一样的，但函数可以动态的输出不同的常量，在使用上要灵活、方便。格式如下：mixed constant(string constant_name)
   举例：
   define("p",3.14);  // define($p,3.14)
   $r=1;
   $area = constant("p")*$r*$r // $area = constant($p)*$r*$r;

### 如何判定常量是否被定义
如果常量被重复定义以后，PHP解析器会发出“Constant XXX already defined”的警告，提醒我们该常量已经被定义过。
defined()函数可以帮助我们判断一个常量是否已经定义，其语法格式为：
bool defined(string constants_name)

# 运算符

## 算数运算符（加减乘除求余）
1. 加法 $c = $a + $b
2. 减法 $c = $a - $b
3. 乘法 $c = $a * $b
4. 除法 $c =  $a / $b
5. 求余 $c = $a % $b

## 赋值运算符
### = 
把右边表达式的值赋给左边的运算数
	$a = "www";
	$b = $a;
### & 
引用赋值，意味着两个变量都指向同一个数据。它将使两个变量共享一块内存。
	$a = "www";
	$b = &$a;

## 比较运算符
1. == 等于
2. === 全等
3. != 不等
4. <>  不等的另一种形式
5. !== 非全等（类型也需相同）
6. <  小于
7. \> 大于
8. <= 小于等于
9. \>= 大于等于

### 三元运算符 a?b:c
三元运算符是一种特殊的比较运算符
对于表达式(expr1)?(expr2):(expr3)，如果expr1的值为true，则此表达式的值为expr2，否则为expr3。举例：
    $a = 78;//成绩
    $b = $a >= 60? "及格":"不及格";
    echo $b;

## 逻辑运算符
1. and 逻辑与 	如果$a与$b都为true，返回true
2. or 逻辑或     如果$a或$b任一为true，返回true
3. xor 逻辑异或     如果$a与$b有且仅有一个为true，返回true
4. ! 逻辑非     如果$a不为true，返回true
5. && 逻辑与     如果$a与$b都为true，返回true
6. ||  逻辑或     如果$a或$b任一为true，返回true

## 连接运算符
1. . 它返回将右参数附加到左参数后面所得的字符串。
2. .= 它将右边参数附加到左边的参数后。
举例：（三者效果相同）

    $a = "hello";
	$tip = $a."world";
    $b = "hello";	
    $b .= "world"; 
	$c = "hello";	
    $c = $c."world";
  
## 错误控制运算符
PHP中提供了一个错误控制运算符“@”，对于一些可能会在运行过程中出错的表达式时，我们不希望出错的时候给客户显示错误信息，这样对用户不友好。于是，可以将@放置在一个PHP表达式之前，该表达式可能产生的任何错误信息都被忽略掉。

# 语言结构语句

## 顺序结构
  没什么可说的

## 条件结构

### if ... else
  没什么可说的

### if ... else if

  if(){

  }else if(){

  }
  通过条件一判断，若返回值为布尔值为TRUE，则执行任务A，若返回值为FALSE，则判断条件二，若返回值为布尔值TRUE，则执行任务B，否则既不执行任务A，也不执行任务B。服务器会继续往下执行其他任务。

### if ... else if ... else
  没什么可说的

### switch case
  switch($num){
      case 1:
        $info = "恭喜你！中了一等奖！";
      break;
    case 2:
      $info = "恭喜你！中了二等奖！";
      break;
    case 3:
      $info = "恭喜你！中了三等奖！";
      break;
    default:
      $info = "很遗憾！你没有中奖！";
  }

#### break
  break的作用是阻止代码进入下一个case中继续执行。

## 循环结构

### while
  while(条件){ 
       //执行任务
  }

### do...while
首先执行任务（上一节的while语句是先判断条件是否成立，再执行任务），执行任务完毕，判断某个条件是否符合（条件返回值是否为TRUE），若符合则再次执行任务，执行完毕任务，继续判定条件。
  do{ 
       //执行任务
  }while(条件)

### 上面两者的区别
  while与do…while循环语句的区别是，while先判断条件是否成立，后执行循环，do...while先执行一次任务，再判断是否继续执行循环，也就是说do...while至少会执行一次任务。当条件为FALSE时，while中的任务会一次也不执行，do...while中的任务会执行1次。

### for循环
  for(初始化;循环条件;递增项){
        //执行任务
  }

### foreach循环
  在PHP中foreach循环语句，常用于遍历数组，一般有两种使用方式:不取下标、取下标。

#### 只取值，不取下标
  foreach (数组 as 值){
  //执行的任务
  }

#### 同时取下标的值
  foreach (数组 as 下标 => 值){
   //执行的任务
  }

# PHP进阶知识

## 数组

### 定义与初始化
$arr = Array();
$fruit = array('apple','banana','pineapple');
然后呢，PHP一共有两种数组：索引数组和关联数组，下面开始介绍

### 索引数组
索引是从0开始，而赋值呢，一共三种方法：
$arr[0] = 'apple';
array('0'=>'apple');
array('apple');

### 访问索引数组
$getvalue = $fruit['0'];

#### 访问索引数组之for
  $fruit=array('苹果','香蕉','菠萝');
  for($i=0, $len = count($fruit); $i<$len; $i++){
      echo '<br>数组第'.$i.'值是：'.$fruit[$i];
  }

#### 访问索引数组之foreach
  $fruit=array('苹果','香蕉','菠萝');
  foreach($fruit as $k=>$v){
      echo '<br>第'.$k.'值是：'.$v;
  }

### 关联数组
简单说，关联数组就不是数字下标和值的对应了，而是键(自定义下标)与值的对应了。
  $fruit = array(
    'apple'=>"苹果",
    'banana'=>"香蕉",
    'pineapple'=>"菠萝"
  ); 

### 关联数组赋值
一共有两种方法：
  $arr['apple']='苹果';
  array('apple'=>'苹果');

### 访问关联数组
  $getvalue = $fruit['banana'];

#### 访问关联数组之foreach
  跟访问普通数组差不多
  $fruit=array('apple'=>"苹果",'banana'=>"香蕉",'pineapple'=>"菠萝");
  foreach($fruit as $key=>$value){
      echo '<br>键是：'.$key.'，对应的值是：'.$value;
  }

## 函数

### 自定义函数

function name(){
  echo 'hello';
}
name();

### 参数
function sum($a, $b) {
    echo $a + $b;
}
sum(1,2);

### 函数&返回值
使用return关键字可以使函数返回值，可以返回包括数组和对象的任意类型，如果省略了 return，则默认返回值为 NULL。
  function add($a) {
    return $a+1;
  }
  $b = add(1);

返回语句会立即中止函数的运行，并且将控制权交回调用该函数的代码行。
同时，函数不能返回多个值，但可以通过返回一个数组来得到类似的效果。
  function numbers() {
    return array(1, 2, 3);
  }
  list ($one, $two, $three) = numbers();

### 可变函数
可变函数，即通过变量的值来调用函数，因为变量的值是可变的，所以可以通过改变一个变量的值来实现调用不同的函数。
可变函数的调用方法为变量名加括号。

function name() {
    echo 'jobs';
}
$hello = 'name';
$hello(); //调用可变函数

### 内置函数
内置函数就是PHP默认支持的函数，PHP内置了很多标准的常用的处理函数，包括字符串处理、数组函数、文件处理、session与cookie处理等。

### 判断函数是否存在
function_exists用于检测函数是否存在。
method_exists用于检测类是否存在。
file_exists用于检测文件是否存在。

  function func() {
  }
  if (function_exists('func')){
      echo 'exists';
  }

### 函数和方法的区别
方法是类里的"函数"，只能通过对象调用。
特别的，类的静态方法能够通过类名直接调用。
平常说的函数，应该是全局作用域里的函数，引入后可以在任何地方直接调用。

## 类与对象
类是面向对象程序设计的基本概念，通俗的理解类就是对现实中某一个种类的东西的抽象， 比如汽车可以抽象为一个类，汽车拥有名字、轮胎、速度、重量等属性，可以有换挡、前进、后退等操作方法。

### 定义类
定义类
  class Car{
    public $name = '汽车'; // 定义属性
    public function getName(){ // 定义方法
      return $this->name;
    }
  }
创建类的实例
方法一：
  $benc = new Car();
方法二：
  $benc = 'Car';
  $car = new $benc();

### 属性的访问控制
  class Car{
    $it = 'benc'; //默认为公共属性，外部可以访问
    public $name = '汽车'; //定义公共属性
    protected $color = 'white'; //定义受保护的属性
    private $id = '123'; //定义私有属性
  }
其中，受保护的属性和私有属性不允许外部调用，在类的成员方法内部是可以调用的。

### 构造函数和析构函数（不懂，挂起）
没看懂，日后再更新

### static静态关键字（不懂，挂起）
静态属性与方法可以在不实例化类的情况下调用，直接使用类名::方法名的方式进行调用。静态属性不允许对象使用->操作符调用。
  class Car {
      private static $speed = 10;
      public static function getSpeed() {
          return self::$speed;
      }
  }
  echo Car::getSpeed();  //调用静态方法

### 对象的访问控制（不懂，挂起）

### 对象的继承（不懂，挂起）

### 重载（唉……）

### 高级特性



## 字符串操作

### 定义
一般有三种方法：单引号，双引号，heredoc语法结构
  $hello = 'hello world';
  $hello = "hello world";
  $hello = <<<TAG
  hello
  world
  TAG;

#### 区别
单引号：就是普通的字符串。
双引号：PHP允许我们在双引号串中直接包含字串变量。
  $str='hello';
  echo "str is $str"; //运行结果: str is hello
  echo 'str is $str'; //运行结果: str is $str

* 如果都是字符就尽量用单引号，因为程序在面对双引号的时候会寻找变量浪费资源。纯字符直接用单引号能更快的让程序执行，避免浪费资源。

### 字符串的连接
  $hello='hello';
  $world=' world';
  $hi = $hello.$world;

### 去除字符串收尾的空格
trim去除字符串两端的空格，rtrim去除字符串右部的空格，ltrim去除字符串左部的空格
  echo trim(" 空格 ");

### 获取字符串的长度
strlen()用于获取字符串长度
  $str = 'hello';
  $len = strlen($str);

### 字符串的截取
英文字符串substr()，中文字符串mb_substr()
  $str = 'hello world';
  $sum = substr($str, 0, 4); //从第0个位置开始取4个字符
  $str = '你好，世界';
  $sum = mb_substr($str, 0, 2, 'utf-8'); //从第0个位置开始取2个字符

* 中英文混合用mb_substr($str,开始位置，截取个数,"utf-8")其中utf-8可以省略

### 查找字符串
strpos(要处理的字符串, 要定位的字符串, 定位的起始位置[可选]);
  $str = 'I want to study at imooc';
  $pos = strpos($str, 'imooc');
  echo $pos;//结果显示19，表示从位置0开始，imooc在第19个位置开始出现

### 替换字符串
str_replace(要查找的字符串, 要替换的字符串, 被搜索的字符串, 替换进行计数[可选])
  $str = 'I want to learn js';
  $replace = str_replace('js', 'php', $str);
  echo $replace;//结果显示I want to learn php

### 格式化字符串（不懂，挂起）
  $str = '99.9';
  $result = sprintf('%01.2f', $str);
  echo $result;//结果99.90

### 字符串的合并与分割
合并函数implode()，分隔函数explode()

  $arr = array('Hello', 'World!');
  $result = implode('', $arr);
  print_r($result); //结果 Hello World!

  $str = 'apple,banana';
  $result = explode(',', $str);
  print_r($result); //结果 array('apple','banana')

### 字符串的转义
addslashes()用于对特殊字符加上转义字符，返回一个字符串

  $str = "what's your name?";
  echo addslashes($str); //输出：what\'s your name?

用途：
1. 防止sql注入，网站安全
2. 对提交的html代码进行转义等

## 正则（挂起）

## 会话控制（session cookie）

### Cookie
Cookie是存储在客户端浏览器中的数据，我们通过Cookie来跟踪与存储用户数据。
PHP通过setcookie函数进行Cookie的设置，任何从浏览器发回的Cookie，PHP都会自动的将他存储在$_COOKIE的全局变量之中，因此我们可以通过$_COOKIE['key']的形式来读取某个Cookie值。

#### 设置cookie
setcookie(name, value, expire, path, domain, 是否通过安全传输)；其中名称和值是必需的，后面的可选。

1. name cookie名，可通过 $_COOKIE['NAME']访问
2. value cookie值
3. expire 过期时间 unix时间戳格式，默认为0，表示浏览器关闭即失效
4. path 有效路径 如果设置为'/'，则整个网站都有效
5. domain 有效域 默认整个域名都有效，如果设置了www.baidu.com，则只在www中有效

因为Cookie是通过HTTP标头进行设置的，所以也可以直接使用header方法进行设置。
  header("Set-Cookie:cookie_name=value");

#### 示例
$value = 'test';
setcookie('testCookie', $value);
setcookie("TestCookie", $value, time()+3600);  //有效期一小时
setcookie("TestCookie", $value, time()+3600);  //有效期一小时
setcookie("TestCookie", $value, time()+3600, "/path/", "imooc.com"); //设置路径与域

#### cookie的删除和过期时间
setcookie() 同样用来删除cookie
  setcookie('test', '', time()-1); // 将过期时间设置到当前时间之前，cookie就会自动失效，即达到了删除cookie的目的
  setcookie('test', ''); //把cookie值设为空，即也达到了删除cookie的目的

从服务器端，可以使用：
  header("Set-Cookie:test=1393832059;expires=".gmdate('D,d M Y H:i:s \G\M\T',time()-1));

#### cookie的有效路径
cookie中的路径用来控制设置的cookie在哪个路径下有效，默认为'/'，在所有路径下都有，当设定了其他路径之后，则只在设定的路径以及子路径下有效，例如：
  setcookie('test', time(), 0, '/path');

#### cookie的局限性
cookie将数据存储在客户端，建立起用户与服务器之间的联系，通常可以解决很多问题，但是cookie仍然具有一些局限：

1. cookie相对不是太安全，容易被盗用导致cookie欺骗
2. 单个cookie的值最大只能存储4k
3. 每次请求都要进行网络传输，占用带宽

### session
session是将用户的会话数据存储在服务端，没有大小限制，通过一个session_id进行用户识别，PHP默认情况下session id是通过cookie来保存的，因此从某种程度上来说，seesion依赖于cookie。但这不是绝对的，session id也可以通过参数来实现，只要能将session id传递到服务端进行识别的机制都可以使用session。

#### 暂时挂起


## 文件系统

## 日期和时间

## 图形图像操作

## PHP异常处理

## 数据库操作