export default {
    dic: ['GRADE', 'SEX'],
    submitText: '完成',
    column: [
        {
            label: "用户名",
            prop: "username",
            rules: [{ required: true, message: "请输入用户名", trigger: "blur" }],
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
            dicData: 'SEX'
        },
        {
            label: "地址",
            span: 24,
            type: "textarea",
            prop: "address",
        }
    ]
};