<script>
  export default {
    data() {
      return {
        obj:{},
        data: [
          {
            xing:'张',
            ming:'三',
            sex:'男'
          }, {
            xing:'李',
            ming:'四',
            sex:'女'
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
              children:[
                {
                    label:'名',
                    prop:'ming'
                },
                {
                    label:'姓',
                    prop:'xing'
                }
              ]
            }, {
              label:'性别',
              prop:'sex'
            }
          ]
        }
      }
    }
  }
</script>

<style>

</style>

## Crud 模块



### 复杂表头

:::demo  在`column`中加入`children`列数组即可,一层层的根据结构来显示表头
```html
<avue-crud :data="data" :option="option" v-model="obj"></avue-crud>


<script>
  export default {
    data() {
      return {
        obj:{},
        data: [
          {
            xing:'张',
            ming:'三',
            sex:'男'
          }, {
            xing:'李',
            ming:'四',
            sex:'女'
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
              children:[
                {
                    label:'姓',
                    prop:'xing'
                },{
                    label:'名',
                    prop:'ming'
                }
              ]
            }, {
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

