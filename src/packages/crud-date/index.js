
import CrudData from 'avue/crud/src/crud-date';

/* istanbul ignore next */
CrudData.install = function (Vue) {
    Vue.component(CrudData.name, CrudData);
};

export default CrudData;