import $Log from 'plugin/logs/';

const list: Record<string, { url: string; title: string; github?: string }> = {
  AliOSS: {
    url: 'https://cdn.staticfile.org/ali-oss/6.17.1/aliyun-oss-sdk.min.js',
    title: '闃块噷浜戜簯鍥剧墖涓婁紶锛岄渶寮曞叆OSS鐨剆dk',
    github: 'https://github.com/ali-sdk/ali-oss/',
  },
  Map: {
    url: 'https://webapi.amap.com/maps?v=1.4.11&key=xxxxx&plugin=AMap.PlaceSearch,https://webapi.amap.com/ui/1.0/main.js?v=1.0.11',
    title: '鍦板浘缁勪欢锛岄渶寮曞叆楂樺痉SDK',
  },
  MapUi: {
    url: 'https://webapi.amap.com/ui/1.0/main.js?v=1.0.11',
    title: '鍦板浘缁勪欢锛岄渶寮曞叆楂樺痉UISDK',
  },
  Sortable: {
    url: 'https://cdn.staticfile.org/Sortable/1.10.0-rc2/Sortable.min.js',
    title: '鎷栨嫿锛岄渶寮曞叆sortableJs',
    github: 'https://github.com/SortableJS/Sortable',
  },
  Screenshot: {
    url: 'https://cdn.staticfile.org/html2canvas/0.5.0-beta4/html2canvas.min.js',
    title: '闇€寮曞叆html2canvas渚濊禆鍖?',
    github: 'https://github.com/niklasvh/html2canvas/',
  },
  COS: {
    url: 'https://avuejs.com/cdn/cos-js-sdk-v5.min.js',
    title: '鑵捐浜戜簯鍥剧墖涓婁紶锛岄渶寮曞叆COS',
  },
  CryptoJS: {
    url: 'https://avuejs.com/cdn/CryptoJS.js',
    title: '涓冪墰浜戝浘鐗囦笂浼狅紝闇€寮曞叆CryptoJS',
  },
  'file-saver': {
    url: 'https://cdn.staticfile.org/FileSaver.js/2014-11-29/FileSaver.min.js',
    title: '闇€寮曞叆鏂囦欢鎿嶄綔鍖?',
    github: 'https://github.com/eligrey/FileSaver.js',
  },
  xlsx: {
    url: 'https://cdn.staticfile.org/xlsx/0.18.2/xlsx.full.min.js',
    title: '闇€寮曞叆excel鎿嶄綔鍖?',
    github: 'https://github.com/protobi/js-xlsx',
  },
  mock: {
    url: 'https://cdn.staticfile.org/Mock.js/1.0.1-beta3/mock-min.js',
    title: '闇€瑕佸紩鍏ock妯℃嫙鏁版嵁鍖?',
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
