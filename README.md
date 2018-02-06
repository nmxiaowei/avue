### <font>avue只是刚起步，很多功能还在开发中敬请期待!</font>
简体中文

## 简介

`avue` 是一个后台集成解决方案支持SSR(服务端渲染)和SPA(单例页面)，它基于 [Vue.js](https://github.com/vuejs/vue) 和 [element](https://github.com/ElemeFE/element)。它使用了最新的前端技术栈，权限验证，第三方网站嵌套等功能，很多功能还在开发，敬请期待</br>
`并且加入了本地离线的包引入方法去引入vue，vue-router等第三方包`
[详细介绍](https://my.oschina.net/sunshineS/blog/1583563)

**登录**
<p align="center">
  <img width="900" src="http://oetrwxnhv.bkt.clouddn.com/avue-login.png">
</p>

**主页**
<p align="center">
  <img width="900" src="http://oetrwxnhv.bkt.clouddn.com/avue-index.png">
</p>

**第三方网站**
<p align="center">
  <img width="900" src="http://oetrwxnhv.bkt.clouddn.com/avue-iframe.png">
</p>

## 功能
```
- SSR渲染页面
- 登录/注销
- 权限验证
- 第三方网站嵌套
- 更多功能开在开发
```

## 开发
```bash
# 克隆项目
https://gitee.com/smallweigit/avue.git

# 安装依赖
npm install
   
# 建议不要用cnpm安装 会有各种诡异的bug 可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```

## 调试与发布
```bash
# 构建测试环境
npm run dev

# 构建生成环境
npm run build

# 构建SSR渲染页面
npm run start

```


## 其它
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



## License

[MIT](https://gitee.com/smallweigit/avue/blob/master/LICENSE)

Copyright (c) 2017-present Smallwei QQ:1634566606
