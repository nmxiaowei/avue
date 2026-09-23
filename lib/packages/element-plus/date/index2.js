/*! Avue.js v3.9.5 | (c) 2017-2026 Smallwei | Released under the MIT License. */
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
    singlePanel: {
      type: Boolean,
      default: undefined,
    },
    value: {},
    startPlaceholder: String,
    endPlaceholder: String,
    rangeSeparator: String,
    defaultValue: [String, Array],
    defaultTime: [String, Date, Array],
    type: {
      type: String,
      default: "date",
    },
    valueFormat: String,
    format: String,
  },
  computed: {
    defaultTimeVal() {
      const normalizeTime = (time) => {
        if (typeof time !== "string") return time;
        const match = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/.exec(time);
        if (!match) return time;
        const [, hours, minutes, seconds] = match.map(Number);
        // Element Plus requires a Date and only uses its local time fields.
        return new Date(2000, 0, 1, hours, minutes, seconds);
      };
      return Array.isArray(this.defaultTime)
        ? this.defaultTime.map(normalizeTime)
        : normalizeTime(this.defaultTime);
    },
  },
});

exports.default = script;
