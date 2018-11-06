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
                    span: 8,
                    maxlength: 3,
                    suffixIcon: 'el-icon-tickets',
                    prefixIcon: 'el-icon-tickets',
                    minlength: 2,
                    rules: [{
                        required: true,
                        message: "请输入用户名",
                        trigger: "blur"
                    }],
                    change:({value,column})=>{
                        this.obj.address=value;
                        this.$message.success('address change')
                    },
                    click:({value,column})=>{
                        this.$message.success('click')
                    }
                },
                {
                    label: "姓名",
                    prop: "name",
                    span:8,
                },
                {
                    label: "类型",
                    prop: "type",
                    type: "select",
                    dicData: 'VAILD',
                    span:6,
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
                    row:true,
                },
                {
                    label: "性别",
                    prop: "sex",
                    span: 6,
                    type: "radio",
                    dicData: 'SEX',
                    valueDefault: 0,
                    change:({value,column})=>{
                        this.$message.success('change')
                    }
                },
                {
                    label: "数字",
                    prop: "number",
                    type: 'number',
                    span: 6,
                    valueDefault: 3,
                    minRows: 0,
                    maxRows: 3,
                    row:true,
                },
                {
                    label: "网站",
                    span: 12,
                    prop: "url",
                    prepend:'http://',
                    append:'com',
                },
                {
                    label: "地址",
                    span: 24,
                    prop: "address",
                },{
                    label: "建议",
                    span: 24,
                    prop: "adit",
                },{
                    label: "手机号",
                    span: 12,
                    prop: "phone",
                    type:'phone'
                }]
            }
        }
    },
    created(){
        this.obj.username = 'smallwei'
        this.obj.switch = 0;
        this.obj.phone='17547400800';
    },
    methods:{
        emptytChange(){
          this.$message.success('清空方法回调');
        },
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

:::demo  里面主要包含了`change`和`click`俩个回调方法，返回当前的值`value`和列的属性`column`,`resetForm`清空表单内容，但是默认值不会被清空,`resetChange`为清空方法的回调,如果想阻止依次排列，在组织属性后面加入row为true即可，具体看如下例子
```html
<avue-form ref="form" v-model="obj" :option="option" @reset-change="emptytChange" @submit="submit"></avue-crud>

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
                    span: 8,
                    maxlength: 3,
                    suffixIcon: 'el-icon-tickets',
                    prefixIcon: 'el-icon-tickets',
                    minlength: 2,
                    rules: [{
                        required: true,
                        message: "请输入用户名",
                        trigger: "blur"
                    }],
                    change:({value,column})=>{
                        this.obj.address=value;
                        this.$message.success('address change')
                    },
                    click:({value,column})=>{
                        this.$message.success('click')
                    }
                },
                {
                    label: "姓名",
                    prop: "name",
                    span:8,
                },
                {
                    label: "类型",
                    prop: "type",
                    type: "select",
                    dicData: 'VAILD',
                    span:6,
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
                    row:true,
                },
                {
                    label: "性别",
                    prop: "sex",
                    span: 6,
                    type: "radio",
                    dicData: 'SEX',
                    valueDefault: 0,
                    change:({value,column})=>{
                        this.$message.success('change')
                    }
                },
                {
                    label: "数字",
                    prop: "number",
                    type: 'number',
                    span: 6,
                    valueDefault: 3,
                    minRows: 0,
                    maxRows: 3,
                    row:true,
                },
                {
                    label: "网站",
                    span: 12,
                    prop: "url",
                    prepend:'http://',
                    append:'com',
                },
                {
                    label: "地址",
                    span: 24,
                    prop: "address",
                },{
                    label: "建议",
                    span: 24,
                    prop: "adit",
                },{
                    label: "手机号",
                    span: 12,
                    prop: "phone",
                    type:'phone'
                }]
            }
        }
    },
    created(){
        this.obj.username = 'smallwei';
        this.obj.switch = 0;
        // this.obj.phone='17547400800';
    },
    methods:{
        submit () {
          this.$message.success('当前数据'+JSON.stringify(this.obj));
        },
        resetChange(){
          this.$message.success('清空方法回调');
        },
    }
  }
</script>
```
:::

