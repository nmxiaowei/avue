
import CrudData from '../crud/src/crud-date';

/* istanbul ignore next */
CrudData.install = function (Vue) {
    Vue.component(CrudData.name, CrudData);
};

export default CrudData;