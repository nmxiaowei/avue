/*! Avue.js v3.9.0 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var packages_core_components_form_custom = require('./custom.js');
var src_core_dataformat = require('../../../../src/core/dataformat.js');
var src_core_slot = require('../../../../src/core/slot.js');

var script = {
  name: 'form-temp',
  mixins: [src_core_slot.default],
  emits: ['update:modelValue', 'change', 'enter'],
  components: {
    custom: packages_core_components_form_custom.default
  },
  props: {
    modelValue: {},
    clearValidate: Function,
    uploadSized: Function,
    uploadBefore: Function,
    uploadDelete: Function,
    uploadAfter: Function,
    uploadPreview: Function,
    uploadError: Function,
    uploadExceed: Function,
    boxType: String,
    row: Object,
    render: Function,
    index: [String, Number],
    columnSlot: {
      type: Array,
      default: () => {
        return []
      }
    },
    tableData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    clearable: {
      type: Boolean
    },
    enter: {
      type: Boolean,
      default: false
    },
    type: {
      type: String
    },
    propsHttp: {
      type: Object,
      default: () => {
        return {}
      }
    },
    props: {
      type: Object
    },
    dic: {
      type: Array
    },
    placeholder: {
      type: String
    },
    size: {
      type: String
    },
    disabled: {
      type: Boolean
    },
    readonly: {
      type: Boolean
    },
    column: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  computed: {
    params () {
      return this.column.params || {}
    },
    event () {
      return this.column.event || {}
    },
    text: {
      get () {
        return this.modelValue
      },
      set (val) {
        this.$emit('update:modelValue', val);
        this.$emit('change', val);
      }
    }
  },
  methods: {
    getComponent (column) {
      return src_core_dataformat.getComponent(column.type, column.component)
    },
    getPlaceholder: src_core_dataformat.getPlaceholder,
    getBind (column) {
      let params = { ...column, ...this.params, ...this.$uploadFun(column) };
      ['value', 'className'].forEach(ele => {
        delete params[ele];
      });
      return params
    },
    enterChange () {
      if (typeof this.column.enter === 'function') {
        this.column.enter({ value: this.text, column: this.column });
      } else if (this.enter) {
        this.$emit('enter');
      }
    }
  }
};

exports.default = script;
