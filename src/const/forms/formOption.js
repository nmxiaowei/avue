import {
    DIC
} from '@/const/dic'
export default {
    dicData: DIC,
    submitText: '完成',
    column: [{
            label: "用户名",
            prop: "username",
            rules: [{
                required: true,
                message: "请输入用户名",
                trigger: "blur"
            }],
        },
        {
            label: "姓名",
            prop: "name",
            disabled: true,
            formsolt: true,
        },
        {
            label: "类型",
            prop: "type",
            type: "select",
            dicData: 'GRADE'
        },
        {
            label: "权限",
            prop: "grade",
            type: "checkbox",
            dicData: 'GRADE'
        },
        {
            label: "性别",
            prop: "sex",
            type: "radio",
            dicData: 'SEX',
            valueDefault: 0,
        },
        {
            label: "数字",
            prop: "number",
            type: 'number',
            minRows: 0,
            maxRows: 3,
        },
        {
            label: "开关",
            prop: "switch",
            type: "switch",
            dicData: 'SEX',
            hide: true,
        },
        {
            label: "地址",
            span: 24,
            formHeight: 180,
            type: "ueditor",
            prop: "address",
        }
    ]
};