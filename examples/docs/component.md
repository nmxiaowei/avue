<script>
  export default {
    data() {
      return {
        obj:{},
        data: [
          {
            name:'张三',
            sex:'男'
          }, {
            name:'李四',
            sex:'女'
          }, {
            name:'王五',
            sex:'女'
          }, {
            name:'赵六',
            sex:'男'
          }
        ],
        option:{
          page:false,
          align:'center',
          menuAlign:'center',
          column:[
             {
              label:'姓名',
              prop:'name',
              span:24,
              component:'soltComponent'
            }, {
              label:'性别',
              prop:'sex'
            }
          ]
        },
      }
    },
  }
</script>

<style>

</style>

## Crud 模块



### 自定义组件

:::demo 自定义组件的使用方法，请看扩展页面
```html
<avue-crud :data="data" :option="option" v-model="obj"></avue-crud>
<script>
export default {
 data() {
      return {
        obj:{},
        data: [
          {
            name:'张三',
            sex:'男'
          }, {
            name:'李四',
            sex:'女'
          }, {
            name:'王五',
            sex:'女'
          }, {
            name:'赵六',
            sex:'男'
          }
        ],
        option:{
          page:false,
          align:'center',
          menuAlign:'center',
          column:[
             {
              label:'姓名',
              prop:'name',
              span:24,
              component:'soltComponent'
            },
            {
              label:'性别',
              prop:'sex'
            }
          ]
        }
      }
    }
  }
</script>

``` 
:::

