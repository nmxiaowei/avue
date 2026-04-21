/*! Avue.js v3.8.6 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var src_core_create = require('../../../src/core/create.js');

var script = src_core_create.default({
  name: "data-icons",
  data () {
    return {};
  },
  computed: {
    animation () {
      return this.option.animation
    },
    decimals () {
      return this.option.decimals || 0
    },
    span () {
      return this.option.span || 4;
    },
    data () {
      return this.option.data;
    },
    color () {
      return this.option.color || "rgb(63, 161, 255)";
    },
    discount () {
      return this.option.discount || false;
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
