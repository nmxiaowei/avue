const gulp = require("gulp");
var sass = require("gulp-sass");
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
    .pipe(sass.sync())
    .pipe(
      autoprefixer({
        browsers: ["ie > 9", "last 2 versions"],
        cascade: false
      })
    )
    .pipe(cssmin())
    .pipe(gulp.dest("./lib/"));
});

// 打包文件
gulp.task("build", gulp.series(["webpack", "compile"]));

// 监听文件变化
gulp.task("watch", async function () {
  gulp.watch(["./src/**", "./packages/**"], gulp.series(["webpack"]));
  gulp.watch(["./styles/**"], gulp.series(["compile"]));
});
