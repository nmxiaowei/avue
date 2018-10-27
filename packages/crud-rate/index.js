import CrudRate from '../crud/src/crud-rate';

CrudRate.install = function(Vue) {
  Vue.component(CrudRate.name, CrudRate);
};

export default CrudRate;
