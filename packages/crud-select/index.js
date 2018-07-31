import CrudSelect from '../crud/src/crud-select';

CrudSelect.install = function(Vue) {
  Vue.component(CrudSelect.name, CrudSelect);
};

export default CrudSelect;
