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

:::demo 自定义组件，将组件注册为全局组件，完后在`component`属性中写属性名字即可，相关数据用`props`接受,在组件里就可以天马星空了,自定义组件例子看`examples/components/solt-component`代码
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
              prop:'name'
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

