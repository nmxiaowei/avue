/*! Avue.js v3.8.6 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { loadCascaderDic, loadDic, loadLocalDic, sendDic } from '../../../src/core/dic.mjs';
import { DIC_PROPS } from '../../../src/global/variable.mjs';
import slot from '../../../src/core/slot.mjs';

function init (name) {
    return {
        mixins: [slot],
        emits: ['update:modelValue', 'change'],
        props: {
            tableData: {
                type: Object,
                default: () => {
                    return {};
                },
            },
            option: {
                type: Object,
                required: true,
                default: () => {
                    return {};
                },
            },
        },
        watch: {
            propOption: {
                handler(list) {
                    list.forEach((ele) => (this.objectOption[ele.prop] = ele));
                },
                deep: true,
            },
            option: {
                handler() {
                    this.init(false);
                },
                deep: true,
            },
        },
        data() {
            return {
                DIC: {},
                cascaderDIC: {},
                tableOption: {},
                objectOption: {},
            };
        },
        mounted() {
            this.init();
        },
        computed: {
            isMobile() {
                return document.body.clientWidth <= 768;
            },
            resultOption() {
                return {
                    ...this.tableOption,
                    ...{
                        column: this.propOption || [],
                    },
                };
            },
            rowKey() {
                return this.tableOption.rowKey || DIC_PROPS.rowKey;
            },
            formRules() {
                const result = {};
                this.propOption.forEach((ele) => {
                    if (ele.rules && ele.display !== false)
                        result[ele.prop] = ele.rules;
                });
                return result;
            },
        },
        methods: {
            init(type) {
                const globOption = this.deepClone(this.$AVUE[`${name}Option`]);
                const option = {
                    ...globOption,
                    ...this.option,
                };
                this.tableOption = option;
                this.handleLocalDic();
                if (type !== false)
                    this.handleLoadDic();
            },
            dicInit(type) {
                if (type === 'cascader') {
                    this.handleLoadCascaderDic();
                }
                else {
                    this.handleLoadDic();
                }
            },
            updateDic(prop, list) {
                const column = this.findObject(this.propOption, prop);
                const formatter = column.dicFormatter;
                const callback = (currentList, useFormatter = true) => {
                    if (useFormatter && typeof formatter === 'function') {
                        this.DIC[prop] = formatter(currentList, this.tableForm || this.form);
                    }
                    else {
                        this.DIC[prop] = currentList;
                    }
                };
                if (this.validatenull(list) && this.validatenull(prop)) {
                    this.handleLoadDic();
                    return;
                }
                if (this.validatenull(list) && !this.validatenull(column.dicUrl)) {
                    sendDic({
                        column,
                    }, this).then((currentList) => {
                        callback(currentList, false);
                    });
                }
                else {
                    callback(list || []);
                }
            },
            handleSetDic(list, res = {}) {
                Object.keys(res).forEach((ele) => {
                    list[ele] = res[ele];
                });
            },
            handleLocalDic() {
                loadLocalDic(this.resultOption, this);
            },
            handleLoadDic() {
                loadDic(this.resultOption, this);
            },
            handleLoadCascaderDic() {
                loadCascaderDic(this.propOption, this);
            },
        },
    };
}

export { init as default };
