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

## Form 模块



### 多功能日期选择控件

:::demo `default`设置为`true`，首次加载会激活`今天`按钮，并且调用`change`方法返回日期值
```html

<avue-date-select v-model="obj" :default="true" @change="handleChange"></avue-date-select>

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

