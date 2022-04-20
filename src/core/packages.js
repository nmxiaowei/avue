import $Log from 'plugin/logs/';
const list = {
  'AliOSS': {
    title: '阿里云云图片上传，需引入OSS的sdk',
    github: 'https://github.com/ali-sdk/ali-oss/'
  },
  'Map': {
    url: 'https://webapi.amap.com/maps?v=1.4.11&key=xxxxx&plugin=AMap.PlaceSearch,https://webapi.amap.com/ui/1.0/main.js?v=1.0.11',
    title: '地图组件，需引入高德SDK',
  },
  'MapUi': {
    url: 'https://webapi.amap.com/ui/1.0/main.js?v=1.0.11',
    title: '地图组件，需引入高德UISDK',
  },
  'Sortable': {
    url: 'https://cdn.staticfile.org/Sortable/1.10.0-rc2/Sortable.min.js',
    title: '拖拽，需引入sortableJs',
    github: 'https://github.com/SortableJS/Sortable'
  },
  'Screenshot': {
    url: 'https://cdn.staticfile.org/html2canvas/0.5.0-beta4/html2canvas.min.js',
    title: '需引入html2canvas依赖包',
    github: 'https://github.com/niklasvh/html2canvas/'
  },
  'CryptoJS': {
    url: 'https://avuejs.com/cdn/CryptoJS.js',
    title: '七牛云图片上传，需引入CryptoJS'
  },
  'hljs': {
    url: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.6/highlight.min.js',
    title: '需引入hljs框架包',
    github: 'https://github.com/highlightjs/highlight.js'
  },
  'file-saver': {
    url: 'https://cdn.staticfile.org/FileSaver.js/2014-11-29/FileSaver.min.js',
    title: '需引入文件操作包',
    github: 'https://github.com/eligrey/FileSaver.js'
  },
  'xlsx': {
    url: 'https://cdn.staticfile.org/xlsx/0.18.2/xlsx.full.min.js',
    title: '需引入excel操作包',
    github: 'https://github.com/protobi/js-xlsx'
  },
  'mock': {
    url: 'https://cdn.staticfile.org/Mock.js/1.0.1-beta3/mock-min.js',
    title: '需要引入mock模拟数据包',
    github: 'https://github.com/Colingo/mock'
  }
};

export default (() => {
  return {
    logs: function (name) {
      const obj = list[name];
      $Log.capsule(
        name,
        obj.title,
        'warning'
      );
      $Log.warning('CDN:' + (obj.url || '-'));
      $Log.warning('GITHUB:' + (obj.github || '-'));
    }
  };
})();
