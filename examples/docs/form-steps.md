<script>
export default {
 data() {
      return {
         data:{},
         option:{
            finishStatus: 'success',
            processStatus: 'process',
            space: undefined,
            switchBtn: true,
            column: [{
                label: '填写转账信息',
                prop: 'info',
                description: '用于信息的转账',
                option: {
                    submitText: '下一步',
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
                    submitText: '提交',
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
                    submitBtn: false,
                    column: []
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
        },
    }
}
</script>

<style>

</style>

## Form 模块



### 步骤条

:::demo 
```html
<avue-form-steps v-model="data" :option="option" @change="change" @submit="submit"></avue-form-steps>

<script>
export default {
 data() {
      return {
         data:{},
         option:{
            finishStatus: 'success',
            processStatus: 'process',
            space: undefined,
            switchBtn: true,
            column: [{
                label: '填写转账信息',
                prop: 'info',
                description: '用于信息的转账',
                option: {
                    submitText: '下一步',
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
                    submitText: '提交',
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
                    submitBtn: false,
                    column: []
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
        },
    }
}
</script>
```
:::


