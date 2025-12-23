/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const path = require('path')

// ============================================================
// 日志工具函数
// ============================================================

/**
 * 获取当前时间戳
 * @returns {string} 格式化的时间字符串
 */
function getTimestamp() {
  const now = new Date()
  return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`
}

/**
 * 日志输出
 * @param {string} type - 日志类型
 * @param {string} message - 消息
 * @param {string} [detail] - 详细信息
 */
function log(type, message, detail = '') {
  const timestamp = `\x1b[90m[${getTimestamp()}]\x1b[0m`
  const types = {
    info: '\x1b[36mℹ\x1b[0m',
    success: '\x1b[32m✔\x1b[0m',
    warning: '\x1b[33m⚠\x1b[0m',
    error: '\x1b[31m✖\x1b[0m',
    version: '\x1b[35m🏷️\x1b[0m'
  }
  const prefix = types[type] || types.info
  const detailStr = detail ? `\x1b[90m ${detail}\x1b[0m` : ''
  console.log(`${timestamp} ${prefix} ${message}${detailStr}`)
}

/**
 * 打印分隔线
 * @param {string} [title] - 可选标题
 */
function logDivider(title = '') {
  const line = '─'.repeat(50)
  if (title) {
    console.log(`\x1b[90m${line}\x1b[0m`)
    console.log(`\x1b[36m  ${title}\x1b[0m`)
    console.log(`\x1b[90m${line}\x1b[0m`)
  } else {
    console.log(`\x1b[90m${line}\x1b[0m`)
  }
}

// ============================================================
// 版本号处理逻辑
// ============================================================

console.log('')
logDivider('🏷️  版本号更新')

const tagVer = process.env.TAG_VERSION
const packageVersion = require('../package.json').version
let version

log('info', '开始处理版本号...')

if (tagVer) {
  version = tagVer.startsWith('v') ? tagVer.slice(1) : tagVer
  log('info', '检测到环境变量 TAG_VERSION', tagVer)
  log('info', `解析后版本号: ${version}`)
} else {
  version = packageVersion
  log('info', '未检测到 TAG_VERSION 环境变量')
  log('info', `使用 package.json 中的版本号: ${version}`)
}

const outputPath = path.resolve(__dirname, '../src/version.js')
const outputContent = `export const version = '${version}'\n`

log('info', `输出路径: ${outputPath}`)

try {
  // 检查文件是否存在及当前内容
  let currentVersion = null
  if (fs.existsSync(outputPath)) {
    const currentContent = fs.readFileSync(outputPath, 'utf-8')
    const match = currentContent.match(/version = '(.+)'/)
    if (match) {
      currentVersion = match[1]
    }
  }

  if (currentVersion === version) {
    log('info', `版本号未变化，跳过写入`, `当前: ${currentVersion}`)
  } else {
    fs.writeFileSync(outputPath, outputContent)
    log('success', '版本文件写入成功')
    if (currentVersion) {
      log('info', `版本号已更新: ${currentVersion} → ${version}`)
    } else {
      log('info', `版本号已设置: ${version}`)
    }
  }

  // 输出文件信息
  const stats = fs.statSync(outputPath)
  log('info', `文件大小: ${stats.size} bytes`)
  log('info', `修改时间: ${stats.mtime.toLocaleString('zh-CN')}`)

} catch (error) {
  log('error', '版本文件写入失败', error.message)
  console.error(error)
  process.exit(1)
}

console.log('')
log('success', `版本号处理完成: v${version}`)
logDivider()
console.log('')
