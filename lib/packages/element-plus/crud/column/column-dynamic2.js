/*! Avue.js v3.9.1 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./column-slot.js');
require('../grid/item.js');
var item_vue_vue_type_script_lang = require('../grid/item2.js');
var columnSlot_vue_vue_type_script_lang = require('./column-slot2.js');

var script = {
  name: "column-dynamic",
  components: {
    columnSlot: columnSlot_vue_vue_type_script_lang.default,
    tableItemCard: item_vue_vue_type_script_lang.default,
  },
  inject: ["dynamic", "crud"],
  props: {
    columnOption: Object,
  },
  created() {
    const list = ["getColumnProp"];
    list.forEach((ele) => {
      if (this.dynamic) this[ele] = this.dynamic[ele];
    });
  },
};

exports.default = script;
