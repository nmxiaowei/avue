import * as utils from '../utils/util.js';
import { validatenull } from '../utils/validate.js';
import crudInput from '../crud/src/crud-input';
import crudSelect from '../crud/src/crud-select';
import crudRadio from '../crud/src/crud-radio';
import crudCheckbox from '../crud/src/crud-checkbox';
import crudCascader from '../crud/src/crud-cascader';
import crudDate from '../crud/src/crud-date';
import crudTime from '../crud/src/crud-time';
import crudInputNumber from '../crud/src/crud-input-number';
import crudSwitch from '../crud/src/crud-switch';
import crudRate from '../crud/src/crud-rate';
import crudUpload from '../crud/src/crud-upload';
import crudSilder from '../crud/src/crud-silder';
export default function() {
    return {
        props: {
            option: {
                type: Object,
                required: true,
                default: () => {
                    return {};
                }
            }
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
            crudSwitch,
            crudRate,
            crudUpload,
            crudSilder
        },
        watch: {
            tableForm: {
                handler() {
                    this.$emit('input', this.tableForm);
                },
                deep: true
            },
            form: {
                handler() {
                    this.$emit('input', this.form);
                },
                deep: true
            },
            option: {
                handler() {
                    this.init();
                },
                deep: true
            }
        },
        data() {
            return {
                DIC: {},
                dicCascaderList: []
            };
        },
        created() {
            this.init();
        },
        computed: {
            isMediumSize() {
                return this.controlSize === 'medium' ? 'small' : this.controlSize;
            },
            controlSize() {
                return this.tableOption.size || (this.$AVUE || {}).size || 'medium';
            }
        },
        methods: {
            init() {
                // 初始化工具
                this.initFun();
                this.tableOption = this.option;
                const dicFlag = this.vaildData(this.tableOption.dicFlag, true);
                // 规则初始化
                this.rulesInit();

                // 初始化字典
                if (dicFlag) this.dicInit();
                else this.DIC = this.tableOption.dicData;

                // 初始化表单formInitVal
                this.formInit();


            },
            dicInit() {
                let locaDic = this.tableOption.dicData || {};
                this.columnOption.forEach(ele => {
                    if (this.vaildData(ele.dicFlag, true)) {
                        if (!validatenull(ele.dicUrl)) {
                            this.dicCascaderList.push({
                                dicUrl: ele.dicUrl,
                                dicData: ele.dicData
                            });
                        } else if (!validatenull(this.tableOption.dicUrl) && typeof ele.dicData === 'string') {
                            this.dicCascaderList.push({
                                dicUrl: this.tableOption.dicUrl,
                                dicData: ele.dicData
                            });
                        }
                    }
                });
                this.GetDic().then(data => {
                    this.DIC = Object.assign({}, locaDic, data);
                });
            },
            vaildData(val, dafult) {
                if (typeof val === 'boolean') {
                    return val;
                }
                return !validatenull(val) ? val : dafult;
            },
            GetDicByType(href) {
                return new Promise((resolve) => {
                    this.$http.get(href).then(function(res) {
                        // 降级处理
                        const list = res.data;
                        if (!validatenull(list.data)) {
                            resolve(list.data instanceof Array ? list.data : []);
                        } else if (!validatenull(list)) {
                            resolve(list instanceof Array ? list : []);
                        } else {
                            resolve([]);
                        }
                    });
                });
            },
            GetDic() {
                return new Promise((resolve) => {
                    let result = [];
                    let dicData = {};
                    let cascaderList = Object.assign([], this.dicCascaderList);
                    if (validatenull(cascaderList)) resolve({});
                    cascaderList.forEach(ele => {
                        result.push(new Promise((resolve) => {
                            this.GetDicByType(`${ele.dicUrl.replace('{{key}}', ele.dicData)}`).then(function(res) {
                                resolve(res);
                            });
                        }));
                    });
                    Promise.all(result).then(data => {
                        cascaderList.forEach((ele, index) => {
                            dicData[ele.dicData] = data[index];
                        });
                        resolve(dicData);
                    });
                });

            },
            initFun() {
                Object.keys(utils).forEach(key => {
                    this[key] = utils[key];
                });
            }
        }
    };
}