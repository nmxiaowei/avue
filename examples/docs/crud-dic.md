<script>
export default {
    data() {
      return {
        data: [
          {
            name:'张三',
            sex:'男',
            grade:1
          }, {
            name:'李四',
            sex:'女',
            grade:0
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
            }, {
              label:'性别',
              prop:'sex'
            },{
              label:'权限',
              prop:'grade',
              type:'select',
              dicData:[
                {
                  label:'有权限',
                  value:1
                },{
                  label:'无权限',
                  value:0
                }
              ]
            }
          ]
        }
      }
    },
    methods: {
    }
}
</script>

<style>

</style>

## Crud 模块



### 本地字典

:::demo  
```html
<avue-crud :data="data" :option="option" ></avue-crud>

<script>
export default {
    data() {
      return {
        data: [
          {
            name:'张三',
            sex:'男',
            grade:1
          }, {
            name:'李四',
            sex:'女',
            grade:0
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
            }, {
              label:'性别',
              prop:'sex'
            },{
              label:'权限',
              prop:'grade',
              type:'select',
              dicData:[
                {
                  label:'有权限',
                  value:1
                },{
                  label:'无权限',
                  value:0
                }
              ]
            }
          ]
        }
      }
    },
    methods: {
    }
}
</script>
```
:::