<script>
const baseUrl = 'https://cli2.avue.top/api/area'
export default {
    data() {
      return {
        form: {},
        option: {
          column: [
            {
              label: '省份',
              prop: 'province',
              type: 'select',
              props: {
                label: 'name',
                value: 'code'
              },
              typesolt: true,
              dicUrl: `${baseUrl}/getProvince`,
              tpyeformat(item, label, value) {
                return `值:${item[label]}-名:${item[value]}`
              },
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
# 选择框自定义
可以自定义下拉框的显示格式和回显的格式


## 普通用法 
:::demo  配置`typesolt`卡槽开启即可自定义下拉框的内容,`typeformat`配置回显的内容,但是你提交的值还是`value`并不会改变
```html
<avue-form :option="option" v-model="form" @submit="handleSubmit">
   <template slot="provinceType" slot-scope="{item,value,label}">
      <span>{{ item }}</span>
  </template>
</avue-form>
<script>
const baseUrl = 'https://cli2.avue.top/api/area'
export default {
    data() {
      return {
        form: {},
        option: {
          column: [
            {
              label: '省份',
              prop: 'province',
              type: 'select',
              props: {
                label: 'name',
                value: 'code'
              },
              typesolt: true,
              dicUrl: `${baseUrl}/getProvince`,
              tpyeformat(item, label, value) {
                return `值:${item[label]}-名:${item[value]}`
              },
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


# Attributes

|参数|说明|类型|可选值|默认值|
|----------------|------------------------------------------------------------------------------------------------------------------|---------------|---------------------------|--------|
|typesolt|子组件自定义|Boolean|true/false|false|


# Scoped Slot

|name|说明|
|---|-----|
|列表单的名称+Type(nameType)|表单自定义列的内容，参数为{item,label,value}|