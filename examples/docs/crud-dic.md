<script>
  const DIC={
    GRADE:[{
        label:'有权限',
        value:1
      },{
        label:'无权限',
        value:0
      },{
        label:'禁止项',
        disabled:true,
        value:-1
      }],
    CASCADER:[{
      label:'一级',
      value:0,
      children:[
        {
          label:'一级1',
          value:1,
        },{
          label:'一级2',
          value:2,
        }
      ]
    }]
  }
export default {
    data() {
      return {
        data2: [
          {
            name:'张三',
            sex:'男',
            grade:'110000'
          }, {
            name:'李四',
            sex:'女',
            grade:'120000'
          }
        ],
        data: [
          {
            name:'张三',
            sex:'男',
            grade:1,
            cascader:[0,1],
            checkbox:[0,1],
            tree:0,
          }, {
            name:'李四',
            sex:'女',
            grade:0,
            cascader:[0,2],
            checkbox:[0,1],
            tree:1,
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
                },{
                  label:'禁止项',
                  disabled:true,
                  value:-1
                }
              ]
            },
            {
              label:'级别',
              prop:'cascader',
              type:'cascader',
              dicData:DIC.CASCADER
            },
            {
              width:120,
              label:'多选',
              span:24,
              prop:'checkbox',
              type:'checkbox',
              dicData:DIC.GRADE
            },
            {
              label:'树型',
              prop:'tree',
              type:'tree',
              dicData:DIC.CASCADER
            }
          ]
        },
        option3:{
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
              props: {
                  label: 'name',
                  value: 'code'
              },
              dicUrl:'https://cli2.avue.top/api/area/getProvince',
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



### 列本地字典

:::demo 本地字典只要配置`dicData`为一个`Array`数组即可，便会自动加载字典到对应的组件中，注意返回的字典中value类型和数据的类型必须要对应，比如都是字符串或则都是数字。
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
            grade:1,
            cascader:[0,1],
            checkbox:[0,1],
            tree:0,
          }, {
            name:'李四',
            sex:'女',
            grade:0,
            cascader:[0,2],
            checkbox:[0,1],
            tree:1
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
                },{
                  label:'禁止项',
                  disabled:true,
                  value:-1
                }
              ]
            },{
              label:'级别',
              prop:'cascader',
              type:'cascader',
              dicData:[{
                label:'一级',
                value:0,
                children:[
                  {
                    label:'一级1',
                    value:1,
                  },{
                    label:'一级2',
                    value:2,
                  }
                ]
              }],
            },
            {
              width:120,
              label:'多选',
              prop:'checkbox',
              type:'checkbox',
              span:24,
              dicData:[{
                label:'有权限',
                value:1
              },{
                label:'无权限',
                value:0
              },{
                label:'禁止项',
                disabled:true,
                value:-1
              }]
            },
            {
              label:'树型',
              prop:'tree',
              type:'tree',
              dicData:[{
                label:'一级',
                value:0,
                children:[
                  {
                    label:'一级1',
                    value:1,
                  },{
                    label:'一级2',
                    value:2,
                  }
                ]
              }]
            }
          ]
        }
      }
    }
}
</script>
```
:::



### 后台接口列字典

:::demo 如果你的后台字典不是本地字典，支持给每一列属性单独配置网络字典

```html
<avue-crud :data="data2" :option="option3" ></avue-crud>

<script>
export default {
    data() {
      return {
        data2: [
          {
            name:'张三',
            sex:'男',
            grade:'110000'
          }, {
            name:'李四',
            sex:'女',
            grade:'120000'
          }
        ],
        option3:{
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
              props: {
                  label: 'name',
                  value: 'code'
              },
              dicUrl:'https://cli2.avue.top/api/area/getProvince'
            }
          ]
        }
      }
    }
}
</script>
```
:::