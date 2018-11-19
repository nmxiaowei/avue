<script>
export default {
    data() {
      return {
        form:{},
        option:{
           data: [
            {
              title: '今日注册',
              count: 12678,
              icon: 'icon-cuowu',
              href:'https://avue.top',
              target:'_blank'
            },
            {
              title: '今日登录',
              count: 22139,
              icon: 'icon-shujuzhanshi2',
              href:'https://avue.top',
              target:'_blank'
            },
            {
              title: '今日订阅',
              count: 35623,
              icon: 'icon-jiaoseguanli',
              href:'https://avue.top',
              target:'_blank'
            },
            {
              title: '今日评论',
              count: 16826,
              icon: 'icon-caidanguanli',
              href:'https://avue.top',
              target:'_blank'
            },
            {
              title: '今日评论',
              count: 16826,
              icon: 'icon-caidanguanli',
              href:'https://avue.top',
              target:'_blank'
            },
            {
              title: '今日评论',
              count: 16826,
              icon: 'icon-caidanguanli',
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
<avue-data-icons :option="option"></avue-data-icons>

<script>
export default {
    data() {
      return {
        form:{},
        option:{
           data: [
            {
              title: '今日注册',
              count: 12678,
              icon: 'icon-cuowu',
              href:'https://avue.top',
              target:'_blank'
            },
            {
              title: '今日登录',
              count: 22139,
              icon: 'icon-shujuzhanshi2',
              href:'https://avue.top',
              target:'_blank'
            },
            {
              title: '今日订阅',
              count: 35623,
              icon: 'icon-jiaoseguanli',
              href:'https://avue.top',
              target:'_blank'
            },
            {
              title: '今日评论',
              count: 16826,
              icon: 'icon-caidanguanli',
              href:'https://avue.top',
              target:'_blank'
            },
            {
              title: '今日评论',
              count: 16826,
              icon: 'icon-caidanguanli',
              href:'https://avue.top',
              target:'_blank'
            },
            {
              title: '今日评论',
              count: 16826,
              icon: 'icon-caidanguanli',
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