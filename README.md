
#### 简介

Avue是基于[Vue.js](https://github.com/vuejs/vue)和[element](https://github.com/ElemeFE/element)的快速开发框架 它的核心是数据驱动UI的思想，让我们从繁琐的crud开发中解脱出来，它的写法类似easyUI，但是写起来比easyui更容易，因为它是基础数据双向绑定以及其他vue的特性。同时不知局限于crud，它还有我们经常用的一些组件例如，表单，数据展示卡，人物展示卡等，更多的组件还在开发

#### 百度云课程
<p align="center">
  <img width="600" src="https://gitee.com/smallweigit/avue/raw/master/static/cdn/images/avue-bg.png">
</p>

- [1.Avue修仙系列之基础环境的准备和课程介绍](https://pan.baidu.com/s/1ZBgYby4K8yQC3U4mevuk8A)
- 未完待续

#### avue相关地址
欢迎加入QQ交流群，互相学习   
前端avue交流群：606410437  
后台微服务群：23754102   
服务端解决方案：[https://gitee.com/log4j/pig](https://gitee.com/log4j/pig)

最近很多人反应不太会用crud快速开发组件，因此下周将免费推出crud系列的讲解课程，详情请加QQ群

<img width="900" src="https://gitee.com/smallweigit/avue/raw/master/static/cdn/images/class1.png">
<img width="900" src="https://gitee.com/smallweigit/avue/raw/master/static/cdn/images/class2.png">

#### 技术文档
- [avue技术文档](https://www.kancloud.cn/smallwei/avue/)

#### 源码地址
- [码云地址:https://gitee.com/smallweigit/avue](https://gitee.com/smallweigit/avue)
- [github地址：https://github.com/nmxiaowei/avue](https://github.com/nmxiaowei/avue)

#### 更新日志
- [更新日志](./UPDATE.md)

#### 在线demo
- [crud和form组件(html-demo)](http://sandbox.runjs.cn/show/xjjyj1cj)
- [演示地址1:http://avue.2bugs.cn](http://avue.2bugs.cn)
- [演示地址2:http://122.4.247.156:7777](http://122.4.247.156:7777)——jenkins+docker+git钩子自动部署

#### 使用方式
1.html引入
```
axios、vue、element-ui相关依赖也要引入
avue-cdn:https://gitee.com/smallweigit/avue/raw/master/lib/avue.js
<script src="https://cdn.bootcss.com/axios/0.18.0/axios.js"></script>
<script type="text/javascript" src="https://cdn.bootcss.com/vue/2.5.17-beta.0/vue.js"></script>
<script type="text/javascript" src="https://cdn.bootcss.com/element-ui/2.3.4/index.js"></script>
<script type="text/javascript" src="https://gitee.com/smallweigit/avue/raw/master/lib/avue.js"></script>
```
2.npm引入
```
npm install avue-cli

import Avue from 'avue-cli/packages/index.js';

```

#### 功能结构
```
- 全局错误日志记录
- vuex持久化存储
- 主题色切换
- 锁屏
- SSR渲染页面
- 数据展示
- 登录/注销
 - 用户名登录
 - 验证码登录
- 权限验证
- 第三方网站嵌套
- CRUD(增删改查)
- FORM(动态生成)
- 阿里巴巴图标库(在线调用)
- 环境变量
- 数据持久化
- 剪切板
- 系统管理
 - 用户管理
 - 角色管理
 - 菜单管理
- 高级路由
 - 动态路由
 - 参数路由
- 更多功能开在开发
```

#### 页面展示
**主题色**
<p align="center">
  <img width="900" src="https://gitee.com/smallweigit/avue/raw/master/static/cdn/images/avue-theme.png">
</p>

**本地数据持久化**
<p align="center">
  <img width="900" src="https://gitee.com/smallweigit/avue/raw/master/static/cdn/images/avue-store.png">
</p>

**环境变量**
<p align="center">
  <img width="900" src="https://gitee.com/smallweigit/avue/raw/master/static/cdn/images/avue-dev.png">
</p>

**登录**
<p align="center">
  <img width="900" src="https://gitee.com/smallweigit/avue/raw/master/static/cdn/images/avue-login.png">
</p>

**权限测试页面**
<p align="center">
  <img width="900" src="https://gitee.com/smallweigit/avue/raw/master/static/cdn/images/avue-roles-test.png">
</p>

**数据展示**
<p align="center">
  <img width="900" src="https://gitee.com/smallweigit/avue/raw/master/static/cdn/images/avue-datashow.png">
</p>

**错误页面**
<p align="center">
  <img width="900" src="https://gitee.com/smallweigit/avue/raw/master/static/cdn/images/avue-errpage.png">
</p>

**错误日志记录**
<p align="center">
  <img width="900" src="https://gitee.com/smallweigit/avue/raw/master/static/cdn/images/avue-errlog.png">
</p>

**CRUD**
<p align="center">
  <img width="900" src="https://gitee.com/smallweigit/avue/raw/master/static/cdn/images/avue-crud.png">
  <img width="900" src="https://gitee.com/smallweigit/avue/raw/master/static/cdn/images/avue-grade.png">
</p>

**FORM**
<p align="center">
  <img width="900" src="https://gitee.com/smallweigit/avue/raw/master/static/cdn/images/avue-form.png">
</p>

**用户管理**
<p align="center">
  <img width="900" src="https://gitee.com/smallweigit/avue/raw/master/static/cdn/images/avue-user.png">
</p>

**角色管理**
<p align="center">
  <img width="900" src="https://gitee.com/smallweigit/avue/raw/master/static/cdn/images/avue-role.png">
</p>

**菜单设置**
<p align="center">
  <img width="900" src="https://gitee.com/smallweigit/avue/raw/master/static/cdn/images/avue-menu.png">
</p>

**阿里巴巴图标库(在线调用)**
<p align="center">
  <img width="900" src="https://gitee.com/smallweigit/avue/raw/master/static/cdn/images/avue-ali.png">
</p>

**登录页面SSR渲染**
<p align="center">
  <img width="900" src="https://gitee.com/smallweigit/avue/raw/master/static/cdn/images/login-ssr.png">
</p>

**主页**
<p align="center">
  <img width="900" src="https://gitee.com/smallweigit/avue/raw/master/static/cdn/images/avue-index.png">
</p>

**第三方网站**
<p align="center">
  <img width="900" src="https://gitee.com/smallweigit/avue/raw/master/static/cdn/images/avue-iframe.png">
</p>


#### 开发
```bash
# 克隆项目
git clone https://gitee.com/smallweigit/avue.git

# 进入项目
cd avue

# 安装依赖
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```

#### 调试与发布
```bash
# 构建测试环境
npm run dev

# 构建生成环境
npm run build

# 构建SSR渲染页面
npm run start

```

#### 其它
```bash
# 代码检测
npm run lint

# 单元测试
npm run karma

# 构建SSR客户端代码
npm run build:client

# 构建SSR服务端端代码
npm run build:server
```

#### License
[MIT](https://gitee.com/smallweigit/avue/blob/master/LICENSE)

Copyright (c) 2017-present Smallwei QQ:1634566606
