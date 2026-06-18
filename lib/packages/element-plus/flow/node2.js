/*! Avue.js v3.9.2 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var src_core_create = require('../../../src/core/create.js');

var script = src_core_create.default({
  name: 'flow',
  props: {
    active: [String, Number],
    index: [String, Number],
    node: Object
  },
  data () {
    return {
      // 控制节点操作显示
      mouseEnter: false
    }
  },
  computed: {
    // 节点容器样式
    flowNodeContainer: {
      get () {
        return {
          position: 'absolute',
          width: '200px',
          top: this.setPx(this.node.top),
          left: this.setPx(this.node.left),
          boxShadow: this.mouseEnter ? '#66a6e0 0px 0px 12px 0px' : '',
          backgroundColor: 'transparent'
        }
      }
    }
  },
  methods: {
    // 鼠标进入
    showDelete () {
      this.mouseEnter = true;
    },
    // 鼠标离开
    hideDelete () {
      this.mouseEnter = false;
    },
    // 鼠标移动后抬起
    changeNodeSite () {
      // 避免抖动
      if (this.node.left == this.$refs.node.style.left && this.node.top == this.$refs.node.style.top) {
        return;
      }
      this.$emit('changeNodeSite', {
        index: this.index,
        left: Number(this.$refs.node.style.left.replace('px', '')),
        top: Number(this.$refs.node.style.top.replace('px', '')),
      });
    }
  }
});

exports.default = script;
