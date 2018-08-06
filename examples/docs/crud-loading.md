<script>
export default {
    data() {
      return {
        loading:true,
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
        },
      };
    },
    created(){
      setTimeout(()=>{
        this.loading=false;
      },5000);
    }
}
</script>

<style>

</style>

## Crud 模块



### 等待

:::demo  
```html
<avue-crud :data="data" :option="option" :table-loading="loading"></avue-crud>

<script>
export default {
    data() {
      return {
        loading:true,
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
        },
      };
    },
    created(){
      setTimeout(()=>{
        this.loading=false;
      },5000);
    }
}
</script>
```
:::