/*! Avue.js v3.9.2 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var src_core_create = require('../../../src/core/create.js');

var script = src_core_create.default({
  name: "data-dashboard",
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
    animation() {
      return this.option.animation !== false;
    },
    data() {
      return this.option.data || [];
    }
  },
  methods: {
    getItemStyle(item) {
      return {
        backgroundColor: item.backgroundColor || '#fff'
      };
    }
  }
});

exports.default = script;
