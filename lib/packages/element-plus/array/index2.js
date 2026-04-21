/*! Avue.js v3.8.6 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var src_core_create = require('../../../src/core/create.js');
var packages_core_common_props = require('../../core/common/props.js');
var packages_core_common_event = require('../../core/common/event.js');
var src_utils_util = require('../../../src/utils/util.js');

var script = src_core_create.default({
  name: 'array',
  mixins: [packages_core_common_props.default(), packages_core_common_event.default()],
  data () {
    return {
      text: []
    }
  },
  computed: {
    isLimit () {
      if (this.validatenull(this.limit)) return false
      else if (this.textLen >= this.limit) return true
      return false
    },
    textLen () {
      return (this.text || []).length
    },
    isImg () {
      return this.type === 'img'
    },
    isUrl () {
      return this.type === 'url'
    },
  },
  props: {
    fileType: String,
    alone: Boolean,
    type: String,
    limit: Number,
    maxlength: [String, Number],
    minlength: [String, Number],
    showWordLimit: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    isMediaType (item) {
      return src_utils_util.isMediaType(item, this.fileType)
    },
    add (index) {
      this.text.splice(index + 1, 0, '');
    },
    remove (index) {
      this.text.splice(index, 1);
    },
    openImg (index) {
      const list = this.text.map(ele => {
        return { thumbUrl: ele, url: ele, type: this.fileType }
      });
      this.$ImagePreview(list, index);
    },
  }
});

exports.default = script;
