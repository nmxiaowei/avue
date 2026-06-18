/*! Avue.js v3.9.2 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var src_core_create = require('../../../src/core/create.js');
var packages_core_common_props = require('../../core/common/props.js');
var packages_core_common_event = require('../../core/common/event.js');

var script = src_core_create.default({
  name: "radio",
  mixins: [packages_core_common_props.default(), packages_core_common_event.default()],
  data () {
    return {
      name: 'radio',
    };
  },
  props: {
    modelValue: {}
  },
  watch: {},
  created () { },
  mounted () { },
  methods: {}
});

exports.default = script;
