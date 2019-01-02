<script>
export default {
  data(){
    return {
       form:{
          text1:'文本1',
          text2:'文本2',
       },
       option:{
          column: [{
            label: '内容1',
            prop: 'text1',
            tip:'我是一个默认提示语',
          },{
            label: '内容2',
            prop: 'text2',
            tip:'我是一个左边提示语',
            tipPlacement:'left',
          }]
       }
    }
  }
}
</script>

# 辅助提示语

填写表单鼠标放入填写区域时对应的辅助提示语

## 普通用法
:::demo  `tip`为提示的内容,`tipPlacement`为提示语的方向，默认为`bottom`
```html
<avue-form :option="option" v-model="form"></avue-form>
<script>
export default {
  data(){
    return {
       form:{
          text1:'文本1',
          text2:'文本2'
       },
       option:{
          column: [{
            label: '内容1',
            prop: 'text1',
            tip:'我是一个默认提示语',
          },{
            label: '内容2',
            prop: 'text2',
            tip:'我是一个左边提示语',
            tipPlacement:'left',
          }]
       }
    }
  }
}
</script>

```
:::
