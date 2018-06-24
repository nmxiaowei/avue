import {
    DIC
} from '@/const/dic'
export default {
    maxHeight: 400,
    index: true,
    border: true,
    expand: true,
    stripe: true,
    selection: true,
    menuWidth: 300,
    menuAlign: 'center',
    editBtn: false,
    align: 'center',
    searchSize: 'small',
    // defaultSort: {
    //   prop: 'name',
    //   order: 'descending'
    // },
    dicData: DIC,
    column: [{
            label: "用户名",
            prop: "username",
            width: 120,
            sortable: true,
            search: true,
            solt: true,
            placeholder: '自定义输入placeholder',
            rules: [{
                required: true,
                message: "请输入用户名",
                trigger: "blur"
            }]
        },
        {
            label: "姓名",
            prop: "name",
            sortable: true,
            addDisabled: false,
            formsolt: true,
        },
        {
            label: "数字",
            prop: "number",
            sortable: true,
            addVisdiplay: false,
            editDisabled: true,
            type: 'number',
            hide: true,
        },
        {
            label: "类型",
            prop: "type",
            type: "cascader",
            dicData: 'TYPE',
            hide: true,
        },
        {
            label: "时间",
            prop: "time",
            type: "time",
            hide: true,
        },
        {
            label: "开关",
            prop: "switch",
            type: "switch",
            dicData: 'TYPE',
            hide: true,
        },
        {
            label: "select多选",
            prop: "select",
            type: "select",
            multiple: true,
            dicData: 'TYPE',
            hide: true,
        },
        {
            label: "日期时间",
            prop: "datetime",
            type: "datetime",
            hide: true,
        },
        {
            label: "权限",
            prop: "grade",
            type: "radio",
            dicData: 'VAILDATA',
            search: true,
            valueDefault: true,
            formatter: (row) => {
                return row.grade
            },
        },
        {
            label: "密码",
            prop: "password",
            type: "password",
            hide: true
        },
        {
            label: "地址",
            prop: "address",
            width: "300",
            sortable: true,
            type: 'textarea',
            maxRow: 4,
            minRow: 4,
            span: 24,
            disabled: true,
            addDisabled: false,
            overHidden: true
        }
    ]
};