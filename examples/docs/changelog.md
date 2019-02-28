## 更新日志
### 1.6.0
#### 2019-2-27

- 增强curd的面板功能[#IS2FB](https://gitee.com/smallweigit/avue/issues/IS2FB),[demo](/#/component/crud-expand)
- 修复crud级联的重复请求问题[#IS2ES](https://gitee.com/smallweigit/avue/issues/IS2ES)
- 修复字典的请求逻辑[#IRUXF](https://gitee.com/smallweigit/avue/issues/IRUXF)
- 增加tabs组件的changeTabs切换标签的方法[#IRNTO](https://gitee.com/smallweigit/avue/issues/IRNTO)
- 修复tree组件的defaultExpandAll全部展开属性问题[#IRVY8](https://gitee.com/smallweigit/avue/issues/IRVY8)

#### 说明
- 废除了dicData为字符串的类型去加载本地字典集合方法（也就是配置option中dicData数组字典，在cloumn中调用key值），具体参考[demo](/#/component/crud-dic)
- 配置网络字典dicUrl时，无需再次配置dicData别名属性，具体参考[demo](/#/component/crud-dic)


### 1.5.4
#### 2019-2-19

- 完善了steps组件的逻辑和用法[demo](/#/component/steps)
- 完善了tabs组件的逻辑和用法[demo](/#/component/tabs)


### 1.5.3
#### 2019-2-12

- 新增crud权限控制方法[demo](/#/component/crud-permission)
- 新增icon-select图标选择器组件[demo](/#/component/form-icon-select)


### 1.5.2
#### 2019-1-21

- 优化crud组件tip部分，同时开放了tip相关参数[#IQUWE](https://gitee.com/smallweigit/avue/issues/IQUWE),[demo](/#/component/crud-selection)
- 调整数据展示组件部分模版[数据展示7](/#/component/data-info),[数据展示5](/#/component/data-icons)


### 1.5.1
#### 2019-1-16

- 新增search组件[demo](/#/component/search)
- 优化了框架中全部的字典部门的逻辑
- 表格字段 tree 类型 多选模式下 字典格式化出错[#pr11](https://gitee.com/smallweigit/avue/pulls/11)


### 1.5.0
#### 2019-1-2

- 新增select组件的remote远程搜索数据属性[demo](/#/component/crud-select)
- 新增select组件的limit多选限制个数属性
- 新增crud组件中开启search卡槽即可开启自定义，无需配置列的自定义
- 修复了form组件多级联动时，监听到数据变化就更新的问题
- 新增form组件tip辅助语属性[demo](/#/component/form-tip)


### 1.4.9
#### 2018-12-6

- 修复级联字典的问题
- 修复动态改变 option 验证未消失的问题


### 1.4.8
#### 2018-12-6

- 删除 crud 组件的 page 字段，自动根据分页参数判断是否显示
- 修复 crud 组件编辑时验证不拦截问题
- 新增 crud 组件自定义菜单返回属性(size,type)
- 新增 crud 组件行编辑可以配置验证规则和批量行操作 [demo](/#/component/crud-edit)
- 修复 form 组件多级联动加载字典不显示问题
- 新增 form 自定义组件返回属性(disabled，size)
- 修复 tabs 组件和 steps 组件自定义卡槽失效问题


### 1.4.7
#### 2018-12-4

- 优化了 crud 中 page 分页
- 修复调用 initVal 报错问题


### 1.4.6-beta1
#### 2018-11-30

- 修复 crud 组件中 validate 方法问题
- 修复 crud 组件新增 dataType 属性导致翻译失效的问题
- 新增 upload 组件 crud 表格图片展示[demo](/#/component/crud-img)


### 1.4.5
#### 2018-11-29

- 全部数组类型的组件可以设置 dataType 为 string 专成字符串数据类型（checkbox / tree / cascader / select 多选）
- 全模块数据转换功能（传入错误的数据类型，自动专成正确的类型）
- 修复了 tree 组件重新打开后不清空问题
- 修复 form 组件的级联赋值数据不刷新问题


### 1.4.4
#### 2018-11-28

- 新增全局控制属性 menuType，可控制 crud 组件操作栏的按钮类型[详情](/#/component/quickstart)和[crudDemo](/#/component/crud)
- 新增 form 组件的 validate 方法，可以像常规一样\$refs['form'].validate 操作[demo](/#/component/form)
- 新增 form 组件的验证辅助图标


### 1.4.3
#### 2018-11-23

- 新增 upload 组件 upload-before 和 upload-after 中回调 loading（终止操作的方法）
- 修复 tree 组件新增和编辑时表单自动激活验证问题
- 新增 tree 的 addBtn 搜索栏旁边的卡槽
- 修复 crud 组件 clearable 和 size 问题
- 新增 searchPlaceholder 和 searchClearable 的搜索属性
- 新增 crud 组件 saveBtnTitle，updateBtnTitle，cancelBtnTitle 按钮属性
- 新增 crud 组件 cell-class-name，header-cell-class-name 变量，具体参考文档
- 修复 upload 组件 dataType 为 array 时的无法删除问题


### 1.4.2
#### 2018-11-20

- 优化了 tree 组件，支持 form 自定义以及更多灵活配置[demo](/#/component/tree)
- 调整了 form 组件的细微样式
- 调整 crud 组件中弹出框的宽度又 formWidth 变成 dialogWidth 属性，formWidth 为表单宽度

### 1.4.1

- 修复 crud 下菜单为 menu 时的大小问题
- 数据组件全部扩展添加 href 属性
- 新增 crud 的 dialogEscape 属性，是否可以通过点击 modal 关闭 Dialog 默认为 true
- 新增 crud 的 dialogClickModal 属性，是否可以通过按下 ESC 关闭 Dialog 默认为 true
- 新增 crud 的 dialogCloseBtn 属性，是否显示关闭按钮默认为 true
- 新增 crud 的 dialogModal 属性，是否需要遮罩层默认为 true
- 删除 crud 中弹窗全屏属性 formFullscreen，变更为 dialogFullscreen

### 1.4.0

- 新增全局控制属性，目前只有 size 属性，可控制全部有 size 属性的组件[详情](/#/component/quickstart)和[crudDemo](/#/component/crud)，[formDemo](/#/component/form)
- 优化加载 avue 的逻辑
- 新增所有组件可独立使用[详情](/#/component/quickstart)
- 修复 form-detail 组件中 value 监听问题
- 修复若干 bug

### 1.3.4

- [重大更新] 简化 crud 分页的逻辑，新增 on-load 接口[实例代码](/#/component/crud-page)
- 新增 upload 组件 dataType 数据的格式，和优化内部逻辑[实例代码](/#/component/form-upload)
- 修复 carousel 组件的样式问题导致不显示
- 修复 carousel 组件 title 配置问题，无 title 时不显示标题

### 1.3.3

- [重大更新] 新增一件填充模拟数据功能，方便测试，后期补充文档，具体看[实例代码](/#/component/form)
- 修复 upload 组件上传时图片累加限制问题
- 修复 switch 组件赋值‘||’引发得到问题
- 修复若干已知问题

### 1.3.2

- 新增 tree 多功能组件，menuBtn 为按钮菜单的卡槽返回 node 和 data，具体看[实例代码](/#/component/tree)
- 修复若干测试版本中的 bug
- 更新和完善了文档

### 1.3.1

- 去掉 avue-form-steps 组件更改为 avue-steps 组件，同时支持 form 和 crud 的选项卡[实例代码](/#/component/steps)
- 修复 form 表单清空方法无效问题
- 修复 crud 弹出框时 clearValidate 方法调用问题
- 修改核心深拷贝方法
- 新增 avue-steps 和 avue-tabs 文档(在他们 demo 的当前页最下边)
- 优化 carousel 组件不写 title 自动隐藏
- date-select 组件更改为 date-group 组件

### 1.3.0

- [重大更新] 根据 row 属性控制 form 表单可以任意排列组合,独占一行 [实例代码](/#/component/form)
- 修复了 crud 打开时清除表单验证的错误

### 1.2.7

- 修复字典方法其他问题
- 修复日期组件为空非正常显示问题
- 新增 json 展示组件[实例代码](/#/component/json)
- 修复跑马灯图片不显示问题和属性无效问题
- 修复 table-tree 死循环问题

### 1.2.4

- 同步了 tabs 组件中 crud 的各种卡槽
- 修复了核心方法字典多级深层级不查找问题
- 同步了 crud 中搜索组件的参数的问题
- 修复若干已知问题和缺陷

### 1.2.3

- 新增 type 为 tree 时 defaultExpandAll 属性是否展开树形结构，默认为 true
- 优化 type 为 password 时 crud 明文显示的问题
- 修复 type 为 tree 时搜索 props 配置问题
- 修复核心方法是字典匹配对象方法问题
- 去掉 avue-form-tabs 组件更改为 avue-tabs 组件，可以配置 form 和 crud 的选项卡[实例代码](/#/component/tabs)
- 新增 data-progress 进度条数据展示组件[实例代码](/#/component/data-progress)
- 新增 carousel 跑马灯工具类组件[实例代码](/#/component/carousel)

### 1.2.2

- crud 去掉 menuBtn 属性和 dropMenu 卡槽
- 新增 menuType 操作栏按钮类型，默认为 button（button / icon / menu / text），共四种类型
- 新增 menuBtn 卡槽，当 menuType 为 menu 时合并菜单扩展按钮
- 修复 type 为 tree 时 props 字典时的搜索问题
- 修复 type 为 tree 时多选点击闪退问题
- 新增 crud 组件表格头部 header 属性头部显隐，默认为 true
- 新增 type 为 tree 时 nodeClick 节点点击事件和 checked 勾选事件，都返回当前节点对象

### 1.2.1

- 版本打包错误

### 1.2.0

- 新增 type 为 input 组件 prepend 和 append 前后辅助文字框
- 重构了 type 为 upload 上传组件的整体逻辑
- 新增 type 为 upload 时 propsHttp 属性配置服务器返回数据的 name 和 url 属性
- 去掉了 sort 字段排序属性

### 1.1.22

- 新增 crud 组件 sort 字段排序显示
- 修复 form-steps 组件的不显示问题
- 修复 crud 弹窗背景层执行逻辑问题
- 修复 form-tabs 组件切换时不移除表单验证问题

### 1.1.21

- 新增 showSummary 显示表格合计
- 新增 sumColumnList 表格合计需要配置的字段（目前有 3 中可以为 sum 相加|avg 平均值|count 计数）
- 新增自定义合集方法逻辑 summaryMethod 返回 Function({ columns, data })
- 新增 spanMethod 行和列合并方法返回 Function({ row, column, rowIndex, columnIndex })
- 合计和行列合并例子[实例代码](/#/component/crud-sum)
- 新增 emptyText 空数据时显示的文本内容
- 新增表格无数据展示内容 empty 卡槽

### 1.1.20

- crud 组件中 form 自定义 slot 返回 row 和 index 扩展
- 修复 form 组件中 emptyBtn 属性的单词拼写错误
- 修复 crud 中搜索为 tree 时 parent 属性失效问题
- submitPostion 属性改为 menuPostion
- 新增 dateBtn 表格的日期控件
- 新增 date-change 日期控件回调的日期值，单个日期是字符串，范围日期为数组
- 新增 dateDefault 表格日期组件的默认值
- 更新了 form 组件文档

### 1.1.19

- 修复 type 为 tree 是 parent 属性的控制
- 新增 type 为 tree 时 defaultExpandAll 展开全部节点属性,默认为 true
- 新增 avue-crud-input 组件 type 为 tree 时的 node-click 方法返回当前点击的 data 和 done 关闭窗口
- 新增 beforeClose 和 beforeOpen 方法中返回的窗口类型 function(done,type)
- 新增 menuBtnTitle 属性当 menuBtn 为 true 时，按钮显示的文字提示，默认为功能
- 修复弹出框中样式的问题和调整 menuBtn 的样式

### 1.1.18

- 日期范围占位符 startPlaceholder 和 endPlaceholder
- 新增 search-reset 清空搜索回调方法
- 新增 crud 组件和 form 组件的 clearValidate 清空表格钟表单验证
- 新增菜单按钮 dropMenu 操作栏卡槽
- 同步 ele 的 resetForm 清空表单和 clearValidate 清空验证规则的方法
- 表单的清空按钮 emptytBtn 显隐和 emptyText 清空按钮的文字 resetChange 清空回调方法
- 新增手机 type 为 phone 属性为输入手机号准备的组件
- 新增 emptySize 和 submitSize 表单按钮控制大小属性
- 去掉 crud 组件中中多余的字段数据

### 1.1.17

- 新增 options 字段进行第三方插件字段扩展

### 1.1.16

- 新增自定义表单规则演示代码[实例代码](/#/component/crud-rules)
- 新增时间戳如何配置演示代码[实例代码](/#/component/form-date)
- 新增时间格式化参考文档[参考文档](/#/component/crud-doc)
- 调整了 crud 日期组件的位置
- 调整了组件的 change 和 click 事件
- 废除了搜索的栅列 searchSpan 和 searchMenuSpan 属性
- 新增 labelPosition 表单标题文字位置属性
- 新增表单全局 size(medium / small / mini)和 disabled(true / false)属性
- 新增 title 属性表格的标题
- 新增 menuBtn 表格合并菜单按钮默认为 false

### 1.1.15

- 修复 form 组件的 visdiplay 和 disabled 紧急 bug

### 1.1.14

- 新增组件 readonly 只读属性配置
- 新增 crud 中 view,edit,add 时打开表单是否可见全局控制显隐 visdiplay 属性和 disabled 禁止编辑属性
- 去掉了 ueditor 富文本编辑器组件，改为第三方插件[avue-plugin-ueditor](https://gitee.com/smallweigit/avue-plugin-ueditor)
- 修复了 avue-tree-table 子节点树的样式显示问题
- 新增 searchSpan 控制搜索表单的栅列,默认为 6
- 新增 searchMenuSpan 搜索按钮的栅列,默认为 4
- 新增 searchMenu 自定义菜单搜索卡槽
- form-detail 组件支持本地字典和网络字典配置，详情参考 form 和 crud 组件配置
- 完善了 avue 第三方插件开发规范
- 移除 moment 包换成轻量级的 dayjs 插件包
- crud 新增编辑和新增独立控制按钮等待的事件 loading 和关闭表单的事件 done (form,index,done,loading)
- avue-cli 快速开发脚手架支持 ie10+浏览器,ie9css 部分暂不支持，后期添加[avue-cli1.x](https://gitee.com/smallweigit/avue) / [avue-cli2.x](https://git.avue.top/avue/avue-cli)
