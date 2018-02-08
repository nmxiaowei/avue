export default {
    border: true,
    index: true,
    selection: true,
    column: [
        {
            label: "用户名",
            prop: "username",
            width: "150",
            dataDetail: val => {
                return `<span class="el-tag el-tag--success">${val}</span>`;
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
            dataDetail: val => {
                return `<span class="el-tag">${val}</span>`;
            },
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
            width: "80",
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
            width: "300",
            hidden: true
        }
    ]
};