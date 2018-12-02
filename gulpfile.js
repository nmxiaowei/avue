const gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cssmin = require('gulp-cssmin');
const webpack = require('webpack');
const webpackConf = require('./build/build.js');
// 构建webpack配置
gulp.task('webpack', function() {
  console.log('complite...');
  webpack(webpackConf, function(err, stats) {
    if (err) {
      console.log(err);
    }
    console.log('listen watch...');
  });
});

// 处理样式的配置
gulp.task('compile', function() {
  return gulp
    .src('./theme-chalk/index.scss')
    .pipe(sass.sync())
    .pipe(
      autoprefixer({
        browsers: ['ie > 9', 'last 2 versions'],
        cascade: false
      })
    )
    .pipe(cssmin())
    .pipe(gulp.dest('./lib/theme-chalk/'));
});
// 监听文件变化
gulp.task('watch', ['webpack'], function() {
  gulp.watch(['./src/**', './packgaes/**'], ['webpack']);
  gulp.watch(['./theme-chalk/**'], ['compile']);
});
