
export const DIC = {
    SEX: [{
        label: '男',
        value: 0
    }, {
        label: '女',
        value: 1
    }],
    TYPE: [
        {
            label: '一级1',
            value: 0,
            children: [
                {
                    label: '一级1二级1',
                    value: 2,
                }
            ]
        }, {
            label: '一级2',
            value: 1,
            children: [
                {
                    label: '一级2二级1',
                    value: 2,
                }
            ]
        }

    ],
    STATE: [{
        label: '有效',
        value: 0
    }, {
        label: '无效',
        value: 1
    }],
    GRADE: [
        {
            label: "管理员",
            value: 0
        },
        {
            label: "二级管理员",
            value: 1
        }
    ],
    VAILDATA: [
        {
            label: "激活",
            value: true
        },
        {
            label: "禁用",
            value: false
        }
    ],
    CRUDTYPE: [
        {
            label: "选择框",
            value: 'select'
        },
        {
            label: "文本框",
            value: 'text'
        },
        {
            label: "多行文本框",
            value: 'textarea'
        },
        {
            label: "单选框",
            value: 'radio'
        },
        {
            label: "多选框",
            value: 'checkbox'
        },
        {
            label: "日期框",
            value: 'date'
        }
    ],
    DATALIST: [{
        label: 'SEX',
        value: 'SEX',
    }, {
        label: 'STATE',
        value: 'STATE',
    }, {
        label: 'GRADE',
        value: 'GRADE',
    }]
}
