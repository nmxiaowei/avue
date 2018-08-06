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
          cloumnBtn:false,
          refreshBtn:false,
          addBtn:false,
          delBtn:false,
          editBtn:false,
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
    methods:{
      handleAdd(){
        this.$refs.crud.rowAdd();
      },
      handleEdit (row, index) {
        this.$refs.crud.rowEdit(row, index);
      },
    }
}
</script>
<style>

</style>

## Crud 模块



### 操作

:::demo  
```html
<avue-crud :data="data" :option="option" ref="crud">
  <template slot-scope="scope" slot="menuLeft">
    <el-button type="danger"
      icon="el-icon-plus"
      size="small"
      plain
      @click.stop="handleAdd()">新增</el-button>
  </template>
  <template slot-scope="scope" slot="menu">
     <el-button type="primary"
                     icon="el-icon-check"
                     size="small"
                     plain
                     @click.stop="handleEdit(scope.row,scope.index)">编辑</el-button>
  </template>
</avue-crud>

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
          cloumnBtn:false,
          refreshBtn:false,
          addBtn:false,
          delBtn:false,
          editBtn:false,
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
    methods:{
      handleAdd(){
        this.$refs.crud.rowAdd();
      },
      handleEdit (row, index) {
        this.$refs.crud.rowEdit(row, index);
      },
    }
}
</script>
```
:::