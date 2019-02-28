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
          expandRowKeys:[1],
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
      expandChange(row, expendList) {
        this.$message.success('展开回调')
      }
    }
}
</script>

<style>

</style>

## Crud 模块



### 面板

:::demo  设置`expand`为`true`时即可，`solt`卡槽的名称为`expand`时即可，`props`为返回需要的数据，里面包括了当前行的相关数据,必须配置`idKey`属性为你行数据的主键，不能重复,`defaultExpandAll`属性默认展开全部,`expandRowKeys`为展开指定`idKey`主键的数组，同时你也可以调用`toggleRowExpansion`方法传入你要展开的`row`
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
          expandRowKeys:[1],
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
      expandChange(row, expendList) {
        this.$message.success('展开回调')
      }
    }
}
</script>
```
:::


### Attributes
|参数|说明|类型|可选值|默认值|
|----------------|------------------------------------------------------------------------------------------------------------------|---------------|---------------------------|--------|
|defaultExpandAll|是否默认展开所有行，"expand"为true的时候有效|Boolean|true/false|false|
|expandRowKeys|可以通过该属性设置目前的展开行，需要设置 idKey 属性才能使用，该属性为展开行的 keys 数组。|Array|-|-|
|idKey|行数据的 Key的主键，用于其他相关操作|String|—|id|

### Events

|事件名|说明|参数|
|------------------|---------------------------|-------------------------|
|toggleRowExpansion|用于可展开表格，切换某一行的展开状态，如果使用了第二个参数，则是设置这一行展开与否（expanded 为 true 则展开|row, expanded|
