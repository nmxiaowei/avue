## 更新日志

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