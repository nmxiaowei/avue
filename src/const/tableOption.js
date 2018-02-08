export default {
    border: true,
    index: true,
    selection: true,
    column: [
        {
            label: "用户名",
            prop: "username",
            width: "150",
            dataDetail: row => {
                return row.username;
            },
            rules: [{ required: true, message: "请输入用户名", trigger: "blur" }]
        },
        {
            label: "姓名",
            prop: "name"
        },
        {
            label: "类型",
            prop: "type",
            type: "select",
            dicData: [
                {
                    label: "一级",
                    value: 0
                },
                {
                    label: "二级",
                    value: 1
                }
            ]
        },
        {
            label: "性别",
            prop: "sex",
            type: "radio",
            dicData: [
                {
                    label: "男",
                    value: 0
                },
                {
                    label: "女",
                    value: 1
                }
            ]
        },
        {
            label: "权限",
            prop: "grade",
            type: "checkbox",
            dicData: [
                {
                    label: "管理员",
                    value: 0
                },
                {
                    label: "二级管理员",
                    value: 1
                }
            ]
        },
        {
            label: "地址",
            prop: "address",
            width: "200"
        }
    ]
};