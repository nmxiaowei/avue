export const userOption = {
    border: true,
    index: true,
    selection: false,
    column: [
        {
            label: "用户名",
            prop: "username",
            width: "150",
            rules: [{ required: true, message: "请输入用户名", trigger: "blur" }]
        },
        {
            label: "角色",
            prop: "grade",
            type: "checkbox",
            dicData: [
                {
                    label: "超级管理员",
                    value: 0
                },
                {
                    label: "普通用户",
                    value: 1
                }
            ]
        },
        {
            label: "创建时间",
            prop: "date",
            type: "date",
            visdiplay: true,
        },
        {
            label: "状态",
            prop: "state",
            dataDetail: val => {
                return `<span class="el-tag ${val == '有效' ? 'el-tag--success' : 'el-tag--danger'}">${val}</span>`;
            },
            type: "radio",
            dicData: [
                {
                    label: "有效",
                    value: 0
                },
                {
                    label: "无效",
                    value: 1
                }
            ]
        }
    ]
};
export const roleOption = {
    border: true,
    index: true,
    selection: false,
    column: [
        {
            label: "角色名称",
            prop: "name",
            width: "150",
            rules: [{ required: true, message: "请输入用户名", trigger: "blur" }]
        },
        {
            label: "创建时间",
            prop: "date",
            visdiplay: true,
            type: "date",
        }
    ]
};