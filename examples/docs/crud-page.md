<script>
  export default {
    data() {
      return {
        page: {
          pageSizes: [10, 20, 30, 40],
          total: 20,
          currentPage: 1,
          pageSize: 10,
        },
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
      sizeChange(val){
        this.$message.success('行数'+ val);
      },
      currentChange(val){
        this.$message.success('页码'+val);
      },
    }
  };
</script>

<style>

</style>

## Crud 模块



### 分页

:::demo  实际的用法要后台配置，将后台返回值赋值给page中的属性， `page`就是分页对象注入，page对象中的`total`为总页数，`pageSizes`为分页信息，`currentPage`为当前第几页，`pageSize`每一页加载多少条数据，点击页码会调用`current-change`方法回调当前页数，返回当前第几页，点击每页多少条会调`size-change`方法回调
```html
<avue-crud :data="data" :option="option" :page="page" @size-change="sizeChange"  @current-change="currentChange"></avue-crud>

<script>
export default {
    data() {
      return {
        page: {
          pageSizes: [10, 20, 30, 40],
          total: 20,
          currentPage: 1,
          pageSize: 10,
        },
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
        },
      };
    },
    methods: {
      sizeChange(val){
        this.$message.success('行数'+ val);
      },
      currentChange(val){
        this.$message.success('页码'+val);
      },
    }
}
</script>
```
:::