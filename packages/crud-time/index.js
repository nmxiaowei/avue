import CrudTime from '../crud/src/crud-time';

/* istanbul ignore next */
CrudTime.install = function (Vue) {
  Vue.component(CrudTime.name, CrudTime);
};

export default CrudTime;
