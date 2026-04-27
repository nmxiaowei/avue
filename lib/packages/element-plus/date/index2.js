/*! Avue.js v3.9.1 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var src_core_create = require('../../../src/core/create.js');
var src_core_locale = require('../../../src/core/locale.js');
var packages_core_common_props = require('../../core/common/props.js');
var packages_core_common_event = require('../../core/common/event.js');

var script = src_core_create.default({
  name: "date",
  mixins: [packages_core_common_props.default(), packages_core_common_event.default(), src_core_locale.default],
  props: {
    cellClassName: String,
    prefixIcon: String,
    disabledDate: Function,
    disabledHours: Function,
    disabledMinutes: Function,
    disabledSeconds: Function,
    showNow: Boolean,
    shortcuts: [Array, Function],
    editable: {
      type: Boolean,
      default: true,
    },
    unlinkPanels: Boolean,
    value: {},
    startPlaceholder: String,
    endPlaceholder: String,
    rangeSeparator: String,
    defaultValue: [String, Array],
    defaultTime: [String, Array],
    type: {
      type: String,
      default: "date",
    },
    valueFormat: String,
    format: String,
  },
});

exports.default = script;
