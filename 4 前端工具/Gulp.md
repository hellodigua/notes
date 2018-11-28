# gulp

## 基础
gulp是前端开发过程中对代码进行构建的工具，在开发过程中很多重复的任务能够使用gulp自动完成。

### 特点
易于使用：采用代码优于配置策略，Gulp让简单的事情继续简单，复杂的任务变得可管理。
高效：通过利用Node.js强大的流，不需要往磁盘写中间文件，可以更快地完成构建。
高质量：Gulp严格的插件指导方针，确保插件简单并且按你期望的方式工作。
易于学习：通过把API降到最少，你能在很短的时间内学会Gulp。构建工作就像你设想的一样：是一系列流管道。

### 安装
全局安装
  npm install -g gulp
作为项目的开发依赖安装
  npm install --save-dev gulp

### 引入
  在项目根目录下创建 gulpfile.js
  var gulp = require('gulp'); // 引入gulp

### 创建任务
使用task创建任务
  gulp.task('任务名', 'function(){ 执行的任务 }');

### 默认任务
任务名为default即可
  gulp.task('default', ['任务1', '任务2']);
然后在命令行输入gulp，即可默认执行default的任务

### package.json
使用 npm install --save-dev gulp-xxx，会在package.json中保存所有模块依赖和版本。

这样一来，就不需要将 node_modules/ 上传到git，团队成员只需在命令行输入npm install，就可以检测 package.json 中的 devDependencies 并安装所有依赖了。

## glob模式
glob模式是指shell所使用的简化的正则表达式。

*       匹配0个或多个任意字符，但不会匹配路径分隔符，除非路径分隔符出现在末尾
** 匹配路径中的0个或多个目录及其子目录，需要单独出现，即它左右不能有其他东西了。
[abc]   匹配任何一个方括号中的字符
?       只匹配一个字符
[a-z]   匹配任意一个给定范围的字符

## API

### .src()
  读取文件

### .task()
  注册任务

### .dest()
  输出文件到指定的地方

### .watch()
  监视文件，当文件变化的时候执行某命令

### 示例
gulp.task('data', function(){
    return gulp.src('images/*.jpg').pipe(gulp.dest('dist/images')); //把images下的jpg文件复制到dist/images下
    return gulp.src('images/*').pipe(gulp.dest('dist/images')); //把images下的所有文件...
    return gulp.src('images/**/*').pipe(gulp.dest('dist/images')); //把images下的所有文件包括子目录下的文件...
    return gulp.src(['images/*.jpg', '!images/*.png']).pipe(gulp.dest('dist/images')); //复制的文件不包括png格式
});

gulp.task('build', ['data','data2','data3'], function(){ //任务依赖，必须先执行数组里的任务
  console.log('编译成功！');
});

## gulp plugin
安装插件的方法同安装gulp    npm install gulp-**** 
同样需要引入  var sass = require('gulp-sass');

- gulp-webserver 静态服务器

- gulp-livereload 网页自动刷新

- browserSync 自动刷新，比上面的吊

- gulp-change 监视文件改动

- sass/less 编译css

- gulp-watch-path 获取和输出路径

- gulp-concat 合并文件

- gulp-uglify 压缩js文件

- gulp-minify-css 压缩css文件

- gulp-rename 重命名文件

- gulp-imagemin 优化图片尺寸质量

- imagemin-pngquant 深度压缩图片质量

## gulp技巧集

来源：
http://www.kancloud.cn/wizardforcel/gulp-doc/147247

### 删除文件和文件夹
因为 del 模块支持多个文件以及 globbing，因此，在这个例子中，我们将使用它来删除文件：

  npm install --save-dev gulp del 

在 gulpfile 中，我们希望在运行我们的编译任务之前，将 mobile 文件的内容先清理掉：

  var gulp = require('gulp');
  var del = require('del');

  gulp.task('clean:mobile', function (cb) {
    del([
      'dist/report.csv',
      // 这里我们使用一个通配模式来匹配 `mobile` 文件夹中的所有东西
      'dist/mobile/**/*',
      // 我们不希望删掉这个文件，所以我们取反这个匹配模式
      '!dist/mobile/deploy.json'
    ], cb);
  });

  gulp.task('default', ['clean:mobile']); 