
import CrudSelect from '../crud/src/crud-select';

/* istanbul ignore next */
CrudSelect.install = function (Vue) {
    Vue.component(CrudSelect.name, CrudSelect);
};

export default CrudSelect;