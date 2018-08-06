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
        handleRowClick (row, event, column) {
          this.$notify({
            showClose: true,
            message: '单机'+JSON.stringify(row),
            type: 'success',
          });
        },
    }
}
</script>

<style>

</style>

## Crud 模块



### 行单机

:::demo  
```html
<avue-crud :data="data" :option="option" @row-click="handleRowClick"></avue-crud>

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
        }
      };
    },
    methods: {
        handleRowClick (row, event, column) {
          this.$notify({
            showClose: true,
            message: '单机'+JSON.stringify(row),
            type: 'success',
          });
        },
    }
}
</script>
```
:::