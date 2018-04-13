import { findByvalue, getComponent, setDic, setPx } from "avue/utils/util.js";
import crudInput from "avue/crud/src/crud-input";
import crudSelect from "avue/crud/src/crud-select";
import crudRadio from "avue/crud/src/crud-radio";
import crudCheckbox from "avue/crud/src/crud-checkbox";
import crudDate from "avue/crud/src/crud-date";
export default function () {
    return {
        components: {
            crudInput,
            crudSelect,
            crudRadio,
            crudCheckbox,
            crudDate
        },
        methods: {
            getComponent: function (type) {
                return getComponent(type);
            },
            findByvalue: function (dic, val) {
                return findByvalue(dic, val);
            },
            setDic: function (dicData, DIC) {
                return setDic(dicData, DIC);
            },
            setPx: function (val, defval) {
                return setPx(val, defval);
            },
        }
    };
};
