/*! Avue.js v3.9.3 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var src_core_create = require('../../../src/core/create.js');
require('../../core/components/icon/index.js');
var index_vue_vue_type_script_lang = require('../../core/components/icon/index2.js');

var script = src_core_create.default({
  name: "data-statistic",
  components: {
    iconTemp: index_vue_vue_type_script_lang.default
  },
  data() {
    return {};
  },
  props: {
    option: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    span() {
      return this.option.span || 6;
    },
    gutter() {
      return this.option.gutter || 20;
    },
    data() {
      return this.option.data || [];
    }
  },
  methods: {
    getIconStyle(item) {
      const size = (item.iconSize || 40) + 'px';
      return {
        color: item.iconColor || '#409eff',
        fontSize: size,
        width: size,
        height: size
      };
    },
    getItemStyle(item) {
      return {
        backgroundColor: item.backgroundColor || '#fff',
        borderColor: item.borderColor || '#ebeef5'
      };
    }
  }
});

exports.default = script;
