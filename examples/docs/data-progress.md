<script>
export default {
    data() {
      return {
        form:{},
        option:{
           data: [
            {
                title: '转化率（日同比 28%）',
                color: 'rgb(178, 159, 255)',
                count: 32,
                href:'https://avue.top',
                target:'_blank'
            },
            {
                title: '签到率（日同比 11%）',
                color:'rgb(230, 71, 88)',
                count: 32,
                href:'https://avue.top',
                target:'_blank'
            },
            {
                title: 'CPU使用率',
                color:'rgb(27, 201, 142)',
                count: 56,
                href:'https://avue.top',
                target:'_blank'
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
<avue-data-progress :option="option"></avue-data-progress>

<script>
export default {
    data() {
      return {
        form:{},
        option:{
           data: [
            {
                title: '转化率（日同比 28%）',
                color: 'rgb(178, 159, 255)',
                count: 32,
                href:'https://avue.top',
                target:'_blank'
            },
            {
                title: '签到率（日同比 11%）',
                color:'rgb(230, 71, 88)',
                count: 32,
                href:'https://avue.top',
                target:'_blank'
            },
            {
                title: 'CPU使用率',
                color:'rgb(27, 201, 142)',
                count: 56,
                href:'https://avue.top',
                target:'_blank'
            }
            ]
        },
      };
    }
}
</script>
```
:::