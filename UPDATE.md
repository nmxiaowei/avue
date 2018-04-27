#### 1.3.0

 **其他** 
- 修改：调整了部分目录结构
- 修改：更换人性化的UI界面
- 新增：基本布局basicContainer组件


#### 1.2.2

 **crud** 
- 新增：editVisdiplay和addVisdiplay，表单新增和编辑的隐藏控制
- 新增：editDisabled表单编辑时候禁止
- 新增：maxHeight表格最大高度
- 新增：defaultSort默认排序字段,例如{prop: 'date', order: 'descending'}
- 新增：minWidth列的最小宽度
- 新增：sortable列表排序
- 新增：stripe斑马条纹
- 新增：showHeader是否显示表头
- 新增：formatter自定义表单显示格式
- 删除：visdiplay和disabled列属性
- 修改：调整演示table的演示demo

 **路由**
- 修改：keepAlive路由缓存机制默认为false

 **其他**
- 加入主题颜色切换组件
- 修复：top.scss样式

#### 1.2.1

 **crud** 
- 新增：表格expand展开属性
- 新增：menuAlign操作栏对其方式
- 新增：列的align表格内容对其方式
- 新增：列的headAlign表格头部内容对其方式
- 修复：修复表格新增时候验证规则报错，在编辑窗口不消失问题

 **路由**
- 新增：keepAlive路由缓存机制

 **其他**
- 扩展在线demo

#### 1.2.0

**crud**
- 优化：优化crud生成器

**目录结构**
- 新增：独立打包avue.min.js单独使用
- 新增：avue--crud-html的在线演示demo
- 优化：调整目录结构，增加lib目录
- 删除：去掉了avue后台框架中crud和form组件的源码

#### 1.1.0

**目录结构** 
- 调整：crud组件和form组件独立出来，其他项目有可以直接引用
- 调整：将avue项目中crud组件和部分子组件以及form组件设置为全局变量
- 调整：合并form表单和crud组件的编辑表单，公用一个form组件底层
- 说明：源码位于packages包中