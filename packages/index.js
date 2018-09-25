import Crud from './crud/index.js';
import CrudCheckbox from './crud-checkbox/index.js';
import CrudDate from './crud-date/index.js';
import CrudTime from './crud-time/index.js';
import CrudInput from './crud-input/index.js';
import CrudRadio from './crud-radio/index.js';
import CrudSelect from './crud-select/index.js';
import CrudCascader from './crud-cascader/index.js';
import CrudNumberInput from './crud-input-number/index.js';
import CrudSwitch from './crud-switch/index.js';
import CrudRate from './crud-rate/index.js';
import CrudUpload from './crud-upload/index.js';
import CrudSilder from './crud-silder/index.js';
import DataDisplay from './data-display/index.js';
import DataCard from './data-card/index.js';
import DataTabs from './data-tabs/index.js';
import DataIcons from './data-icons/index.js';
import DataBox from './data-box/index.js';
import Form from './form/index.js';
import FormTabs from './form-tabs/index.js';
import FormSteps from './form-steps/index.js';
import FormDetail from './form-detail/index.js';
import TableTree from './table-tree/index.js';
import DateSelect from './date-select/index.js';
const components = [
    Crud,
    Form,
    FormTabs,
    FormSteps,
    FormDetail,
    CrudCheckbox,
    CrudDate,
    CrudTime,
    CrudInput,
    CrudRadio,
    CrudSelect,
    CrudCascader,
    CrudNumberInput,
    CrudSwitch,
    CrudRate,
    CrudUpload,
    CrudSilder,
    DataDisplay,
    DataCard,
    DataIcons,
    DataTabs,
    DataBox,
    TableTree,
    DateSelect
];

function install(Vue, axios) {
    Vue.prototype.$http = axios;
    const AVUE = {};
    components.map(component => {
        Vue.component(component.name, component);
    });

    Vue.prototype.$AVUE = AVUE;
}

if (window.Vue) {
    install(window.Vue, window.axios);
}

export default install;