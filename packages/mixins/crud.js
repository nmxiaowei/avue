import * as utils from "../utils/util.js";
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
                default: () => {}
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
        watch: {
            option: {
                handler(n, o) {
                    this.init();
                },
                deep: true
            },
            tableForm: {
                handler(n, o) {
                    this.formVal();
                },
                deep: true
            },
            form: {
                handler(n, o) {
                    this.formVal();
                },
                deep: true
            }
        },
        data() {
            return {
                DIC: {},
                dicList: [],
            }
        },
        created() {
            this.init();
        },
        methods: {
            init() {
                //初始化工具
                this.initFun();
                //规则初始化
                this.rulesInit();
                //初始化字典
                this.dicInit();
                //初始化表单
                this.formInit();
            },
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
            vaildData(val, dafult) {
                if (typeof val == "boolean") {
                    return val;
                }
                return !validatenull(val) ? val : dafult;
            },
            GetDic() {
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
            initFun() {
                Object.keys(utils).forEach(key => {
                    this[key] = utils[key];
                })
            },
        }
    };
};