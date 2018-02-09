import {
  baseUrl
} from '@/config/env'
export default [{
  title: "欢迎页面!",
  href: '/wel/',
  icon: 'icon-huanyingye',
  children: [],
}, {
  title: "第三方网站",
  href: '',
  icon: 'icon-iframe',
  children: [{
    title: "百度",
    href: 'https://www.baidu.com',
    icon: 'icon-baidu1',
    children: [],
  }, {
    title: "搜狐",
    href: 'http://www.shouhu.com',
    icon: 'icon-souhu',
    children: [],
  }, {
    title: "360",
    href: 'http://www.360.com',
    icon: 'icon-msnui-360',
    children: [],

  }]
}, {
  title: "表格CRUD",
  href: '/table/',
  icon: 'icon-biaoge',
  children: []
}, {
  title: "阿里图标",
  href: '/iconfont/',
  icon: 'icon-changyonglogo27',
  children: []
}, {
  title: "错误日志",
  href: '/errlog/',
  icon: 'icon-cuowu',
  children: []
}]
