import fs from "fs";
import path from "path";
import { builtinModules } from "module";
import { fileURLToPath } from "url";

import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import typescript from "@rollup/plugin-typescript";
import { babel } from "@rollup/plugin-babel";
import terser from "@rollup/plugin-terser";
import autoprefixer from "autoprefixer";
import postcss from "postcss";
import vue from "rollup-plugin-vue";
import * as sass from "sass";
import ts from "typescript";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = __dirname;
const srcRoot = path.resolve(root, "src");
const packagesRoot = path.resolve(root, "packages");
const stylesRoot = path.resolve(root, "styles");

const SOURCE_EXTENSIONS = [".ts", ".tsx", ".js", ".vue"];
const RESOLVE_EXTENSIONS = [".mjs", ".js", ".json", ".ts", ".tsx", ".vue"];
const BROWSER_LIST = ["> 1%", "last 2 versions", "not dead", "not ie <= 11"];
const UI_NAME = "element-plus";
const banner =
  "/*! Avue.js v" +
  JSON.parse(fs.readFileSync(path.resolve(root, "package.json"), "utf8")).version +
  " | (c) 2017-" +
  new Date().getFullYear() +
  " Smallwei | Released under the MIT License. */";

const aliasMap = {
  src: path.resolve(root, "src"),
  core: path.resolve(root, "src/core"),
  locale: path.resolve(root, "src/locale"),
  global: path.resolve(root, "src/global"),
  plugin: path.resolve(root, "src/plugin"),
  utils: path.resolve(root, "src/utils"),
  mixins: path.resolve(root, "packages/mixins"),
  common: path.resolve(root, "packages/core"),
  packages: path.resolve(root, "packages"),
};

const browserLocaleEntries = [
  {
    source: "src/locale/lang/en.ts",
    output: "locale/browser/en",
    aliases: ["en"],
    globals: ["avueLocaleEn", "en"],
  },
  {
    source: "src/locale/lang/zh.ts",
    output: "locale/browser/zh",
    aliases: ["zh"],
    globals: ["avueLocaleZh", "zh"],
  },
  {
    source: "src/locale/lang/zh-cn.ts",
    output: "locale/browser/zh-cn",
    aliases: ["zh-cn"],
    globals: ["avueLocaleZhCn", "zhCn"],
  },
];

const globalExternals = {
  vue: "Vue",
  "element-plus": "ElementPlus",
  "@element-plus/icons-vue": "ElementPlusIconsVue",
  axios: "axios",
};

const buildTarget = process.env.BUILD || "all";
const isWatch = process.env.ROLLUP_WATCH === "true";
const PROGRESS_WIDTH = 24;

function normalizePath(filePath) {
  return filePath.replace(/\\/g, "/");
}

function stripKnownExtension(filePath) {
  return filePath.replace(/\.(vue|tsx?|js)$/, "");
}

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function createProgressRenderer(label) {
  let lastPercent = -1;
  let lastFallbackStep = -1;

  return (percent, detail = "") => {
    const clamped = Math.max(0, Math.min(1, percent));
    const value = Math.round(clamped * 100);

    if (process.stdout.isTTY) {
      if (value === lastPercent) return;
      lastPercent = value;

      const filled = Math.round(clamped * PROGRESS_WIDTH);
      const head = filled > 0 ? `${"=".repeat(Math.max(0, filled - 1))}>` : "";
      const tail = " ".repeat(Math.max(0, PROGRESS_WIDTH - filled));
      const line = `${label.padEnd(8)} [${head}${tail}] ${String(value).padStart(3)}%${detail ? ` ${detail}` : ""}`;

      process.stdout.clearLine(0);
      process.stdout.cursorTo(0);
      process.stdout.write(line);

      if (clamped === 1) {
        process.stdout.write("\n");
      }
      return;
    }

    const step = clamped === 1 ? 4 : Math.floor(clamped * 4);
    if (step <= lastFallbackStep) return;
    lastFallbackStep = step;
    console.log(`${label} ${value}%${detail ? ` ${detail}` : ""}`);
  };
}

