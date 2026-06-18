/*! Avue.js v3.9.2 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var src_core_locale = require('../../../src/core/locale.js');
var src_core_create = require('../../../src/core/create.js');
var packages_core_common_props = require('../../core/common/props.js');
var packages_core_common_event = require('../../core/common/event.js');

var script = src_core_create.default({
  name: "checkbox",
  props: {
    fill: String,
    textColor: String,
    all: {
      type: Boolean,
      default: false
    }
  },
  mixins: [packages_core_common_props.default(), packages_core_common_event.default(), src_core_locale.default],
  data () {
    return {
      checkAll: false,
      isIndeterminate: false,
      name: 'checkbox',
    };
  },
  watch: {
    dic () {
      this.handleCheckChange();
    },
    text: {
      handler (val) {
        this.handleCheckChange();
      }
    },
  },
  created () { },
  mounted () { },
  methods: {
    handleCheckAll (val) {
      if (!this.all) return
      const availableOptions = this.dic.filter(item => !item[this.disabledKey]);
      this.text = val ? availableOptions.map(ele => ele[this.valueKey]) : [];
      this.isIndeterminate = false;
    },
    handleCheckChange () {
      let value = this.text;
      if (!this.all) return
      const availableCount = this.dic.filter(item => !item[this.disabledKey]).length;
      let checkedCount = value.length;
      this.checkAll = checkedCount === availableCount;
      this.isIndeterminate = checkedCount > 0 && checkedCount < availableCount;
    }
  }
});

exports.default = script;
