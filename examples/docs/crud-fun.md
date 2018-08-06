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



### 数据

:::demo  点击不用的按钮回调不用的方法，点击删除回调`row-del`方法,保存新数据回调`rowSave`方法,修改数据回调`row-update`方法,具体参数看文档
```html
<avue-crud :data="data" :option="option" 
                 @row-save="rowSave"
                 @row-update="rowUpdate"
                 @row-del="rowDel"></avue-crud>

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