function walkFiles(dirPath) {
  if (!fs.existsSync(dirPath)) return [];

  return fs.readdirSync(dirPath, { withFileTypes: true }).flatMap((entry) => {
    const absolutePath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      return walkFiles(absolutePath);
    }
    return [absolutePath];
  });
}

function resolveFromBase(basePath) {
  if (fs.existsSync(basePath) && fs.statSync(basePath).isFile()) {
    return basePath;
  }

  for (const ext of [...SOURCE_EXTENSIONS, ".json"]) {
    const filePath = `${basePath}${ext}`;
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      return filePath;
    }
  }

  if (fs.existsSync(basePath) && fs.statSync(basePath).isDirectory()) {
    for (const ext of [...SOURCE_EXTENSIONS, ".json"]) {
      const indexPath = path.join(basePath, `index${ext}`);
      if (fs.existsSync(indexPath) && fs.statSync(indexPath).isFile()) {
        return indexPath;
      }
    }
  }

  return null;
}

function getAllStyleFiles() {
  return walkFiles(stylesRoot).filter((filePath) => path.extname(filePath) === ".scss");
}

function collectModuleInputs() {
  const inputs = {};

  [...walkFiles(srcRoot), ...walkFiles(packagesRoot)]
    .filter((filePath) => SOURCE_EXTENSIONS.includes(path.extname(filePath)))
    .sort()
    .forEach((filePath) => {
      const relativePath = normalizePath(path.relative(root, filePath));
      inputs[stripKnownExtension(relativePath)] = filePath;
    });

  return inputs;
}

function sanitizeChunkName(name) {
  return stripKnownExtension(normalizePath(name));
}

function writeFile(filePath, content) {
  ensureDir(filePath);
  fs.writeFileSync(filePath, content, "utf8");
}

function cleanDirs(dirNames) {
  dirNames.forEach((dirName) => {
    fs.rmSync(path.resolve(root, dirName), { recursive: true, force: true });
  });
}

function selectedTargets() {
  if (buildTarget === "esm") return ["es"];
  if (buildTarget === "cjs") return ["lib"];
  if (buildTarget === "browser") return ["dist"];
  return ["es", "lib", "dist"];
}

cleanDirs(selectedTargets());

function moduleOutputName(info, ext) {
  return `${sanitizeChunkName(info.name)}${ext}`;
}

function compileLocaleModule(sourcePath, format) {
  const source = fs.readFileSync(sourcePath, "utf8");
  return ts.transpileModule(source, {
    fileName: sourcePath,
    compilerOptions: {
      target: ts.ScriptTarget.ES2018,
      module: format === "es" ? ts.ModuleKind.ESNext : ts.ModuleKind.CommonJS,
      moduleResolution: ts.ModuleResolutionKind.NodeJs,
      esModuleInterop: true,
      allowSyntheticDefaultImports: true,
    },
  }).outputText;
}

function createAliasResolver({ esmLodash = false, esmAxios = false } = {}) {
  return {
    name: `avue-alias-resolver-${esmLodash ? "esm" : "base"}`,
    resolveId(source) {
      if (esmAxios && source === "axios") {
        return path.resolve(root, "node_modules/axios/dist/axios.js");
      }

      if (esmLodash) {
        const lodashMatch = source.match(/^lodash\/(.+)$/);
        if (lodashMatch) {
          return {
            id: `lodash-es/${lodashMatch[1].replace(/\.js$/, "")}.js`,
            external: true,
          };
        }
      }

      const [aliasKey, ...rest] = source.split("/");
      const aliasRoot = aliasMap[aliasKey];

      if (!aliasRoot) return null;

      return resolveFromBase(path.resolve(aliasRoot, rest.join("/")));
    },
  };
}

