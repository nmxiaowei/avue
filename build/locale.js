const fs = require('fs');
const path = require('path');
const ts = require('typescript');

const root = path.resolve(__dirname, '..');

const compilerOptions = {
  target: ts.ScriptTarget.ES2018,
  module: ts.ModuleKind.ESNext,
  moduleResolution: ts.ModuleResolutionKind.NodeJs,
  esModuleInterop: true
};

const moduleEntries = [
  ['src/locale/lang/en.ts', 'lib/locale/lang/en.js'],
  ['src/locale/lang/zh-cn.ts', 'lib/locale/lang/zh-cn.js'],
  ['src/locale/lang/zh.ts', 'lib/locale/lang/zh.js']
];

const staleOutputs = ['lib/locale/format.js', 'lib/locale/index.js'];

const browserEntries = [
  {
    source: 'src/locale/lang/en.ts',
    output: 'lib/locale/browser/en.js',
    aliases: ['en'],
    globals: ['avueLocaleEn', 'en']
  },
  {
    source: 'src/locale/lang/zh.ts',
    output: 'lib/locale/browser/zh.js',
    aliases: ['zh'],
    globals: ['avueLocaleZh', 'zh']
  },
  {
    source: 'src/locale/lang/zh-cn.ts',
    output: 'lib/locale/browser/zh-cn.js',
    aliases: ['zh-cn'],
    globals: ['avueLocaleZhCn', 'zhCn']
  }
];

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function transpileFile(sourcePath) {
  const source = fs.readFileSync(sourcePath, 'utf8');
  return ts.transpileModule(source, {
    compilerOptions,
    fileName: sourcePath
  }).outputText;
}

function writeModuleFile(source, output) {
  const sourcePath = path.resolve(root, source);
  const outputPath = path.resolve(root, output);
  const code = transpileFile(sourcePath);
  ensureDir(outputPath);
  fs.writeFileSync(outputPath, code, 'utf8');
  return Buffer.byteLength(code);
}

function writeBrowserFile(entry) {
  const sourcePath = path.resolve(root, entry.source);
  const outputPath = path.resolve(root, entry.output);
  const code = transpileFile(sourcePath).replace(
    /^export\s+default\s+/,
    'const locale = '
  );
  const aliasAssignments = entry.aliases
    .map((alias) => `  global.AVUE_LANG[${JSON.stringify(alias)}] = locale;`)
    .join('\n');
  const globalAssignments = entry.globals
    .map((name) => `  global[${JSON.stringify(name)}] = locale;`)
    .join('\n');
  const wrapped = [
    '(function (global) {',
    code,
    '  global.AVUE_LANG = global.AVUE_LANG || {};',
    aliasAssignments,
    globalAssignments,
    "})(typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : this);",
    ''
  ].join('\n');

  ensureDir(outputPath);
  fs.writeFileSync(outputPath, wrapped, 'utf8');
  return Buffer.byteLength(wrapped);
}

function removeOutput(output) {
  const outputPath = path.resolve(root, output);

  if (!fs.existsSync(outputPath)) {
    return false;
  }

  fs.unlinkSync(outputPath);
  return true;
}

function buildLocale({ logger = console.log } = {}) {
  let totalSize = 0;
  let totalFiles = 0;
  let removedFiles = 0;

  staleOutputs.forEach((output) => {
    if (removeOutput(output)) {
      removedFiles += 1;
      logger(`locale remove  ${output}`);
    }
  });

  moduleEntries.forEach(([source, output]) => {
    totalSize += writeModuleFile(source, output);
    totalFiles += 1;
    logger(`locale module  ${output}`);
  });

  browserEntries.forEach((entry) => {
    totalSize += writeBrowserFile(entry);
    totalFiles += 1;
    logger(`locale browser ${entry.output}`);
  });

  logger(
    `locale build complete: ${totalFiles} files, ${totalSize} bytes, removed ${removedFiles} stale files`
  );

  return {
    totalFiles,
    totalSize,
    removedFiles
  };
}

module.exports = buildLocale;

if (require.main === module) {
  buildLocale();
}
