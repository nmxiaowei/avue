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
          border:true,
          page:false,
          align:'center',
          menuAlign:'center',
          column:[
             {
              sortable:true,
              label:'姓名',
              prop:'name'
            }, {
              label:'性别',
              prop:'sex'
            }
          ]
        },
        option1:{
          defaultSort:{
            prop: 'name',
            order: 'descending'
          },
          border:true,
          page:false,
          align:'center',
          menuAlign:'center',
          column:[
             {
              sortable:true,
              label:'姓名',
              prop:'name'
            }, {
              label:'性别',
              prop:'sex'
            }
          ]
        }
      };
    },
    methods: {
      sortChange(val){
         this.$message.success('排序'+ JSON.stringify(val));
      }
    }
}
</script>

<style>

</style>

## Crud 模块



### 排序

:::demo 表格中可显示的列字段进行排序，设置属性`sortable`接受一个`Boolean`的属性，设置为`true`即可开启排序，回调`sort-change`方法返回排序后的数据
```html
<avue-crud :data="data" :option="option" @sort-change="sortChange"></avue-crud>

<script>
export default {
    data() {
      return {
        data: [
          {
            sortable:true,
            name:'张三',
            sex:'男'
          }, {
            name:'李四',
            sex:'女'
          }
        ],
        option:{
          border:true,
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
      sortChange(val){
         this.$message.success('排序'+ JSON.stringify(val));
      }
    }
}
</script>
```
:::


### 默认排序

:::demo 设置`defaultSort`一个属性接受`prop`排序的字段和`order`排序的方式俩个属性，初始化的时候根据设置默认排序,`order`中接受  `ascending` 表示升序，`descending` 表示降序，回调`sort-change`方法返回排序后的数据
```html
<avue-crud :data="data" :option="option1"></avue-crud>

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
        option1:{
          defaultSort:{
            prop: 'name',
            order: 'descending'
          },
          border:true,
          page:false,
          align:'center',
          menuAlign:'center',
          column:[
             {
              sortable:true,
              label:'姓名',
              prop:'name'
            }, {
              label:'性别',
              prop:'sex'
            }
          ]
        }
      };
    }
}
</script>
```
:::

