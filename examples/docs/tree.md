<script>
export default {
    data () {
      return {
          form:{},
          data:[
            {
              id:0,
              label:'一级部门',
              value:0,
              children:[
                {
                  id:1,
                  label:'一级部门1',
                  value:0,
                },{
                  id:2,
                  label:'一级部门2',
                  value:0,
                }
              ]
            },{
              id:3,
              label:'二级部门',
              value:0,
              children:[
                {
                  id:4,
                  label:'二级部门1',
                  value:0,
                },{
                  id:5,
                  label:'二级部门2',
                  value:0,
                }
              ]
            }
          ],
          option:{
            nodeKey:'id',
            formOption:{
              labelWidth:100,
              column:[{
                  label:'自定义项',
                  prop:'test'
              }],
            },
            props:{
              labelText:'标题',
              label:'label',
              value:'value',
              children:'children'
            }
          }
      }
  },
  methods:{
    tip(node,data){
        this.$message.success(JSON.stringify(data))
    },
    del(data,node,done){
      this.$message.success('删除回调')
      done();
    },
    update(data,node,done){
      this.$message.success('更新回调')
      done();
    },
    save(data,node,done){
      this.$message.success('新增回调')
      this.form.id = new Date().getTime();
      this.form.value=new Date().getTime();
      this.form.children=[];
      done();
    },
    nodeClick(data){
      this.$message.success(JSON.stringify(data))
    }
  }
}
</script>
<style>

</style>

## 树型


### 例子


:::demo 传入`option`配置属性即可,`data`为可配置项目，具体参考下表文档
```html
 <avue-tree :option="option" :data="data" @node-click="nodeClick" @update="update" @save="save" @del="del" v-model="form">
  <template slot-scope="scope" slot="menuBtn">
      <el-dropdown-item @click.native="tip(scope.node,scope.data)">自定义按钮</el-dropdown-item>
  </template>
 </avue-tree>

<script>
export default {
    data () {
      return {
          form:{},
          data:[
            {
              id:0,
              label:'一级部门',
              value:0,
              children:[
                {
                  id:1,
                  label:'一级部门1',
                  value:0,
                },{
                  id:2,
                  label:'一级部门2',
                  value:0,
                }
              ]
            },{
              id:3,
              label:'二级部门',
              value:0,
              children:[
                {
                  id:4,
                  label:'二级部门1',
                  value:0,
                },{
                  id:5,
                  label:'二级部门2',
                  value:0,
                }
              ]
            }
          ],
          option:{
            nodeKey:'id',
            formOption:{
              labelWidth:100,
              column:[{
                  label:'自定义项',
                  prop:'test'
              }],
            }
            props:{
              labelText:'标题',
              label:'label',
              value:'value',
              children:'children'
            }
          }
      }
  },
  methods:{
    tip(node,data){
        this.$message.success(JSON.stringify(data))
    },
    del(data,node,done){
      this.$message.success('删除回调')
      done();
    },
    update(data,node,done){
      this.$message.success('更新回调')
      done();
    },
    save(data,node,done){
      this.$message.success('新增回调')
      this.form.id = new Date().getTime();
      this.form.value=new Date().getTime();
      this.form.children=[];
      done();
    },
    nodeClick(data){
      this.$message.success(JSON.stringify(data))
    }
  }
}
</script>
```
:::

### Avue-tree Attributes

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| option | 组件配置属性，详情见下面Option属性 | Object | — | — |
| data | 存放结构体的数据 | Array | — | — |

### Avue-tree Option Attributes

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| expandAll | 是否展开节点 | Boolean | false / true  | true |
| nodeKey | 节点的主键 | String | - | id |
| dialogWidth | 弹出框宽度 | String | - | 50% |
| formOption | 自定义form表单，具体参考avue-form组件(默认自带一个标题的column，可以根据配置去修改) | Object | - | - |
| menu | 菜单栏 | Boolean | false / true  | true |
| addBtn | 新增按钮 | Boolean | false / true  | true |
| editBtn | 编辑按钮 | Boolean | false / true  | true |
| delBtn | 修改按钮 | Boolean | false / true  | true |
| props | 配置选项，具体看下表 | object | - | - |

### Avue-tree props Attributes

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| label | 指定节点标签为节点对象的某个属性值 | string| — | — |
| labelText | 弹窗添加节点的名称 | String | - | 名称 |
| children | 指定子树为节点对象的某个属性值 | string | — | —
| value | 指定节点选择框的值 | boolean | — | — |

### Avue-tree Column Attributes

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| label | 节点的名称 | String | -  | - |
| value | 节点的值 | String | -  | - |
| id | 节点主键 | String | -  | - |
| children | 子节点 | Array | -  | - |

### Avue-tree Events

| 事件名 | 说明 | 参数 |
| ---- | ---- | ---- |
| save | 新增节点回调 | data, node, done |
| update | 修改节点回调 | data, node, done |
| del | 删除节点回调 | data, node, done |

### Avue-tree Scoped Slot

| name | 说明 |
|------|--------|
| menuBtn | 按钮的卡槽 |
| addBtn | 新增按钮卡槽 |