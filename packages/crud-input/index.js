
import CrudInput from '../crud/src/crud-input';

/* istanbul ignore next */
CrudInput.install = function (Vue) {
    Vue.component(CrudInput.name, CrudInput);
};

export default CrudInput;