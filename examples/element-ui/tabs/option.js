var infoOption = {
  column: [{
    label: '密码',
    prop: 'password',
    type: 'password',
    rules: [
      {
        required: true,
        message: '请选择地区',
        trigger: 'blur'
      }
    ]
  }, {
    label: '交通工具',
    prop: 'jtgj',
    type: 'select',
    multiple: true,
    dicData: [{
      label: '飞机',
      value: 0
    }, {
      label: '动车',
      value: 1
    }, {
      label: '驾车',
      value: 2
    }, {
      label: '其他',
      value: 3
    }]
  }, {
    label: '自定义测试',
    prop: 'test',
    formslot: true
  }]
}

var userOption = {
  group: [{
    label: '退款申请',
    prop: 'tksq',
    icon: 'el-icon-view',
    column: [{
      label: '姓名',
      prop: 'name'
    }, {
      label: '多选',
      prop: 'checkbox',
      type: 'radio',
      multiple: false,
      dicData: [{
        label: '单层',
        value: 0
      }, {
        label: '多层',
        value: 1
      }]
    }]
  }, {
    label: '用户信息',
    prop: 'yhxx',
    icon: 'el-icon-edit-outline',
    column: [{
      label: '用户名',
      prop: 'username'
    }]
  }]
}
