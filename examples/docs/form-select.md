<script>
const baseUrl = `https://cli2.avue.top/api/area`;
export default {
 data() {
      return {
        data:{},
        data1:[
            {
                province:"110000",
                city:"110100",
                area:"110101"
            },{
                province:"140000",
                city:"140600",
                area:"140623"
            }
         ],
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
        },
        option1:{
            props: {
                label: 'name',
                value: 'code'
            },
            align:'center',
            menuAlign:'center',
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
                hide:true,
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
                hide:true,
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
    mounted(){
       this.data.province = "110000";
       this.data.city = "110100";
       this.data.area = "110101"
    },
    methods: {
     submit(){
       this.$message.success('当前数据'+JSON.stringify(this.data))
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
const baseUrl = `https://cli2.avue.top/api/area`;
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
    mounted(){
       this.data.province = "110000";
       this.data.city = "110100";
       this.data.area = "110101"
    },
    methods: {
     submit(){
       this.$message.success('当前数据'+JSON.stringify(this.data))
     }
    }
}
</script>
```
:::


### 表格联动

:::demo 
```html
<avue-crud :option="option1" :data="data1" @submit="submit"></avue-crud>

<script>
const baseUrl = `https://cli2.avue.top/api/area`;
export default {
 data() {
      return {
         data1:[
            {
                province:"110000",
                city:"110100",
                area:"110101"
            },{
                province:"140000",
                city:"140600",
                area:"140623"
            }
         ],
         option1:{
            props: {
                label: 'name',
                value: 'code'
            },
            align:'center',
            menuAlign:'center',
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
                hide:true,
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
                hide:true,
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
       this.$message.success('当前数据'+JSON.stringify(this.data))
     }
    }
}
</script>
```
:::


