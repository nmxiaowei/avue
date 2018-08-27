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
              formatter:function(row, value , label, column){
                  return row.name +'自定义'
              }
            }, {
              label:'性别',
              prop:'sex',
              filters:[{ text: '男', value: '男' }, { text: '女', value: '女' }],
              filterMethod:function(value, row, column) {
                return row.sex === value;
              }
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


### 筛选

:::demo  设置`filters`为筛选的字典，`filterMethod`为自定义的筛选逻辑，`filter-multiple`筛选的数据为多选还是单选，默认为 `true`
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
              formatter:function(row, value , label, column){
                  return row.name +'自定义'
              }
            }, {
              label:'性别',
              prop:'sex',
              filters:[{ text: '男', value: '男' }, { text: '女', value: '女' }],
              filterMethod:function(value, row, column) {
                return row.sex === value;
              }
            }
          ]
        }
      }
    }
  }
</script>
```
:::

