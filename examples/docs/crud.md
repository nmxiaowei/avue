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
          column:[
             {
              label:'姓名',
              prop:'name'
            }, {
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

