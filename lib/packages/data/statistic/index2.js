/*! Avue.js v3.8.6 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var src_core_create = require('../../../src/core/create.js');

var script = src_core_create.default({
  name: "data-statistic",
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
    getItemStyle(item) {
      return {
        backgroundColor: item.backgroundColor || '#fff',
        borderColor: item.borderColor || '#ebeef5'
      };
    }
  }
});

exports.default = script;
