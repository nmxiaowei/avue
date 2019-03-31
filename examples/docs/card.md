<script>

export default {
   data() {
      return {
        option: {
          // addBtn:false,
          props: {
            img: 'img',
            title: 'title',
            info: 'text',
          }
        },
        data: [{
          title: 'Alipay',
          text: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的,在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的',
          img: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png'
        }, {
          title: 'Angular',
          text: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的,在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的',
          img: 'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png'
        }, {
          title: 'Ant Design',
          text: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的,在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的',
          img: 'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png'
        }, {
          title: 'Ant Design Pro',
          text: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的,在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的',
          img: 'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png'
        }, {
          title: 'Bootstrap',
          text: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的,在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的',
          img: 'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png'
        }, {
          title: 'React',
          text: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的,在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的',
          img: 'https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png'
        }, {
          title: 'Vue',
          text: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的,在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的',
          img: 'https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png'
        }, {
          title: 'Webpack',
          text: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的,在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的',
          img: 'https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png'
        }]
      }
    },
    methods: {
      tip(row, index) {
        this.$message.success('查看控制台')
        console.log(row, index)
      }
    }
}
</script>


# Card 卡片



## 普通用法
:::demo 
```html
 <avue-card :option="option" :data="data" @row-click="tip" @row-add="tip">
  <template slot="menu" slot-scope="scope">
    <span @click.stop="tip(scope.row,scope.index)">操作1</span>
    <span @click.stop="tip(scope.row,scope.index)">操作2</span>
  </template>
</avue-card>
<script>

export default {
   data() {
      return {
        option: {
          // addBtn:false,
          props: {
            img: 'img',
            title: 'title',
            info: 'text',
          }
        },
        data: [{
          title: 'Alipay',
          text: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的,在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的',
          img: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png'
        }, {
          title: 'Angular',
          text: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的,在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的',
          img: 'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png'
        }, {
          title: 'Ant Design',
          text: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的,在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的',
          img: 'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png'
        }, {
          title: 'Ant Design Pro',
          text: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的,在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的',
          img: 'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png'
        }, {
          title: 'Bootstrap',
          text: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的,在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的',
          img: 'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png'
        }, {
          title: 'React',
          text: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的,在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的',
          img: 'https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png'
        }, {
          title: 'Vue',
          text: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的,在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的',
          img: 'https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png'
        }, {
          title: 'Webpack',
          text: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的,在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的',
          img: 'https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png'
        }]
      }
    },
    methods: {
      tip(row, index) {
        this.$message.success('查看控制台')
        console.log(row, index)
      }
    }
}
</script>

```
:::


## Variables

|参数|说明|类型|可选值|默认值|
|-------------|-------------------------------------------------------------|--------|------|------|
|option|组件配置属性，详情见下面Option属性|Object|—|—|
|data|显示的数据|Array|—|—|



## Option Attributes

|参数|说明|类型|可选值|默认值|
|----------------|------------------------------------------------------------------------------------------------------------------|---------------|---------------------------|--------|
|addBtn|添加按钮|Boolean|true/false|true|
|span|表单栅列|Number|-|8|
|gutter|项之间的间|Number|-|20|


## Props Attributes

|参数|说明|类型|可选值|默认值|
|--------|------------------|------|------|------|
|title|列表的主标题|String|—|title|
|img|列表的头像|String|—|img|
|info|列表的副标题|String|—|info|


## Events

|事件名|说明|参数|
|------------------|---------------------------|-------------------------|
|row-add|新增数据后点击确定触发该事件|-|
|row-click|当某一行被点击时会触发该事件|row,index|

## Scoped Slot

|name|说明|
|---|-----|
|menu|操作栏目自定义参数为{row,index}|


