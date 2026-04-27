/*! Avue.js v3.9.0 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var src_core_create = require('../../../src/core/create.js');
var packages_core_common_props = require('../../core/common/props.js');
var packages_core_common_event = require('../../core/common/event.js');
var src_global_variable = require('../../../src/global/variable.js');

var script = src_core_create.default({
  name: "input-tree",
  mixins: [packages_core_common_props.default(), packages_core_common_event.default()],
  data () {
    return {
      netDic: [],
      loading: false,
    };
  },
  props: {
    cacheData: [Object, Array],
    indent: Number,
    filterNodeMethod: Function,
    nodeClick: Function,
    treeLoad: Function,
    checked: Function,
    modelValue: {},
    loadingText: {
      type: String,
    },
    lazy: {
      type: Boolean,
      default: false
    },
    leafOnly: {
      type: Boolean,
      default: false
    },
    tags: {
      type: Boolean,
      default: false
    },
    limit: {
      type: Number,
      default: 0
    },
    checkOnClickLeaf: Boolean,
    filterable: {
      type: Boolean,
      default: false
    },
    checkStrictly: {
      type: Boolean,
      default: (props) => props.multiple ? false : true
    },
    accordion: {
      type: Boolean,
      default: false
    },
    parent: {
      type: Boolean,
      default: true
    },
    iconClass: {
      type: String,
    },
    defaultExpandedKeys: Array,
    checkOnClickNode: Boolean,
    expandOnClickNode: Boolean,
    defaultExpandAll: Boolean,
    popperAppendToBody: Boolean,
  },
  watch: {
    dic: {
      handler (val) {
        this.netDic = val;
      },
      immediate: true
    },
    netDic: {
      handler () {
        this.init();
      },
      immediate: true
    },
  },
  computed: {
    keysList () {
      return this.multiple ? this.text : [this.text || '']
    },
    treeProps () {
      return Object.assign(this.deepClone(src_global_variable.DIC_PROPS), this.props, {
        isLeaf: this.leafKey
      })
    }
  },
  methods: {
    handleTextValue (value) {
      this.init();
    },
    getHalfList () {
      let list = this.$refs.tree.getCheckedNodes(false, true);
      list = list.map(ele => ele[this.valueKey]);
      return list;
    },
    init () {
      this.disabledParentNode(this.dic, this.parent);
    },
    disabledParentNode (dic, parent) {
      dic.forEach(ele => {
        const children = ele[this.childrenKey];
        if (!this.validatenull(children)) {
          if (!parent) {
            ele.disabled = true;
          }
          this.disabledParentNode(children, parent);
        }
      });
    },
    checkChange (checkedNodes, checkedKeys, halfCheckedNodes, halfCheckedKeys) {
      if (typeof this.checked === "function") this.checked(checkedNodes, checkedKeys, halfCheckedNodes, halfCheckedKeys);
    },
    handleNodeClick (data, node, nodeComp) {
      if (typeof this.nodeClick === "function") this.nodeClick(data, node, nodeComp);
    },
    handleLoad (node, resolve) {
      let callback = (list) => {
        let findDic = (list, value, children) => {
          list.forEach(ele => {
            if (ele[this.valueKey] == value) {
              ele[this.childrenKey] = children;
            } else if (ele[this.childrenKey]) {
              findDic(ele[this.childrenKey]);
            }
          });
        };
        findDic(this.netDic, node.key, list);
        resolve(list);
      };
      this.treeLoad && this.treeLoad(node, callback);
    }
  }
});

exports.default = script;
