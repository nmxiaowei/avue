
import CrudCascader from 'avue/crud/src/crud-cascader';

/* istanbul ignore next */
CrudCascader.install = function (Vue) {
    Vue.component(CrudCascader.name, CrudCascader);
};

export default CrudCascader;