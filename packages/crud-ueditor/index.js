import CrudUeditor from '../crud/src/crud-ueditor.vue';

CrudUeditor.install = function(Vue) {
  Vue.component(CrudUeditor.name, CrudUeditor);
};

export default CrudUeditor;
