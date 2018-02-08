### <font>avue只是刚起步，很多功能还在开发中敬请期待!</font>
简体中文

## 简介

`avue` 是一个后台集成解决方案支持SSR(服务端渲染)和SPA(单例页面),它基于 [Vue.js](https://github.com/vuejs/vue) 和 [element](https://github.com/ElemeFE/element)。它使用了最新的前端技术栈，权限验证，第三方网站嵌套等功能，很多功能还在开发，敬请期待<br />
`1.加入了本地离线的包引入方法去引入vue，vue-router等第三方包`<br />
`2.支持SSR服务端渲染(express)`<br />
`3.支持js动态可配CRUD,节约大量开发成本`<br />
`4.支持多种登录方式`<br />
[详细介绍](https://my.oschina.net/sunshineS/blog/1583563)

**登录**
<p align="center">
  <img width="900" src="http://oetrwxnhv.bkt.clouddn.com/avue-logins.png">
</p>

**CRUD**
<p align="center">
  <img width="900" src="http://oetrwxnhv.bkt.clouddn.com/avue-crud.png">
</p>

**登录页面SSR渲染**
<p align="center">
  <img width="900" src="http://oetrwxnhv.bkt.clouddn.com/login-ssr.png">
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
 - 用户名登录
 - 验证码登录
 - 第三方登录(开发中)
- 权限验证
- 第三方网站嵌套
- CRUD(增删改查)
- 更多功能开在开发
```

## CRUD使用说明————根据配置json文件自动生成CRUD
```bash
{
  border: true,//表格是否显示边框
  index: true,///表格是否显示序号
  selection: true,//表格是否显示可选select
  column: [
    {
      label: "用户名",//表格的标题
      prop: "username",//表格的key
      width: "150",//表格的宽度
      fixed: true,//是否冻结列
      type:'select', //select | radio | checkbox 默认为text
      dicData: [
        {
          label: "男",
          value: 0
        },
        {
          label: "女",
          value: 1
        }
      ],//type的数据字典,当type为：select | radio | checkbox 加载
      dataDetail: row => {
        return row.username;//是否对列表数据处理
      },
      rules: [{ required: true, message: "请输入用户名", trigger: "blur" }] //表单校验规则
    }
}
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
