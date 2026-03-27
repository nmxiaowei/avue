const merge = require("webpack-merge");
const webpack = require("webpack");
const { VueLoaderPlugin } = require("vue-loader");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const path = require("path");
const alias = require("./alias");
const config = require("./config");

function getTimestamp() {
  const now = new Date();
  return `${now.getHours().toString().padStart(2, "0")}:${now
    .getMinutes()
    .toString()
    .padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;
}

function log(type, message) {
  const timestamp = `\x1b[90m[${getTimestamp()}]\x1b[0m`;
  const types = {
    info: "\x1b[36mINFO\x1b[0m",
    success: "\x1b[32mSUCCESS\x1b[0m",
    config: "\x1b[35mCONFIG\x1b[0m",
    perf: "\x1b[33mPERF\x1b[0m",
  };
  const prefix = types[type] || types.info;
  console.log(`${timestamp} ${prefix} ${message}`);
}

log("config", "Loading webpack configuration...");
log("info", `Resolve extensions: ${[".ts", ".tsx", ".js", ".vue", ".json"].join(", ")}`);

Object.keys(alias).forEach((key) => {
  console.log(`\x1b[90m       ${key} -> ${alias[key]}\x1b[0m`);
});

const isProd = config.mode === "production";
const sourceRoots = [
  path.resolve(__dirname, "../src"),
  path.resolve(__dirname, "../packages"),
];

const webpackConfig = merge(config, {
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".vue", ".json"],
    alias,
    modules: [...sourceRoots, "node_modules"],
    symlinks: false,
  },

  module: {
    noParse: /^(vue|vue-router|vuex|lodash)$/,
    rules: [
      {
        test: /\.js$/,
        include: sourceRoots,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
            cacheCompression: false,
          },
        },
      },
      {
        test: /\.tsx?$/,
        include: sourceRoots,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              cacheCompression: false,
            },
          },
          {
            loader: "ts-loader",
            options: {
              appendTsSuffixTo: [/\.vue$/],
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          compilerOptions: {
            whitespace: "condense",
          },
          cacheDirectory: path.resolve(
            __dirname,
            "../node_modules/.cache/vue-loader"
          ),
          cacheIdentifier: "vue-loader-cache",
        },
      },
    ],
  },

  plugins: [
    new VueLoaderPlugin(),
    new ProgressBarPlugin({
      format: "  \x1b[36mBuild\x1b[0m [:bar] \x1b[32m:percent\x1b[0m (:elapsed)",
      complete: "=",
      incomplete: " ",
      clear: false,
      width: 40,
      callback: () => {
        log("success", "Webpack compile stage finished");
      },
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: isProd,
      debug: !isProd,
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),
  ],

  performance: {
    hints: false,
    maxAssetSize: 500000,
    maxEntrypointSize: 500000,
  },

  cache: true,

  stats: {
    colors: true,
    hash: true,
    version: true,
    timings: true,
    assets: true,
    assetsSort: "size",
    chunks: false,
    chunkModules: false,
    modules: false,
    children: false,
    cached: false,
    reasons: false,
    source: false,
    errorDetails: true,
    chunkOrigins: false,
    builtAt: true,
  },
});

log("info", "Loader rules:");
console.log("\x1b[90m       *.js -> babel-loader (cache enabled)\x1b[0m");
console.log("\x1b[90m       *.ts, *.tsx -> ts-loader + babel-loader\x1b[0m");
console.log("\x1b[90m       *.vue -> vue-loader (supports <script lang=\"ts\">)\x1b[0m");

log("perf", "Build optimizations:");
console.log("\x1b[90m       - noParse: vue, vue-router, vuex, lodash\x1b[0m");
console.log("\x1b[90m       - include roots: src, packages\x1b[0m");
console.log("\x1b[90m       - cache: babel-loader, vue-loader\x1b[0m");
console.log("\x1b[90m       - IgnorePlugin: moment/locale\x1b[0m");

log("success", "Webpack configuration is ready");
console.log(`\x1b[90m${"-".repeat(50)}\x1b[0m`);

module.exports = webpackConfig;