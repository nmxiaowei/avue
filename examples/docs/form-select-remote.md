<script>
const baseUrl = 'https://cli2.avue.top/api/area'
export default {
  data(){
    return {
       form:{
        province: '110000',
       },
       option: {
        column: [
          {
            label: '省份',
            prop: 'province',
            type: 'select',
            remote: true,
            props: {
              label: 'name',
              value: 'code'
            },
            dicUrl: `${baseUrl}/getProvince/{{key}}`,
            rules: [
              {
                required: true,
                message: '请选择省份',
                trigger: 'blur'
              }
            ]
          }
        ]
      }
    }
  },
  methods:{
    handleSubmit(form){
       this.$message.success(JSON.stringify(this.form))
    }
  }
}
</script>
# 远程搜索
当你的下拉框数据量很大的时候，你可以启动远程搜索

## 普通用法 
:::demo  配置`remote`为`true`即可开启远程搜索，其中`dicUrl`中`{{key}}`为用户输入的关键字,其他字典用法和参数保持不变,由于没有真实的接口，看控制台的network
```html
<avue-form :option="option" v-model="form" @submit="handleSubmit"></avue-form>
<script>
const baseUrl = 'https://cli2.avue.top/api/area'
export default {
  data(){
    return {
       form:{
        province: '110000',
       },
       option: {
        column: [
          {
            label: '省份',
            prop: 'province',
            type: 'select',
            remote: true,
            props: {
              label: 'name',
              value: 'code'
            },
            dicUrl: `${baseUrl}/getProvince/{{key}}`,
            rules: [
              {
                required: true,
                message: '请选择省份',
                trigger: 'blur'
              }
            ]
          }
        ]
      }
    }
  },
  methods:{
    handleSubmit(form){
       this.$message.success(JSON.stringify(this.form))
    }
  }
}
</script>

```
:::
