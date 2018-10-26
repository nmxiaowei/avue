<script>
    const DIC = [{
        value: 'zhinan',
        name: '指南',
        children: [{
            value: 'shejiyuanze',
            name: '设计原则',
            children: [{
                value: 'yizhi',
                name: '一致'
            }, {
                value: 'fankui',
                name: '反馈'
            }, {
                value: 'xiaolv',
                name: '效率'
            }, {
                value: 'kekong',
                name: '可控'
            }]
        }, {
            value: 'daohang',
            name: '导航',
            children: [{
                value: 'cexiangdaohang',
                name: '侧向导航'
            }, {
                value: 'dingbudaohang',
                name: '顶部导航'
            }]
        }]
    }, {
        value: 'zujian',
        name: '组件',
        children: [{
            value: 'basic',
            name: 'Basic',
            children: [{
                value: 'layout',
                name: 'Layout 布局'
            }, {
                value: 'color',
                name: 'Color 色彩'
            }, {
                value: 'typography',
                name: 'Typography 字体'
            }, {
                value: 'icon',
                name: 'Icon 图标'
            }, {
                value: 'button',
                name: 'Button 按钮'
            }]
        }, {
            value: 'form',
            name: 'Form',
            children: [{
                value: 'radio',
                name: 'Radio 单选框'
            }, {
                value: 'checkbox',
                name: 'Checkbox 多选框'
            }, {
                value: 'input',
                name: 'Input 输入框'
            }, {
                value: 'input-number',
                name: 'InputNumber 计数器'
            }, {
                value: 'select',
                name: 'Select 选择器'
            }, {
                value: 'cascader',
                name: 'Cascader 级联选择器'
            }, {
                value: 'switch',
                name: 'Switch 开关'
            }, {
                value: 'slider',
                name: 'Slider 滑块'
            }, {
                value: 'time-picker',
                name: 'TimePicker 时间选择器'
            }, {
                value: 'date-picker',
                name: 'DatePicker 日期选择器'
            }, {
                value: 'datetime-picker',
                name: 'DateTimePicker 日期时间选择器'
            }, {
                value: 'upload',
                name: 'Upload 上传'
            }, {
                value: 'rate',
                name: 'Rate 评分'
            }, {
                value: 'form',
                name: 'Form 表单'
            }]
        }, {
            value: 'data',
            name: 'Data',
            children: [{
                value: 'table',
                name: 'Table 表格'
            }, {
                value: 'tag',
                name: 'Tag 标签'
            }, {
                value: 'progress',
                name: 'Progress 进度条'
            }, {
                value: 'tree',
                name: 'Tree 树形控件'
            }, {
                value: 'pagination',
                name: 'Pagination 分页'
            }, {
                value: 'badge',
                name: 'Badge 标记'
            }]
        }, {
            value: 'notice',
            name: 'Notice',
            children: [{
                value: 'alert',
                name: 'Alert 警告'
            }, {
                value: 'loading',
                name: 'Loading 加载'
            }, {
                value: 'message',
                name: 'Message 消息提示'
            }, {
                value: 'message-box',
                name: 'MessageBox 弹框'
            }, {
                value: 'notification',
                name: 'Notification 通知'
            }]
        }, {
            value: 'navigation',
            name: 'Navigation',
            children: [{
                value: 'menu',
                name: 'NavMenu 导航菜单'
            }, {
                value: 'tabs',
                name: 'Tabs 标签页'
            }, {
                value: 'breadcrumb',
                name: 'Breadcrumb 面包屑'
            }, {
                value: 'dropdown',
                name: 'Dropdown 下拉菜单'
            }, {
                value: 'steps',
                name: 'Steps 步骤条'
            }]
        }, {
            value: 'others',
            name: 'Others',
            children: [{
                value: 'dialog',
                name: 'Dialog 对话框'
            }, {
                value: 'tooltip',
                name: 'Tooltip 文字提示'
            }, {
                value: 'popover',
                name: 'Popover 弹出框'
            }, {
                value: 'card',
                name: 'Card 卡片'
            }, {
                value: 'carousel',
                name: 'Carousel 走马灯'
            }, {
                value: 'collapse',
                name: 'Collapse 折叠面板'
            }]
        }]
    }, {
        value: 'ziyuan',
        name: '资源',
        children: [{
            value: 'axure',
            name: 'Axure Components'
        }, {
            value: 'sketch',
            name: 'Sketch Templates'
        }, {
            value: 'jiaohu',
            name: '组件交互文档'
        }]
    }];
export default {
    data() {
      return {
        form: {
          shenfeng1: "tag",
          shenfeng: ["tag", "progress", "tree", "axure", "sketch", "jiaohu"]
        },
        option:{
          column: [{
            name: '多选',
            prop: 'shenfeng',
            type: 'tree',
            multiple: true,
            dicData: DIC,
            props:{
              label:'name',
            },
            nodeClick:(data)=>{
              this.$message.success(JSON.stringify(data))
            },
            checked:(data)=>{
              this.$message.success(JSON.stringify(data))
            },
            rules: [{
                required: true,
                message: "请选择多选",
                trigger: "change"
            }]
          }, {
            name: '单选',
            prop: 'shenfeng1',
            type: 'tree',
            parent:false,
            dicData: DIC,
            props:{
              label:'name',
            },
            rules: [{
                required: true,
                message: "请选择单选",
                trigger: "change"
            }]
          }]
        }
      }
    },
    methods: {
     submit(){
       this.$message.success('当前数据'+JSON.stringify(this.form))
     }
    }
}
</script>
<style>

</style>

## Form 模块



### 树型