function createEsmCompatImportsPlugin({ esmAxios = false } = {}) {
  return {
    name: "avue-esm-compat-imports",
    transform(code, id) {
      if (!esmAxios) return null;

      const normalizedId = normalizePath(id);
      if (!normalizedId.endsWith("/src/index.ts")) return null;
      if (!code.includes('import axios from "axios";')) return null;

      const nextCode = code
        .replace('import axios from "axios";', 'import * as axiosModule from "axios";')
        .replace(
          'import createIcon from "./icon";',
          [
            'import createIcon from "./icon";',
            '',
            'const axios = axiosModule.default || axiosModule;',
          ].join("\n")
        );

      return {
        code: nextCode,
        map: null,
      };
    },
  };
}

function createProgressPlugin({ label, totalModules }) {
  const render = createProgressRenderer(label);
  const handled = new Set();
  const normalizedSrcRoot = `${normalizePath(srcRoot)}/`;
  const normalizedPackagesRoot = `${normalizePath(packagesRoot)}/`;

  return {
    name: `avue-progress-${label}`,
    buildStart() {
      render(0.05, "初始化");
    },
    transform(code, id) {
      const cleanId = normalizePath(id).split("?")[0];

      if (
        !cleanId.startsWith(normalizedSrcRoot) &&
        !cleanId.startsWith(normalizedPackagesRoot)
      ) {
        return null;
      }

      if (!SOURCE_EXTENSIONS.includes(path.extname(cleanId))) {
        return null;
      }

      if (handled.has(cleanId)) {
        return null;
      }

      handled.add(cleanId);
      const ratio = totalModules === 0 ? 0 : Math.min(handled.size / totalModules, 1);
      render(0.1 + ratio * 0.7, `${Math.min(handled.size, totalModules)}/${totalModules}`);
      return null;
    },
    generateBundle() {
      render(0.9, "生成产物");
    },
    writeBundle() {
      render(1, "完成");
    },
  };
}

function createVirtualDistEntry() {
  const entryId = "\0avue-rollup-dist-entry";
  const entrySource = normalizePath(path.resolve(srcRoot, "index.ts"));

  return {
    name: "avue-virtual-dist-entry",
    resolveId(source) {
      return source === "virtual:avue-dist-entry" ? entryId : null;
    },
    load(id) {
      if (id !== entryId) return null;
      return `export { default } from ${JSON.stringify(entrySource)};`;
    },
  };
}

async function writeCompiledStyle(outputDir) {
  const sourcePath = path.resolve(root, "styles/index.scss");
  const outputPath = path.resolve(root, outputDir, "index.css");
  const compiled = sass.compile(sourcePath, {
    style: "compressed",
    loadPaths: [root],
  });
  const processed = await postcss([
    autoprefixer({
      overrideBrowserslist: BROWSER_LIST,
      cascade: false,
      remove: true,
    }),
  ]).process(compiled.css, {
    from: sourcePath,
    to: outputPath,
    map: false,
  });

  writeFile(outputPath, processed.css);
}

function writeBrowserLocaleFiles(outputDir, format) {
  const runtimeExt = format === "es" ? ".mjs" : ".js";

  browserLocaleEntries.forEach((entry) => {
    const sourcePath = path.resolve(root, entry.source);
    const outputPath = path.resolve(root, outputDir, `${entry.output}${runtimeExt}`);
    const code = compileLocaleModule(sourcePath, "es").replace(
      /^export\s+default\s+/,
      "const locale = "
    );
    const aliasAssignments = entry.aliases
      .map((alias) => `  global.AVUE_LANG[${JSON.stringify(alias)}] = locale;`)
      .join("\n");
    const globalAssignments = entry.globals
      .map((name) => `  global[${JSON.stringify(name)}] = locale;`)
      .join("\n");
    const wrapped = [
      "(function (global) {",
      code.trim(),
      "  global.AVUE_LANG = global.AVUE_LANG || {};",
      aliasAssignments,
      globalAssignments,
      "})(typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : this);",
      "",
    ].join("\n");

    writeFile(outputPath, wrapped);
  });
}

