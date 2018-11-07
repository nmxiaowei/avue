<script>
export default {
 data() {
      return {
         data:{},
         type:'',
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
                type:'crud',
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
       submit (form, next) {
         this.$message.success('当前数据'+JSON.stringify(form));
         next();
       },
      change (item) {
        this.type = item.prop;
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
<avue-steps v-model="data"  :data="list" :option="option" @change="change" @submit="submit">
  <template slot="menuForm">
    <el-button v-if="type==='finsh'">自定义按钮</el-button>
  </template>
  <template slot="before">
    <el-tag>卡槽头部{{type}}</el-tag>
  </template>
  <template slot="after">
   <el-tag>卡槽尾部{{type}}</el-tag>
  </template>
</avue-steps>

<script>
export default {
 data() {
      return {
         data:{},
         type:'',
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
            switchBtn,
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
                type:'crud',
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
      submit (form, next) {
         this.$message.success('当前数据'+JSON.stringify(form));
         next();
      },
      change (item) {
         this.type = item.prop;
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
| type | 步骤条内容类型 | String | form / crud  | form |
| breakBtn | 步骤条返回按钮 | Boolean | true / false  | true |
| 说明 | crud和form的配置都可以使用，要配置在每一个步骤条option里面 |

### Avue-steps Events

| 事件名 | 说明 | 参数 |
| ---- | ---- | ---- |
| change | 返回当前步骤的整体对象 | form |
| submit | 点击下一步或提交的回调(当为最后一个步骤时，无next返回) | form,next |
| 说明 | crud和form的方法都可以使用 |

### Avue-steps Scoped Slot

| name | 说明 |
|------|--------|
| after | 内容之前的卡槽 |
| brfore | 内容之后的卡槽 |
| 说明 | crud和form的卡槽都可以使用 |

