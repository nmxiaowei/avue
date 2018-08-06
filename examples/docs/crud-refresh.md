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
     refreshChange(page){
        this.$message({
          message: `当前的页吗对象${JSON.stringify(page)}`,
          type: 'success',
        });
     }
    }
}
</script>

<style>

</style>

## Crud 模块



### 刷新

:::demo  
```html
<avue-crud :data="data" :option="option" @refresh-change="refreshChange"></avue-crud>

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
     refreshChange(page){
        this.$message({
          message: `当前的页吗对象${JSON.stringify(page)}`,
          type: 'success',
        });
     }
    }
}
</script>
```
:::