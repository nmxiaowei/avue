import CrudSilder from '../crud/src/crud-silder';

CrudSilder.install = function(Vue) {
  Vue.component(CrudSilder.name, CrudSilder);
};

export default CrudSilder;
