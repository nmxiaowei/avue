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
           selectable:(row,index)=>{
            return index===1;
          },
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
      },
      toggleSelection(val){
        this.$refs.crud.toggleSelection(val);
      }
    }
}
</script>

<style>

</style>

## Crud 模块



### 多选

:::demo  设`selection`属性为`true`即可；勾选的同时会回调`selectionChange`方法返回当前选中的数据,`setCurrent`方法设置选中的行,`selectable`函数决定该行是否可以勾选
```html

<avue-crud ref="crud" :data="data" :option="option4" @selection-change="selectionChange">
   <template slot="tip">
    <el-button type="text" size="small">
      自定义按钮
    </el-button>
    <span>自定义内容</span>
  </template>
</avue-crud>
<div style="margin-top: 20px">
  <el-button @click="toggleSelection([data[1]])">选中第二行</el-button>
  <el-button @click="toggleSelection()">取消选择</el-button>
</div>
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
          selectable:(row,index)=>{
            return index===1;
          },
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
      },
      toggleSelection(val){
        this.$refs.crud.toggleSelection(val);
      }
    }
}
</script>
```
:::