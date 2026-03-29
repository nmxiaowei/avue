export default {
  common: {
    submitBtn: 'Confirm',
    cancelBtn: 'Cancel',
    closeBtn: 'Close',
    condition: 'Condition',
    display: 'Display',
    hide: 'Hide',
    view: 'View',
    select: 'Select',
    more: 'More',
    tip: 'Tip'
  },
  tip: {
    select: 'Please select',
    input: 'Please enter'
  },
  check: {
    checkAll: 'Select all'
  },
  upload: {
    upload: 'Click to upload',
    tip: 'Drag files here, or click to upload'
  },
  time: {
    start: 'Start Time',
    end: 'End Time'
  },
  date: {
    start: 'Start Date',
    end: 'End Date',
    t: 'Today',
    y: 'Yesterday',
    n: 'Last 7 Days',
    a: 'All'
  },
  form: {
    printBtn: 'Print',
    mockBtn: 'Mock',
    submitBtn: 'Submit',
    emptyBtn: 'Reset'
  },
  countdown: {
    day: 'Days',
    hour: 'Hours',
    minute: 'Minutes',
    second: 'Seconds'
  },
  product: {
    sold: 'Sold {value}',
    stock: 'Stock {value}',
    buyNow: 'Buy Now',
    addToCart: 'Add to Cart'
  },
  chat: {
    sendBtn: 'Send',
    quickReplyPlaceholder: 'Enter a quick reply',
    addressRequired: 'Address is required',
    addressPlaceholder: 'Enter address',
    inputPlaceholder: 'Please enter...',
    uploadImageTitle: 'Upload Image',
    uploadVideoTitle: 'Upload Video',
    uploadFileTitle: 'Upload File',
    notificationDenied: 'Notification permission was denied.',
    notificationRejected: 'Notification request was rejected.',
    fileLabel: 'File',
    mapLabel: 'Map'
  },
  flow: {
    deleteNodeConfirm: 'Are you sure you want to delete node {nodeId}?',
    deleteLineConfirm: 'Delete the selected line?',
    noSelfConnect: 'Cannot connect to itself',
    noDuplicateConnect: 'Duplicate connections are not allowed',
    noLoopConnect: 'Loop connections are not allowed'
  },
  login: {
    usernameLabel: 'Username',
    usernamePlaceholder: 'Please enter username',
    passwordLabel: 'Password',
    passwordPlaceholder: 'Please enter password',
    codeLabel: 'Verification Code',
    codePlaceholder: 'Please enter verification code',
    submitBtn: 'Login',
    sendCode: 'Send Code',
    resendCode: 'Retry in {time}s'
  },
  tree: {
    filterPlaceholder: 'Enter keywords to filter'
  },
  map: {
    searchPlaceholder: 'Enter keywords to pick a location'
  },
  cron: {
    placeholder: 'Click to configure Cron expression',
    title: 'Cron Expression',
    expression: 'Cron Expression:',
    nextTimes: 'Next execution times:',
    units: {
      second: 'Second',
      minute: 'Minute',
      hour: 'Hour',
      day: 'Day',
      month: 'Month',
      week: 'Week'
    },
    weekLabels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    every: 'Every {label}',
    notSpecify: 'Not specified',
    range: 'Range',
    from: 'From',
    to: 'To',
    step: 'Step',
    startingFrom: 'Starting from',
    everyInterval: 'every',
    specify: 'Specific',
    invalidFormat: 'Invalid expression format',
    noNextTimes: 'Unable to calculate execution times',
    parseError: 'Expression parse error'
  },
  input: {
    phoneCodePlaceholder: 'Code',
    phonePlaceholder: 'Please enter phone number',
    currencyPlaceholder: 'Please enter amount',
    bankCardPlaceholder: 'Please enter bank card number',
    idCardPlaceholder: 'Please enter ID number',
    emailPlaceholder: 'Please enter email',
    platePlaceholder: 'Please enter license plate',
    ipPlaceholder: 'Please enter IP address',
    macPlaceholder: 'Please enter MAC address',
    usccPlaceholder: 'Please enter unified social credit code',
    countries: {
      cn: 'China',
      hk: 'Hong Kong',
      mo: 'Macao',
      tw: 'Taiwan',
      usca: 'United States / Canada',
      uk: 'United Kingdom',
      jp: 'Japan',
      kr: 'South Korea',
      sg: 'Singapore',
      au: 'Australia',
      de: 'Germany',
      fr: 'France',
      it: 'Italy',
      ru: 'Russia',
      in: 'India',
      br: 'Brazil',
      es: 'Spain',
      nl: 'Netherlands',
      ch: 'Switzerland',
      se: 'Sweden',
      my: 'Malaysia',
      th: 'Thailand',
      vn: 'Vietnam',
      id: 'Indonesia',
      ph: 'Philippines'
    },
    plateProvinces: ['京', '津', '沪', '渝', '冀', '豫', '云', '辽', '黑', '湘', '皖', '鲁', '新', '苏', '浙', '赣', '鄂', '桂', '甘', '晋', '蒙', '陕', '吉', '闽', '贵', '粤', '川', '青', '藏', '琼', '宁', '港', '澳', '台'],
    bankCardTypes: {
      unionpay: 'UnionPay'
    },
    genders: {
      female: 'Female',
      male: 'Male'
    },
    regions: {
      '11': 'Beijing',
      '12': 'Tianjin',
      '13': 'Hebei',
      '14': 'Shanxi',
      '15': 'Inner Mongolia',
      '21': 'Liaoning',
      '22': 'Jilin',
      '23': 'Heilongjiang',
      '31': 'Shanghai',
      '32': 'Jiangsu',
      '33': 'Zhejiang',
      '34': 'Anhui',
      '35': 'Fujian',
      '36': 'Jiangxi',
      '37': 'Shandong',
      '41': 'Henan',
      '42': 'Hubei',
      '43': 'Hunan',
      '44': 'Guangdong',
      '45': 'Guangxi',
      '46': 'Hainan',
      '50': 'Chongqing',
      '51': 'Sichuan',
      '52': 'Guizhou',
      '53': 'Yunnan',
      '54': 'Tibet',
      '61': 'Shaanxi',
      '62': 'Gansu',
      '63': 'Qinghai',
      '64': 'Ningxia',
      '65': 'Xinjiang',
      '71': 'Taiwan',
      '81': 'Hong Kong',
      '82': 'Macao'
    },
    unknownRegion: 'Unknown Region'
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
      name: 'File Name',
      type: 'Data Scope',
      typeDic: {
        true: 'Current Page',
        false: 'Selected Rows'
      },
      prop: 'Field',
      params: 'Export Item',
      paramsDic: {
        header: 'Header',
        data: 'Data Source',
        headers: 'Complex Header',
        sum: 'Summary'
      }
    },
    filter: {
      addBtn: 'Add Condition',
      clearBtn: 'Clear',
      resetBtn: 'Reset',
      cancelBtn: 'Cancel',
      submitBtn: 'Confirm'
    },
    column: {
      name: 'Column',
      hide: 'Hide',
      fixed: 'Fixed',
      filters: 'Filter',
      sortable: 'Sort',
      index: 'Index',
      width: 'Width'
    },
    emptyText: 'No Data',
    tipStartTitle: 'Selected',
    tipEndTitle: 'item(s)',
    editTitle: 'Edit',
    copyTitle: 'Copy',
    addTitle: 'Add',
    viewTitle: 'View',
    filterTitle: 'Filter Conditions',
    showTitle: 'Column Settings',
    menu: 'Actions',
    addBtn: 'Add',
    show: 'Show',
    hide: 'Hide',
    open: 'Expand',
    shrink: 'Collapse',
    printBtn: 'Print',
    mockBtn: 'Mock',
    excelBtn: 'Export',
    updateBtn: 'Update',
    cancelBtn: 'Cancel',
    searchBtn: 'Search',
    emptyBtn: 'Reset',
    menuBtn: 'Menu',
    saveBtn: 'Save',
    viewBtn: 'View',
    editBtn: 'Edit',
    copyBtn: 'Copy',
    delBtn: 'Delete'
  }
};
