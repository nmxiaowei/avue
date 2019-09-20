import $Log from 'plugin/logs/';
const list = {
  'AliOSS': {
    url: 'https://avuex.avue.top/cdn/aliyun-oss-sdk.min.js',
    title: '阿里云云图片上传，需要引入OSS的sdk',
    version: '6.1.0',
    github: 'https://github.com/ali-sdk/ali-oss/'
  },
  'Sortable': {
    url: 'https://cdn.bootcss.com/Sortable/1.10.0-rc2/Sortable.min.js',
    title: '表格拖拽，需要引sortableJs',
    version: '1.10.0-rc2',
    github: 'https://github.com/SortableJS/Sortable'
  },
  'Screenshot': {
    url: 'https://cdn.bootcss.com/html2canvas/0.5.0-beta4/html2canvas.min.js',
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
    url: 'https://cdnjs.cloudflare.com/ajax/libs/element-ui/2.11.0/index.js',
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
    url: 'https://cdn.bootcss.com/FileSaver.js/2014-11-29/FileSaver.min.js',
    title: '需要引入文件操作包',
    version: '2014-11-29',
    gihub: 'https://github.com/eligrey/FileSaver.js'
  },
  'xlsx': {
    url: 'https://cdn.bootcss.com/xlsx/0.14.1/xlsx.full.min.js',
    title: '需要引入excel操作包',
    version: '0.14.1',
    gihub: 'https://github.com/SheetJS/js-xlsx'
  },
  'mock': {
    url: 'https://cdn.bootcss.com/Mock.js/1.0.1-beta3/mock-min.js',
    title: '需要引入mock模拟数据包',
    version: '1.0.1-beta3',
    gihub: 'https://github.com/Colingo/mock'
  },
  'axios': {
    title: '使用网络字典需要引入以下包',
    url: 'https://cdn.bootcss.com/axios/0.19.0-beta.1/axios.js',
    version: '0.19.0-beta.1',
    gihub: 'https://github.com/axios/axios'
  }
};

export default (() => {
  return {
    logs: function (name) {
      if (__ENV__ === 'development') {
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
    }
  };
})();
