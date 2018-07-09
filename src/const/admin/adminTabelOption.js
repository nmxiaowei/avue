import {
    DIC
} from '@/const/dic'
export const userOption = {
    border: true,
    index: true,
    height: 'auto',
    indexLabel: '序号',
    selection: false,
    dicData: DIC,
    dic: ['GRADE', 'STATE'],
    formWidth: '60%',
    column: [{
            label: "用户名",
            prop: "username",
            width: "150",
            rules: [{
                required: true,
                message: "请输入用户名",
                trigger: "blur"
            }]
        },
        {
            label: "角色",
            prop: "grade",
            type: "checkbox",
            dicData: 'GRADE'
        },
        {
            label: "创建时间",
            prop: "date",
            type: "datetime",
            format: "yyyy-MM-dd HH:mm:ss",
            valueFormat: "yyyy-MM-dd HH:mm:ss",
        },
        {
            label: "内容",
            prop: "ueditor",
            type: "ueditor",
            formHeight: 'auto',
            hide: true,
            span: 24,
        },
        {
            label: "状态",
            prop: "state",
            solt: true,
            type: "radio",
            dicData: 'STATE'
        }
    ]
};
export const roleOption = {
    border: true,
    index: true,
    selection: false,
    calcHeight: 320,
    menuAlign: 'center',
    menuWidth: 300,
    column: [{
            label: "角色名称",
            prop: "name",
            width: "150",
            rules: [{
                required: true,
                message: "请输入用户名",
                trigger: "blur"
            }]
        },
        {
            label: "创建时间",
            prop: "date",
            format: "yyyy-MM-dd HH:mm:ss",
            valueFormat: "yyyy-MM-dd HH:mm:ss",
            type: "date",
        }
    ]
};