<script>
export default {
 data() {
      return {
         type:0,
         obj:{},
         data:[
            {
              username:'smallwei',
              password:123456
            },
            {
              username:'avue',
              password:123456
            }
         ],
         option:{
           column: [{
              label: '用户信息',
              prop: 'user',
              icon: 'el-icon-date',
              type:'crud',
              option: {
                  page:false,
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
     rowSave(row,done,loading){
        this.$message.success('当前数据'+JSON.stringify(this.obj))
        done();
     },
     rowUpdate(row,index,done,loading){
        this.$message.success('当前数据'+JSON.stringify(this.obj))
        done();
     },
     rowDel(row,index){
        this.$message.success('删除的数据'+JSON.stringify(this.obj))
     },
     submit(){
       this.$message.success('当前数据'+JSON.stringify(this.obj))
     },
     change (item) {
       this.type = item.prop
       this.$message.success('当前选项卡对象'+JSON.stringify(item.prop))
     },
    }
}
</script>

<style>

</style>

## 选项卡


### 例子

:::demo 参考例子中的数据即可，其中type为类型（crud/form）,默认为form,crud和form的方法在这里通用,`before`和`after`俩个卡槽位置
```html
<avue-tabs v-model="obj" :data="data" :option="option" @row-save="rowSave" @row-update="rowUpdate" @row-del="rowDel" @submit="submit" @change="change">
  <template slot="before">
    <el-tag>卡槽头部{{type}}</el-tag>
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
         data:[
            {
              username:'smallwei',
              password:123456
            },
            {
              username:'avue',
              password:123456
            }
         ],
         obj:{},
         option:{
           column: [{
              label: '用户信息',
              prop: 'user',
              icon: 'el-icon-date',
              type:'crud',
              option: {,
                  page:false,
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
     rowSave(row,done,loading){
        this.$message.success('当前数据'+JSON.stringify(this.obj))
        done();
     },
     rowUpdate(row,index,done,loading){
        this.$message.success('当前数据'+JSON.stringify(this.obj))
        done();
     },
     rowDel(row,index){
        this.$message.success('删除的数据'+JSON.stringify(this.obj))
     },
     submit(){
       this.$message.success('当前数据'+JSON.stringify(this.obj))
     },
     change (item) {
       this.type = item.prop;
       this.$message.success('当前选项卡对象'+JSON.stringify(item.prop))
     },
    }
}
</script>
```
:::


