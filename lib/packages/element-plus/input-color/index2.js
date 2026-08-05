/*! Avue.js v3.9.3 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var src_core_create = require('../../../src/core/create.js');
var packages_core_common_props = require('../../core/common/props.js');
var packages_core_common_event = require('../../core/common/event.js');

var script = src_core_create.default({
  name: "input-color",
  mixins: [packages_core_common_props.default(), packages_core_common_event.default()],
  props: {
    prefixIcon: {
      type: String
    },
    suffixIcon: {
      type: String
    },
    colorFormat: String,
    predefineColors: {
      type: Array,
      default: () => {
        return [
          "#ff4500",
          "#ff8c00",
          "#ffd700",
          "#90ee90",
          "#00ced1",
          "#1e90ff",
          "#c71585",
          "rgba(255, 69, 0, 0.68)",
          "rgb(255, 120, 0)",
          "hsv(51, 100, 98)",
          "hsva(120, 40, 94, 0.5)",
          "hsl(181, 100%, 37%)",
          "hsla(209, 100%, 56%, 0.73)"
        ]
      }
    },
    showAlpha: {
      type: Boolean,
      default: true
    }
  }
});

exports.default = script;
