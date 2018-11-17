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
import Steps from './steps/';
import Tree from './tree/';
import FormDetail from './form-detail/';
import TableTree from './table-tree/';
import DateGroup from './date-group/';
import axios from 'axios';
const components = [
    Json,
    Crud,
    Form,
    Tabs,
    Tree,
    Carousel,
    Steps,
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
    DateGroup
];

function install(Vue, opts = {}) {
    if (axios || window.axios) Vue.prototype.$http = axios || window.axios;
    components.map(component => {
        Vue.component(component.name, component);
    });
    Vue.prototype.$AVUE = {
        size: opts.size || 'medium',
    };
}

if (window.Vue) {
    install(window.Vue, window.axios);
}
export default {
    install,
    Json,
    Crud,
    Form,
    Tabs,
    Tree,
    Carousel,
    Steps,
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
    DateGroup
};