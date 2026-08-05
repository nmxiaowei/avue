/*! Avue.js v3.9.3 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var src_core_create = require('../../../src/core/create.js');
var src_core_locale = require('../../../src/core/locale.js');

const propsDefault = {
  img: "img",
  title: "title",
  info: "info"
};
var script = src_core_create.default({
  name: "card",
  mixins: [src_core_locale.default],
  props: {
    props: {
      type: Object,
      default: () => {
        return propsDefault;
      }
    },
    option: {
      type: Object,
      default: () => {
        return {};
      }
    },
    data: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data () {
    return {
      propsDefault: propsDefault
    };
  },
  computed: {
    imgKey: function () {
      return this.option.props.img || this.propsDefault.img;
    },
    titleKey: function () {
      return this.option.props.title || this.propsDefault.title;
    },
    infoKey: function () {
      return this.option.props.info || this.propsDefault.info;
    },
    span () {
      return this.option.span || 8;
    },
    gutter () {
      return this.option.gutter || 20;
    }
  },
  methods: {
    rowAdd () {
      this.$emit("row-add");
    },
    rowClick (row, index) {
      this.$emit("row-click", row, index);
    }
  }
});

exports.default = script;
