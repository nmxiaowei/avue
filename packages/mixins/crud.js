import {
    findByvalue,
    getComponent,
    getSearchType,
    setDic,
    setPx,
    formInitVal
} from "../utils/util.js";
import {
    validatenull
} from '../utils/validate.js'
import crudInput from "../crud/src/crud-input";
import crudSelect from "../crud/src/crud-select";
import crudRadio from "../crud/src/crud-radio";
import crudCheckbox from "../crud/src/crud-checkbox";
import crudCascader from "../crud/src/crud-cascader";
import crudDate from "../crud/src/crud-date";
import crudTime from "../crud/src/crud-time";
import crudInputNumber from '../crud/src/crud-input-number';
import crudUeditor from '../crud/src/crud-ueditor';
import crudSwitch from '../crud/src/crud-switch';
export default function() {
    return {
        props: {
            option: {
                type: Object,
                required: true,
                default: {}
            },
        },
        components: {
            crudInput,
            crudSelect,
            crudRadio,
            crudCheckbox,
            crudDate,
            crudTime,
            crudCascader,
            crudInputNumber,
            crudUeditor,
            crudSwitch
        },
        methods: {
            dicInit() {
                this.option.column.forEach(ele => {
                    if (ele.dicData && typeof ele.dicData == 'string') {
                        this.dicList.push(ele.dicData)
                    }
                })
                this.GetDic().then(data => {
                    this.DIC = data
                })
            },
            GetDic: function() {
                return new Promise((resolve, reject) => {
                    let result = [],
                        dicData = {},
                        locaDic = this.option.dicData,
                        list = this.dicList;
                    if (validatenull(list)) {
                        return;
                    }
                    list.forEach(ele => {
                        result.push(new Promise((resolve, reject) => {
                            if (validatenull(this.option.dicUrl)) {
                                resolve(locaDic[ele]);
                            } else {
                                //降级处理data层级关系
                                this.$http.get(`${this.option.dicUrl}/${ele}`).then(function(response) {
                                    if (!validatenull(response.data.data)) {
                                        resolve(response.data.data);
                                    } else if (!validatenull(response.data)) {
                                        resolve(response.data);
                                    } else {
                                        resolve([]);
                                    }
                                })
                            }
                        }))
                    })
                    Promise.all(result).then(data => {
                        list.forEach((ele, index) => {
                            dicData[ele] = data[index];
                        })
                        if (validatenull(this.option.dicUrl)) {
                            dicData = Object.assign({}, dicData, locaDic)
                        }
                        resolve(dicData);
                    })
                });

            },
            getComponent: function(type) {
                return getComponent(type);
            },
            getSearchType: function(type) {
                return getSearchType(type);
            },
            findByvalue: function(dic, val) {
                return findByvalue(dic, val);
            },
            formInitVal: function(list) {
                return formInitVal(list);
            },
            setDic: function(dicData, DIC) {
                return setDic(dicData, DIC);
            },
            setPx: function(val, defval) {
                return setPx(val, defval);
            },
        }
    };
};