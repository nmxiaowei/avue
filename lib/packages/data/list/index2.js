/*! Avue.js v3.9.4 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var src_core_create = require('../../../src/core/create.js');
require('../../core/components/icon/index.js');
var index_vue_vue_type_script_lang = require('../../core/components/icon/index2.js');

var script = src_core_create.default({
  name: "data-list",
  components: {
    iconTemp: index_vue_vue_type_script_lang.default
  },
  data() {
    return {};
  },
  props: {
    option: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    title() {
      return this.option.title;
    },
    data() {
      return this.option.data || [];
    }
  },
  methods: {
    handleClick(item) {
      this.$emit('click', item);
      item.click && item.click(item);
    }
  }
});

exports.default = script;
