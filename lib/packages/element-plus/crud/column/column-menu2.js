/*! Avue.js v3.9.4 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var src_core_create = require('../../../../src/core/create.js');
var src_core_locale = require('../../../../src/core/locale.js');
var packages_core_directive_permission = require('../../../core/directive/permission.js');
var packages_elementPlus_crud_config = require('../config.js');
require('../grid/item.js');
var item_vue_vue_type_script_lang = require('../grid/item2.js');

var script = src_core_create.default({
  name: "crud",
  data() {
    return {
      config: packages_elementPlus_crud_config.default,
    };
  },
  components: {
    tableItemCard: item_vue_vue_type_script_lang.default,
  },
  mixins: [src_core_locale.default],
  inject: ["crud"],
  directives: {
    permission: packages_core_directive_permission.default,
  },
  computed: {
    menuType() {
      return this.crud.tableOption.menuType || this.$AVUE.menuType;
    },
    isIconMenu() {
      return this.menuType === "icon";
    },
    isTextMenu() {
      return this.menuType === "text";
    },
    isMenu() {
      return this.menuType === "menu";
    },
  },
  methods: {
    menuText(value) {
      return value;
    },
    menuParams({ row, column, $index }) {
      let parent = this.crud;
      return {
        row,
        column,
        type: this.menuText("primary"),
        disabled: parent.btnDisabled,
        size: parent.size,
        index: $index,
      };
    },
  },
});

exports.default = script;
