#### 1.4.8

 **crud and from**
 - 修复：v-model 双向model数据绑定问题
 - 修复：用户管理 编辑器光标位置BUG，始终在第一行，[#IL2N1](https://gitee.com/smallweigit/avue/issues/IL2N1)
 - 修复：ueditor控件超出行数没有滚动条，[#IKZAR](https://gitee.com/smallweigit/avue/issues/IKZAR)
 - 修复：点击搜索栏的 清除按钮数据类型报错，[#IKWSY](https://gitee.com/smallweigit/avue/issues/IKWSY)

#### 1.4.7

 **crud and from**
 - 优化：更换了更加稳定的富文本编辑器
 - 修复：用户管理 ueditor属性共用，[#IKWT2](https://gitee.com/smallweigit/avue/issues/IKWT2)
 - 修复：点击搜索栏的 清除按钮，[#IKWSY](https://gitee.com/smallweigit/avue/issues/IKWSY)

 **其他**
 - 新增：加入炫彩皮肤主题
 - 新增：card容器组件
 - 优化：整体架构调整和优化
 - 优化：加入token超时自动刷新token机制
 
 **说明**
 准备推出2.0大版本，升级crud和form组件
 
#### 1.4.6

 **crud and from**
- 新增：props（select，radio，checkbox，cascader,switch）配置选项，对象可以制定字典中key-value的值，详情见文档
- 新增：type=number时step步长设置，默认为1
- 新增：type=number时controlsPosition 按钮的位置，默认为上下，可选值:right,top，
- 新增：type=switch时的宽度，width属性
- 新增：type=cascader时clearable是否支持清空选项
- 新增：type=cascader时ecxpandTrigger,次级菜单的展开方式,默认为hover，可选值click，hover
- 新增：type=cascader时showAllLevels,输入框中是否显示选中值的完整路径，默认为true
- 新增：type=cascader时filterable,是否可搜索选项	，默认为false
- 新增：type=cascader时separator,选项分隔符	，默认为斜杠
- 新增：type=chckbox时min和max可被勾选的 checkbox 的最小和最大数量
- 新增：type=checkbox || radio 时border是否显示边框，默认为false
- 优化：优化多种函数合并处理，mixins公用


#### 1.4.5

 **crud and from**
- 修复：控件中高度写死，不固定问题
- 优化：dicUrl接口中字典 多层data的处理问题，降级处理

 **crud**
- 新增：addBtn属性控制crud中新增按钮默认为true
- 新增：menuLeft和menuRight自定义crud表头左右菜单卡槽
- 新增：row-class-name自定义class名事件

 **table-tree**
- 新增：stripe表格条纹
- 新增：row-class-name自定义class名事件


#### 1.4.4

 **crud and from**
- 优化：字典不用在option中申明合集，自动匹配clumons中的字典值
- 优化：部分组件代码优化
- 优化：dicData和dicUrl，本地字典和网络字典的合并

 **table-tree**
- 新增：支持自定义dom和点击事件
- 新增：avue-table-tree全局表格树组件
- 新增：表格树演示demo

 **其他**
- 新增：引导页demo使用例子
- 新增：视屏同步更新
- 说明：感谢vue-element-admin提供table-tree组件思路

#### 1.4.3

 **crud and from**
- 优化：组件新增了placeholder属性，默认为label，[#IKJ6L](https://gitee.com/smallweigit/avue/issues/IKJ6L)
- 优化：type属性设置为date、datetime、time的时候size的属性无效 type属性设置time时无法选择时间，[#IKHI9](https://gitee.com/smallweigit/avue/issues/IKHI9)
- 新增：type的属性switch开关控件
- 新增：type属性为select时multiple为true支持多选
- 新增：refreshChange刷新表格数据回调函数
- 新增：refreshBtn开关刷新按钮显隐属性，默认true
- 新增：showClomnuBtn动态列显隐属性，默认true
- 新增：表格功能自定义com slot为headerMenu
- 优化：部分组件代码

#### 1.4.2

 **crud**
- 修复：先编辑，再点新增数据没清除，[#12](https://github.com/nmxiaowei/avue/issues/12)
- 修复：checkbox在表格循环中，如果字典里不存在重复出现整个数组，[#14](https://github.com/nmxiaowei/avue/pull/14)

 **其他**
- 修复：锁屏解锁无法跳转问题，[#13](https://github.com/nmxiaowei/avue/issues/13)
- 修复：左侧菜单最小化，左侧最下面出现滚动条，[#11](https://github.com/nmxiaowei/avue/issues/11)
- 修复：左侧菜单第一次点击，部分菜单字体样式没有激活状态，[#10](https://github.com/nmxiaowei/avue/issues/10)

#### 1.4.1

 **crud**
- 新增：precision数字输入框精度设置
- 修复：crud表单关闭数据初始化

 **form**
- 新增：precision数字输入框精度设置

 **其他**
- 新增：whiteList不加入tag标签白名单
- 升级：UI组件element-ui——2.4.0
- 优化：路由正则匹配表达式
- 优化：iframe组件的自适应高度
- 新增：路由分模块
- 新增：环境变量展示页面/dev/index
- 新增：本地持久化数据操作/stote/index
- 新增：剪切板实例/clipboard/index

#### 1.4.0

 **crud**
- 新增：search属性是否有搜索框 默认false,
- 新增：searchChange搜索回调函数，返回搜索的参数
- 新增：type等于password密码属性
- 新增：searchSize 搜索控件的大小

 **form**
- 新增：type等于password密码属性

 **其他**
 - 优化：部分组件逻辑
 - 新增：crud系列视频

#### 1.3.8

 **crud**
- 新增：type=datetime的时间日期组件
- 新增：type=ueditor富文本变价组件
- 新增：height:auto,自适应属性
- 新增：calcHeight表格高度差值属性
- 新增：formWidth表单弹出框宽度自定义
- 新增：indexLabel自定义序号的标题默认#
- 新增：formHeight表单中每一行的高度
- 说明：具体例子看demo和文档
- 优化：优化部分底层组建

 **form**
- 新增：type=datetime的时间日期组件
- 新增：type=ueditor富文本变价组件


 **其他**
- 优化：优化temp生成器模板

#### 1.3.7

 **crud**
- 新增：dicUrl字段服务器地址
- 新增：dicData模拟字典的数据
- 新增：formatter格式化函数
- 新增：valueDefault默认值
- 新增：valueFormat时间值格式化
- 新增：format时间格式化
- 新增：time控件（type字段）
- 说明：具体例子看demo和文档
- 优化：字典匹配器

 **form**
- 新增：dicUrl字段服务器地址
- 新增：dicData模拟字典的数据
- 新增：formatter格式化函数
- 新增：valueDefault默认值
- 新增：valueFormat时间值格式化
- 新增：format时间格式化
- 新增：time控件（type字段）
- 说明：具体例子看demo和文档
- 优化：字典匹配器

 **其他**
- 新增：temp模板生成器 npm run temp
- 说明：新增加的动态路由和模板已详情看pig-ui


#### 1.3.6

 **其他**
- 新增：website.js全局网站信息配置文件，详情见/page/const/website.js
- 新增：logo配置可配置文字(单文字)或者logo(40*40)
- 修复：小屏幕下左侧导航栏遮挡问题
- 修改：登陆页样式微调
- 优化：crud演示页面

#### 1.3.5

 **crud**
- 修复：阻止按钮的默认点击事件和冒泡事件
- 修复：表单点击其他关闭触发点击事件

 **其他**
- 修复：控制台包未知错误
- 修改：crud demo的loading
- 调整：项目脚手架结构(dev_调试,build_生产,test_测试)
- 新增:新增大量数据展示组件
 - data-card(卡片展示)
 - data-display(大数字展示)
 - data-icons(图表展示)
 - data-tabs(选项卡展示)


#### 1.3.4

 **其他**
- 修复：部分element样式问题
- 修改：调整了主页样式

#### 1.3.3

 **其他**
- 新增：皮肤本地化持久存储
- 修改：其他已知bug

#### 1.3.2

 **crud**
- 新增：page-size 页码条数回调函数
- 新增：sort-change 排序后的回调函数

 **其他** 
- 修改：修改登录页面模板组件

#### 1.3.1

 **其他** 
- 修改：修改登录页面模板组件

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
