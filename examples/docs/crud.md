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
          }, {
            name:'王五',
            sex:'女'
          }, {
            name:'赵六',
            sex:'男'
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
        showBorder: false,
        showStripe: false,
        showHeader: true,
        showIndex: true,
        showCheckbox: false,
        showPage:false
      }
    },
     computed: {
       option0(){
         return{
            border:this.showBorder,
            stripe:this.showStripe,
            showHeader:this.showHeader,
            index:this.showIndex,
            selection:this.showCheckbox,
            page:this.showPage,
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
         }
       }
     }
  }
</script>

<style>

</style>

## Crud 模块

通过json快速生成crud表格

### 基础

:::demo  当`avue-table`组件属性中，`data`数据的对象数组，`option`为表格要配置的数据列，`v-model`为当前编辑或者新增的表单对象，自动根据`option`中的`column`配置去加载对象注入进去
```html
<avue-crud :data="data" :option="option" v-model="obj"></avue-crud>
</br>
<el-tag>当前弹出框表单中的数据{{obj}}</el-tag>

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
          }, {
            name:'王五',
            sex:'女'
          }, {
            name:'赵六',
            sex:'男'
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
            },
            {
              label:'性别',
              prop:'sex'
            }
          ]
        }
      }
    }
  }
</script>
``` 
:::

### 丰富表格

该示例主要展示了表格丰富的显示效果。

:::demo  
```html
<el-row style="margin-bottom:20px;font-size:15px">
  <el-col :span="4">显示边框: <el-switch size="small" v-model="showBorder"> </el-switch></el-col>
  <el-col :span="4">显示斑马纹: <el-switch size="small" v-model="showStripe"> </el-switch></el-col>
  <el-col :span="4">显示索引: <el-switch size="small" v-model="showIndex"> </el-switch></el-col>
  <el-col :span="4">显示多选框: <el-switch size="small" v-model="showCheckbox"> </el-switch></el-col>
  <el-col :span="4">显示表头: <el-switch size="small" v-model="showHeader"> </el-switch></el-col>
  <el-col :span="4">显示分页: <el-switch size="small" v-model="showPage"> </el-switch></el-col>
</el-row>
<avue-crud :data="data" :option="option0"></avue-crud>

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
          }, {
            name:'王五',
            sex:'女'
          }, {
            name:'赵六',
            sex:'男'
          }
        ],
        showBorder: false,
        showStripe: false,
        showHeader: true,
        showIndex: true,
        showCheckbox: false,
        showPage:falsem
      }
    },
     computed: {
       option0(){
         return{
            border:this.showBorder,
            stripe:this.showStripe,
            showHeader:this.showHeader,
            index:this.showIndex,
            selection:this.showCheckbox,
            page:this.showPage,
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
         }
       }
     }
  }
</script>
```
:::

