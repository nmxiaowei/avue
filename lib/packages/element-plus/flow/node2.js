/*! Avue.js v3.9.4 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var src_core_create = require('../../../src/core/create.js');

var script = src_core_create.default({
  name: 'flow',
  emits: ['click', 'change-node-site'],
  props: {
    active: [String, Number],
    node: {
      type: Object,
      required: true
    },
    nodeWidth: [String, Number],
    nodeHeight: [String, Number],
    editable: Boolean
  },
  computed: {
    flowNodeContainer () {
      return {
        width: this.setPx(this.node.width || this.nodeWidth),
        minHeight: this.setPx(this.node.height || this.nodeHeight),
        top: this.setPx(this.node.top || 0),
        left: this.setPx(this.node.left || 0)
      }
    }
  },
  methods: {
    handleClick () {
      this.$emit('click', this.node);
    },
    changeNodeSite () {
      if (!this.editable || !this.$refs.node) return;
      const left = Number.parseFloat(this.$refs.node.style.left);
      const top = Number.parseFloat(this.$refs.node.style.top);
      if (Number.isNaN(left) || Number.isNaN(top)) return;
      if (Number(this.node.left || 0) === left && Number(this.node.top || 0) === top) return;
      this.$emit('change-node-site', { id: this.node.id, left, top });
    }
  }
});

exports.default = script;
