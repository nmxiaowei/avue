export default {
  common: {
    submitBtn: '确定',
    cancelBtn: '取消',
    closeBtn: '关闭',
    condition: '条件',
    display: '显示',
    hide: '隐藏',
    view: '查看',
    select: '选择',
    more: '更多',
    tip: '提示'
  },
  tip: {
    select: '请选择',
    input: '请输入'
  },
  check: {
    checkAll: '全选'
  },
  upload: {
    upload: '点击上传',
    tip: '将文件拖到此处，或'
  },
  time: {
    start: '开始',
    end: '结束'
  },
  date: {
    start: '开始日期',
    end: '结束日期',
    t: '今日',
    y: '昨日',
    n: '最近7天',
    a: '全部'
  },
  form: {
    printBtn: '打印',
    mockBtn: '模拟',
    submitBtn: '提交',
    emptyBtn: '清空'
  },
  countdown: {
    day: '天',
    hour: '时',
    minute: '分',
    second: '秒'
  },
  product: {
    sold: '已售 {value}',
    stock: '库存 {value}',
    buyNow: '立即购买',
    addToCart: '加入购物车'
  },
  chat: {
    sendBtn: '发送',
    quickReplyPlaceholder: '请输入快捷回复语',
    addressRequired: '地址不能为空',
    addressPlaceholder: '请输入地址',
    inputPlaceholder: '请输入...',
    uploadImageTitle: '图片上传',
    uploadVideoTitle: '视频上传',
    uploadFileTitle: '文件上传',
    notificationDenied: '用户拒绝了通知权限。',
    notificationRejected: '用户拒绝了通知权限申请。',
    fileLabel: '文件',
    mapLabel: '地图'
  },
  flow: {
    deleteNodeConfirm: '确定要删除节点 {nodeId} 吗？',
    deleteLineConfirm: '确定删除所点击的线吗？',
    noSelfConnect: '不能连接自己',
    noDuplicateConnect: '不能重复连线',
    noLoopConnect: '不能回环哦'
  },
  login: {
    usernameLabel: '用户名',
    usernamePlaceholder: '请输入用户名',
    passwordLabel: '密码',
    passwordPlaceholder: '请输入密码',
    codeLabel: '验证码',
    codePlaceholder: '请输入验证码',
    submitBtn: '登录',
    sendCode: '发送验证码',
    resendCode: '{time}s后重获取'
  },
  tree: {
    filterPlaceholder: '输入关键字进行过滤'
  },
  map: {
    searchPlaceholder: '输入关键字选取地点'
  },
  cron: {
    placeholder: '点击配置Cron表达式',
    title: 'Cron表达式配置',
    expression: 'Cron表达式：',
    nextTimes: '最近执行时间：',
    units: {
      second: '秒',
      minute: '分',
      hour: '时',
      day: '日',
      month: '月',
      week: '周'
    },
    weekLabels: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    every: '每{label}执行',
    notSpecify: '不指定',
    range: '周期',
    from: '从',
    to: '到',
    step: '步长',
    startingFrom: '从',
    everyInterval: '开始，每',
    specify: '指定',
    invalidFormat: '表达式格式错误',
    noNextTimes: '无法计算执行时间',
    parseError: '表达式解析错误'
  },
  input: {
    phoneCodePlaceholder: '区号',
    phonePlaceholder: '请输入手机号',
    currencyPlaceholder: '请输入金额',
    bankCardPlaceholder: '请输入银行卡号',
    idCardPlaceholder: '请输入身份证号',
    emailPlaceholder: '请输入邮箱',
    platePlaceholder: '请输入车牌号',
    ipPlaceholder: '请输入IP地址',
    macPlaceholder: '请输入MAC地址',
    usccPlaceholder: '请输入统一社会信用代码',
    countries: {
      cn: '中国',
      hk: '香港',
      mo: '澳门',
      tw: '台湾',
      usca: '美国/加拿大',
      uk: '英国',
      jp: '日本',
      kr: '韩国',
      sg: '新加坡',
      au: '澳大利亚',
      de: '德国',
      fr: '法国',
      it: '意大利',
      ru: '俄罗斯',
      in: '印度',
      br: '巴西',
      es: '西班牙',
      nl: '荷兰',
      ch: '瑞士',
      se: '瑞典',
      my: '马来西亚',
      th: '泰国',
      vn: '越南',
      id: '印尼',
      ph: '菲律宾'
    },
    plateProvinces: ['京', '津', '沪', '渝', '冀', '豫', '云', '辽', '黑', '湘', '皖', '鲁', '新', '苏', '浙', '赣', '鄂', '桂', '甘', '晋', '蒙', '陕', '吉', '闽', '贵', '粤', '川', '青', '藏', '琼', '宁', '港', '澳', '台'],
    bankCardTypes: {
      unionpay: '银联卡'
    },
    genders: {
      female: '女',
      male: '男'
    },
    regions: {
      '11': '北京',
      '12': '天津',
      '13': '河北',
      '14': '山西',
      '15': '内蒙古',
      '21': '辽宁',
      '22': '吉林',
      '23': '黑龙江',
      '31': '上海',
      '32': '江苏',
      '33': '浙江',
      '34': '安徽',
      '35': '福建',
      '36': '江西',
      '37': '山东',
      '41': '河南',
      '42': '湖北',
      '43': '湖南',
      '44': '广东',
      '45': '广西',
      '46': '海南',
      '50': '重庆',
      '51': '四川',
      '52': '贵州',
      '53': '云南',
      '54': '西藏',
      '61': '陕西',
      '62': '甘肃',
      '63': '青海',
      '64': '宁夏',
      '65': '新疆',
      '71': '台湾',
      '81': '香港',
      '82': '澳门'
    },
    unknownRegion: '未知地区'
  },
  task: {
    priorityAliases: {
      high: ['high', '高'],
      medium: ['medium', '中'],
      low: ['low', '低']
    }
  },
  weather: {
    aliases: {
      sunny: ['sunny', 'clear', '晴'],
      cloudy: ['cloudy', 'partly cloudy', '多云'],
      overcast: ['overcast', '阴'],
      rain: ['rain', 'rainy', '雨'],
      snow: ['snow', 'snowy', '雪']
    }
  },
  crud: {
    excel: {
      name: '文件名',
      type: '数据',
      typeDic: {
        true: '当前页数据（当前页的全部数据）',
        false: '选中数据（当前页选中的数据）'
      },
      prop: '字段',
      params: '参数',
      paramsDic: {
        header: '表头',
        data: '数据源',
        headers: '复杂表头',
        sum: '合计统计'
      }
    },
    filter: {
      addBtn: '新增条件',
      clearBtn: '清空数据',
      resetBtn: '重置条件',
      cancelBtn: '取消',
      submitBtn: '确定'
    },
    column: {
      name: '列名',
      hide: '隐藏',
      fixed: '冻结',
      filters: '过滤',
      sortable: '排序',
      index: '顺序',
      width: '宽度'
    },
    emptyText: '暂无数据',
    tipStartTitle: '当前表格已选择',
    tipEndTitle: '项',
    editTitle: '编辑',
    copyTitle: '复制',
    addTitle: '新增',
    viewTitle: '查看',
    filterTitle: '过滤条件',
    showTitle: '列显隐',
    menu: '操作',
    addBtn: '新增',
    show: '显示',
    hide: '隐藏',
    open: '展开',
    shrink: '收缩',
    printBtn: '打印',
    mockBtn: '模拟',
    excelBtn: '导出',
    updateBtn: '修改',
    cancelBtn: '取消',
    searchBtn: '搜索',
    emptyBtn: '清空',
    menuBtn: '功能',
    saveBtn: '保存',
    viewBtn: '查看',
    editBtn: '编辑',
    copyBtn: '复制',
    delBtn: '删除'
  }
};
