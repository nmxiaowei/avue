<script>
  export default {
    data() {
      return {
        obj:{},
        data: [
          {
            name:'张三',
            sex:'男',
            date:'1994-02-23 00:00:00'
          }, {
            name:'李四',
            sex:'女',
            date:'1994-02-23 00:00:00'
          }, {
            name:'王五',
            sex:'女',
            date:'1994-02-23 00:00:00'
          }, {
            name:'赵六',
            sex:'男',
            date:'1994-02-23 00:00:00'
          }
        ],
        option:{
          title:'表格的标题',
          page:false,
          align:'center',
          menuAlign:'center',
          column:[
             {
              label:'姓名',
              prop:'name',
            }, {
              label:'性别',
              prop:'sex'
            },{
              label: "日期",
              prop: "date",
              type: "date",
              format: "yyyy-MM-dd hh:mm:ss",
              valueFormat: "yyyy-MM-dd hh:mm:ss",
            }
          ]
        },
        option1:{
          title:'表格的标题',
          menuBtn:true,
          dateBtn:true,
          dateDefault:true,
          page:false,
          align:'center',
          menuAlign:'center',
          column:[
             {
              label:'姓名',
              prop:'name',
            }, {
              label:'性别',
              prop:'sex'
            },{
              label: "日期",
              prop: "date",
              type: "date",
              format: "yyyy-MM-dd hh:mm:ss",
              valueFormat: "yyyy-MM-dd hh:mm:ss",
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
            title:'表格的标题',
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
     },
    methods: {
      dateChange(date){
        this.$message.success(date);
      },
      tip(){
        this.$message.success('自定义按钮');
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
            sex:'男',
            date:'1994-02-23 00:00:00'
          }, {
            name:'李四',
            sex:'女',
            date:'1994-02-23 00:00:00'
          }, {
            name:'王五',
            sex:'女',
            date:'1994-02-23 00:00:00'
          }, {
            name:'赵六',
            sex:'男',
            date:'1994-02-23 00:00:00'
          }
        ],
        option:{
          title:'表格的标题',
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
            },{
              label: "日期",
              prop: "date",
              type: "date",
              format: "yyyy-MM-dd hh:mm:ss",
              valueFormat: "yyyy-MM-dd hh:mm:ss",
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
            title:'表格的标题',
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

### 合并菜单

:::demo  配置`menuBtn`为`true`表格的操作栏目菜单合并，`dropMenu`卡槽为自定义卡槽,`delBtn`和`editBtn`会消失,`dateBtn`控件的`dateDefault`为`true`时首次进来会加载回调方法
```html
<avue-crud :data="data" :option="option1" v-model="obj" @date-change="dateChange">
  <template slot-scope="scope" slot="dropMenu">
     <el-dropdown-item divided @click.native="tip">自定义按钮</el-dropdown-item>
  </template>
</avue-crud>

<script>
export default {
 data() {
      return {
        obj:{},
        data: [
          {
            name:'张三',
            sex:'男',
            date:'1994-02-23 00:00:00'
          }, {
            name:'李四',
            sex:'女',
            date:'1994-02-23 00:00:00'
          }, {
            name:'王五',
            sex:'女',
            date:'1994-02-23 00:00:00'
          }, {
            name:'赵六',
            sex:'男',
            date:'1994-02-23 00:00:00'
          }
        ],
        option1:{
          title:'表格的标题',
          menuBtn:true,
          page:false,
          align:'center',
          dateBtn:true,
          dateDefault:true,
          menuAlign:'center',
          column:[
             {
              label:'姓名',
              prop:'name'
            },
            {
              label:'性别',
              prop:'sex'
            },{
              label: "日期",
              prop: "date",
              type: "date",
              format: "yyyy-MM-dd hh:mm:ss",
              valueFormat: "yyyy-MM-dd hh:mm:ss",
            }
          ]
        }
      }
    },
    methods: {
      dateChange(date){
        this.$message.success(date);
      },
      tip(){
        this.$message.success('自定义按钮');
      }
    }
  }
</script>
``` 
:::