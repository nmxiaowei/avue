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
          menuType:'menu',
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
        option2:{
          title:'表格的标题',
          menuType:'text',
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
        },
        option3:{
          title:'表格的标题',
          menuType:'icon',
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
        },
        showBorder: false,
        showStripe: false,
        showHeader: true,
        showIndex: true,
        showCheckbox: false,
        showPage:false,
        sizeValue:'',
      }
    },
     computed: {
       option0(){
         return{
            title:'表格的标题',
            border:this.showBorder,
            stripe:this.showStripe,
            showHeader:this.showHeader,
            size:this.sizeValue,
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
      beforeOpen(done,type){
          this.$message.success(type);
      },
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
<avue-crud :data="data" :option="option" v-model="obj" :before-close="beforeOpen"></avue-crud>
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
<el-row style="margin-bottom:20px">
   <el-radio-group v-model="sizeValue">
    <el-radio label="">默认</el-radio>
    <el-radio label="small">small</el-radio>
    <el-radio label="mini">mini</el-radio>
  </el-radio-group>
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
        showPage:false,
        sizeValue:''
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
            size:this.sizeValue,
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

:::demo  配置`menuType`为`menu`表格的操作栏目菜单合并，`menuBtn`卡槽为自定义卡槽,`delBtn`和`editBtn`会消失,`dateBtn`控件的`dateDefault`为`true`时首次进来会加载回调方法,
```html
<avue-crud :data="data" :option="option1" v-model="obj" @date-change="dateChange">
  <template slot-scope="scope" slot="menuBtn">
     <el-dropdown-item divided @click.native="tip">自定义按钮</el-dropdown-item>
  </template>
  <template slot-scope="scope" slot="menu">
     <el-button size="small" @click.native="tip">自定义按钮</el-button>
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
          menuType:'menu',
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

### 文本菜单

:::demo  配置`menuType`为`text`时表格操作栏为文本按钮
```html
<avue-crud :data="data" :option="option2" v-model="obj" @date-change="dateChange">
  <template slot-scope="scope" slot="menu">
     <el-button type="text" size="small" @click.native="tip">自定义按钮</el-button>
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
        option2:{
          title:'表格的标题',
          menuType:'text',
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

### 图标菜单

:::demo  配置`menuType`为`icon`时表格操作栏为图标按钮
```html
<avue-crud :data="data" :option="option3" v-model="obj" @date-change="dateChange">
  <template slot-scope="scope" slot="menu">
     <el-button size="small" @click.native="tip" icon="el-icon-share"></el-button>
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
        option3:{
          title:'表格的标题',
          menuType:'icon',
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