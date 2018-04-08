export default {
    dic: ["CRUDTYPE", 'VAILDATA'],
    page: false,
    column: [
        {
            label: "列名称",
            prop: "label"
        },
        {
            label: "json字段",
            prop: "prop"
        },

        {
            label: "单格类型",
            prop: "type",
            type: "select",
            dicData: 'CRUDTYPE',
        },
        {
            label: "列宽度",
            prop: "width",
            hide: true
        },
        {
            label: "冻结列",
            prop: "fixed",
            hide: true,
            type: "select",
            dicData: 'VAILDATA',
        },
        {
            label: "隐藏列",
            prop: "hide",
            hide: true,
            type: "select",
            dicData: 'VAILDATA',
        },
        {
            label: "表单栅列",
            prop: "span",
            hide: true
        },
        {
            label: "表单隐藏",
            prop: "visdiplay",
            hide: true,
            type: "select",
            dicData: 'VAILDATA',
        },
        {
            label: "自定义",
            prop: "solt",
            hide: true,
            type: "select",
            dicData: 'VAILDATA',
        },
        {
            label: "超省略号",
            prop: "overHidden",
            hide: true,
            type: "select",
            dicData: 'VAILDATA',
        },
        {
            label: "字典",
            prop: "dicData",
            hide: true
        }
    ]
}