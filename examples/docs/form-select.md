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
            column: [{
                label: '姓名',
                prop: 'name',
            }, {
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
    }
  };
</script>

<style>

</style>

## Crud 表格

通过json快速生成crud表格

### 基础用法

:::demo 要设置cloumn列的数据
```html
<avue-form v-model="data" :option="option"></avue-form>

<script>
export default {
 data() {
      return {
         data:{},
         option:{
            props: {
                label: 'name',
                value: 'code'
            },
            column: [{
                label: '姓名',
                prop: 'name',
            }, {
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
    }
}
</script>
```
:::


