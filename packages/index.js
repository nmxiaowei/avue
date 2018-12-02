import Carousel from './carousel/index';
import Json from './json/index';
import Crud from './crud/index';
import CrudCheckbox from './crud-checkbox/index';
import CrudDate from './crud-date/index';
import CrudTime from './crud-time/index';
import CrudInput from './crud-input/index';
import CrudRadio from './crud-radio/index';
import CrudSelect from './crud-select/index';
import CrudCascader from './crud-cascader/index';
import CrudNumberInput from './crud-input-number/index';
import CrudSwitch from './crud-switch/index';
import CrudRate from './crud-rate/index';
import CrudUpload from './crud-upload/index';
import CrudImg from './crud-img/index';
import CrudSilder from './crud-silder/index';
import DataDisplay from './data-display/index';
import DataCard from './data-card/index';
import DataTabs from './data-tabs/index';
import DataProgress from './data-progress/index';
import DataIcons from './data-icons/index';
import DataBox from './data-box/index';
import Form from './form/index';
import Tabs from './tabs/index';
import Steps from './steps/index';
import Tree from './tree/index';
import FormDetail from './form-detail/index';
import TableTree from './table-tree/index';
import DateGroup from './date-group/index';

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
  CrudImg,
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
  if (window.axios) Vue.prototype.$http = window.axios;
  components.map(component => {
    Vue.component(component.name, component);
  });
  Vue.prototype.$AVUE = {
    size: opts.size || 'medium',
    menuType: opts.menuType || 'button'
  };
}

if (window.Vue) {
  install(window.Vue);
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
  CrudImg,
  DataProgress,
  DataDisplay,
  DataCard,
  DataIcons,
  DataTabs,
  DataBox,
  TableTree,
  DateGroup
};
