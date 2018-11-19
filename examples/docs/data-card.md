<script>
export default {
    data() {
      return {
        form:{},
        option:{
          span:8,
          data: [
            {
              name: '姓名1',
              src: '/static/images/card-1.jpg',
              text: '介绍1',
              href:'https://avue.top',
              target:'_blank'
            },
            {
              name: '姓名2',
              src: '/static/images/card-2.jpg',
              text: '介绍2',
              href:'https://avue.top',
              target:'_blank'
            },
            {
              name: '姓名3',
              src: '/static/images/card-3.jpg',
              text: '介绍3',
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
<avue-data-card :option="option"></avue-data-card>

<script>
export default {
    data() {
      return {
        form:{},
        option:{
          data:[
            {
              name: '姓名1',
              src: '/static/images/card-1.jpg',
              text: '介绍1',
              href:'https://avue.top',
              target:'_blank'
            },
            {
              name: '姓名2',
              src: '/static/images/card-2.jpg',
              text: '介绍2',
              href:'https://avue.top',
              target:'_blank'
            },
            {
              name: '姓名3',
              src: '/static/images/card-3.jpg',
              text: '介绍3',
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