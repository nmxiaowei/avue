/*! Avue.js v3.9.5 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { sendDic, loadCascaderDic, loadDic, loadLocalDic, getRowDicRequests, isRowDicColumn } from '../../../src/core/dic.mjs';
import { DIC_PROPS } from '../../../src/global/variable.mjs';
import slot from '../../../src/core/slot.mjs';
import { warnOption, validateOption } from '../../../src/core/option.mjs';

const dicRequestStates = new WeakMap();
const getDicRequestState = (safe) => {
    let state = dicRequestStates.get(safe);
    if (!state) {
        state = {
            active: new Set(),
            sequence: {},
            unmounted: false,
        };
        dicRequestStates.set(safe, state);
    }
    return state;
};
function init (name) {
    return {
        mixins: [slot],
        emits: ['update:modelValue', 'change', 'dic-error'],
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
            rowDicRequests(requests) {
                this.handleLoadRowDic(requests);
            },
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
                rowDIC: new Map(),
                rowDicOverrides: {},
                tableOption: {},
                objectOption: {},
                dicLoading: false,
                dicError: null,
            };
        },
        mounted() {
            getDicRequestState(this).unmounted = false;
            this.init();
        },
        beforeUnmount() {
            const state = getDicRequestState(this);
            state.unmounted = true;
            state.active.clear();
        },
        computed: {
            rowDicColumns() {
                // propOption has resolved cascader parentProp; those columns keep the parent key.
                const columns = name === 'crud'
                    ? this.propOption.filter(isRowDicColumn)
                    : [];
                return new Map(columns.map((column) => [column.prop, column]));
            },
            rowDicRequests() {
                if (!this.rowDicColumns.size)
                    return [];
                return getRowDicRequests(Array.from(this.rowDicColumns.values()), this.data, this.childrenKey);
            },
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
                const componentName = name || (this.$options.name || '').replace(/^avue-/, '') || 'component';
                if (this.$AVUE.optionValidate !== false &&
                    option.optionValidate !== false) {
                    warnOption(validateOption(option, componentName), componentName);
                }
                if (name === 'crud' && typeof this.restoreColumnState === 'function') {
                    this.restoreColumnState();
                }
                this.handleLocalDic();
                if (type !== false)
                    this.handleLoadDic();
            },
            dicInit(type) {
                if (type === 'cascader') {
                    return this.handleLoadCascaderDic();
                }
                else {
                    return this.rowDicColumns.size
                        ? Promise.all([this.handleLoadDic(), this.handleLoadRowDic()])
                            .then(([result]) => result)
                        : this.handleLoadDic();
                }
            },
            updateDic(prop, list) {
                const column = this.findObject(this.propOption, prop);
                if (!column)
                    return Promise.resolve(null);
                const useRowDic = this.rowDicColumns.has(prop);
                const formatter = column.dicFormatter;
                const callback = (currentList, useFormatter = true) => {
                    if (useFormatter && typeof formatter === 'function') {
                        this.DIC[prop] = formatter(currentList, this.tableForm || this.form);
                    }
                    else {
                        this.DIC[prop] = currentList;
                    }
                    if (useRowDic) {
                        // A pending automatic response must not replace an explicit dictionary.
                        this.rowDicOverrides[prop] = this.DIC[prop];
                    }
                };
                if (this.validatenull(list) && this.validatenull(prop)) {
                    return this.handleLoadDic();
                }
                if (this.validatenull(list) && !this.validatenull(column.dicUrl)) {
                    if (useRowDic) {
                        return this.handleLoadRowDic();
                    }
                    return this.requestDic({
                        column,
                    }, `update:${prop}`).then((currentList) => {
                        if (currentList)
                            callback(currentList, false);
                        return currentList;
                    });
                }
                else {
                    callback(list || []);
                    return Promise.resolve(list || []);
                }
            },
            handleSetDic(list, res = {}) {
                Object.keys(res).forEach((ele) => {
                    list[ele] = res[ele];
                });
            },
            handleLocalDic() {
                const localDic = loadLocalDic(this.resultOption);
                this.handleSetDic(this.DIC, localDic.data);
                return this.runDicRequest('local-dic', () => localDic.pending, (result) => {
                    this.handleSetDic(this.DIC, result);
                });
            },
            handleLoadDic() {
                return this.runDicRequest('dic', () => loadDic(this.resultOption, this, this.rowDicColumns.size > 0), (result) => {
                    this.handleSetDic(this.DIC, result);
                });
            },
            getRowDic(row, column) {
                var _a;
                if (this.rowDicColumns.has(column.prop)) {
                    if (Object.prototype.hasOwnProperty.call(this.rowDicOverrides, column.prop)) {
                        return this.rowDicOverrides[column.prop];
                    }
                    return (_a = this.rowDIC.get(row)) === null || _a === void 0 ? void 0 : _a[column.prop];
                }
                const cascader = (this.cascaderDIC[row.$index] || {})[column.prop];
                return column.parentProp ? cascader : cascader || this.DIC[column.prop];
            },
            handleLoadRowDic(requests = this.rowDicRequests) {
                // Drop the previous page immediately; late responses are guarded by runDicRequest.
                this.rowDIC = new Map();
                this.rowDicOverrides = {};
                return this.runDicRequest('row-dic', () => Promise.all(requests.map((request) => {
                    const { column, value, empty } = request;
                    return (empty ? Promise.resolve([]) : sendDic({
                        column,
                        value,
                        form: this.deepClone(request.form),
                        dataType: column.dataType,
                    }, this)).then((data) => ({ ...request, data }));
                })), (result) => {
                    const dictionaries = new Map();
                    result.forEach(({ form, column, data }) => {
                        if (!dictionaries.has(form))
                            dictionaries.set(form, {});
                        dictionaries.get(form)[column.prop] = data;
                    });
                    this.rowDIC = dictionaries;
                });
            },
            handleLoadCascaderDic() {
                return this.runDicRequest('cascader', () => loadCascaderDic(this.propOption, this), (result) => {
                    Object.keys(result).forEach((index) => {
                        if (!this.cascaderDIC[index])
                            this.cascaderDIC[index] = {};
                        this.handleSetDic(this.cascaderDIC[index], result[index]);
                    });
                });
            },
            requestDic(params, requestType = 'manual') {
                return this.runDicRequest(requestType, () => sendDic(params, this));
            },
            runDicRequest(requestType, request, apply) {
                const state = getDicRequestState(this);
                const requestId = (state.sequence[requestType] || 0) + 1;
                const token = `${requestType}:${requestId}`;
                state.sequence[requestType] = requestId;
                state.active.add(token);
                this.dicLoading = true;
                this.dicError = null;
                const isCurrent = () => !state.unmounted && state.sequence[requestType] === requestId;
                return Promise.resolve()
                    .then(request)
                    .then((result) => {
                    if (!isCurrent())
                        return null;
                    if (apply)
                        apply(result);
                    return result;
                })
                    .catch((error) => {
                    if (isCurrent()) {
                        this.dicError = error;
                        this.$emit('dic-error', {
                            type: requestType,
                            error,
                        });
                    }
                    return null;
                })
                    .finally(() => {
                    state.active.delete(token);
                    if (!state.unmounted) {
                        this.dicLoading = state.active.size > 0;
                    }
                });
            },
        },
    };
}

export { init as default };
