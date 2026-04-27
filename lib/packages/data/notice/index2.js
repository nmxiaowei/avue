/*! Avue.js v3.9.0 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var src_core_create = require('../../../src/core/create.js');
var src_core_locale = require('../../../src/core/locale.js');

var script = src_core_create.default({
  name: "data-notice",
  mixins: [src_core_locale.default],
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
    showMore() {
      return this.option.showMore !== false;
    },
    moreText() {
      return this.option.moreText || this.t('common.more');
    },
    data() {
      return this.option.data || [];
    }
  },
  methods: {
    handleClick(item) {
      this.$emit('click', item);
      item.click && item.click(item);
    },
    handleMore() {
      this.$emit('more');
    }
  }
});

exports.default = script;
