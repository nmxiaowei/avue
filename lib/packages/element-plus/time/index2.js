/*! Avue.js v3.9.4 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var src_core_create = require('../../../src/core/create.js');
var packages_core_common_props = require('../../core/common/props.js');
var packages_core_common_event = require('../../core/common/event.js');
var src_core_locale = require('../../../src/core/locale.js');

var script = src_core_create.default({
  name: "time",
  mixins: [packages_core_common_props.default(), packages_core_common_event.default(), src_core_locale.default],
  data () {
    return {};
  },
  props: {
    editable: {
      type: Boolean,
      default: true
    },
    maxTime: String,
    minTime: String,
    start: String,
    end: String,
    step: String,
    startPlaceholder: String,
    endPlaceholder: String,
    rangeSeparator: String,
    defaultValue: [String, Array],
    valueFormat: String,
    arrowControl: Boolean,
    type: String,
    format: String,
    visibleChange: Function,
    disabledHours: Function,
    disabledMinutes: Function,
    disabledSeconds: Function
  },
  computed: {
    componentName () {
      if (this.start || this.end || this.step || this.maxTime || this.minTime) {
        return "elTimeSelect"
      } else {
        return "elTimePicker"
      }
    },
    isRange () {
      return this.type === "timerange";
    }
  }
});

exports.default = script;
