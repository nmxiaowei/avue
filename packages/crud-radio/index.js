import CrudRadio from 'avue/crud/src/crud-radio';

/* istanbul ignore next */
CrudRadio.install = function (Vue) {
    Vue.component(CrudRadio.name, CrudRadio);
};

export default CrudRadio;