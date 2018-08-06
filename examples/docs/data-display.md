<script>
export default {
    data() {
      return {
        form:{},
        option:{
          data:[
            {
              count: 100,
              title: '日活跃数'
            },
            {
              count: '3,000',
              title: '月活跃数'
            },
            {
              count: '20,000',
              title: '年活跃数'
            }
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
<avue-data-display :option="option"></avue-data-display>

<script>
export default {
    data() {
      return {
        form:{},
        option:{
          data:[
            {
              count: 100,
              title: '日活跃数'
            },
            {
              count: '3,000',
              title: '月活跃数'
            },
            {
              count: '20,000',
              title: '年活跃数'
            }
          ]
        },
      };
    }
}
</script>
```
:::