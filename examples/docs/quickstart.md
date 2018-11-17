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

#### 按需引入

接下来，如果你只希望引入部分组件，比如 Carousel，那么需要在 main.js 中写入以下内容：

```javascript

import Vue from 'vue';
import { Carousel } from '@smallwei/avue';
import App from './App.vue';

Vue.component(Carousel.name, Carousel);
/* 或写为
 * Vue.use(Carousel)
 */

new Vue({
  el: '#app',
  render: h => h(App)
});
```

完整组件列表

```javascript
import Vue from 'vue';
import {
    Json,
    Crud,
    Form,
    Tabs,
    Tree,
    Carousel,
    Steps,
    FormDetail,
    CrudCheckbox,
    CrudDate,
    CrudTime,
    CrudInput,
    CrudRadio,
    CrudSelect,
    CrudCascader,
    CrudNumberInput,
    CrudSwitch,
    CrudRate,
    CrudUpload,
    CrudSilder,
    DataProgress,
    DataDisplay,
    DataCard,
    DataIcons,
    DataTabs,
    DataBox,
    TableTree,
    DateGroup
} from '@smallwei/avue';

Vue.use(Pagination);
```

### 全局配置

在引入 Avue 时，可以传入一个全局配置对象。该对象目前支持 `size`字段。`size` 用于改变组件的默认尺寸。按照引入 Avue 的方式，具体操作如下：

完整引入 Avue

```js
import Vue from 'vue';
import Element from 'element-ui';
import Avue from '@smallwei/avue
Vue.use(Avue, { size: 'small'});
```

按需引入 Avue

```js
import Vue from 'vue';
import ElementUI from 'element-ui';
import { Carousel } from '@smallwei/avue';

Vue.prototype.$AVUE = { size: 'small'};
Vue.use(Carousel);
```

按照以上设置，项目中所有拥有 `size` 属性的组件的默认尺寸均为 'small'。可选值 small / mini / medium

### 开始使用

至此，一个Avue 的开发环境已经搭建完毕，现在就可以编写代码了。各个组件的使用方法请参阅它们各自的文档。

