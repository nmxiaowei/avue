const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const cssmin = require("gulp-cssmin");
const webpack = require("webpack");
const webpackConf = require("./build/build.js");
const path = require("path");
const fs = require("fs");
const { Transform } = require("stream");

// ============================================================
// 日志工具函数
// ============================================================

/**
 * 获取当前时间戳
 * @returns {string} 格式化的时间字符串
 */
function getTimestamp() {
  const now = new Date();
  return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
}

/**
 * 日志输出工具
 * @param {string} type - 日志类型 (info|success|warning|error|task)
 * @param {string} message - 日志消息
 * @param {string} [detail] - 详细信息
 */
function log(type, message, detail = '') {
  const timestamp = `\x1b[90m[${getTimestamp()}]\x1b[0m`;
  const types = {
    info: '\x1b[36mℹ INFO\x1b[0m',
    success: '\x1b[32m✔ SUCCESS\x1b[0m',
    warning: '\x1b[33m⚠ WARNING\x1b[0m',
    error: '\x1b[31m✖ ERROR\x1b[0m',
    task: '\x1b[35m▶ TASK\x1b[0m',
    start: '\x1b[34m🚀 START\x1b[0m',
    end: '\x1b[32m🎉 DONE\x1b[0m',
    watch: '\x1b[33m👀 WATCH\x1b[0m',
    perf: '\x1b[33m⚡ PERF\x1b[0m'
  };
  const prefix = types[type] || types.info;
  const detailStr = detail ? `\x1b[90m ${detail}\x1b[0m` : '';
  console.log(`${timestamp} ${prefix} ${message}${detailStr}`);
}

/**
 * 打印分隔线
 * @param {string} [title] - 可选标题
 */
function logDivider(title = '') {
  const line = '─'.repeat(60);
  if (title) {
    console.log(`\x1b[90m${line}\x1b[0m`);
    console.log(`\x1b[36m  ${title}\x1b[0m`);
    console.log(`\x1b[90m${line}\x1b[0m`);
  } else {
    console.log(`\x1b[90m${line}\x1b[0m`);
  }
}

/**
 * 获取文件大小（格式化）
 * @param {string} filePath - 文件路径
 * @returns {string} 格式化的文件大小
 */
function getFileSize(filePath) {
  try {
    const stats = fs.statSync(filePath);
    const bytes = stats.size;
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  } catch (e) {
    return '未知';
  }
}

/**
 * 计时器
 * @returns {function} 返回耗时的函数
 */
function createTimer() {
  const start = Date.now();
  return () => {
    const elapsed = Date.now() - start;
    if (elapsed < 1000) return `${elapsed}ms`;
    return `${(elapsed / 1000).toFixed(2)}s`;
  };
}

/**
 * 格式化字节大小
 * @param {number} bytes - 字节数
 * @returns {string} 格式化的大小
 */
function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

// ============================================================
// Gulp 任务定义
// ============================================================

/**
 * Webpack 构建任务
 * 编译 JavaScript 和 Vue 组件
 */
