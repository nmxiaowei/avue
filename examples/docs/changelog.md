## 更新日志

### 1.3.4

* [重大更新] 简化crud分页的逻辑，新增on-load接口[实例代码](https://avue.top/#/component/crud-page)
* 新增upload组件dataType数据的格式，和优化内部逻辑[实例代码](https://avue.top/#/component/form-upload)
* 修复carousel组件的样式问题导致不显示
* 修复carousel组件title配置问题，无title时不显示标题

### 1.3.3

* [重大更新] 新增一件填充模拟数据功能，方便测试，后期补充文档，具体看[实例代码](https://avue.top/#/component/form)
* 修复upload组件上传时图片累加限制问题
* 修复switch组件赋值‘||’引发得到问题
* 修复若干已知问题

### 1.3.2

* 新增tree多功能组件，menuBtn为按钮菜单的卡槽返回node和data，具体看[实例代码](https://avue.top/#/component/tree)
* 修复若干测试版本中的bug
* 更新和完善了文档

### 1.3.1

* 去掉avue-form-steps组件更改为avue-steps组件，同时支持form和crud的选项卡[实例代码](https://avue.top/#/component/steps)
* 修复form表单清空方法无效问题
* 修复crud弹出框时clearValidate方法调用问题
* 修改核心深拷贝方法
* 新增avue-steps和avue-tabs文档(在他们demo的当前页最下边)
* 优化carousel组件不写title自动隐藏
* date-select组件更改为date-group组件

### 1.3.0

* [重大更新] 根据row属性控制form表单可以任意排列组合,独占一行 [实例代码](https://avue.top/#/component/form)
* 修复了crud打开时清除表单验证的错误

### 1.2.7

* 修复字典方法其他问题
* 修复日期组件为空非正常显示问题
* 新增json展示组件[实例代码](https://avue.top/#/component/json)
* 修复跑马灯图片不显示问题和属性无效问题
* 修复table-tree死循环问题

### 1.2.4

* 同步了tabs组件中crud的各种卡槽
* 修复了核心方法字典多级深层级不查找问题
* 同步了crud中搜索组件的参数的问题
* 修复若干已知问题和缺陷

### 1.2.3

* 新增type为tree时defaultExpandAll属性是否展开树形结构，默认为true
* 优化type为password时crud明文显示的问题
* 修复type为tree时搜索props配置问题
* 修复核心方法是字典匹配对象方法问题
* 去掉avue-form-tabs组件更改为avue-tabs组件，可以配置form和crud的选项卡[实例代码](https://avue.top/#/component/tabs)
* 新增data-progress进度条数据展示组件[实例代码](https://avue.top/#/component/data-progress)
* 新增carousel跑马灯工具类组件[实例代码](https://avue.top/#/component/carousel)

### 1.2.2

* crud去掉menuBtn属性和dropMenu卡槽
* 新增menuType操作栏按钮类型，默认为button（button / icon / menu / text），共四种类型
* 新增menuBtn卡槽，当menuType为menu时合并菜单扩展按钮
* 修复type为tree时props字典时的搜索问题
* 修复type为tree时多选点击闪退问题
* 新增crud组件表格头部header属性头部显隐，默认为true
* 新增type为tree时nodeClick节点点击事件和checked勾选事件，都返回当前节点对象

### 1.2.1

* 版本打包错误

### 1.2.0

* 新增type为input组件prepend和append前后辅助文字框
* 重构了type为upload上传组件的整体逻辑
* 新增type为upload时propsHttp属性配置服务器返回数据的name和url属性
* 去掉了sort字段排序属性

### 1.1.22

* 新增crud组件sort字段排序显示
* 修复form-steps组件的不显示问题
* 修复crud弹窗背景层执行逻辑问题
* 修复form-tabs组件切换时不移除表单验证问题

### 1.1.21

* 新增showSummary显示表格合计
* 新增sumColumnList表格合计需要配置的字段（目前有3中可以为sum相加|avg平均值|count计数）
* 新增自定义合集方法逻辑summaryMethod返回Function({ columns, data })
* 新增spanMethod行和列合并方法返回Function({ row, column, rowIndex, columnIndex })
* 合计和行列合并例子[实例代码](https://avue.top/#/component/crud-sum)
* 新增emptyText空数据时显示的文本内容
* 新增表格无数据展示内容empty卡槽


### 1.1.20

* crud组件中form自定义slot返回row和index扩展
* 修复form组件中emptyBtn属性的单词拼写错误
* 修复crud中搜索为tree时parent属性失效问题
* submitPostion属性改为menuPostion
* 新增dateBtn表格的日期控件
* 新增date-change日期控件回调的日期值，单个日期是字符串，范围日期为数组
* 新增dateDefault表格日期组件的默认值
* 更新了form组件文档

### 1.1.19

* 修复type为tree是parent属性的控制
* 新增type为tree时defaultExpandAll展开全部节点属性,默认为true
* 新增avue-crud-input组件type为tree时的node-click方法返回当前点击的data和done关闭窗口
* 新增beforeClose和beforeOpen方法中返回的窗口类型function(done,type)
* 新增menuBtnTitle属性当menuBtn为true时，按钮显示的文字提示，默认为功能
* 修复弹出框中样式的问题和调整menuBtn的样式


### 1.1.18

* 日期范围占位符startPlaceholder和endPlaceholder
* 新增search-reset清空搜索回调方法
* 新增crud组件和form组件的clearValidate清空表格钟表单验证
* 新增菜单按钮dropMenu操作栏卡槽
* 同步ele的resetForm清空表单和clearValidate清空验证规则的方法
* 表单的清空按钮emptytBtn显隐和emptyText清空按钮的文字resetChange清空回调方法
* 新增手机type为phone属性为输入手机号准备的组件
* 新增emptySize和submitSize表单按钮控制大小属性
* 去掉crud组件中中多余的字段数据


### 1.1.17

* 新增options字段进行第三方插件字段扩展


### 1.1.16

* 新增自定义表单规则演示代码[实例代码](https://avue.top/#/component/crud-rules)
* 新增时间戳如何配置演示代码[实例代码](https://avue.top/#/component/form-date)
* 新增时间格式化参考文档[参考文档](https://avue.top/#/component/crud-doc)
* 调整了crud日期组件的位置
* 调整了组件的change和click事件
* 废除了搜索的栅列searchSpan和searchMenuSpan属性
* 新增labelPosition表单标题文字位置属性 
* 新增表单全局size(medium / small / mini)和disabled(true / false)属性
* 新增title属性表格的标题
* 新增menuBtn表格合并菜单按钮默认为false


### 1.1.15

* 修复form组件的visdiplay和disabled紧急bug


### 1.1.14

* 新增组件readonly只读属性配置
* 新增crud中view,edit,add时打开表单是否可见全局控制显隐visdiplay属性和disabled禁止编辑属性
* 去掉了ueditor富文本编辑器组件，改为第三方插件[avue-plugin-ueditor](https://gitee.com/smallweigit/avue-plugin-ueditor)
* 修复了avue-tree-table子节点树的样式显示问题
* 新增searchSpan控制搜索表单的栅列,默认为6
* 新增searchMenuSpan搜索按钮的栅列,默认为4
* 新增searchMenu自定义菜单搜索卡槽
* form-detail组件支持本地字典和网络字典配置，详情参考form和crud组件配置
* 完善了avue第三方插件开发规范
* 移除moment包换成轻量级的dayjs插件包
* crud新增编辑和新增独立控制按钮等待的事件loading 和关闭表单的事件done (form,index,done,loading)
* avue-cli快速开发脚手架支持ie10+浏览器,ie9css部分暂不支持，后期添加[avue-cli1.x](https://gitee.com/smallweigit/avue) /         [avue-cli2.x](https://git.avue.top/avue/avue-cli)