<script>

export default {
  data() {
     return {
        obj:undefined,
      }
  },
  methods:{
      handleChange (value) {
        this.$message.success('当前数据'+value);
      },
  }
}
</script>
<style>

</style>

## 日期选择器



### 例子

:::demo `default`设置为`true`，首次加载会激活`今天`按钮，并且调用`change`方法返回日期值
```html

<avue-date-group v-model="obj" :default="true" @change="handleChange"></avue-date-group>

<script>

export default {
  data() {
     return {
        obj:undefined,
      }
  },
  methods:{
      handleChange (value) {
        this.$message.success('当前数据'+value);
      },
  }
}
</script>
```
:::

### Avue-date-select Option Attributes

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| default | 首次打开是否默认选中今日日期 | Boolean | true / false  | false |

### Avue-date-select Events

| 事件名 | 说明 | 参数 |
| ---- | ---- | ---- |
| change | 返回当前日期，如果范围日期为数组，其他为字符串 | date |

