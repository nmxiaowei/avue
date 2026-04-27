/*! Avue.js v3.9.0 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var src_core_create = require('../../../src/core/create.js');
var packages_core_common_props = require('../../core/common/props.js');
var packages_core_common_event = require('../../core/common/event.js');

var script = src_core_create.default({
  name: "switch",
  mixins: [packages_core_common_props.default(), packages_core_common_event.default()],
  props: {
    inlinePrompt: Boolean,
    inactiveActionIcon: String,
    activeActionIcon: String,
    inactiveIcon: String,
    activeIcon: String,
    len: Number,
    beforeChange: Function
  },
  data () {
    return {
      loading: false,
    };
  },
  watch: {},
  created () { },
  mounted () { },
  computed: {
    active () {
      return this.dic[1] || {};
    },
    inactive () {
      return this.dic[0] || {};
    }
  },
  methods: {
    handleBeforeChange () {
      return new Promise((resolve) => {
        this.loading = true;
        const callback = (result) => {
          this.loading = false;
          return resolve(result)
        };
        if (typeof this.beforeChange == 'function') {
          return this.beforeChange(callback)
        } else {
          return callback(true)
        }
      })

    }
  }
});

exports.default = script;
