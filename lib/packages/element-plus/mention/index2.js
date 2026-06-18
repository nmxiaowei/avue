/*! Avue.js v3.9.2 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var src_core_create = require('../../../src/core/create.js');
var packages_core_common_props = require('../../core/common/props.js');
var packages_core_common_event = require('../../core/common/event.js');
var src_core_dic = require('../../../src/core/dic.js');

var script = src_core_create.default({
  name: "mention",
  mixins: [packages_core_common_props.default(), packages_core_common_event.default()],
  data () {
    return {
      created: false,
      loading: false,
      netDic: [],
    };
  },
  props: {
    split: {
      type: String,
      default: ','
    },
    remote: Boolean,
    prependClick: {
      type: Function,
      default: () => { }
    },
    prepend: {
      type: String
    },
    appendClick: {
      type: Function,
      default: () => { }
    },
    append: {
      type: String
    },
    prefix: String,
    whole: Boolean,
    checkIsWhole: Function
  },
  created () { },
  mounted () { },
  computed: {
    options () {
      return this.netDic.map(ele => {
        return {
          label: ele[this.labelKey],
          value: ele[this.valueKey],
        }
      })
    }
  },
  watch: {
    dic: {
      handler (val) {
        this.netDic = val;
      },
      immediate: true
    }
  },
  methods: {
    handleModelValue (val) {
      if (!this.validatenull(this.text)) {
        if (this.remote && !this.created) {
          this.created = true;
          this.handleRemoteMethod(this.text);
        }
      }
    },
    handleRemoteMethod (query) {
      this.loading = true;
      src_core_dic.sendDic({
        column: this.column,
        value: query,
      }, this).then(res => {
        this.loading = false;
        this.netDic = res;
      });
    }
  }
});

exports.default = script;
