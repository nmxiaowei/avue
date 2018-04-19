import Crud from './crud/index.js'
import CrudCheckbox from './crud-checkbox/index.js'
import CrudDate from './crud-date/index.js'
import CrudInput from './crud-input/index.js'
import crudRadio from './crud-radio/index.js'
import crudSelect from './crud-select/index.js'
import crudCascader from './crud-cascader/index.js'
import crudNumberInput from './crud-input-number/index.js'
import Form from './form/index.js'
import './theme-chalk/src/common.scss'
const components = [
    Crud,
    Form,
    CrudCheckbox,
    CrudDate,
    CrudInput,
    crudRadio,
    crudSelect,
    crudCascader
]
const install = function (Vue, axios, opts = {}) {
    //注入axios;
    Vue.prototype.$http = axios;
    const AVUE = {};
    components.map(component => {
        Vue.component(component.name, component);
    });

    AVUE.size = opts.size || '';
    Vue.prototype.$AVUE = AVUE;
}

if (typeof window !== 'undefined' && window.Vue && window.axios) {
    install(window.Vue, window.axios);
}
export default {
    version: '1.1.0',
    Crud,
    Form,
    CrudCheckbox,
    CrudDate,
    CrudInput,
    crudRadio,
    crudSelect,
    crudCascader
}