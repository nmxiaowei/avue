/*! Avue.js v3.9.0 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var src_core_create = require('../../../src/core/create.js');
var src_global_variable = require('../../../src/global/variable.js');
var packages_core_common_init = require('../../core/common/init.js');

var script = src_core_create.default({
  name: "search",
  mixins: [packages_core_common_init.default()],
  props: {
    modelValue: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  watch: {
    modelValue: {
      handler (val) {
        this.setVal(val);
      },
      deep: true
    }
  },
  computed: {
    form: {
      get () {
        return this.modelValue
      },
      set (val) {
        this.setVal(val);
      }
    },
    props () {
      return this.parentOption.props || {}
    },
    labelKey () {
      return src_global_variable.DIC_PROPS.label
    },
    valueKey () {
      return src_global_variable.DIC_PROPS.value
    },
    mainSlot () {
      let result = [];
      this.propOption.forEach(item => {
        if (this.$slots[item.prop]) result.push(item.prop);
      });
      return result
    },
    isCard () {
      return this.parentOption.card;
    },
    parentOption () {
      return this.tableOption;
    },
    propOption () {
      return this.columnOption;
    },
    columnOption () {
      return this.parentOption.column;
    }
  },
  mounted () {
    this.dataFormat();
  },
  methods: {
    setVal (val) {
      this.$emit('update:modelValue', val);
      this.$emit("change", val);
    },
    getKey (item = {}, props = {}, key) {
      return item[props[key] || this.props[key] || key];
    },
    dataFormat () {
      this.columnOption.forEach(ele => {
        const prop = ele.prop;
        if (this.validatenull(this.form[prop])) {
          this.form[prop] = ele.multiple === false ? '' : [];
        }
      });
    },
    getActive (item, column) {
      const value = this.getKey(item, column.props, this.valueKey);
      if (column.multiple === false) {
        return this.form[column.prop] === value;
      } else {
        return this.form[column.prop].includes(value);
      }
    },
    handleClick (column, item) {
      const value = this.getKey(item, column.props, this.valueKey);
      //单选
      if (column.multiple === false) {
        this.form[column.prop] = value;
      } else {
        // 多选
        const index = this.form[column.prop].indexOf(value);
        if (index === -1) {
          this.form[column.prop].push(value);
        } else {
          this.form[column.prop].splice(index, 1);
        }
      }
    }
  }
});

exports.default = script;