gulp.task("webpack", async function () {
  logDivider('Webpack 构建');
  log('task', '开始 Webpack 编译...', `入口: ${webpackConf.entry.app[0]}`);
  log('info', `构建模式: ${webpackConf.mode}`, `输出: ${webpackConf.output.filename}`);

  const timer = createTimer();

  return new Promise((resolve, reject) => {
    webpack(webpackConf, function (err, stats) {
      if (err) {
        log('error', 'Webpack 编译失败', err.message);
        console.error(err.stack || err);
        reject(err);
        return;
      }

      const info = stats.toJson({
        assets: true,
        chunks: true,
        modules: true,
        timings: true,
        hash: true
      });

      // 检查编译错误
      if (stats.hasErrors()) {
        log('error', 'Webpack 编译出错');
        info.errors.forEach((error, index) => {
          console.error(`\x1b[31m  [错误 ${index + 1}] ${error.message || error}\x1b[0m`);
        });
        reject(new Error('Webpack 编译错误'));
        return;
      }

      // 检查警告
      if (stats.hasWarnings()) {
        log('warning', `发现 ${info.warnings.length} 个警告`);
        // 只显示前 3 个警告
        info.warnings.slice(0, 3).forEach((warning, index) => {
          console.warn(`\x1b[33m  [警告 ${index + 1}] ${warning.message || warning}\x1b[0m`);
        });
        if (info.warnings.length > 3) {
          console.warn(`\x1b[33m  ... 还有 ${info.warnings.length - 3} 个警告\x1b[0m`);
        }
      }

      // 输出构建结果
      const outputPath = path.join(webpackConf.output.path, webpackConf.output.filename);
      const fileSize = getFileSize(outputPath);
      const elapsed = timer();

      log('success', 'Webpack 编译完成', `耗时: ${elapsed}`);
      log('info', `输出文件: ${outputPath}`, `大小: ${fileSize}`);

      // 输出详细统计
      if (info.assets && info.assets.length > 0) {
        log('perf', '资源统计:');
        info.assets.forEach(asset => {
          const sizeStr = formatBytes(asset.size);
          const status = asset.emitted ? '✓' : '○';
          console.log(`\x1b[90m       ${status} ${asset.name} (${sizeStr})\x1b[0m`);
        });
      }

      // 模块统计
      const moduleCount = info.modules ? info.modules.length : 0;
      const chunkCount = info.chunks ? info.chunks.length : 0;
      log('info', `模块: ${moduleCount}`, `chunks: ${chunkCount}`);

      // 构建时间统计
      if (info.time) {
        log('perf', `Webpack 内部耗时: ${info.time}ms`);
      }

      resolve();
    });
  });
});

/**
 * SCSS 样式编译任务
 * 编译、添加前缀、压缩样式文件
 */
gulp.task("compile", function () {
  logDivider('样式编译');
  log('task', '开始编译 SCSS 样式...');
  log('info', '源文件: ./styles/index.scss', '输出: ./lib/index.css');

  const timer = createTimer();
  let originalSize = 0;
  let compressedSize = 0;

  return gulp
    .src("./styles/index.scss")
    .pipe(new Transform({
      objectMode: true,
      transform(file, enc, cb) {
        if (file.contents) {
          originalSize = file.contents.length;
        }
        cb(null, file);
      }
    }))
    .pipe(sass.sync({
      // 使用 compressed 输出样式，减小体积
      outputStyle: 'compressed',
      // 精度设置
      precision: 6
    }).on('error', function(err) {
      log('error', 'SCSS 编译错误', err.message);
      log('info', `文件: ${err.file}`, `行: ${err.line}`);
      this.emit('end');
    }))
    .pipe(
      autoprefixer({
        // 现代浏览器支持
        overrideBrowserslist: [
          "> 1%",
          "last 2 versions",
          "not dead",
          "not ie <= 11"
        ],
        cascade: false,
        // 移除过时的前缀
        remove: true
      })
    )
    .pipe(cssmin({
      // 高级压缩选项
      advanced: true,
      // 保持特殊注释
      keepSpecialComments: 0,
      // 兼容性
      compatibility: '*'
    }))
    .pipe(new Transform({
      objectMode: true,
      transform(file, enc, cb) {
        if (file.contents) {
          compressedSize = file.contents.length;
        }
        cb(null, file);
      }
    }))
    .pipe(gulp.dest("./lib/"))
    .on('end', () => {
      const outputPath = path.resolve('./lib/index.css');
      const fileSize = getFileSize(outputPath);
      const elapsed = timer();

      log('success', '样式编译完成', `耗时: ${elapsed}`);
      log('info', `输出文件: ${outputPath}`, `大小: ${fileSize}`);

      // 显示压缩率
      if (originalSize > 0 && compressedSize > 0) {
        const ratio = ((1 - compressedSize / originalSize) * 100).toFixed(1);
        log('perf', `压缩率: ${ratio}%`, `${formatBytes(originalSize)} → ${formatBytes(compressedSize)}`);
      }
    });
});

/**
 * 国际化文件复制任务
 * 将 locale 目录下的文件复制到 lib/locale
 */
