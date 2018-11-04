import Carousel from './carousel/';
import Json from './json/'
import Crud from './crud/';
import CrudCheckbox from './crud-checkbox/';
import CrudDate from './crud-date/';
import CrudTime from './crud-time/';
import CrudInput from './crud-input/';
import CrudRadio from './crud-radio/';
import CrudSelect from './crud-select/';
import CrudCascader from './crud-cascader/';
import CrudNumberInput from './crud-input-number/';
import CrudSwitch from './crud-switch/';
import CrudRate from './crud-rate/';
import CrudUpload from './crud-upload/';
import CrudSilder from './crud-silder/';
import DataDisplay from './data-display/';
import DataCard from './data-card/';
import DataTabs from './data-tabs/';
import DataProgress from './data-progress/';
import DataIcons from './data-icons/';
import DataBox from './data-box/';
import Form from './form/';
import Tabs from './tabs/';
import FormSteps from './form-steps/';
import FormDetail from './form-detail/';
import TableTree from './table-tree/';
import DateSelect from './date-select/';
const components = [
    Json,
    Crud,
    Form,
    Tabs,
    Carousel,
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
    DataProgress,
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