function writeRootBridges(outputDir, format) {
  if (format === "es") {
    writeFile(
      path.resolve(root, outputDir, "index.mjs"),
      [
        "export * from './src/index.mjs';",
        "export { default } from './src/index.mjs';",
        "",
      ].join("\n")
    );
    return;
  }

  writeFile(
    path.resolve(root, outputDir, "index.js"),
    [
      "const mod = require('./src/index.js');",
      "const value = mod && Object.prototype.hasOwnProperty.call(mod, 'default') ? mod.default : mod;",
      "module.exports = value;",
      "module.exports.default = value;",
      "if (mod && typeof mod === 'object') {",
      "  Object.keys(mod).forEach((key) => {",
      "    if (key !== 'default' && key !== '__esModule') {",
      "      module.exports[key] = mod[key];",
      "    }",
      "  });",
      "}",
      "",
    ].join("\n")
  );
  writeFile(
    path.resolve(root, outputDir, "avue.js"),
    ["module.exports = require('./index.js');", ""].join("\n")
  );
  writeFile(
    path.resolve(root, outputDir, "avue.min.js"),
    ["module.exports = require('./index.js');", ""].join("\n")
  );
}

function createSupplementalOutputsPlugin({
  outputDir,
  format,
  writeBridges = false,
  writeLocales = false,
  writeStyles = false,
}) {
  return {
    name: `avue-supplemental-${outputDir}`,
    buildStart() {
      if (writeStyles) {
        getAllStyleFiles().forEach((filePath) => this.addWatchFile(filePath));
      }

      if (writeLocales) {
        browserLocaleEntries.forEach((entry) => {
          this.addWatchFile(path.resolve(root, entry.source));
        });
      }
    },
    async writeBundle() {
      if (writeBridges) {
        writeRootBridges(outputDir, format);
      }

      if (writeLocales) {
        writeBrowserLocaleFiles(outputDir, format);
      }

      if (writeStyles) {
        await writeCompiledStyle(outputDir);
      }
    },
  };
}

function createBasePlugins({
  env,
  esmLodash = false,
  esmAxios = false,
  browser = false,
  sourceMap = false,
}) {
  return [
    createAliasResolver({ esmLodash, esmAxios }),
    createEsmCompatImportsPlugin({ esmAxios }),
    replace({
      preventAssignment: true,
      values: {
        __ENV__: JSON.stringify(env),
        __UINAME__: JSON.stringify(UI_NAME),
        __VUE_OPTIONS_API__: JSON.stringify(true),
        __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false),
      },
    }),
    vue({
      preprocessStyles: false,
      template: {
        compilerOptions: {
          whitespace: "condense",
        },
      },
    }),
    typescript({
      tsconfig: path.resolve(root, "tsconfig.json"),
      declaration: false,
      noEmitOnError: false,
      sourceMap,
      inlineSources: false,
      include: ["src/**/*.ts", "src/**/*.tsx", "packages/**/*.ts", "packages/**/*.tsx"],
      exclude: ["**/*.vue", "node_modules/**", "examples/**"],
    }),
    json(),
    nodeResolve({
      browser,
      preferBuiltins: !browser,
      extensions: RESOLVE_EXTENSIONS,
    }),
    commonjs(),
  ];
}

function createModuleExternal(format) {
  return (id) => {
    if (id.startsWith("\0")) return false;

    if (/^(vue|element-plus|@element-plus\/icons-vue)(\/|$)/.test(id)) {
      return true;
    }

    if (/^axios(\/|$)/.test(id)) {
      return format === "cjs";
    }

    // `countup.js` 发布的是 UMD 入口。ESM 构建中将其转成内部模块，
    // 避免消费者直接按 ESM 默认导入它时报错。
    if (/^countup\.js(\/|$)/.test(id)) {
      return format === "cjs";
    }

    if (/^lodash-es(\/|$)/.test(id)) {
      return true;
    }

    if (/^lodash(\/|$)/.test(id)) {
      return format === "cjs";
    }

    if (builtinModules.includes(id) || builtinModules.includes(id.replace(/^node:/, ""))) {
      return true;
    }

    return format === "cjs" && id.startsWith("node:");
  };
}

