/*! Avue.js v3.9.2 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var src_core_create = require('../../../src/core/create.js');
var packages_core_common_props = require('../../core/common/props.js');
var packages_core_common_event = require('../../core/common/event.js');

var script = src_core_create.default({
  name: "cascader",
  mixins: [packages_core_common_props.default(), packages_core_common_event.default()],
  props: {
    clearValidate: Function,
    effect: {
      type: String,
      default: "light",
    },
    virtualScroll: {
      type: Boolean,
      default: undefined,
    },
    fitInputWidth: {
      type: Boolean,
      default: undefined,
    },
    height: Number,
    itemSize: Number,
    showCheckedStrategy: String,
    checkStrictly: {
      type: Boolean,
      default: false,
    },
    emitPath: {
      type: Boolean,
      default: true,
    },
    tags: {
      type: Boolean,
      default: false,
    },
    collapseTags: Boolean,
    collapseTagsTooltip: Boolean,
    maxCollapseTags: Number,
    expandTrigger: {
      type: String,
      default: "hover",
    },
    showAllLevels: {
      type: Boolean,
      default: true,
    },
    lazy: {
      type: Boolean,
      default: false,
    },
    lazyLoad: Function,
    filterable: {
      type: Boolean,
      default: false,
    },
    separator: {
      type: String,
    },
  },
  computed: {
    allProps() {
      return {
        label: this.labelKey,
        value: this.valueKey,
        disabled: this.disabledKey,
        children: this.childrenKey,
        checkStrictly: this.checkStrictly,
        multiple: this.multiple,
        emitPath: this.emitPath,
        expandTrigger: this.props.expandTrigger,
        hoverThreshold: this.props.hoverThreshold,
        leaf: this.leafKey,
        lazy: this.lazy,
        lazyLoad: (node, resolve) => {
          let callback = (list) => {
            let findDic = (list, value, children) => {
              list.forEach((ele) => {
                if (ele[this.valueKey] == value) {
                  ele[this.childrenKey] = children;
                } else if (ele[this.childrenKey]) {
                  findDic(ele[this.childrenKey]);
                }
              });
            };
            findDic(this.dic, node[this.valueKey], list);
            resolve(list);
          };
          this.lazyLoad && this.lazyLoad(node, callback);
        },
        expandTrigger: this.expandTrigger,
      };
    },
  },
  created() {},
  mounted() {},
  methods: {
    handleValueChange(val) {
      setTimeout(() => {
        if (!this.validatenull(val) && this.rules && this.clearValidate) {
          this.clearValidate(this.prop);
        }
      });
    },
    getCheckedNodes(leafOnly = false) {
      return this.$refs.cascader.getCheckedNodes(leafOnly);
    },
  },
});

exports.default = script;
