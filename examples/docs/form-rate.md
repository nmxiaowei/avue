<script>
export default {
    data() {
      return {
        form:{},
        option:{
          labelWidth: 120,
          column: [{
              label: '非常一般的',
              prop: 'score1',
              type: 'rate',
          }, {
              label: '自定义辅助文字',
              prop: 'score2',
              type: 'rate',
              showText: true,
              texts: ['极差', '失望', '一般', '满意', '惊喜'],
          }, {
              label: '自定义颜色',
              prop: 'score3',
              type: 'rate',
              colors: ['#99A9BF', '#F7BA2A', '#FF9900']
          }, {
              label: '自定义图标',
              prop: 'score4',
              type: 'rate',
              iconClasses: ['el-icon-circle-close', 'el-icon-remove', 'el-icon-circle-plus'],
              voidIconClass: "el-icon-circle-plus-outline",
              colors: ['#99A9BF', '#F7BA2A', '#FF9900']
          }, {
              label: '自定义个数',
              prop: 'score',
              type: 'rate',
              span: 24,
              row: true,
              max: 40
          }]
        }
      };
    },
    methods: {
     submit(){
       this.$message.success('当前数据'+JSON.stringify(this.form))
     }
    }
}
</script>
<style>

</style>

## Form 模块



### 评价

:::demo  
```html
<avue-form v-model="form" :option="option" @submit="submit"></avue-form>

<script>
export default {
    data() {
      return {
        form:{},
        option:{
          labelWidth: 120,
          column: [{
              label: '非常一般的',
              prop: 'score1',
              type: 'rate',
          }, {
              label: '自定义辅助文字',
              prop: 'score2',
              type: 'rate',
              showText: true,
              texts: ['极差', '失望', '一般', '满意', '惊喜'],
          }, {
              label: '自定义颜色',
              prop: 'score3',
              type: 'rate',
              colors: ['#99A9BF', '#F7BA2A', '#FF9900']
          }, {
              label: '自定义图标',
              prop: 'score4',
              type: 'rate',
              iconClasses: ['el-icon-circle-close', 'el-icon-remove', 'el-icon-circle-plus'],
              voidIconClass: "el-icon-circle-plus-outline",
              colors: ['#99A9BF', '#F7BA2A', '#FF9900']
          }, {
              label: '自定义个数',
              prop: 'score',
              type: 'rate',
              span: 24,
              row: true,
              max: 40
          }]
        }
      };
    },
    methods: {
     submit(){
       this.$message.success('当前数据'+JSON.stringify(this.form))
     }
    }
}
</script>
```
:::