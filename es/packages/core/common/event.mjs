/*! Avue.js v3.9.0 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { initVal } from '../../../src/core/dataformat.mjs';
import { findNode } from '../../../src/utils/util.mjs';

function event () {
    return {
        methods: {
            bindEvent(name, params) {
                const item = findNode(this.dic, this.props, this.text);
                params = Object.assign(params, { column: this.column, dic: this.dic, item }, this.tableData);
                if (typeof this[name] === 'function') {
                    if (name == 'change') {
                        if (this.column.cell != true) {
                            this[name](params);
                        }
                    }
                    else {
                        this[name](params);
                    }
                }
                this.$emit(name, params);
            },
            initVal() {
                this.stringMode = typeof this.modelValue == 'string';
                this.text = initVal(this.modelValue, this);
            },
            getLabelText(item) {
                if (this.validatenull(item))
                    return '';
                if (typeof this.typeformat === 'function') {
                    return this.typeformat(item, this.labelKey, this.valueKey);
                }
                return item[this.labelKey];
            },
            handleFocus(event) {
                this.bindEvent('focus', { value: this.modelValue, event });
            },
            handleBlur(event) {
                this.bindEvent('blur', { value: this.modelValue, event });
            },
            handleClick(event) {
                this.bindEvent('click', { value: this.modelValue, event });
            },
            handleChange(value) {
                let result = value;
                if (this.isJson) {
                    result = JSON.stringify(value);
                }
                else {
                    const flag = this.isString || this.isNumber || this.stringMode || this.listType === 'picture-img';
                    if (flag && Array.isArray(value)) {
                        result = value.join(this.separator);
                    }
                }
                this.bindEvent('change', { value: result });
                this.$emit('update:modelValue', result);
            },
        },
    };
}

export { event as default };
