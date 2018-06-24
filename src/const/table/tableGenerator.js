import {
    DIC
} from '@/const/dic'
export default {
    page: false,
    index: true,
    height: 300,
    labelWidth: 100,
    dicData: DIC,
    column: [{
            label: "列名称",
            prop: "label",
            rules: [{
                required: true,
                message: "请输入列名称",
                trigger: "blur"
            }]
        },
        {
            label: "json字段",
            prop: "prop",
            rules: [{
                required: true,
                message: "请输入json字段",
                trigger: "blur"
            }]
        },
        {
            label: "表单类型",
            prop: "type",
            type: "select",
            dicData: 'CRUDTYPE',
            rules: [{
                required: true,
                message: "请选择表单类型",
                trigger: "blur"
            }]
        },
        {
            label: "默认值",
            prop: "valueDefault",
            hide: true
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
            label: "表单禁止",
            prop: "disabled",
            hide: true,
            type: "select",
            dicData: 'VAILDATA',
        },
        {
            label: "表单新增禁止",
            prop: "addDisabled",
            hide: true,
            type: "select",
            dicData: 'VAILDATA',
        },
        {
            label: "表单可清空",
            prop: "clearable",
            hide: true,
            type: "select",
            dicData: 'VAILDATA',
        },
        {
            label: "表单隐藏",
            prop: "visdiplay",
            hide: true,
            type: "select",
            dicData: 'VAILDATA',
        },
        {
            label: "表单自定义",
            prop: "solt",
            hide: true,
            type: "select",
            dicData: 'VAILDATA',
        },
        {
            label: "列自定义",
            prop: "formsolt",
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
            type: 'select',
            dicData: '',
        }
    ]
}