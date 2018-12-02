import CrudRadio from '../crud/src/crud-radio';

CrudRadio.install = function(Vue) {
  Vue.component(CrudRadio.name, CrudRadio);
};

export default CrudRadio;
