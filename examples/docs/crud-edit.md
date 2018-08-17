<script>
  export default {
    data() {
      return {
        obj:{},
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
          cellBtn:true,
          editBtn:false,
          delBtn:false,
          column:[
             {
              label:'姓名',
              prop:'name',
              cell:true
            }, {
              label:'性别',
              prop:'sex'
            }
          ]
        }
      }
    },
    methods: {
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



### 基础

:::demo  配置属性`cellBtn`为true时即可显示单元格编辑按钮，要编辑的列属性配置`cell`为`true`即可编辑
```html
<avue-crud :data="data" :option="option" v-model="obj" @row-update="rowUpdate"></avue-crud>

<script>
export default {
 data() {
      return {
        obj:{},
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
          cellBtn:true,
          column:[
             {
              label:'姓名',
              prop:'name',
              cell:true
            },
            {
              label:'性别',
              prop:'sex'
            }
          ]
        }
      }
    },
    methods: {
      rowUpdate(form,index,done){
        this.$message.success('编辑数据'+ JSON.stringify(form)+'数据序号'+index);
        done();
      },
    }
  }
</script>
```
:::

