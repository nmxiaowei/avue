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
                },{
                  label:'禁止项',
                  disabled:true,
                  value:-1
                }
              ]
            }
          ]
        },
        option1:{
          dicData:DIC,
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
              dicData:'GRADE'
            }
          ]
        },
        option2:{
          props: {
              label: 'name',
              value: 'code'
          },
          dicUrl:'https://avue.top/api/area/{{key}}',
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
              dicData:'getProvince'
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
              dicUrl:'https://avue.top/api/area/{{key}}',
              dicData:'getProvince'
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



### 单独列本地字典

:::demo 本地字典只要配置`dicData`为一个`Array`数组即可，便会自动加载字典到对应的组件中
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
                },{
                  label:'禁止项',
                  disabled:true,
                  value:-1
                }
              ]
            }
          ]
        }
      }
    }
}
</script>
```
:::


### 字典集合列字典

:::demo 字典集合就是把组件中要的字典集中到一个`Object`对象，把对象传给组件的`dicData`中，列中每一个`dicData`为要加载对象中`key`的`String`值即可
```html
<avue-crud :data="data" :option="option1" ></avue-crud>

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
      }]
  }
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
        option1:{
          dicData:DIC,
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
              dicData:'GRADE'
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

:::demo 配置属性中的`dicUrl`属性，其中的`key`为字典要替换的关键字位置,列的dicData配置字典的名称即可,默认的返回key-value为`label`和`value`，如果后台返返回字典不是默认字段，你也可以配置`props`属性去改变它的指定,列字典和本地字典以及接口字典可以同时使用！！！

```html
<avue-crud :data="data2" :option="option2" ></avue-crud>

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
        option2:{
          props: {
              label: 'name',
              value: 'code'
          },
          dicUrl:'https://avue.top/api/area/{{key}}',
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
              dicData:'getProvince'
            }
          ]
        }
      }
    }
}
</script>
```
:::

### 单独列后台接口列字典

:::demo 如果你的后台字典不是统一的模式，支持给每一列属性单独配置字典

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
              dicUrl:'https://avue.top/api/area/{{key}}',
              dicData:'getProvince'
            }
          ]
        }
      }
    }
}
</script>
```
:::