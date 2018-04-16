
import CrudCascader from '../crud/src/crud-cascader';

/* istanbul ignore next */
CrudCascader.install = function (Vue) {
    Vue.component(CrudCascader.name, CrudCascader);
};

export default CrudCascader;