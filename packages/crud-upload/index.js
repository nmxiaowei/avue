import CrudUpload from '../crud/src/crud-upload.vue';

CrudUpload.install = function(Vue) {
  Vue.component(CrudUpload.name, CrudUpload);
};

export default CrudUpload;
