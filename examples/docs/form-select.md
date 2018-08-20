<script>
const baseUrl = `http://51aizhiyuan.com/select`;
export default {
 data() {
      return {
         data:{
             
         },
         option:{
            props: {
                label: 'name',
                value: 'code'
            },
            column: [ {
                label: '省份',
                prop: 'province',
                type: 'select',
                cascader: ['city', 'area'],
                cascaderFirst: true,
                dicUrl: `${baseUrl}/getProvince`,
                dicData: 'province',
                rules: [{
                    required: true,
                    message: "请选择省份",
                    trigger: "blur"
                }]
            }, {
                label: '城市',
                prop: 'city',
                type: 'select',
                dicFlag: false,
                dicUrl: `${baseUrl}/getCity/{{key}}`,
                dicData: 'city',
                rules: [{
                    required: true,
                    message: "请选择城市",
                    trigger: "blur"
                }]
            }, {
                label: '地区',
                prop: 'area',
                dicFlag: false,
                type: 'select',
                dicUrl: `${baseUrl}/getArea/{{key}}`,
                dicData: 'area',
                rules: [{
                    required: true,
                    message: "请选择地区",
                    trigger: "blur"
                }]
            }]
        }
      }
    },
    methods: {
     submit(){
       this.$message.success('当前数据'+JSON.stringify(this.form))
     }
    }
}
</script>

<style>

</style>

## Form 模块



### 多级联动

:::demo 
```html
<avue-form v-model="data" :option="option" @submit="submit"></avue-form>

<script>
const baseUrl = `http://51aizhiyuan.com/select`;
export default {
 data() {
      return {
         data:{},
         option:{
            props: {
                label: 'name',
                value: 'code'
            },
            column: [ {
                label: '省份',
                prop: 'province',
                type: 'select',
                cascader: ['city', 'area'],
                cascaderFirst: true,
                dicUrl: `${baseUrl}/getProvince`,
                dicData: 'province',
                rules: [{
                    required: true,
                    message: "请选择省份",
                    trigger: "blur"
                }]
            }, {
                label: '城市',
                prop: 'city',
                type: 'select',
                dicFlag: false,
                dicUrl: `${baseUrl}/getCity/{{key}}`,
                dicData: 'city',
                rules: [{
                    required: true,
                    message: "请选择城市",
                    trigger: "blur"
                }]
            }, {
                label: '地区',
                prop: 'area',
                dicFlag: false,
                type: 'select',
                dicUrl: `${baseUrl}/getArea/{{key}}`,
                dicData: 'area',
                rules: [{
                    required: true,
                    message: "请选择地区",
                    trigger: "blur"
                }]
            }]
        }
      }
    },
    methods: {
     submit(){
       this.$message.success('当前数据'+JSON.stringify(this.form))
     }
    }
}
</script>
```
:::


