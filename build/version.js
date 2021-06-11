const fs = require('fs')
const path = require('path')
const tagVer = process.env.TAG_VERSION
if (tagVer) {
  version = tagVer.startsWith('v') ? tagVer.slice(1) : tagVer
} else {
  version = require('../package.json').version
}
fs.writeFileSync(
  path.resolve(__dirname, '../src/version.js'),
  `export const version = '${version}'
`,
)