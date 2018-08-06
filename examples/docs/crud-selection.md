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
        option4:{
          selection: true,
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
      selectionChange(list){
        this.$message.success('选中的数据'+ JSON.stringify(list));
      }
    }
}
</script>

<style>

</style>

## Crud 模块



### 多选

:::demo  设`selection`属性为`true`即可；勾选的同时会回调`selectionChange`方法返回当前选中的数据
```html
<avue-crud :data="data" :option="option4" @selection-change="selectionChange"></avue-crud>

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
        option4:{
          selection: true,
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
      selectionChange(list){
        this.$message.success('选中的数据'+ JSON.stringify(list));
      }
    }
}
</script>
```
:::