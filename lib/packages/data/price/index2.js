/*! Avue.js v3.9.3 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var src_core_create = require('../../../src/core/create.js');

var script = src_core_create.default({
  name: "data-price",
  data () {
    return {};
  },
  computed: {
    span () {
      return this.option.span || 6;
    },
    data () {
      return this.option.data;
    }
  },
  props: {
    option: {
      type: Object,
      default: () => { }
    }
  }
});

exports.default = script;
