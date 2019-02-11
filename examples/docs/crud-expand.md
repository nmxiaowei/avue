<script>
export default {
    data() {
      return {
        data: [{
          id: 1,
          name: '张三',
          sex: 12,
        }, {
          id: 2,
          name: '李四',
          sex: 20,
        }],
        option:{
          expand:true,
          page:false,
          idKey:'id',
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
      
    }
}
</script>

<style>

</style>

## Crud 模块



### 面板

:::demo  设置`expand`为`true`时即可，`solt`卡槽的名称为`expand`时即可，`props`为返回需要的数据，里面包括了当前行的相关数据,必须配置`idKey`属性为你行数据的主键，不能重复
```html
<avue-crud :data="data" :option="option">
  <template slot-scope="props" slot="expand">
    <el-tag>当前行的{{props}}</el-tag>
  </template>
</avue-crud>

<script>
export default {
    data() {
      return {
        data: [{
          id: 1,
          name: '张三',
          sex: 12,
        }, {
          id: 2,
          name: '李四',
          sex: 20,
        }],
        option:{
          expand:true,
          page:false,
          idKey:'id',
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
      
    }
}
</script>
```
:::