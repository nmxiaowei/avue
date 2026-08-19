<p align="center">
  <a href="https://avuejs.com" target="_blank" rel="noopener noreferrer">
    <img width="100" src="https://avuejs.com/images/logo.png" alt="Avue logo">
  </a>
</p>

<p align="center">
  <a href="https://gitee.com/smallweigit/avue/stargazers"><img src="https://gitee.com/smallweigit/avue/badge/star.svg?theme=dark" alt="star"></a>
  <a href="https://gitee.com/smallweigit/avue/members"><img src="https://gitee.com/smallweigit/avue/badge/fork.svg?theme=dark" alt="fork"></a>
  <a href="https://gitee.com/smallweigit/avue"><img src="https://img.shields.io/badge/license-MIT-brightgreen.svg" alt="license"></a>
  <a href="https://gitee.com/smallweigit/avue"><img src="https://img.shields.io/badge/version-3.9.3-blue.svg" alt="version"></a>
</p>

# Avue.js

Avue.js 是基于 Vue 3 与 Element Plus 的数据驱动型组件库，围绕表单、表格和业务配置场景做了进一步封装。它通过统一的配置方式降低重复开发成本，让 CRUD、表单联动、数据展示和常见业务组件的搭建更直接。

适合以下场景：

- 后台管理系统的快速搭建
- 表单和表格配置较多的业务系统
- 需要统一交互规范的中后台项目
- 需要复用常见业务组件的企业应用

## 特性

- 数据驱动视图，通过配置生成常见业务界面
- 深度适配 Vue 3 与 Element Plus 生态
- 内置 `avue-crud`、`avue-form`、`avue-search` 等高频组件
- 提供上传、导出、打印、水印、剪贴板、截图等常用能力
- 支持国际化、全局配置、Axios 注入和类型声明
- 附带大量本地示例，便于快速对照接入

## 环境要求

- `vue >= 3.2.0`
- `element-plus >= 2.2.0`
- `@element-plus/icons-vue >= 2.0.0`

以上依赖为当前包的 `peerDependencies`，安装 Avue 时需要一并安装。

## 安装

```bash
pnpm add vue element-plus @element-plus/icons-vue @smallwei/avue
```

或使用其他包管理器：

```bash
npm install vue element-plus @element-plus/icons-vue @smallwei/avue
```

```bash
yarn add vue element-plus @element-plus/icons-vue @smallwei/avue
```

## 快速开始

```ts
import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import Avue from "@smallwei/avue";
import "@smallwei/avue/lib/index.css";
import App from "./App.vue";

const app = createApp(App);

app.use(ElementPlus);
app.use(Avue, {
  size: "default",
  menuType: "text",
  locale: "zh-cn",
});

app.mount("#app");
```

基础用法示例：

```vue
<template>
  <avue-form v-model="form" :option="option" />
</template>

<script setup>
import { reactive, ref } from "vue";

const form = reactive({
  name: "",
  status: 1,
});

const option = ref({
  submitBtn: true,
  emptyBtn: true,
  column: [
    {
      label: "姓名",
      prop: "name",
      span: 24,
    },
    {
      label: "状态",
      prop: "status",
      type: "radio",
      dicData: [
        { label: "启用", value: 1 },
        { label: "禁用", value: 0 },
      ],
      span: 24,
    },
  ],
});
</script>
```

## 全局配置

`app.use(Avue, options)` 支持常见全局参数：

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `size` | `string` | 全局组件尺寸 |
| `calcHeight` | `number` | 全局高度修正值 |
| `menuType` | `string` | 操作区按钮展示类型 |
| `formOption` | `Record<string, any>` | 表单默认配置 |
| `crudOption` | `Record<string, any>` | CRUD 默认配置 |
| `appendToBody` | `boolean` | 弹层类组件是否挂载到 `body` |
| `locale` | `string \| object` | 语言配置 |
| `i18n` | `any` | 自定义国际化处理器 |
| `axios` | `any` | 自定义请求实例 |
| `canvas` | `object` | 水印默认配置 |
| `qiniu` | `object` | 七牛上传默认配置 |
| `ali` | `object` | 阿里云上传默认配置 |

## 组件与能力

当前仓库内置的能力主要包括：

- 表单与表格：`avue-form`、`avue-crud`、`avue-search`
- 输入组件：`avue-input`、`avue-select`、`avue-input-tree`、`avue-input-table`
- 业务组件：`avue-login`、`avue-tabs`、`avue-tree`、`avue-chat`、`avue-flow`、`avue-qrcode`
- 数据展示：`avue-card`、`avue-comment`、`avue-count-up`、`avue-article`
- 插件能力：导出、打印、截图、剪贴板、水印、日志、图片预览、弹窗表单

更完整的使用方式可参考文档站和仓库示例。

## 文档与示例

- 官方文档：https://avuejs.com
- Gitee 仓库：https://gitee.com/smallweigit/avue
- 问题反馈：https://gitee.com/smallweigit/avue/issues
- Element Plus 示例：`examples/element-plus`
- 数据展示示例：`examples/data`

## 本地开发

```bash
pnpm install
pnpm dev
```

### 运行本地示例

示例服务不依赖额外的开发服务器，直接提供 `examples`、`dist` 和 `lib` 中的静态资源：

```bash
pnpm examples:dev
```

启动后访问 `http://127.0.0.1:5175/examples/`。如需在修改组件源码后实时查看效果，请在另一个终端运行 `pnpm dev`，以持续更新示例引用的 `dist` 浏览器包。

常用命令：

```bash
pnpm dev
pnpm build
pnpm build:esm
pnpm build:cjs
pnpm build:browser
pnpm typecheck
pnpm gen:version
```

## 目录结构

| 目录 | 说明 |
| --- | --- |
| `src` | 组件与插件源码入口 |
| `packages` | 组件实现与业务模块 |
| `styles` | 样式资源 |
| `types` | TypeScript 类型声明 |
| `examples` | 本地示例与调试页面 |
| `build` | 构建与版本生成脚本 |
| `lib` | 构建产物 |

## 相关产品

- 数据大屏：https://data.avuejs.com
- 物联网平台：http://iot.avuejs.com
- AI 应用平台：http://ai.avuejs.com

## 参与贡献

1. Fork 本仓库
2. 创建功能分支
3. 提交变更
4. 发起 Pull Request

提交问题时请尽量提供复现步骤、运行环境、错误日志和截图，便于快速定位。

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2017-present, Smallwei
