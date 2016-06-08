# [MAZING...](http://yowangbin.com/maze/index.html)
###### Author:wangbin
###### E-mail:yowangbin@gmail.com
MAZING项目起源于一款HTML迷宫游戏，这款游戏是用既有的迷宫图片作为游戏背景，只能通过更换图片的方式生成迷宫，会不会有更好的解决方案？   
所以，我开始考虑...        
如何用算法自动生成迷宫...       
如何绘制迷宫...       
如何实现碰撞检测...       
...     
于是，有了这款简单的游戏！
![](http://7xpx89.com1.z0.glb.clouddn.com/mazing.png "欢迎Star")
## 技术难点：
1. 深度优先算法    
2. 迷宫的绘制    
3. 主角的绘制(canvas or dom)    
4. 雪碧图应用    
5. 主角与迷宫的碰撞检测    
6. 主角与终点或宝物的碰撞检测    

## 项目依赖安装
若非进行开发，可忽略本步骤，直接运行根目录下index.html即可
##### 安装gulp
    npm install gulp -g
##### 安装gulp插件
    npm install gulp-ruby-sass gulp-autoprefixer gulp-minify-css gulp-jshint gulp-concat gulp-uglify gulp-clean gulp-notify gulp-rename --save-dev
##### gulp命令
    执行默认命令(目录清理、文件监听、压缩JS与CSS):gulp
    目录清理命令:gulp clean
    压缩CSS命令:gulp styles
    压缩JS命令:gulp scripts
    文件监听命令:gulp watch
##### 项目开发流程
    打开CDM，输入gulp，回车

## 目录结构
![目录结构](http://7xpx89.com1.z0.glb.clouddn.com/2016-06-08_125516.png "目录结构")  
* dist文件夹 : 存放压缩后的*.min.js、*.min.css
* img文件夹  : 存放图片资源
* src文件夹  : js文件夹存放原始*.js、css文件夹存放原始*.scss文件
* .gitignore : 声明git提交时忽略的文件
* app.js     : 游戏入口
* favicon.ico: 网页小图标
* gulpfile.js: gulp配置文件
* index.html : 主页面

## API







sass --watch style.scss:style.css
