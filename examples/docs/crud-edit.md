<script>
  export default {
    data() {
      return {
        obj:{},
        cellEdit:false,
        data0: [
          {
            name:'张三',
            sex:'男'
          }, {
            name:'李四',
            sex:'女'
          }
        ],
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
              cell:true,
              rules: [{
                required: true,
                message: "请输入姓名",
                trigger: "blur"
              }]
            }, {
              label:'性别',
              prop:'sex'
            }
          ]
        },
        option0:{
          page:false,
          align:'center',
          menuAlign:'center',
          cellBtn:false,
          editBtn:false,
          delBtn:false,
          column:[
             {
              label:'姓名',
              prop:'name',
              cell:true, 
              rules: [
                {
                  required: true,
                  message: '请输入姓名',
                  trigger: 'blur'
                }
              ]
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
      rowCell(row,index){
        this.$refs.crud.rowCell(row,index);
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

### 基础

:::demo 配置属性`cellBtn`为 true 时即可显示单元格编辑按钮，要编辑的列属性配置`cell`为`true`即可编辑

```html
<avue-crud
  :data="data"
  :option="option"
  v-model="obj"
  @row-update="rowUpdate"
></avue-crud>

<script>
  export default {
    data() {
      return {
        obj: {},
        data: [
          {
            name: '张三',
            sex: '男'
          },
          {
            name: '李四',
            sex: '女'
          }
        ],
        option: {
          page: false,
          align: 'center',
          menuAlign: 'center',
          cellBtn: true,
          editBtn: false,
          delBtn: false,
          column: [
            {
              label: '姓名',
              prop: 'name',
              cell: true,
              rules: [
                {
                  required: true,
                  message: '请输入姓名',
                  trigger: 'blur'
                }
              ]
            },
            {
              label: '性别',
              prop: 'sex'
            }
          ]
        }
      }
    },
    methods: {
      rowUpdate(form, index, done) {
        this.$message.success(
          '编辑数据' + JSON.stringify(form) + '数据序号' + index
        )
        done()
      }
    }
  }
</script>
```

:::

### 自定义按钮

:::demo 配置属性`cellBtn`为`false`，完后在 menu 卡槽自定义按钮,调用`rowCell`方法即可，当前行的状态`$cellEdit`属性判断当前行是否编辑状态

```html
<avue-crud
  ref="crud"
  :data="data0"
  :option="option0"
  v-model="obj"
  @row-update="rowUpdate"
>
  <template slot-scope="scope" slot="menu">
    <el-button
      type="primary"
      size="small"
      @click="rowCell(scope.row,scope.index)"
      >{{scope.row.$cellEdit?'自定义保存':'自定义修改'}}</el-button
    >
  </template>
</avue-crud>

<script>
  export default {
    data() {
      return {
        obj: {},
        cellEdit: false,
        data0: [
          {
            name: '张三',
            sex: '男'
          },
          {
            name: '李四',
            sex: '女'
          }
        ],
        option0: {
          page: false,
          align: 'center',
          menuAlign: 'center',
          cellBtn: false,
          editBtn: false,
          delBtn: false,
          column: [
            {
              label: '姓名',
              prop: 'name',
              cell: true,
              rules: [
                {
                  required: true,
                  message: '请输入姓名',
                  trigger: 'blur'
                }
              ]
            },
            {
              label: '性别',
              prop: 'sex'
            }
          ]
        }
      }
    },
    methods: {
      rowCell(row, index) {
        this.$refs.crud.rowCell(row, index)
      },
      rowUpdate(form, index, done) {
        this.$message.success(
          '编辑数据' + JSON.stringify(form) + '数据序号' + index
        )
        done()
      }
    }
  }
</script>
```

:::
