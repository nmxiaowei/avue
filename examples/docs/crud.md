<script>
  export default {
    data() {
      return {
        data1: [
          {
            name:'张三',
            sex:'男'
          }, {
            name:'李四',
            sex:'女'
          }
        ],
        option1:{
          page:false,
          column:[
             {
              label:'姓名',
              prop:'name'
            },
            {
              label:'性别',
              prop:'sex'
            }
          ]
        },
      };
    },
    methods: {
    }
  };
</script>

<style>

</style>

## Crud 表格

通过json快速生成crud表格

### 基础用法

:::demo 要设置cloumn列的数据
```html
<avue-crud :data="data1" :option="option1"></avue-crud>

<script>
export default {
 data() {
      return {
        data1: [
          {
            name:'张三',
            sex:'男'
          }, {
            name:'李四',
            sex:'女'
          }
        ],
        option1:{
          page:false,
          column:[
             {
              label:'姓名',
              prop:'name'
            },
            {
              label:'性别',
              prop:'sex'
            }
          ]
        },
      };
    },
}
</script>
```
:::



### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| **title** | 标题，**必选参数** | string | — | — |
| type | 主题 | string | success/warning/info/error | info |
| description | 辅助性文字。也可通过默认 slot 传入 | string | — | — |
| closable | 是否可关闭 | boolean | — | true |
| center | 文字是否居中 | boolean | — | true |
| close-text | 关闭按钮自定义文本 | string | — | — |
| show-icon | 是否显示图标 | boolean | — | false |


### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| close | 关闭alert时触发的事件 | — |