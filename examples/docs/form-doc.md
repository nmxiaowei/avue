## FORM 文档

### Avue-form Attributes

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| option | 组件配置属性，详情见下面Option属性 | Object | — | — |
| upload-before |  图片上传前的回调,会暂停图片上传 function(file,done)，done 用于继续图片上传|	Function | — | — |
| upload-after |  图片上传后的回调, function(res,done)，done 用于结束操作|	Function | — | — |

### Avue-form Option Attributes

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| labelWidth | 表单的label宽度 | String | -  | 80 |
| labelPosition | 表单的label位置 | String | left / top / right  | left |
| menuPostion | 按钮的位置 | String | left / center / right  | center |
| size | 表单全局控件的大小 | String | medium / mini / small | medium |
| props | 字典的全局key配置 | Object | - | - |
| menuBtn | 是否显示按钮 | Boolean | true / false  | true |
| submitBtn | 提交按钮 | Boolean | true / false  | true |
| submitSize | 提交按钮的大小 | String | medium / mini / small | medium |
| submitText | 提交按钮的文字 | String | - | 提 交 |
| empiyBtn | 清空按钮 | Boolean | true / false  | true |
| empiySize | 清空按钮的大小 | String | medium / mini / small | medium |
| empiyText | 清空按钮的文字 | String | - | 清 空 |

### Avue-crud Type Attributes

:::tip
这是type属性可以配置的组件，当然你也可以自定义，参考第三方组件导入
:::

| 参数      | 类型          |
|---------- |-------------- |
| input | 输入框 |
| select | 选择框 |
| radio | 单选框 |
| phone | 手机号输入框 |
| checkbox | 多选框 |
| textarea | 文本框 |
| cascader | 级联框 |
| date | 日期框 |
| time | 时间框 |
| datetime | 日期时间框 |
| daterange | 日期范围 |
| timerange | 时间范围 |
| datetimerange | 日期时间范围 |
| week | 周 |
| month | 月 |
| year | 年 |
| dates | 多个日期 |
| ueditor | 富文本编辑器 |
| password | 密码框 |
| switch | 开关框 |
| tree | 树框 |

###  Avue-crud format and valueFormat Attributes

使用`format`指定输入框的格式；使用`valueFormat`指定绑定值的格式。

默认情况下，组件接受并返回`Date`对象。以下为可用的格式化字串，以 UTC 2017年1月2日 03:04:05 为例：

:::warning
请注意大小写
:::

| 格式 | 含义 | 备注 | 举例 |
|------|------|------|------|------|
| `yyyy` | 年 | | 2017 |
| `M`  | 月 | 不补0 | 1 |
| `MM` | 月 | | 01 |
| `W`  | 周 | 仅周选择器的 `format` 可用；不补0 | 1 |
| `WW` | 周 | 仅周选择器的 `format` 可用 | 01 |
| `d`  | 日 | 不补0 | 2 |
| `dd` | 日 | | 02 |
| `H`  | 小时 | 24小时制；不补0 | 3 |
| `HH` | 小时 | 24小时制 | 03 |
| `h`  | 小时 | 12小时制，须和 `A` 或 `a` 使用；不补0 | 3 |
| `hh` | 小时 | 12小时制，须和 `A` 或 `a` 使用 | 03 |
| `m`  | 分钟 | 不补0 | 4 |
| `mm` | 分钟 | | 04 |
| `s`  | 秒 | 不补0 | 5 |
| `ss` | 秒 | | 05 |
| `A`  | AM/PM | 仅 `format` 可用，大写 | AM |
| `a`  | am/pm | 仅 `format` 可用，小写 | am |
| `timestamp` | JS时间戳 | 仅 `value-format` 可用；组件绑定值为`number`类型 | 1483326245000 |

### Avue-crud Column Attributes

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| label | 列名称 | String | — | - |
| prop | 列字段 | String | — | - |
| placeholder | 辅助语 | String | — | 请选择/请输入 + label |
| span | 表单栅列 | Number | - | 12 |
| readonly | 只读 | Boolean | true / false | false |
| type | 类型 | String | input / select / radio / checkbox  / textarea / cascader / date / time / datetime / daterange / timerange / datetimerange / week / month / year / dates / ueditor  / password / switch / tree / phone | input | - |
| disabled | 全部是否禁止 | Boolean | true / false | false |
| visdiplay | 全部是否可见 | Boolean | true / false | true |
| multiple | 多选（当type为select / tree 时） | Boolean | true / false | false |
| formsolt | 表单自定义 | Boolean | true / false | false |
| formWidth | 表单行高度 | Number / String | - | 50% |
| minRows | 最小行（当type为 ueditor / textarea） | Number | - | 2 |
| maxRows | 最大行（当type为 ueditor / textarea） | Number | - | 4 |
| valueDefault | 表单的默认值 | Number / String | - | - |
 Function(value, row, column) | - | - |
| format | 显示值时间格式（当type为 date / time / datetime / daterange timerange / datetimerange / week / month / year / dates  | - | - | - |
| valueFormat | 真实值的时间格式（当type为 date / time / datetime / daterange timerange / datetimerange / week / month / year / dates） | - | - | - |
| precision | 数字框输入精度（当type为 number 时） | Number | - | 2 |
| startPlaceholder | 日期范围开始占位符 | String | - | - |
| endPlaceholder | 日期范围结束占位符 | String | - | - |
| formHeight | 表单行高度 | Number | - | auto |
| clearable | 表单清空 | Boolean | true / false | false |
| size | 表单大小 | String | small / mini | small |
| rules | 表单规则,参考ele表单规则配置 | Object | - | - |
| formatter |  用来格式化内容  | Function(row, value , label, column) | - | - |

### Avue-crud Events

| 事件名 | 说明 | 参数 |
| ---- | ---- | ---- |
| submit | 表单提交事件 |   |
| reset-change | 重置表单回调 |   |

| 方法名 | 说明 | 参数 |
| ---- | ---- | ---- |
| clearValidate | 清空表格钟表单验证。 |  |
| resetForm | 清空表单数据 |  |
| submit | 提交表单数据 |  |

### Avue-crud Scoped Slot

| name | 说明 |
|------|--------|
| 列的名称 | 列自定义列的内容，参数为 { row, label, dic, $index } |
| 列表单的名称 | 表单自定义列的内容，参数为 { row, label, dic, $index } |
| menuForm | 表单操作按钮的自定义内容,参数为 { row, label, dic, $index } |
