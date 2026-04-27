/*! Avue.js v3.9.0 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var src_core_locale = require('../../../src/core/locale.js');
var src_core_create = require('../../../src/core/create.js');

var script = src_core_create.default({
  name: 'form',
  inject: ["formSafe"],
  mixins: [src_core_locale.default],
  computed: {
    menuXsSpan () {
      return this.formSafe.tableOption.menuXsSpan || this.formSafe.config.xsSpan;
    },
    menuSpan () {
      return this.formSafe.tableOption.menuSpan || this.formSafe.config.xsSpan;
    },
    styleName () {
      if (this.menuSpan !== 24) {
        return {
          padding: 0
        }
      }
      return {}
    }
  }
});

exports.default = script;
