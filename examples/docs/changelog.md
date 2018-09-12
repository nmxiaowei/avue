## 更新日志

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