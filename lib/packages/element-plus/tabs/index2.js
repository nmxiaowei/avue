/*! Avue.js v3.9.4 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var src_core_create = require('../../../src/core/create.js');
require('../../core/components/icon/index.js');
var index_vue_vue_type_script_lang = require('../../core/components/icon/index2.js');

var script = src_core_create.default({
  name: "tabs",
  components: {
    iconTemp: index_vue_vue_type_script_lang.default
  },
  props: {
    option: {
      type: Object,
      required: true,
      default: () => {
        return {};
      }
    }
  },
  data () {
    return {
      active: "0",
    };
  },
  watch: {
    active () {
      this.$emit("change", this.tabsObj);
    }
  },
  computed: {
    tabsObj () {
      return this.columnOption[this.active];
    },
    parentOption () {
      return this.option;    },
    columnOption () {
      return this.parentOption.column || [];
    }
  },
  methods: {
    changeTabs (active) {
      this.active = active + "";
    }
  }
});

exports.default = script;
