<script>
export default {
   data() {
      return {
        option: {
          span: 8,
          data: [
            {
              title: 'smallwei',
              subtitle: 'avue部门-前端研发工程师',
              img: 'https://avuex.avue.top/images/img1.jpg',
              color: '#00a7d0',
              list: [{
                label: '点赞',
                value: '3,200'
              }, {
                label: '关注',
                value: '13,000'
              }, {
                label: '项目',
                value: '13,000'
              }]
            },
            {
              title: 'smallwei',
              subtitle: 'avue部门-前端研发工程师',
              img: 'https://avuex.avue.top/images/img2.jpg',
              color: '#f39c12',
              list: [{
                label: '点赞',
                value: '3,200'
              }, {
                label: '关注',
                value: '13,000'
              }, {
                label: '项目',
                value: '13,000'
              }]
            },
            {
              title: 'smallwei',
              subtitle: 'avue部门-前端研发工程师',
              img: 'https://avuex.avue.top/images/img3.jpg',
              colorImg: 'https://avuex.avue.top/images/bg1.png',
              list: [{
                label: '点赞',
                value: '3,200'
              }, {
                label: '关注',
                value: '13,000'
              }, {
                label: '项目',
                value: '13,000'
              }]
            },
          ]
        },
      }
    },
}
</script>
<style>

</style>

## 数据模块



### 数据展示


:::demo  
```html
<avue-data-info :option="option"></avue-data-info>

<script>
export default {
   data() {
      return {
        option: {
          span: 8,
          data: [
            {
              title: 'smallwei',
              subtitle: 'avue部门-前端研发工程师',
              img: 'https://avuex.avue.top/images/img1.jpg',
              color: '#00a7d0',
              list: [{
                label: '点赞',
                value: '3,200'
              }, {
                label: '关注',
                value: '13,000'
              }, {
                label: '项目',
                value: '13,000'
              }]
            },
            {
              title: 'smallwei',
              subtitle: 'avue部门-前端研发工程师',
              img: 'https://avuex.avue.top/images/img2.jpg',
              color: '#f39c12',
              list: [{
                label: '点赞',
                value: '3,200'
              }, {
                label: '关注',
                value: '13,000'
              }, {
                label: '项目',
                value: '13,000'
              }]
            },
            {
              title: 'smallwei',
              subtitle: 'avue部门-前端研发工程师',
              img: 'https://avuex.avue.top/images/img3.jpg',
              colorImg: 'https://avuex.avue.top/images/bg1.png',
              list: [{
                label: '点赞',
                value: '3,200'
              }, {
                label: '关注',
                value: '13,000'
              }, {
                label: '项目',
                value: '13,000'
              }]
            },
          ]
        },
      }
    },
}
</script>
```
:::