:::demo 可以设置`parent`属性来控制父类是否可以勾选，默认为`true`,`multiple`设置是否为多选
```html
<avue-form v-model="form" :option="option" @submit="submit"></avue-form>

<script>
    const DIC = [{
        value: 'zhinan',
        name: '指南',
        children: [{
            value: 'shejiyuanze',
            name: '设计原则',
            children: [{
                value: 'yizhi',
                name: '一致'
            }, {
                value: 'fankui',
                name: '反馈'
            }, {
                value: 'xiaolv',
                name: '效率'
            }, {
                value: 'kekong',
                name: '可控'
            }]
        }, {
            value: 'daohang',
            name: '导航',
            children: [{
                value: 'cexiangdaohang',
                name: '侧向导航'
            }, {
                value: 'dingbudaohang',
                name: '顶部导航'
            }]
        }]
    }, {
        value: 'zujian',
        name: '组件',
        children: [{
            value: 'basic',
            name: 'Basic',
            children: [{
                value: 'layout',
                name: 'Layout 布局'
            }, {
                value: 'color',
                name: 'Color 色彩'
            }, {
                value: 'typography',
                name: 'Typography 字体'
            }, {
                value: 'icon',
                name: 'Icon 图标'
            }, {
                value: 'button',
                name: 'Button 按钮'
            }]
        }, {
            value: 'form',
            name: 'Form',
            children: [{
                value: 'radio',
                name: 'Radio 单选框'
            }, {
                value: 'checkbox',
                name: 'Checkbox 多选框'
            }, {
                value: 'input',
                name: 'Input 输入框'
            }, {
                value: 'input-number',
                name: 'InputNumber 计数器'
            }, {
                value: 'select',
                name: 'Select 选择器'
            }, {
                value: 'cascader',
                name: 'Cascader 级联选择器'
            }, {
                value: 'switch',
                name: 'Switch 开关'
            }, {
                value: 'slider',
                name: 'Slider 滑块'
            }, {
                value: 'time-picker',
                name: 'TimePicker 时间选择器'
            }, {
                value: 'date-picker',
                name: 'DatePicker 日期选择器'
            }, {
                value: 'datetime-picker',
                name: 'DateTimePicker 日期时间选择器'
            }, {
                value: 'upload',
                name: 'Upload 上传'
            }, {
                value: 'rate',
                name: 'Rate 评分'
            }, {
                value: 'form',
                name: 'Form 表单'
            }]
        }, {
            value: 'data',
            name: 'Data',
            children: [{
                value: 'table',
                name: 'Table 表格'
            }, {
                value: 'tag',
                name: 'Tag 标签'
            }, {
                value: 'progress',
                name: 'Progress 进度条'
            }, {
                value: 'tree',
                name: 'Tree 树形控件'
            }, {
                value: 'pagination',
                name: 'Pagination 分页'
            }, {
                value: 'badge',
                name: 'Badge 标记'
            }]
        }, {
            value: 'notice',
            name: 'Notice',
            children: [{
                value: 'alert',
                name: 'Alert 警告'
            }, {
                value: 'loading',
                name: 'Loading 加载'
            }, {
                value: 'message',
                name: 'Message 消息提示'
            }, {
                value: 'message-box',
                name: 'MessageBox 弹框'
            }, {
                value: 'notification',
                name: 'Notification 通知'
            }]
        }, {
            value: 'navigation',
            name: 'Navigation',
            children: [{
                value: 'menu',
                name: 'NavMenu 导航菜单'
            }, {
                value: 'tabs',
                name: 'Tabs 标签页'
            }, {
                value: 'breadcrumb',
                name: 'Breadcrumb 面包屑'
            }, {
                value: 'dropdown',
                name: 'Dropdown 下拉菜单'
            }, {
                value: 'steps',
                name: 'Steps 步骤条'
            }]
        }, {
            value: 'others',
            name: 'Others',
            children: [{
                value: 'dialog',
                name: 'Dialog 对话框'
            }, {
                value: 'tooltip',
                name: 'Tooltip 文字提示'
            }, {
                value: 'popover',
                name: 'Popover 弹出框'
            }, {
                value: 'card',
                name: 'Card 卡片'
            }, {
                value: 'carousel',
                name: 'Carousel 走马灯'
            }, {
                value: 'collapse',
                name: 'Collapse 折叠面板'
            }]
        }]
    }, {
        value: 'ziyuan',
        name: '资源',
        children: [{
            value: 'axure',
            name: 'Axure Components'
        }, {
            value: 'sketch',
            name: 'Sketch Templates'
        }, {
            value: 'jiaohu',
            name: '组件交互文档'
        }]
    }];
export default {
    data() {
      return {
        form: {
          shenfeng1: "tag",
          shenfeng: ["tag", "progress", "tree", "axure", "sketch", "jiaohu"]
        },
        option:{
          column: [{
            name: '多选',
            prop: 'shenfeng',
            type: 'tree',
            multiple: true,
            dicData: DIC,
            props:{
              label:'name',
            },
            rules: [{
                required: true,
                message: "请选择多选",
                trigger: "change"
            }],
            nodeClick:(data)=>{
              this.$message.success(JSON.stringify(data))
            },
            checked:(data)=>{
              this.$message.success(JSON.stringify(data))
            }
          }, {
            name: '单选',
            prop: 'shenfeng1',
            type: 'tree',
            parent:false,
            dicData: DIC,
            props:{
              label:'name',
            },
            rules: [{
                required: true,
                message: "请选择单选",
                trigger: "change"
            }]
          }]
        }
      }
    },
    methods: {
     submit(){
       this.$message.success('当前数据'+JSON.stringify(this.form))
     }
    }
}
</script>
```
:::