/*! Avue.js v3.9.0 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var src_core_create = require('../../../src/core/create.js');

var script = src_core_create.default({
  name: "data-card",
  data () {
    return {};
  },
  props: {
    option: {
      type: Object,
      default: () => { }
    }
  },
  computed: {
    span () {
      return this.option.span || 6;
    },
    data () {
      return this.option.data || [];
    },
    colorText () {
      return this.option.colorText || "#fff";
    },
    bgText () {
      return this.option.bgText || "#2e323f";
    },
    borderColor () {
      return this.option.borderColor || "#2e323f";
    }
  },
  created () { },
  mounted () { },
  watch: {},
  methods: {}
});

exports.default = script;
