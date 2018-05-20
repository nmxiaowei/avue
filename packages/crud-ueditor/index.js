import CrudUeditor from '../crud/src/crud-ueditor.vue';

/* istanbul ignore next */
CrudUeditor.install = function (Vue) {
  Vue.component(CrudUeditor.name, CrudUeditor);
};

export default CrudUeditor;
