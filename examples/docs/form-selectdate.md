<script>
  export default {
    data() {
      return {
        obj:undefined,
      }
    },
    watch:{
        obj (value) {
          this.$message.success('当前数据'+value);
        },
    }
  }
</script>
<style>

</style>

## Form 模块



### 多功能日期选择控件

:::demo  
```html

<avue-select-date v-model="obj"></avue-select-date>

<script>

export default {
  data() {
     return {
        obj:undefined,
      }
  },
  watch:{
      obj (value) {
        this.$message.success('当前数据'+value);
      },
    }
}
</script>
```
:::

