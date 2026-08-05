/*! Avue.js v3.9.3 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var src_core_create = require('../../../src/core/create.js');
var packages_core_common_props = require('../../core/common/props.js');
var packages_core_common_event = require('../../core/common/event.js');

var script = src_core_create.default({
  name: "slider",
  mixins: [packages_core_common_props.default(), packages_core_common_event.default()],
  props: {
    modelValue: {},
    step: {
      type: Number
    },
    min: {
      type: Number
    },
    max: {
      type: Number
    },
    marks: {
      type: Object
    },
    range: {
      type: Boolean,
      default: false
    },
    showInput: {
      type: Boolean,
      default: false
    },
    showStops: {
      type: Boolean,
      default: false
    },
    vertical: {
      type: Boolean,
      default: false
    },
    formatTooltip: Function,
    height: String,
    formatTooltip: Function
  },
  data () {
    return {};
  },
  watch: {},
  created () { },
  mounted () { },
  methods: {}
});

exports.default = script;
