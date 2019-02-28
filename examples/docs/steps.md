<script>
export default {
 data() {
      return {
         type:'',
         form:'',
         item:'',
         list: [
          {
            money:'12.00',
            date:'2018-06-06',
          }, {
            money:'233.00',
            date:'2018-06-06',
          }, {
            money:'2.00',
            date:'2018-06-06',
          }, {
            money:'3.00',
            date:'2018-06-06',
          }
        ],
         option:{
            switchBtn:true,
            column: [{
                label: '填写转账信息',
                prop: 'info',
                description: '用于信息的转账',
                option: {
                    formWidth:'40%',
                    submitBtn:false,
                    emptyBtn:false,
                    column: [
                        {
                            label: "转账金额",
                            span: 24,
                            prop: "money",
                            size: 'small',
                            prefixIcon: 'el-icon-tickets',
                            rules: [{
                                required: true,
                                message: "请输入转账金额",
                                trigger: "blur"
                            }]
                        }
                    ]
                }
            }, {
                label: '确认转账信息',
                prop: 'pwd',
                description: '为了安全再次确认转账',
                option: {
                    formWidth:'40%',
                    submitBtn:false,
                    emptyBtn:false,
                    column: [{
                        label: "支付密码",
                        prop: "password",
                        type: 'password',
                        size: 'small',
                        span: 24,
                        rules: [{
                            required: true,
                            message: "请输入支付密码",
                            trigger: "blur"
                        }],
                    }]
                }
            }, {
                label: '完成',
                prop: 'finsh',
                description: '转账信息完成',
                // icon: 'el-icon-picture-outline',
                option: {
                    page:false,
                    index:true,
                    title:'交易记录',
                    column: [
                      {
                        label:'金额',
                        prop:'money'
                      }, {
                        label:'时间',
                        prop:'date'
                      }
                    ]
                }
            }]
        }
      }
    },
    methods:{
       submit (next) {
         next();
       },
      change (item) {
         this.type = item.prop;
         this.item = item;
         this.$message.success('当前步骤数据'+JSON.stringify(item));
      },
    }
}
</script>

<style>

</style>

## 步骤条



### 例子

:::demo 
```html
<avue-steps  :option="option" @change="change" @submit="submit">
  <template slot="before">
    <el-tag>卡槽头部{{type}}</el-tag>
  </template>
  <template slot="info">
    <avue-form :option="item.option" v-model="form"></avue-form>
  </template>
  <template slot="pwd">
     <avue-form :option="item.option" v-model="form"></avue-form>
  </template>
  <template slot="finsh">
    <avue-crud :option="item.option" :data="list"></avue-crud>
  </template>
  <template slot="after">
   <el-tag>卡槽尾部{{type}}</el-tag>
  </template>
   <template slot="menu">
    <el-button type="primary">自定义按钮</el-button>
  </template>
</avue-steps>

<script>
export default {
 data() {
      return {
        type:'',
         form:'',
         item:'',
         list: [
          {
            money:'12.00',
            date:'2018-06-06',
          }, {
            money:'233.00',
            date:'2018-06-06',
          }, {
            money:'2.00',
            date:'2018-06-06',
          }, {
            money:'3.00',
            date:'2018-06-06',
          }
        ],
         option:{
            switchBtn:true,
            column: [{
                label: '填写转账信息',
                prop: 'info',
                description: '用于信息的转账',
                option: {
                    formWidth:'40%',
                    column: [
                        {
                            label: "转账金额",
                            span: 24,
                            prop: "money",
                            size: 'small',
                            prefixIcon: 'el-icon-tickets',
                            rules: [{
                                required: true,
                                message: "请输入转账金额",
                                trigger: "blur"
                            }]
                        }
                    ]
                }
            }, {
                label: '确认转账信息',
                prop: 'pwd',
                description: '为了安全再次确认转账',
                option: {
                    formWidth:'40%',
                    emptyBtn:false,
                    column: [{
                        label: "支付密码",
                        prop: "password",
                        type: 'password',
                        size: 'small',
                        span: 24,
                        rules: [{
                            required: true,
                            message: "请输入支付密码",
                            trigger: "blur"
                        }],
                    }]
                }
            }, {
                label: '完成',
                prop: 'finsh',
                description: '转账信息完成',
                // icon: 'el-icon-picture-outline',
                option: {
                    page:false,
                    index:true,
                    title:'交易记录',
                    column: [
                      {
                        label:'金额',
                        prop:'money'
                      }, {
                        label:'时间',
                        prop:'date'
                      }
                    ]
                }
            }]
        }
      }
    },
    methods:{
      submit (next) {
         next();
      },
      change (item) {
         this.type = item.prop;
         this.item = item;
         this.$message.success('当前步骤数据'+JSON.stringify(item));
      },
    }
}
</script>
```
:::


### Avue-steps Option Attributes

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| label | 步骤条显示名称 | String | -  | - |
| prop | 步骤条别名 | String | -  | - |
| description | 步骤条描述 | String | -  | - |
| icon | 步骤条图标 | String | -  | - |
| switchBtn | 步骤条是否可以点击 | Boolean | true / false  | false |
| simple | 步骤条是否为简约模式 | Boolean | true / false  | false |

### Avue-steps Events

| 事件名 | 说明 | 参数 |
| ---- | ---- | ---- |
| change | 返回当前步骤的整体对象 | item |
| submit | 点击下一步或提交的回调(当为最后一个步骤时，无next返回) |next |


### Avue-steps Scoped Slot

| name | 说明 |
|------|--------|
| after | 内容之前的卡槽 |
| brfore | 内容之后的卡槽 |
| 说明   | 每个选项卡的卡槽  |

