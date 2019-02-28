<script>
export default {
 data() {
      return {
         type:0,
         item:{},
         form:{},
         data:[
            {
              username:'smallwei',
              password:123456,
              type:123
            },
            {
              username:'avue',
              password:123456,
              type:123
            }
         ],
         option:{
           column: [{
              label: '用户信息',
              prop: 'user',
              icon: 'el-icon-date',
              option: {
                  page:false,
                  menuWidth:300,
                  column: [{
                          label: "用户名",
                          prop: "username",
                          rules: [{
                              required: true,
                              message: "请输入用户名",
                              trigger: "blur"
                          }],
                      },{
                          label: "密码",
                          prop: "password",
                          type:'password'
                      },{
                          label: "自定义字段",
                          prop: "type",
                          type:'type',
                          solt:true
                      }
                  ]
              }
          }, {
              label: '商户信息',
              prop: 'shanghu',
              icon: 'el-icon-picture',
              option: {
                  submitText: '完成',
                  column: [{
                      label: "商户名称",
                      prop: "owName",
                      rules: [{
                          required: true,
                          message: "请输入商户名称",
                          trigger: "blur"
                      }],
                  }]
              }
          }, {
              label: '微信信息',
              prop: 'weixin',
              icon: 'el-icon-picture-outline',
              option: {
                  submitText: '完成',
                  column: [{
                      label: "微信名称",
                      prop: "weixinName",
                      rules: [{
                          required: true,
                          message: "请输入微信名称",
                          trigger: "blur"
                      }],
                  }]
              }
          }, {
              label: 'QQ信息',
              prop: 'qq',
              disabled: true,
              icon: 'el-icon-share',
              option: {
                  submitText: '完成',
                  column: [{
                      label: "QQ名称",
                      prop: "qqName",
                      rules: [{
                          required: true,
                          message: "请输入QQ名称",
                          trigger: "blur"
                      }],
                  }]
              }
          }]
        }
      }
    },  
    methods: {
     change (item) {
       this.type = item.prop
       this.item = item;
       this.$message.success('当前选项卡对象'+JSON.stringify(item))
     },
    }
}
</script>

<style>

</style>

## 选项卡

### 例子

:::demo 

```html
<avue-tabs :option="option" @change="change">
  <template slot="before">
    <el-tag>卡槽头部{{type}}</el-tag>
  </template>
  <template slot="user">
    <avue-crud :option="item.option" :data="data"></avue-crud>
  </template>
  <template slot="shanghu">
    <avue-form :option="item.option" v-model="form"></avue-form>
  </template>
  <template slot="weixin">
    <avue-form :option="item.option" v-model="form"></avue-form>
  </template>
  <template slot="qq">
    <avue-form :option="item.option" v-model="form"></avue-form>
  </template>
  <template slot="after">
    <el-tag>卡槽尾部{{type}}</el-tag>
  </template>
</avue-tabs>

<script>
export default {
 data() {
      return {
         type:0,
         item:{},
         form:{},
         data:[
            {
              username:'smallwei',
              password:123456,
              type:123
            },
            {
              username:'avue',
              password:123456,
              type:123
            }
         ],
         option:{
           column: [{
              label: '用户信息',
              prop: 'user',
              icon: 'el-icon-date',
              option: {
                  page:false,
                  menuWidth:300,
                  column: [{
                          label: "用户名",
                          prop: "username",
                          rules: [{
                              required: true,
                              message: "请输入用户名",
                              trigger: "blur"
                          }],
                      },{
                          label: "密码",
                          prop: "password",
                          type:'password'
                      },{
                          label: "自定义字段",
                          prop: "type",
                          type:'type',
                          solt:true
                      }
                  ]
              }
          }, {
              label: '商户信息',
              prop: 'shanghu',
              icon: 'el-icon-picture',
              option: {
                  submitText: '完成',
                  column: [{
                      label: "商户名称",
                      prop: "owName",
                      rules: [{
                          required: true,
                          message: "请输入商户名称",
                          trigger: "blur"
                      }],
                  }]
              }
          }, {
              label: '微信信息',
              prop: 'weixin',
              icon: 'el-icon-picture-outline',
              option: {
                  submitText: '完成',
                  column: [{
                      label: "微信名称",
                      prop: "weixinName",
                      rules: [{
                          required: true,
                          message: "请输入微信名称",
                          trigger: "blur"
                      }],
                  }]
              }
          }, {
              label: 'QQ信息',
              prop: 'qq',
              disabled: true,
              icon: 'el-icon-share',
              option: {
                  submitText: '完成',
                  column: [{
                      label: "QQ名称",
                      prop: "qqName",
                      rules: [{
                          required: true,
                          message: "请输入QQ名称",
                          trigger: "blur"
                      }],
                  }]
              }
          }]
        }
      }
    },  
    methods: {
     change (item) {
       this.type = item.prop
       this.item = item;
       this.$message.success('当前选项卡对象'+JSON.stringify(item))
     },
    }
}
</script>
```

:::

### Avue-tabs Option Attributes

| 参数        | 说明                                                            | 类型   | 可选值      | 默认值 |
| ----------- | --------------------------------------------------------------- | ------ | ----------- | ------ |
| label       | 选项卡显示名称                                                  | String | -           | -      |
| prop        | 选项卡别名                                                      | String | -           | -      |
| description | 选项卡描述                                                      | String | -           | -      |
| icon        | 选项卡图标                                                      | String | -           | -      |

### Avue-tabs Events

| 事件名 | 说明                          | 参数 |
| ------ | ----------------------------- | ---- |
| change | 返回当前选项卡的整体对象      | item |


### Avue-tabs Methods

| 方法名 | 说明	 | 参数 |
| ------ | ----------------- |----------- |
|changeTabs|传入标签的序号即可切换|active|	

### Avue-tabs Scoped Slot

| name   | 说明                          |
| ------ | ----------------------------- |
| after  | 内容之前的卡槽                |
| brfore | 内容之后的卡槽                |
| 说明   | 每个选项卡的卡槽               |
