/*! Avue.js v3.9.4 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var src_core_create = require('../../../src/core/create.js');
var packages_core_common_props = require('../../core/common/props.js');
var packages_core_common_event = require('../../core/common/event.js');

var script = src_core_create.default({
  name: "input-number",
  mixins: [packages_core_common_props.default(), packages_core_common_event.default()],
  data() {
    return {};
  },
  props: {
    align: String,
    disabledScientific: Boolean,
    stepStrictly: {
      type: Boolean,
      default: false,
    },
    controls: {
      type: Boolean,
      default: true,
    },
    step: {
      type: Number,
      default: 1,
    },
    controlsPosition: {
      type: String,
      default: "right",
    },
    precision: {
      type: Number,
    },
    min: {
      type: Number,
      default: -Infinity,
    },
    max: {
      type: Number,
      default: Infinity,
    },
    prefix: {
      type: String,
    },
    prefixClick: {
      type: Function,
      default: () => {},
    },
    suffix: {
      type: String,
    },
    suffixClick: {
      type: Function,
      default: () => {},
    },
  },
  created() {},
  mounted() {},
  methods: {},
});

exports.default = script;
