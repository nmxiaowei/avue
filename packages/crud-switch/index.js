import CrudSwitch from '../crud/src/crud-switch';

CrudSwitch.install = function(Vue) {
  Vue.component(CrudSwitch.name, CrudSwitch);
};

export default CrudSwitch;
