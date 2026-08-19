/*! Avue.js v3.9.4 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import custom from './custom.mjs';
import { getPlaceholder, getComponent } from '../../../../src/core/dataformat.mjs';
import slot from '../../../../src/core/slot.mjs';

var script = {
  name: 'form-temp',
  mixins: [slot],
  emits: ['update:modelValue', 'change', 'enter'],
  components: {
    custom
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
      return getComponent(column.type, column.component)
    },
    getPlaceholder,
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

export { script as default };
