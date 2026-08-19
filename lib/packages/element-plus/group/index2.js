/*! Avue.js v3.9.4 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var src_core_create = require('../../../src/core/create.js');
require('../../core/components/icon/index.js');
var index_vue_vue_type_script_lang = require('../../core/components/icon/index2.js');

var script = src_core_create.default({
  name: "group",
  components: {
    iconTemp: index_vue_vue_type_script_lang.default
  },
  empit: ['change'],
  data () {
    return {
      activeName: '',
    }
  },
  props: {
    arrow: {
      type: Boolean,
      default: true
    },
    collapse: {
      type: Boolean,
      default: true
    },
    header: {
      type: Boolean,
      default: true
    },
    icon: {
      type: String
    },
    display: {
      type: Boolean,
      default: true
    },
    card: {
      type: Boolean,
      default: false
    },
    label: {
      type: String
    }
  },
  watch: {
    text (val) {
      this.activeName = [val];
    },
  },
  computed: {
    text () {
      return this.collapse ? 1 : 0
    },
    isHeader () {
      return this.$slots.header && this.header || ((this.label || this.icon) && this.header)
    }
  },
  created () {
    this.activeName = [this.text];
  },
  methods: {
    handleChange (activeNames) {
      this.$emit('change', activeNames);
    },
  }
});

exports.default = script;
