## 安装

### npm 安装

推荐使用 npm 的方式安装，它能更好地和 [webpack](https://webpack.js.org/) 打包工具配合使用。

```shell
npm i @smallwei/avue -S
```

### CDN

目前可以通过 [https://www.jsdelivr.com/package/npm/@smallwei/avue](https://www.jsdelivr.com/package/npm/@smallwei/avue) 获取到最新版本的资源，在页面上引入 js 和 css 文件即可开始使用。

```html
<!-- 引入样式 -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@smallwei/avue@1.1.21/lib/theme-chalk/index.css">
<!-- 引入组件库 -->
<script src="https://cdn.jsdelivr.net/npm/@smallwei/avue@1.1.21/lib/index.js"></script>
```

:::tip
我们建议使用 CDN 引入 Avue 的用户在链接地址上锁定版本，以免将来 Avue 升级时受到非兼容性更新的影响。锁定版本的方法请查看 [jsdelivr.com](https://www.jsdelivr.com)。
:::

### 简单的表格

通过 CDN 的方式我们可以很容易地使用 Avue 写出一个 简单的表格 页面。[在线演示](https://sandbox.runjs.cn/show/0swgvk7o)

<iframe width="100%" height="600" src="https://runjs.cn/code/0swgvk7o" allowpaymentrequest allowfullscreen="allowfullscreen" frameborder="0"></iframe>

如果是通过 npm 安装，并希望配合 webpack 使用，请阅读下一节：[快速上手](/#/component/quickstart)。