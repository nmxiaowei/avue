import $log from 'plugin/logs/util';
const list = {
  'element-ui': {
    url: 'https://cdnjs.cloudflare.com/ajax/libs/element-ui/2.4.11/index.js',
    title: '需要引入Element-ui框架包',
    version: '2.4.11',
    gihub: 'https://github.com/ElemeFE/element',
  },
  'vant': {
    url: 'https://cdn.jsdelivr.net/npm/vant@1.4/lib/vant.min.js',
    title: '需要引入Vant框架包',
    version: '1.4',
    gihub: 'https://github.com/youzan/vant',
  },
  'file-saver': {
    url: 'https://cdn.bootcss.com/FileSaver.js/2014-11-29/FileSaver.min.js',
    title: '需要引入文件操作包',
    version: '2014-11-29',
    gihub: 'https://github.com/eligrey/FileSaver.js',
  },
  'xlsx': {
    url: 'https://cdn.bootcss.com/xlsx/0.14.1/xlsx.full.min.js',
    title: '需要引入excel操作包',
    version: '0.14.1',
    gihub: 'https://github.com/SheetJS/js-xlsx',
  },
  'mock': {
    url: 'https://cdn.bootcss.com/Mock.js/1.0.1-beta3/mock-min.js',
    title: '需要引入mock模拟数据包',
    version: '1.0.1-beta3',
    gihub: 'https://github.com/Colingo/mock',
  },
  'axios': {
    title: '使用网络字典需要引入以下包',
    url: 'https://cdn.bootcss.com/axios/0.19.0-beta.1/axios.js',
    version: '0.19.0-beta.1',
    gihub: 'https://github.com/axios/axios',
  }
}

export default (() => {
  return {
    logs: function (name) {
      if (__ENV__ === 'development') {
        const obj = list[name];
        $log.capsule(
          name,
          obj.title,
          'warning'
        );
        $log.warning('版本:' + obj.version);
        $log.warning('CDN:' + obj.url);
        $log.warning('GITHUB:' + obj.gihub);

      }
    }
  }
})()