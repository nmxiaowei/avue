import CrudSwitch from '../crud/src/crud-switch';

/* istanbul ignore next */
CrudSwitch.install = function(Vue) {
    Vue.component(CrudSwitch.name, CrudSwitch);
};

export default CrudSwitch;