import AvueCurdCheckbox from './src/crud-checkbox';
import AvueCurdDate from './src/crud-date';
import AvueCurdInput from './src/crud-input';
import AvueCurdRadio from './src/crud-radio';
import AvueCurdSelect from './src/crud-secect';
import AvueCurdCascader from './src/crud-cascader';
import AvueCurdInputNumber from './src/crud-input-number';
import AvueCrud from './src/main';
const components = [
    AvueCrud,
    AvueCurdCheckbox,
    AvueCurdDate,
    AvueCurdInput,
    AvueCurdRadio,
    AvueCurdSelect,
    AvueCurdCascader,
    AvueCurdInputNumber
]

/* istanbul ignore next */
export default function (Vue) {
    components.map(component => {
        Vue.component(component.name, component);
    });
};

export { AvueCrud, AvueCurdCheckbox, AvueCurdDate, AvueCurdInput, AvueCurdRadio, AvueCurdSelect, AvueCurdInputNumber };