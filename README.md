### Avue
基于数据驱动视图的思想，根据json数据快速构建crud和form等组件  
依赖包:  
* axios：发送ajax数据用到的包
* element-ui：可视化组件
* 引入avue之前先引入上面这俩个包

#### 引入方式
```
npm i git+https://smallwei:123456@gitee.wang/avue/avue.git#master
import avue/lib/index.js
import avue/lib/theme-chalk/index.css
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
  
后期加入单元测试等