import CrudData from '../crud/src/crud-date';

CrudData.install = function(Vue) {
  Vue.component(CrudData.name, CrudData);
};

export default CrudData;
