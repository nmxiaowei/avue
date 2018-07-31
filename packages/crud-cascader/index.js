import CrudCascader from '../crud/src/crud-cascader';

CrudCascader.install = function(Vue) {
  Vue.component(CrudCascader.name, CrudCascader);
};

export default CrudCascader;
