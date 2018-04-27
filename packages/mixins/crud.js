import { findByvalue, getComponent, setDic, setPx } from "../utils/util.js";
import { validatenull } from '../utils/validate.js'
import crudInput from "../crud/src/crud-input";
import crudSelect from "../crud/src/crud-select";
import crudRadio from "../crud/src/crud-radio";
import crudCheckbox from "../crud/src/crud-checkbox";
import crudCascader from "../crud/src/crud-cascader";
import crudDate from "../crud/src/crud-date";
import crudInputNumber from '../crud/src/crud-input-number'
import { DIC } from '../const/dic'
export default function () {
    return {
        props: {
            dicUrl: {
                type: String,
                default: ""
            }
        },
        components: {
            crudInput,
            crudSelect,
            crudRadio,
            crudCheckbox,
            crudDate,
            crudCascader,
            crudInputNumber
        },
        methods: {
            GetDic: function (list) {
                return new Promise((resolve, reject) => {
                    let result = [];
                    if (validatenull(list)) {
                        return;
                    }
                    list.forEach(ele => {
                        result.push(new Promise((resolve, reject) => {
                            if (validatenull(this.dicUrl)) {
                                resolve(DIC[ele]);
                            } else {
                                this.$http.get(`${this.dicUrl}/${ele}`).then(function (response) {
                                    resolve(validatenull(response.data.data) ? [] : response.data.data);
                                })
                            }
                        }))
                    })
                    let value = {};
                    Promise.all(result).then(data => {
                        list.forEach((ele, index) => {
                            value[ele] = data[index];
                        })
                        resolve(value);
                    })
                });

            },
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
