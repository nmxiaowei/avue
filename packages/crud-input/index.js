import CrudInput from '../crud/src/crud-input';

CrudInput.install = function(Vue) {
  Vue.component(CrudInput.name, CrudInput);
};

export default CrudInput;
