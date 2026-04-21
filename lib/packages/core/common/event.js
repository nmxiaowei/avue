/*! Avue.js v3.8.6 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var src_core_dataformat = require('../../../src/core/dataformat.js');
var src_utils_util = require('../../../src/utils/util.js');

function event () {
    return {
        methods: {
            bindEvent(name, params) {
                const item = src_utils_util.findNode(this.dic, this.props, this.text);
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
                this.text = src_core_dataformat.initVal(this.modelValue, this);
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

exports.default = event;
