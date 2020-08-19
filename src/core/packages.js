import $Log from 'plugin/logs/';
const list = {
  'AliOSS': {
    url: 'https://avuex.avue.top/cdn/aliyun-oss-sdk.min.js',
    title: '阿里云云图片上传，需要引入OSS的sdk',
    version: '6.1.0',
    github: 'https://github.com/ali-sdk/ali-oss/'
  },
  'echarts': {
    url: 'https://cdn.staticfile.org/echarts/4.2.1-rc1/echarts.min.js',
    title: '图表组件，需要引echart',
    version: '4.2.1-rc1',
    github: 'https://github.com/apache/incubator-echarts'
  },
  'Map': {
    url: 'https://webapi.amap.com/maps?v=1.4.11&key=xxxxx&plugin=AMap.PlaceSearch,https://webapi.amap.com/ui/1.0/main.js?v=1.0.11',
    title: '地图组件，需要引高德SDK',
    version: '1.4.11'
  },
  'MapUi': {
    url: 'https://webapi.amap.com/ui/1.0/main.js?v=1.0.11',
    title: '地图组件，需要引高德UISDK',
    version: '1.0.11'
  },
  'Sortable': {
    url: 'https://cdn.staticfile.org/Sortable/1.10.0-rc2/Sortable.min.js',
    title: '表格拖拽，需要引sortableJs',
    version: '1.10.0-rc2',
    github: 'https://github.com/SortableJS/Sortable'
  },
  'Screenshot': {
    url: 'https://cdn.staticfile.org/html2canvas/0.5.0-beta4/html2canvas.min.js',
    title: '需要引入html2canvas依赖包',
    version: '0.5.0-beta4',
    github: 'https://github.com/niklasvh/html2canvas/'
  },
  'CryptoJS': {
    url: 'https://avuejs.com/cdn/CryptoJS.js',
    title: '七牛云图片上传，需要引入CryptoJS',
    version: '3.1.2'
  },
  'ant-design-vue': {
    url: '',
    title: '需要引入ant-design-vue框架包',
    version: '1.3.14',
    gihub: 'https://github.com/vueComponent/ant-design-vue'
  },
  'element-ui': {
    url: 'https://cdnjs.cloudflare.com/ajax/libs/element-ui/2.12.0/index.js',
    title: '需要引入Element-ui框架包',
    version: '2.11.0',
    gihub: 'https://github.com/ElemeFE/element'
  },
  'hljs': {
    url: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.6/highlight.min.js',
    title: '需要引入hljs框架包',
    version: '9.15.6',
    gihub: 'https://github.com/highlightjs/highlight.js'
  },
  'vant': {
    url: 'https://cdn.jsdelivr.net/npm/vant@1.6/lib/vant.min.js',
    title: '需要引入Vant框架包',
    version: '1.6',
    gihub: 'https://github.com/youzan/vant'
  },
  'file-saver': {
    url: 'https://cdn.staticfile.org/FileSaver.js/2014-11-29/FileSaver.min.js',
    title: '需要引入文件操作包',
    version: '2014-11-29',
    gihub: 'https://github.com/eligrey/FileSaver.js'
  },
  'xlsx': {
    url: 'https://cdn.staticfile.org/xlsx/0.14.1/xlsx.full.min.js',
    title: '需要引入excel操作包',
    version: '0.14.1',
    gihub: 'https://github.com/SheetJS/js-xlsx'
  },
  'mock': {
    url: 'https://cdn.staticfile.org/Mock.js/1.0.1-beta3/mock-min.js',
    title: '需要引入mock模拟数据包',
    version: '1.0.1-beta3',
    gihub: 'https://github.com/Colingo/mock'
  },
  'axios': {
    title: '需要引入axios发送数据包',
    url: 'https://cdn.staticfile.org/axios/0.19.0-beta.1/axios.js',
    version: '0.19.0-beta.1',
    github: 'https://github.com/axios/axios'
  }
};

export default (() => {
  return {
    logs: function(name) {
      const obj = list[name];
      $Log.capsule(
        name,
        obj.title,
        'warning'
      );
      $Log.warning('版本:' + (obj.version || '-'));
      $Log.warning('CDN:' + (obj.url || '-'));
      $Log.warning('GITHUB:' + (obj.github || '-'));
    }
  };
})();
