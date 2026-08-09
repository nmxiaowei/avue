const fs = require("node:fs");
const fsPromises = require("node:fs/promises");
const http = require("node:http");
const path = require("node:path");

const PROJECT_ROOT = path.resolve(__dirname, "..");
const PUBLIC_DIRECTORIES = new Set(["examples", "dist", "lib"]);
const DEFAULT_HOST = "127.0.0.1";
const DEFAULT_PORT = 5175;
const MIME_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

function parseOptions(argv) {
  const options = {
    host: process.env.EXAMPLES_HOST || DEFAULT_HOST,
    port: Number(process.env.EXAMPLES_PORT || DEFAULT_PORT),
  };

  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    const nextValue = argv[index + 1];

    if (value === "--host" && nextValue) {
      options.host = nextValue;
      index += 1;
    }

    if (value === "--port" && nextValue) {
      options.port = Number(nextValue);
      index += 1;
    }
  }

  if (!Number.isInteger(options.port) || options.port < 1 || options.port > 65535) {
    throw new Error("端口必须是 1 到 65535 之间的整数。");
  }

  return options;
}

function sendText(response, statusCode, message) {
  response.writeHead(statusCode, {
    "Content-Type": "text/plain; charset=utf-8",
    "Cache-Control": "no-store",
  });
  response.end(message);
}

function resolvePublicFile(pathname) {
  const normalizedPath = pathname.replace(/\\/g, "/");
  const targetPath = path.resolve(PROJECT_ROOT, `.${normalizedPath}`);
  const relativePath = path.relative(PROJECT_ROOT, targetPath);

  if (!relativePath || relativePath.startsWith("..") || path.isAbsolute(relativePath)) {
    return null;
  }

  const publicDirectory = relativePath.split(path.sep)[0];
  return PUBLIC_DIRECTORIES.has(publicDirectory) ? targetPath : null;
}

async function getFilePath(pathname) {
  const targetPath = resolvePublicFile(pathname);
  if (!targetPath) return null;

  try {
    const stat = await fsPromises.stat(targetPath);
    if (stat.isFile()) return targetPath;
    if (!stat.isDirectory()) return null;

    const indexPath = path.join(targetPath, "index.html");
    const indexStat = await fsPromises.stat(indexPath);
    return indexStat.isFile() ? indexPath : null;
  } catch {
    return null;
  }
}

async function handleRequest(request, response) {
  if (request.method !== "GET" && request.method !== "HEAD") {
    response.setHeader("Allow", "GET, HEAD");
    sendText(response, 405, "仅支持 GET 和 HEAD 请求。");
    return;
  }

  let requestUrl;
  try {
    requestUrl = new URL(request.url || "/", "http://localhost");
  } catch {
    sendText(response, 400, "请求地址无效。");
    return;
  }

  if (requestUrl.pathname === "/") {
    response.writeHead(302, { Location: "/examples/" });
    response.end();
    return;
  }

  let pathname;
  try {
    pathname = decodeURIComponent(requestUrl.pathname);
  } catch {
    sendText(response, 400, "请求地址编码无效。");
    return;
  }

  const filePath = await getFilePath(pathname);
  if (!filePath) {
    sendText(response, 404, "文件不存在。");
    return;
  }

  const extension = path.extname(filePath).toLowerCase();
  response.writeHead(200, {
    "Content-Type": MIME_TYPES[extension] || "application/octet-stream",
    "Cache-Control": "no-store",
  });

  if (request.method === "HEAD") {
    response.end();
    return;
  }

  const stream = fs.createReadStream(filePath);
  stream.on("error", () => {
    if (!response.headersSent) {
      sendText(response, 500, "读取文件失败。");
      return;
    }
    response.destroy();
  });
  stream.pipe(response);
}

const options = parseOptions(process.argv.slice(2));
const server = http.createServer((request, response) => {
  handleRequest(request, response).catch(() => {
    sendText(response, 500, "服务发生未知错误。");
  });
});

server.listen(options.port, options.host, () => {
  console.log(`Avue 示例服务已启动：http://${options.host}:${options.port}/examples/`);
});

server.on("error", (error) => {
  console.error(`示例服务启动失败：${error.message}`);
  process.exitCode = 1;
});

function closeServer() {
  server.close(() => process.exit(0));
}

process.on("SIGINT", closeServer);
process.on("SIGTERM", closeServer);
