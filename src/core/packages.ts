import $Log from 'plugin/logs/';

const list: Record<string, { url: string; title: string; github?: string }> = {
  AliOSS: {
    url: 'https://cdn.staticfile.org/ali-oss/6.17.1/aliyun-oss-sdk.min.js',
    title: '阿里云图片上传，需要引入 OSS 的 SDK',
    github: 'https://github.com/ali-sdk/ali-oss/',
  },
  Map: {
    url: 'https://webapi.amap.com/maps?v=1.4.11&key=xxxxx&plugin=AMap.PlaceSearch,https://webapi.amap.com/ui/1.0/main.js?v=1.0.11',
    title: '地图组件，需要引入高德 SDK',
  },
  MapUi: {
    url: 'https://webapi.amap.com/ui/1.0/main.js?v=1.0.11',
    title: '地图组件，需要引入高德 UI SDK',
  },
  Sortable: {
    url: 'https://cdn.staticfile.org/Sortable/1.10.0-rc2/Sortable.min.js',
    title: '拖拽功能，需要引入 SortableJS',
    github: 'https://github.com/SortableJS/Sortable',
  },
  Screenshot: {
    url: 'https://cdn.staticfile.org/html2canvas/0.5.0-beta4/html2canvas.min.js',
    title: '需要引入 html2canvas 依赖包',
    github: 'https://github.com/niklasvh/html2canvas/',
  },
  COS: {
    url: 'https://avuejs.com/cdn/cos-js-sdk-v5.min.js',
    title: '腾讯云图片上传，需要引入 COS',
  },
  CryptoJS: {
    url: 'https://avuejs.com/cdn/CryptoJS.js',
    title: '七牛云图片上传，需要引入 CryptoJS',
  },
  'file-saver': {
    url: 'https://cdn.staticfile.org/FileSaver.js/2014-11-29/FileSaver.min.js',
    title: '需要引入文件操作包',
    github: 'https://github.com/eligrey/FileSaver.js',
  },
  xlsx: {
    url: 'https://cdn.staticfile.org/xlsx/0.18.2/xlsx.full.min.js',
    title: '需要引入 Excel 操作包',
    github: 'https://github.com/protobi/js-xlsx',
  },
  mock: {
    url: 'https://cdn.staticfile.org/Mock.js/1.0.1-beta3/mock-min.js',
    title: '需要引入 Mock 模拟数据包',
    github: 'https://github.com/Colingo/mock',
  },
};

export default (() => {
  return {
    logs(name: string) {
      const obj = list[name];
      if (!obj) return;
      $Log.capsule(name, obj.title, 'warning');
      $Log.warning('CDN:' + (obj.url || '-'));
      $Log.warning('GITHUB:' + (obj.github || '-'));
    },
  };
})();
