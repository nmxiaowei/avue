<script>
export default {
    data() {
      return {
        data: [
          {
            name:'张三',
            sex:'男'
          }, {
            name:'李四',
            sex:'女'
          }
        ],
        option:{
          expand:true,
          page:false,
          align:'center',
          menuAlign:'center',
          column:[
             {
              label:'姓名',
              prop:'name'
            }, {
              label:'性别',
              prop:'sex'
            }
          ]
        },
      };
    },
    methods: {
      
    }
}
</script>

<style>

</style>

## Crud 模块



### 面板

:::demo  设置`expand`为`true`时即可，`solt`卡槽的名称为`expand`时即可，`props`为返回需要的数据，具体看文档
```html
<avue-crud :data="data" :option="option">
  <template slot-scope="props" slot="expand">
    {{props}}
  </template>
</avue-crud>

<script>
export default {
    data() {
      return {
        data: [
          {
            name:'张三',
            sex:'男'
          }, {
            name:'李四',
            sex:'女'
          }
        ],
        option:{
          expand:true,
          page:false,
          align:'center',
          menuAlign:'center',
          column:[
             {
              label:'姓名',
              prop:'name'
            }, {
              label:'性别',
              prop:'sex'
            }
          ]
        },
      };
    },
    methods: {
      
    }
}
</script>
```
:::