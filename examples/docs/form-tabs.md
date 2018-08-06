<script>
export default {
 data() {
      return {
         data:{},
         option:{
           column: [{
              label: '用户信息',
              prop: 'user',
              icon: 'el-icon-date',
              option: {
                  submitText: '完成',
                  column: [{
                          label: "用户名",
                          prop: "username",
                          rules: [{
                              required: true,
                              message: "请输入用户名",
                              trigger: "blur"
                          }],
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
     submit(){
       this.$message.success('当前数据'+JSON.stringify(this.form))
     },
     change (item) {
         this.$message.success('当前选项卡对象'+JSON.stringify(item.prop))
     },
    }
}
</script>

<style>

</style>

## Form 模块


### 选项卡

:::demo 
```html
<avue-form-tabs v-model="data" :option="option" @submit="submit" @change="change"></avue-form-tabs>

<script>
export default {
 data() {
      return {
         data:{},
         option:{
           column: [{
              label: '用户信息',
              prop: 'user',
              icon: 'el-icon-date',
              option: {
                  submitText: '完成',
                  column: [{
                          label: "用户名",
                          prop: "username",
                          rules: [{
                              required: true,
                              message: "请输入用户名",
                              trigger: "blur"
                          }],
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
     submit(){
       this.$message.success('当前数据'+JSON.stringify(this.form))
     },
     change (item) {
        this.$message.success('当前选项卡对象'+JSON.stringify(item.prop))
     },
    }
}
</script>
```
:::


