<script>
const DIC = {
    VAILD: [{
        label: '真',
        value: 'true',
        color: 'green'
    }, {
        label: '假',
        value: 'false',
        color: 'red'
    }],
    SEX: [{
        label: '男',
        value: 0,
        color: 'green'
    }, {
        label: '女',
        value: 1,
        color: 'red'
    }]
}
export default {
 data() {
      return {
        obj:{},
        option:{
            dicData:DIC,
            submitText: '完成',
            column: [{
                    label: "用户名",
                    prop: "username",
                    tip: '这是信息提示',
                    span: 24,
                    maxlength: 3,
                    suffixIcon: 'el-icon-tickets',
                    prefixIcon: 'el-icon-tickets',
                    minlength: 2,
                    row: true,
                    rules: [{
                        required: true,
                        message: "请输入用户名",
                        trigger: "blur"
                    }],
                },
                {
                    label: "姓名",
                    prop: "name",
                },
                {
                    label: "类型",
                    prop: "type",
                    type: "select",
                    dicData: 'VAILD'
                },
                {
                    label: "权限",
                    prop: "grade",
                    span: 6,
                    type: "checkbox",
                    dicData: 'VAILD'
                },

                {
                    label: "开关",
                    prop: "switch",
                    span: 6,
                    type: "switch",
                    dicData: 'SEX',
                    hide: true,
                },
                {
                    label: "性别",
                    prop: "sex",
                    span: 6,
                    type: "radio",
                    dicData: 'SEX',
                    valueDefault: 0,
                },
                {
                    label: "数字",
                    prop: "number",
                    type: 'number',
                    span: 6,
                    valueDefault: 3,
                    minRows: 0,
                    maxRows: 3,
                },
                {
                    label: "地址",
                    span: 24,
                    minRows: 10,
                    type: "ueditor",
                    prop: "address",
                },{
                    label: "建议",
                    span: 24,
                    prop: "adit",
                }]
            }
        }
    },
    created(){
        this.obj.username = 'smallwei'
        this.obj.switch = 0
    },
    methods:{
        submit () {
        this.$message.success('当前数据'+JSON.stringify(this.obj));
        },
    }
  }
</script>

<style>

</style>

## Form 模块



### 基础

:::demo  
```html
<avue-form v-model="obj" :option="option" @submit="submit"></avue-crud>

<script>
const DIC = {
    VAILD: [{
        label: '真',
        value: 'true',
        color: 'green'
    }, {
        label: '假',
        value: 'false',
        color: 'red'
    }],
    SEX: [{
        label: '男',
        value: 0,
        color: 'green'
    }, {
        label: '女',
        value: 1,
        color: 'red'
    }]
}
export default {
 data() {
      return {
        obj:{},
        option:{
            dicData:DIC,
            submitText: '完成',
            column: [{
                    label: "用户名",
                    prop: "username",
                    tip: '这是信息提示',
                    span: 24,
                    maxlength: 3,
                    suffixIcon: 'el-icon-tickets',
                    prefixIcon: 'el-icon-tickets',
                    minlength: 2,
                    row: true,
                    rules: [{
                        required: true,
                        message: "请输入用户名",
                        trigger: "blur"
                    }],
                },
                {
                    label: "姓名",
                    prop: "name",
                },
                {
                    label: "类型",
                    prop: "type",
                    type: "select",
                    dicData: 'VAILD'
                },
                {
                    label: "权限",
                    prop: "grade",
                    span: 6,
                    type: "checkbox",
                    dicData: 'VAILD'
                },

                {
                    label: "开关",
                    prop: "switch",
                    span: 6,
                    type: "switch",
                    dicData: 'SEX',
                    hide: true,
                },
                {
                    label: "性别",
                    prop: "sex",
                    span: 6,
                    type: "radio",
                    dicData: 'SEX',
                    valueDefault: 0,
                },
                {
                    label: "数字",
                    prop: "number",
                    type: 'number',
                    span: 6,
                    valueDefault: 3,
                    minRows: 0,
                    maxRows: 3,
                },
                {
                    label: "地址",
                    span: 24,
                    minRows: 10,
                    type: "ueditor",
                    prop: "address",
                },{
                    label: "建议",
                    span: 24,
                    prop: "adit",
                }]
            }
        }
    },
    created(){
        this.obj.username = 'smallwei';
        this.obj.switch = 0
    },
    methods:{
        submit () {
        this.$message.success('当前数据'+JSON.stringify(this.obj));
        },
    }
  }
</script>
```
:::

