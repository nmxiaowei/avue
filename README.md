### Avue
基于数据驱动视图的思想，根据json数据快速构建crud和form等组件  
依赖包:  
* axios：发送ajax数据用到的包
* element-ui：可视化UI组件
* 引入avue之前先引入上面这俩个包

#### 引入方式
```
#### 安装
npm i @smallwei/avue

#### 导入
import Element from 'element-ui'
import axios from 'axios'
import Avue from @smallwei/avue/lib/index.js
import @smallwei/avue/lib/theme-chalk/index.css

#### 使用
Vue.use(Element);
Vue.use(Avue,axios)
```

#### 打包部署
```
npm run dist
```

#### 打包样式
```
npm run build:theme
```

#### 打包源码
```
npm run build
```

#### 代码检测
```
npm run lint
```