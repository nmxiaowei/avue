<script>
  export default {
    data() {
      return {
        page: {},
        data: [],
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
    created(){
      this.getList()
    },
    methods: {
      getList(){
        this.page.total=20;
        if(this.page.currentPage===1){
          this.data=[{
            name:'张三',
            sex:'男'
          }]
        }else if(this.page.currentPage==2){
          this.data=[{
            name:'李四',
            sex:'女'
          }]
        }
      },
      onLoad(page){
        this.$message.success('分页信息:'+JSON.stringify(page));
        this.page.total=20;
        if(page.currentPage===1){
          this.data=[{
            name:'张三',
            sex:'男'
          }]
        }else if(page.currentPage==2){
          this.data=[{
            name:'李四',
            sex:'女'
          }]
        }
      },
      sizeChange(val){
        this.page.currentPage=1;
        this.page.pageSize=val;
        this.getList();
        this.$message.success('行数'+ val);
      },
      currentChange(val){
        this.page.currentPage=val;
        this.getList();
        this.$message.success('页码'+val);
      },
    }
  };
</script>

<style>

</style>

## Crud 模块

### 默认分页

:::demo  首次加载调用`on-load`方法加载数据，返回`page`分页对象信息,赋值`page`的`total`总条数即可
```html
<avue-crud :data="data" :option="option" :page="page" @on-load="onLoad"></avue-crud>

<script>
export default {
    data() {
      return {
        page: {
          currentPage:1,
          total:0,
          pageSize:10
        },
        data: [],
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
      onLoad(page){
        this.$message.success('分页信息:'+JSON.stringify(page));
        this.page.total=20;
        //模拟分页
        if(page.currentPage===1){
          this.data=[{
            name:'张三',
            sex:'男'
          }]
        }else if(page.currentPage==2){
          this.data=[{
            name:'李四',
            sex:'女'
          }]
        }
      }
    }
}
</script>
```
:::


### 自定义分页

:::demo  实际的用法要后台配置，将后台返回值赋值给page中的属性， `page`就是分页对象注入，page对象中的`total`为总页数，`pageSizes`为分页信息，`currentPage`为当前第几页，`pageSize`每一页加载多少条数据，点击页码会调用`current-change`方法回调当前页数，返回当前第几页，点击每页多少条会调`size-change`方法回调
```html
<avue-crud :data="data" :option="option" :page="page" @size-change="sizeChange"  @current-change="currentChange"></avue-crud>

<script>
export default {
    data() {
      return {
        page: {
          //pageSizes: [10, 20, 30, 40],默认
          currentPage:1,
          total:0,
          pageSize:10
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
    created(){
      this.getList()
    },
    methods: {
      getList(){
        this.page.total=20;
        if(this.page.currentPage===1){
          this.data=[{
            name:'张三',
            sex:'男'
          }]
        }else if(this.page.currentPage==2){
          this.data=[{
            name:'李四',
            sex:'女'
          }]
        }
      },
      sizeChange(val){
        this.page.currentPage=1;
        this.page.pageSize=val;
        this.getList();
        this.$message.success('行数'+ val);
      },
      currentChange(val){
        this.page.currentPage=val;
        this.getList();
        this.$message.success('页码'+val);
      },
    }
}
</script>
```
:::