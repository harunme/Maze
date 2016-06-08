var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify');

var paths = {
    sassSrcPath: "src/css/style.scss",
    sassDestPath: "dist/",
    jsSrcPath: "src/js/*.js",
    jsDestPath: "dist/"
};

// 如果需要通过scss文件编译css，就使用这段代码
// 目标目录清理
gulp.task('clean', function() {
    return gulp.src(['./dist'], { read: false })
        .pipe(clean());
});
gulp.task('styles', function() {
    return sass(paths.sassSrcPath, {
            style: 'compressed',
        })
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(paths.sassDestPath))
        .pipe(notify({ message: 'CSS文件编译完成..' }));
});

// JS处理任务
gulp.task('scripts', function() {
    return gulp.src(paths.jsSrcPath) //引入所有需处理的JS
        .pipe(jshint.reporter('default')) //S代码检查
        .pipe(concat('all.js')) //合并JS文件
        .pipe(rename({ suffix: '.min' })) //重命名
        .pipe(uglify()) //压缩JS
        .pipe(gulp.dest(paths.jsDestPath)) //压缩版输出
        .pipe(notify({ message: 'JS文件编译完成...' }));
});

// 预设任务，执行清理后，
gulp.task('default', ['clean'], function() {
    gulp.start('watch', 'styles', 'scripts');
});

// 文档临听
gulp.task('watch', function() {
    // 监听所有.scss文档
    gulp.watch('src/css/*.scss', ['styles']);
    // 监听所有.js档
    gulp.watch('src/js/*.js', ['scripts']);
});
