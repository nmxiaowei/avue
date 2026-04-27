/*! Avue.js v3.9.0 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var src_global_variable = require('../../../src/global/variable.js');
var src_core_slot = require('../../../src/core/slot.js');

function props () {
    return {
        mixins: [src_core_slot.default],
        emits: ['update:modelValue', 'click', 'focus', 'blur', 'change'],
        data() {
            return {
                stringMode: false,
                name: '',
                text: undefined,
                propsHttpDefault: src_global_variable.DIC_HTTP_PROPS,
                propsDefault: src_global_variable.DIC_PROPS,
            };
        },
        props: {
            blur: Function,
            focus: Function,
            change: Function,
            click: Function,
            typeformat: Function,
            control: Function,
            separator: {
                type: String,
                default: src_global_variable.DIC_SPLIT,
            },
            params: {
                type: Object,
                default: () => {
                    return {};
                },
            },
            listType: {
                type: String,
                default: '',
            },
            tableData: {
                type: Object,
                default: () => {
                    return {};
                },
            },
            modelValue: {},
            column: {
                type: Object,
                default: () => {
                    return {};
                },
            },
            label: {
                type: String,
                default: '',
            },
            readonly: {
                type: Boolean,
                default: false,
            },
            size: {
                type: String,
                default: '',
            },
            tip: {
                type: String,
                default: '',
            },
            disabled: {
                type: Boolean,
                default: false,
            },
            dataType: {
                type: String,
            },
            clearable: {
                type: Boolean,
                default: true,
            },
            type: {
                type: String,
                default: '',
            },
            dicUrl: {
                type: String,
                default: '',
            },
            dicMethod: {
                type: String,
                default: '',
            },
            dicFormatter: Function,
            dicQuery: {
                type: Object,
                default: () => {
                    return {};
                },
            },
            dic: {
                type: [Array, Function],
                default: () => {
                    return [];
                },
            },
            placeholder: {
                type: String,
                default: '',
            },
            rules: {
                type: Array,
            },
            min: {
                type: Number,
            },
            max: {
                type: Number,
            },
            multiple: {
                type: Boolean,
                default: false,
            },
            button: {
                type: Boolean,
                default: false,
            },
            row: {
                type: Boolean,
                default: false,
            },
            prop: {
                type: String,
                default: '',
            },
            border: {
                type: Boolean,
                default: false,
            },
            popperClass: {
                type: String,
            },
            propsHttp: {
                type: Object,
                default: () => src_global_variable.DIC_HTTP_PROPS,
            },
            props: {
                type: Object,
                default: () => src_global_variable.DIC_PROPS,
            },
        },
        watch: {
            text: {
                handler(val) {
                    this.handleChange(val);
                    this.handleTextValue && this.handleTextValue(val);
                },
                deep: true,
            },
            modelValue: {
                handler(val) {
                    this.initVal();
                    this.handleModelValue && this.handleModelValue(val);
                },
                deep: true,
            },
        },
        computed: {
            clearableVal() {
                return this.disabled ? false : this.clearable;
            },
            componentName() {
                const type = 'el';
                return `${type}-${this.name}${this.button ? '-button' : ''}`;
            },
            required() {
                return !this.validatenull(this.rules);
            },
            isGroup() {
                let result = false;
                this.dic.forEach((ele) => {
                    if (ele[this.groupsKey]) {
                        result = true;
                    }
                });
                return result;
            },
            isArray() {
                return this.dataType === 'array';
            },
            isString() {
                return this.dataType === 'string';
            },
            isNumber() {
                return this.dataType === 'number';
            },
            isJson() {
                return this.dataType === 'json';
            },
            nameKey() {
                return this.propsHttp.name || this.propsHttpDefault.name;
            },
            urlKey() {
                return this.propsHttp.url || this.propsHttpDefault.url;
            },
            resKey() {
                return this.propsHttp.res || this.propsHttpDefault.res;
            },
            fileTypeKey() {
                return this.propsHttp.fileType || this.propsHttpDefault.fileType;
            },
            groupsKey() {
                return this.props.groups || this.propsDefault.groups;
            },
            valueKey() {
                return this.props.value || this.propsDefault.value;
            },
            typeKey() {
                return this.props.type || this.propsDefault.type;
            },
            descKey() {
                return this.props.desc || this.propsDefault.desc;
            },
            leafKey() {
                return this.props.leaf || this.propsDefault.leaf;
            },
            labelKey() {
                return this.props.label || this.propsDefault.label;
            },
            childrenKey() {
                return this.props.children || this.propsDefault.children;
            },
            disabledKey() {
                return this.props.disabled || this.propsDefault.disabled;
            },
            idKey() {
                return this.props.id || this.propsDefault.id;
            },
        },
        created() {
            this.initVal();
        },
    };
}

exports.default = props;
