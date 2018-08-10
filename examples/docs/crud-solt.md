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

:::demo 设置列的属性`solt`为`true`时即可开启自定义模式，在卡槽中指定列的名字即可
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