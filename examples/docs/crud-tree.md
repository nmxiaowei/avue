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
        treeData:[
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
        treeOption:{
          nodeKey:'id',
          props:{
            labelText:'标题',
            label:'label',
            value:'value',
            children:'children'
          }
        }
      }
    },
    methods: {
      nodeClick(data){
        this.$message.success('点击回调')
      }
    }
  }
</script>

<style>

</style>

## Crud 模块



### 树形表格

:::demo  这是`tree`组件和`crud`组件构建的一个常用的页面
```html
<div style="display:flex">
  <avue-tree style="width:200px;margin-right:10px;padding-top:28px;" :data="treeData" :option="treeOption" @node-click="nodeClick"></avue-tree>
  <avue-crud :data="data" :option="option"></avue-crud>
</div>

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
        treeData:[
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
        treeOption:{
          nodeKey:'id',
          props:{
            labelText:'标题',
            label:'label',
            value:'value',
            children:'children'
          }
        }
      }
    },
    methods: {
      nodeClick(data){
        this.$message.success('点击回调')
      }
    }
  }
</script>

``` 
:::
