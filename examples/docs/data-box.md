<script>
export default {
    data() {
      return {
        form:{},
        option:{
          data: [
            {
              title: '错误日志',
              count: 12332,
              icon: 'icon-cuowu',
              color: 'rgb(49, 180, 141)',
            },
            {
              title: '数据展示',
              count: 33,
              icon: 'icon-shujuzhanshi2',
              color: 'rgb(56, 161, 242)',
            },
            {
              title: '权限管理',
              count: 2223,
              icon: 'icon-jiaoseguanli',
              color: 'rgb(117, 56, 199)',
            },
          ]
        },
      };
    }
}
</script>
<style>

</style>

## 数据模块



### 数据展示


:::demo  
```html
<avue-data-box :option="option"></avue-data-box>

<script>
export default {
    data() {
      return {
        form:{},
        option:{
          data: [
            {
              title: '错误日志',
              count: 12332,
              icon: 'icon-cuowu',
              color: 'rgb(49, 180, 141)',
            },
            {
              title: '数据展示',
              count: 33,
              icon: 'icon-shujuzhanshi2',
              color: 'rgb(56, 161, 242)',
            },
            {
              title: '权限管理',
              count: 2223,
              icon: 'icon-jiaoseguanli',
              color: 'rgb(117, 56, 199)',
            },
          ]
        },
      };
    }
}
</script>
```
:::