gulp.task("locale", function () {
  logDivider('国际化文件处理');
  log('task', '开始复制国际化文件...');
  log('info', '源目录: ./src/locale/**', '输出: ./lib/locale');

  const timer = createTimer();
  let fileCount = 0;
  let totalSize = 0;

  return gulp
    .src("./src/locale/**")
    .pipe(new Transform({
      objectMode: true,
      transform(file, enc, cb) {
        if (!file.isDirectory() && file.contents) {
          fileCount++;
          totalSize += file.contents.length;
          log('info', `复制文件: ${path.basename(file.path)}`, formatBytes(file.contents.length));
        }
        cb(null, file);
      }
    }))
    .pipe(gulp.dest("./lib/locale"))
    .on('end', () => {
      log('success', '国际化文件复制完成', `耗时: ${timer()}`);
      log('info', `共复制 ${fileCount} 个文件`, `总大小: ${formatBytes(totalSize)}`);
    });
});

/**
 * 完整构建任务
 * 依次执行: 国际化文件复制 -> 样式编译 -> Webpack 构建
 */
gulp.task("build", gulp.series(
  function buildStart(done) {
    const globalTimer = createTimer();
    // 将计时器存储在 gulp 对象上供后续使用
    gulp._buildTimer = globalTimer;

    console.log('\n');
    logDivider('🏗️  Avue 构建开始');
    log('start', '开始完整构建流程...');
    log('info', '构建步骤: locale → compile → webpack');
    log('perf', '优化特性: 并行压缩、Tree Shaking、缓存加速');
    console.log('\n');
    done();
  },
  // 并行执行 locale 和 compile，它们之间没有依赖
  gulp.parallel("locale", "compile"),
  // webpack 在样式和国际化完成后执行
  "webpack",
  function buildEnd(done) {
    console.log('\n');
    logDivider('🎉 Avue 构建完成');

    // 获取总耗时
    const totalTime = gulp._buildTimer ? gulp._buildTimer() : '未知';
    log('end', '所有构建任务已完成!', `总耗时: ${totalTime}`);

    // 输出构建产物汇总
    const libPath = path.resolve('./lib');
    log('info', '构建产物目录:', libPath);

    const files = ['avue.js', 'avue.min.js', 'index.css'];
    let totalSize = 0;

    console.log('');
    log('perf', '产物体积汇总:');
    files.forEach(file => {
      const filePath = path.join(libPath, file);
      if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);
        totalSize += stats.size;
        const sizeStr = formatBytes(stats.size);
        console.log(`\x1b[90m       📄 ${file.padEnd(20)} ${sizeStr}\x1b[0m`);
      }
    });
    console.log(`\x1b[90m       ${'─'.repeat(35)}\x1b[0m`);
    console.log(`\x1b[32m       📦 总计: ${formatBytes(totalSize)}\x1b[0m`);

    console.log('\n');
    done();
  }
));

/**
 * 文件监听任务
 * 监听文件变化并自动重新编译
 */
gulp.task("listen", async function () {
  logDivider('文件监听');
  log('watch', '开始监听文件变化...');
  log('info', '监听样式: ./styles/**');
  log('info', '监听脚本: ./src/** | ./packages/**');
  log('info', '\x1b[90m按 Ctrl+C 停止监听\x1b[0m');

  // 使用防抖，避免频繁触发
  const debounceDelay = 300;
  let styleTimer = null;
  let scriptTimer = null;

  gulp.watch(["./styles/**"], { delay: debounceDelay })
    .on('change', (filePath) => {
      if (styleTimer) clearTimeout(styleTimer);
      styleTimer = setTimeout(() => {
        log('watch', '样式文件变化', path.basename(filePath));
        gulp.series(["compile"])();
      }, debounceDelay);
    });

  gulp.watch(["./src/**", "./packages/**"], { delay: debounceDelay })
    .on('change', (filePath) => {
      if (scriptTimer) clearTimeout(scriptTimer);
      scriptTimer = setTimeout(() => {
        log('watch', '脚本文件变化', path.basename(filePath));
        gulp.series(["webpack"])();
      }, debounceDelay);
    });
});

/**
 * 开发模式任务
 * 编译后启动监听
 */
gulp.task("watch", gulp.series(
  function watchStart(done) {
    console.log('\n');
    logDivider('🔧 Avue 开发模式');
    log('start', '启动开发模式...');
    log('info', '首次编译后将自动监听文件变化');
    log('perf', '开发模式优化: 增量编译、缓存加速');
    console.log('\n');
    done();
  },
  // 并行执行首次编译
  gulp.parallel("compile", "webpack"),
  "listen"
));




