const gulp = require("gulp");
const sass = require('gulp-sass')(require('sass'));
var autoprefixer = require("gulp-autoprefixer");
var cssmin = require("gulp-cssmin");
const webpack = require("webpack");
const webpackConf = require("./build/build.js");

// 构建webpack配置
gulp.task("webpack", async function () {
  await webpack(webpackConf, function (err, stats) {
    if (err) {
      console.log(err);
    }
  });
});

// 处理样式的配置
gulp.task("compile", function () {
  return gulp
    .src("./styles/index.scss")
    .pipe(sass())
    .pipe(
      autoprefixer({
        browsers: ["ie > 9", "last 2 versions"],
        cascade: false
      })
    )
    .pipe(cssmin())
    .pipe(gulp.dest("./lib/"));
});
// 处理国际化相关
gulp.task("locale", function () {
  return gulp
    .src("./src/locale/**")
    .pipe(gulp.dest("./lib/locale"));
});

// 打包文件
gulp.task("build", gulp.series(["locale", "compile", "webpack"]));

// 监听文件变化
gulp.task("listen", async function () {
  gulp.watch(["./styles/**"], gulp.series(["compile"]));
  gulp.watch(["./src/**", "./packages/**"], gulp.series(["webpack"]));
});

gulp.task("watch", gulp.series(["compile", "webpack", "listen"]));





