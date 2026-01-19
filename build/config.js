const path = require("path");
const aliases = require("./alias");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const version = process.env.VERSION || require("../package.json").version;
const prd = process.env.TARGET;

// ============================================================
// 日志工具函数
// ============================================================

/**
 * 获取当前时间戳
 * @returns {string} 格式化的时间字符串
 */
function getTimestamp() {
  const now = new Date();
  return `${now.getHours().toString().padStart(2, "0")}:${now
    .getMinutes()
    .toString()
    .padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;
}

/**
 * 日志输出
 * @param {string} type - 日志类型
 * @param {string} message - 消息
 * @param {string} [detail] - 详细信息
 */
function log(type, message, detail = "") {
  const timestamp = `\x1b[90m[${getTimestamp()}]\x1b[0m`;
  const types = {
    info: "\x1b[36mℹ\x1b[0m",
    success: "\x1b[32m✔\x1b[0m",
    warning: "\x1b[33m⚠\x1b[0m",
    config: "\x1b[35m⚙\x1b[0m",
    build: "\x1b[34m🔨\x1b[0m",
    perf: "\x1b[33m⚡\x1b[0m",
  };
  const prefix = types[type] || types.info;
  const detailStr = detail ? `\x1b[90m ${detail}\x1b[0m` : "";
  console.log(`${timestamp} ${prefix} ${message}${detailStr}`);
}

/**
 * 打印分隔线
 * @param {string} [title] - 可选标题
 */
function logDivider(title = "") {
  const line = "─".repeat(60);
  if (title) {
    console.log(`\x1b[90m${line}\x1b[0m`);
    console.log(`\x1b[36m  ${title}\x1b[0m`);
    console.log(`\x1b[90m${line}\x1b[0m`);
  } else {
    console.log(`\x1b[90m${line}\x1b[0m`);
  }
}

// ============================================================
// 构建配置
// ============================================================

const banner =
  " Avue.js v" +
  version +
  "\n" +
  " (c) 2017-" +
  new Date().getFullYear() +
  " Smallwei\n" +
  " Released under the MIT License.\n";

// 外部依赖配置 - 这些依赖不会打包进最终文件，减小体积
const externals = {
  // Vue 框架
  vue: {
    root: "Vue",
    commonjs2: "vue",
    commonjs: "vue",
    amd: "vue",
  },
  // Element Plus UI 框架
  "element-plus": {
    root: "ElementPlus",
    commonjs2: "element-plus",
    commonjs: "element-plus",
    amd: "element-plus",
  },
  // Element Plus Icons
  "@element-plus/icons-vue": {
    root: "ElementPlusIconsVue",
    commonjs2: "@element-plus/icons-vue",
    commonjs: "@element-plus/icons-vue",
    amd: "@element-plus/icons-vue",
  },
  // Axios HTTP 库
  axios: "axios",
};

/**
 * 解析路径
 * @param {string} p - 路径字符串
 * @returns {string} 解析后的绝对路径
 */
const resolve = (p) => {
  const base = p.split("/")[0];
  if (aliases[base]) {
    return path.resolve(aliases[base], p.slice(base.length + 1));
  } else {
    return path.resolve(__dirname, "../", p);
  }
};

// 构建配置
const builds = {
  prod: {
    entry: resolve("src/index.js"),
    dest: resolve("lib"),
    filename: "avue.min.js",
    env: "production",
    externals: externals,
  },
  dev: {
    entry: resolve("src/index.js"),
    dest: resolve("lib"),
    filename: "avue.js",
    env: "development",
    externals: externals,
  },
};

/**
 * 生成webpack配置
 * @param {string} name - 构建名称 (dev|prod)
 * @returns {object} webpack配置对象
 */
function genConfig(name) {
  const opts = builds[name];
  const isProd = /min\.js$/.test(opts.filename);

  const config = {
    entry: {
      app: [opts.entry],
    },
    output: {
      filename: opts.filename,
      path: opts.dest,
      libraryExport: "default",
      libraryTarget: "umd",
      library: "AVUE",
      umdNamedDefine: true,
      globalObject: "this",
      // 生产环境不输出 pathinfo，减小体积
      pathinfo: !isProd,
    },
    externals: opts.externals,
    plugins: [new webpack.BannerPlugin(banner)],
    // 优化配置
    optimization: {
      minimize: isProd,
      minimizer: isProd
        ? [
            new TerserPlugin({
              // 启用缓存，加速重复构建
              cache: true,
              // 启用多进程并行压缩，提升速度
              parallel: true,
              // 生成 source map（可选，设为 false 减小体积）
              sourceMap: false,
              // 不提取 license 注释到单独文件
              extractComments: false,
              terserOptions: {
                // 压缩选项
                compress: {
                  // 移除 console.log（保留 warn 和 error）
                  pure_funcs: ["console.log"],
                  // 移除无用代码
                  dead_code: true,
                  // 移除未使用的变量
                  unused: true,
                  // 优化条件表达式
                  conditionals: true,
                  // 优化比较运算
                  comparisons: true,
                  // 优化布尔运算
                  booleans: true,
                  // 合并连续声明
                  sequences: true,
                  // 内联只调用一次的函数
                  inline: 2,
                  // 折叠常量
                  evaluate: true,
                  // 丢弃 debugger
                  drop_debugger: true,
                  // 优化 if-return/continue
                  if_return: true,
                  // 优化 join 合并
                  join_vars: true,
                  // 折叠嵌套变量
                  collapse_vars: true,
                  // 减少变量作用域
                  reduce_vars: true,
                },
                // 混淆选项
                mangle: {
                  // 启用 Safari10 兼容
                  safari10: true,
                },
                // 输出选项
                output: {
                  // 移除注释
                  comments: false,
                  // 保持 ASCII 输出
                  ascii_only: true,
                },
              },
            }),
          ]
        : [],
      // 模块连接优化 (Scope Hoisting)
      concatenateModules: isProd,
      // 标记使用的导出，配合 Tree Shaking
      usedExports: true,
      // 副作用分析
      sideEffects: true,
    },
  };

  if (opts.env) {
    config.plugins.push(
      new webpack.DefinePlugin({
        __ENV__: JSON.stringify(opts.env || "production"),
        __UINAME__: JSON.stringify(process.env.UINAME || "element-plus"),
        // Vue 3 特性标志，减小构建体积
        __VUE_OPTIONS_API__: JSON.stringify(true),
        __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false),
      })
    );
  }

  config.mode = isProd ? "production" : "development";

  // 开发模式启用 devtool
  if (!isProd) {
    config.devtool = "cheap-module-source-map";
  }

  return config;
}

// ============================================================
// 构建信息输出
// ============================================================

console.log("\n");
logDivider("📦 Avue.js 构建配置");

log("info", `版本号: v${version}`);
log("info", `构建时间: ${new Date().toLocaleString("zh-CN")}`);
log("info", `Node 版本: ${process.version}`);
log("info", `工作目录: ${process.cwd()}`);

console.log("");

// 输出构建模式信息
if (prd === "dev") {
  log("build", "\x1b[42;30m 开发模式 \x1b[0m");
  console.log("");
  log("info", "模式说明: 启用实时编译，生成调试版本供开发调试使用");
  log("info", `输出文件: lib/avue.js`);
  log("info", `编译模式: development`);
  log("info", "源码映射: 启用 (cheap-module-source-map)");
  log("info", "代码压缩: 禁用");
  console.log("");
  log("info", "\x1b[90m💡 提示: 可运行 examples 目录下的示例进行调试\x1b[0m");
} else if (prd === "prod") {
  log("build", "\x1b[42;30m 生产模式 \x1b[0m");
  console.log("");
  log("info", "模式说明: 生成压缩优化的生产版本");
  log("info", `输出文件: lib/avue.min.js`);
  log("info", `编译模式: production`);
  log("info", "源码映射: 禁用");
  log("info", "代码压缩: 启用 (TerserPlugin)");
  console.log("");
  log("perf", "优化特性:");
  console.log("       ├─ Tree Shaking (移除未使用代码)");
  console.log("       ├─ Scope Hoisting (作用域提升)");
  console.log("       ├─ 多进程并行压缩");
  console.log("       ├─ 移除 console.log");
  console.log("       ├─ 移除 debugger");
  console.log("       └─ 移除注释");
} else {
  log("warning", "\x1b[43;30m 注意 \x1b[0m 未指定构建目标");
  console.log("");
  log("info", "将使用默认的生产模式进行构建");
  log("info", "\x1b[33m正确用法:\x1b[0m");
  console.log("       npm run build:dev   - 开发模式构建");
  console.log("       npm run build:prod  - 生产模式构建");
  log("info", "\x1b[33m环境变量:\x1b[0m");
  console.log("       TARGET=dev  - 开发模式");
  console.log("       TARGET=prod - 生产模式");
}

console.log("");

// 输出外部依赖配置
log("info", "外部依赖 (externals) - 不打包以减小体积:");
Object.keys(externals).forEach((key) => {
  const value =
    typeof externals[key] === "object" ? externals[key].root : externals[key];
  console.log(`\x1b[90m       ${key} → ${value}\x1b[0m`);
});

console.log("");

// 输出入口和输出配置
const currentConfig = builds[prd || "prod"];
log("info", "入口配置:");
console.log(`\x1b[90m       entry: ${currentConfig.entry}\x1b[0m`);
log("info", "输出配置:");
console.log(`\x1b[90m       path: ${currentConfig.dest}\x1b[0m`);
console.log(`\x1b[90m       filename: ${currentConfig.filename}\x1b[0m`);
console.log(`\x1b[90m       library: AVUE (UMD)\x1b[0m`);

console.log("");
log("success", `Avue.js v${version} 构建配置初始化完成`);
logDivider();
console.log("");

module.exports = genConfig(prd || "prod");
