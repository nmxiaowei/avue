export default {
    border: true,
    index: true,
    selection: true,
    menuWidth: 300,
    editBtn: false,
    dic: ['GRADE', 'SEX', 'TYPE'],
    column: [
        {
            label: "用户名",
            prop: "username",
            width: "150",
            solt: true,
            dataDetail: row => {
                return row.username + '自定义函数';
            },
            rules: [{ required: true, message: "请输入用户名", trigger: "blur" }]
        },
        {
            label: "姓名",
            prop: "name",
            disabled: true,
            addDisabled: false,
            formsolt: true,
        },
        {
            label: "类型",
            prop: "type",
            type: "cascader",
            dicData: 'TYPE'
        },
        {
            label: "权限",
            prop: "grade",
            type: "checkbox",
            dicData: 'GRADE'
        },
        {
            label: "地址",
            prop: "address",
            width: "300",
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