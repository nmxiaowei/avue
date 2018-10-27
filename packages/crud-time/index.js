import CrudTime from '../crud/src/crud-time';

CrudTime.install = function(Vue) {
  Vue.component(CrudTime.name, CrudTime);
};

export default CrudTime;
