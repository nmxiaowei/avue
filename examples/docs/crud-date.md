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
          dateBtn:true,
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
      dateChange(val){
        this.$message.success(val);
      }
    }
}
</script>

## Crud 模块



### 日期控件

:::demo 设置`dateBtn`为`true`时 可以激活表格的多功能日期控件，设置`dateDefault`为`true`时默认选中今天日期，同时回调函数`date-change`返回当前的日期值
```html
<avue-crud :data="data" :option="option" @date-change="dateChange"></avue-crud>

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
          dateBtn:true,
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
      dateChange(val){
        this.$message.success(val);
      }
    }
}
</script>
<style>
</style>
```
:::