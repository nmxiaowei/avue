## 快速上手

本节将介绍如何在项目中使用 Element。

### 使用 vue-cli@3

我们为新版的 vue-cli 准备了相应的 [脚手架](https://gitee.com/smallweigit/avue)，你可以用它们快速地搭建一个基于 Avue 的项目。

### 引入 Avue

你可以引入整个 Avue

在 main.js 中写入以下内容：

```javascript
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Avue from '@smallwei/avue';
import @smallwei/avue/lib/theme-chalk/index.css';
import App from './App.vue';

Vue.use(Avue);
Vue.use(ElementUI);

new Vue({
  el: '#app',
  render: h => h(App)
});
```

以上代码便完成了 Avue 的引入。需要注意的是，样式文件需要单独引入。还需要引入element-ui作为底层组件依赖

