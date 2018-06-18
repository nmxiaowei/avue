import Crud from './crud/index.js'
import CrudCheckbox from './crud-checkbox/index.js'
import CrudDate from './crud-date/index.js'
import CrudTime from './crud-time/index.js'
import CrudInput from './crud-input/index.js'
import CrudRadio from './crud-radio/index.js'
import CrudSelect from './crud-select/index.js'
import CrudCascader from './crud-cascader/index.js'
import CrudNumberInput from './crud-input-number/index.js'
import CrudUeditor from './crud-ueditor/index.js'
import CrudSwitch from './crud-switch/index.js'
import DataDisplay from './data-display/index.js'
import DataCard from './data-card/index.js'
import DataTabs from './data-tabs/index.js'
import DataIcons from './data-icons/index.js'
import Form from './form/index.js'
import './theme-chalk/src/common.scss'
const components = [
    Crud,
    Form,
    CrudCheckbox,
    CrudDate,
    CrudTime,
    CrudInput,
    CrudRadio,
    CrudSelect,
    CrudCascader,
    CrudNumberInput,
    CrudUeditor,
    CrudSwitch,
    DataDisplay,
    DataCard,
    DataIcons,
    DataTabs,
]
const install = function(Vue, axios, opts = {}) {
    //注入axios;
    Vue.prototype.$http = axios;
    const AVUE = {
        clientHeight: document.documentElement.clientHeight
    };
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
    version: '1.4.3',
    Crud,
    Form,
    CrudCheckbox,
    CrudDate,
    CrudTime,
    CrudInput,
    CrudRadio,
    CrudSelect,
    CrudCascader,
    CrudNumberInput,
    CrudUeditor,
    CrudSwitch,
    DataDisplay,
    DataCard,
    DataIcons,
    DataTabs,
}