<script>
export default {
    data() {
      return {
        form:{},
        option:{
           data: [
            {
                title: '分类统计',
                subtitle: '实时',
                count: 7993,
                allcount: 10222,
                text: '当前分类总记录数',
                color: 'rgb(27, 201, 142)',
                key: '类'
            },
            {
                title: '附件统计',
                subtitle: '实时',
                count: 3112,
                allcount: 10222,
                text: '当前上传的附件数',
                color: 'rgb(230, 71, 88)',
                key: '附'
            },
            {
                title: '文章统计',
                subtitle: '实时',
                count: 908,
                allcount: 10222,
                text: '评论次数',
                color: 'rgb(178, 159, 255)',
                key: '评'
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
<avue-data-tabs :option="option"></avue-data-tabs>

<script>
export default {
    data() {
      return {
        form:{},
        option:{
           data: [
            {
                title: '分类统计',
                subtitle: '实时',
                count: 7993,
                allcount: 10222,
                text: '当前分类总记录数',
                color: 'rgb(27, 201, 142)',
                key: '类'
            },
            {
                title: '附件统计',
                subtitle: '实时',
                count: 3112,
                allcount: 10222,
                text: '当前上传的附件数',
                color: 'rgb(230, 71, 88)',
                key: '附'
            },
            {
                title: '文章统计',
                subtitle: '实时',
                count: 908,
                allcount: 10222,
                text: '评论次数',
                color: 'rgb(178, 159, 255)',
                key: '评'
            }
            ]
        },
      };
    }
}
</script>
```
:::