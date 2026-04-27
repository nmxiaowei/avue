/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const path = require("path");

const tagVer = process.env.TAG_VERSION;
const packageVersion = require("../package.json").version;
const version = tagVer ? (tagVer.startsWith("v") ? tagVer.slice(1) : tagVer) : packageVersion;

const outputPath = path.resolve(__dirname, "../src/version.ts");
const outputContent = `export const version = '${version}'\n`;

try {
  const currentContent = fs.existsSync(outputPath)
    ? fs.readFileSync(outputPath, "utf-8")
    : "";

  if (currentContent !== outputContent) {
    fs.writeFileSync(outputPath, outputContent);
  }

  console.log(`[version] v${version}`);
} catch (error) {
  console.error(`[version] failed: ${error.message}`);
  process.exit(1);
}
