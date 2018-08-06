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
      rowSave(form,done){
        this.$message.success('新增数据'+ JSON.stringify(form));
        done();
      },
      rowDel(form,index){
        this.$message.success('删除数据'+ JSON.stringify(form));
      },
      rowUpdate(form,index,done){
        this.$message.success('编辑数据'+ JSON.stringify(form)+'数据序号'+index);
        done();
      },
    }
}
</script>

<style>

</style>

## Crud 模块



### 自定义菜单

:::demo  配置`slot`卡槽为`menuLeft`为表单菜单左边位置,卡槽为`menuRight`为表格菜单右边的位置
```html
<avue-crud :data="data" :option="option">
  <template slot="menuLeft">
    <el-button type="primary" size="small">自定义按钮</el-button>
  </template>
  <template slot="menuRight">
     <el-button type="primary" icon="el-icon-edit" circle size="small"></el-button>
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
      rowSave(form,done){
        this.$message.success('新增数据'+ JSON.stringify(form));
        done();
      },
      rowDel(form,index){
        this.$message.success('删除数据'+ JSON.stringify(form));
      },
      rowUpdate(form,index,done){
        this.$message.success('编辑数据'+ JSON.stringify(form)+'数据序号'+index);
        done();
      },
    }
}
</script>
```
:::