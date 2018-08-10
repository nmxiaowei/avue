<script>
  export default {
    data() {
      return {
        user:{},
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
              prop:'name',
              formsolt:true,
            }, {
              label:'性别',
              prop:'sex'
            }
          ]
        }
      }
    },
    methods: {
    }
  };
</script>

<style>

</style>

## Crud 模块



### 自定义表单

:::demo 设置列的属性`formsolt`为`true`时即可开启自定义模式，在卡槽中指定列的名字加上Form即可 
```html
<avue-crud :data="data" :option="option" v-model="user">
  <template slot-scope="scope" slot="nameForm">
      <el-tag>{{user.name}}</el-tag>
  </template>
</avue-crud>

<script>
export default {
 data() {
      return {
        user:{},
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
              prop:'name',
              formsolt:true
            },
            {
              label:'性别',
              prop:'sex'
            }
          ]
        },
      };
    },
  }
</script>
```
:::