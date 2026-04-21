/*! Avue.js v3.8.6 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var src_core_create = require('../../../src/core/create.js');
var src_core_locale = require('../../../src/core/locale.js');

var script = src_core_create.default({
  name: "data-countdown",
  mixins: [src_core_locale.default],
  data() {
    return {
      timers: []
    };
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
    showDays() {
      return this.option.showDays !== false;
    },
    data() {
      return this.option.data || [];
    }
  },
  methods: {
    getItemStyle(item) {
      return {
        background: item.background || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      };
    },
    formatNumber(num) {
      return num < 10 ? '0' + num : num;
    }
  }
});

exports.default = script;
