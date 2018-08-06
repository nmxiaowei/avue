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
              solt:true,
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



### Crud自定义列

:::demo  
```html
<avue-crud :data="data" :option="option" v-model="user">
  <template slot-scope="scope" slot="name">
      <el-tag>{{scope.row.name}}</el-tag>
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
              solt:true
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