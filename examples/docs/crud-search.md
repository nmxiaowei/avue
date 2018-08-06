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
              prop:'name',
              search:true,
            },
            {
              label:'性别',
              prop:'sex',
              search:true,
            }
          ]
        },
      };
    },
    methods: {
      searchChange(params){
        this.$message.success('搜索数据'+ JSON.stringify(params));
      },
    }
}
</script>

<style>

</style>

## Crud 模块



### 搜索

:::demo  配置`cloumn`数组对象中的`search`属性为`true`时，即可激活该字段的搜索功能，点击搜索功能回调`search-change`方法，返回搜索的参数`
```html
<avue-crud :data="data" :option="option"  @search-change="searchChange"></avue-crud>

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
              prop:'name',
              search:true,
            },
            {
              label:'性别',
              prop:'sex',
              search:true,
            }
          ]
        },
      };
    },
    methods: {
      searchChange(params){
        this.$message.success('搜索数据'+ JSON.stringify(params));
      },
    }
}
</script>
```
:::