function createModuleConfig({ format, dir, esmLodash }) {
  const ext = format === "es" ? ".mjs" : ".js";
  const totalModules = Object.keys(collectModuleInputs()).length;

  return {
    input: collectModuleInputs(),
    external: createModuleExternal(format),
    logLevel: "warn",
    plugins: [
      createProgressPlugin({
        label: dir,
        totalModules,
      }),
      ...createBasePlugins({
        env: "production",
        esmLodash,
        esmAxios: format === "es",
        browser: false,
        sourceMap: false,
      }),
      createSupplementalOutputsPlugin({
        outputDir: dir,
        format,
        writeBridges: true,
        writeLocales: true,
        writeStyles: true,
      }),
    ],
    output: {
      dir: path.resolve(root, dir),
      format,
      exports: "named",
      preserveModules: true,
      entryFileNames: (chunkInfo) => moduleOutputName(chunkInfo, ext),
      chunkFileNames: (chunkInfo) => moduleOutputName(chunkInfo, ext),
      banner,
      sourcemap: false,
      interop: "auto",
    },
  };
}

function createDistExternal(id) {
  return /^(vue|element-plus|@element-plus\/icons-vue|axios)(\/|$)/.test(id);
}

function createDistConfig({ minify, env, writeStyles }) {
  const totalModules = Object.keys(collectModuleInputs()).length;

  return {
    input: "virtual:avue-dist-entry",
    external: createDistExternal,
    logLevel: "warn",
    plugins: [
      createProgressPlugin({
        label: minify ? "dist:min" : "dist",
        totalModules,
      }),
      createVirtualDistEntry(),
      ...createBasePlugins({
        env,
        esmLodash: false,
        browser: true,
        sourceMap: !minify,
      }),
      babel({
        babelHelpers: "runtime",
        extensions: RESOLVE_EXTENSIONS,
        exclude: /node_modules/,
        skipPreflightCheck: true,
        babelrc: false,
        presets: [
          [
            "@babel/preset-env",
            {
              modules: false,
            },
          ],
        ],
        plugins: ["@babel/plugin-transform-runtime"],
      }),
      ...(minify ? [terser()] : []),
      createSupplementalOutputsPlugin({
        outputDir: "dist",
        format: "es",
        writeStyles,
      }),
    ],
    output: {
      file: path.resolve(root, "dist", minify ? "avue.min.js" : "avue.js"),
      format: "umd",
      name: "AVUE",
      exports: "default",
      banner,
      sourcemap: !minify,
      globals: globalExternals,
    },
  };
}

function shouldIgnoreWarning(warning) {
  if (
    warning.plugin === "typescript" &&
    warning.message &&
    warning.message.includes("TS2307")
  ) {
    return true;
  }

  if (warning.code === "UNUSED_EXTERNAL_IMPORT") {
    return true;
  }

  return false;
}

function withWarningFilter(config) {
  return {
    ...config,
    onwarn(warning, defaultHandler) {
      if (shouldIgnoreWarning(warning)) return;
      defaultHandler(warning);
    },
  };
}

const configs = [];

if (buildTarget === "all" || buildTarget === "watch" || buildTarget === "esm") {
  configs.push(
    withWarningFilter(
      createModuleConfig({
        format: "es",
        dir: "es",
        esmLodash: true,
      })
    )
  );
}

if (buildTarget === "all" || buildTarget === "watch" || buildTarget === "cjs") {
  configs.push(
    withWarningFilter(
      createModuleConfig({
        format: "cjs",
        dir: "lib",
        esmLodash: false,
      })
    )
  );
}

if (buildTarget === "all" || buildTarget === "watch" || buildTarget === "browser") {
  configs.push(
    withWarningFilter(
      createDistConfig({
        minify: false,
        env: "development",
        writeStyles: true,
      })
    )
  );

  if (!isWatch) {
    configs.push(
      withWarningFilter(
        createDistConfig({
          minify: true,
          env: "production",
          writeStyles: false,
        })
      )
    );
  }
}

export default configs;
