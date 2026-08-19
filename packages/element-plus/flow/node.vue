<template>
  <div ref="node"
       :class="b('node-wrapper')"
       :style="flowNodeContainer"
       tabindex="0"
       role="button"
       @click="handleClick"
       @keydown.enter.prevent="handleClick"
       @mouseup="changeNodeSite">
    <div :class="b('node', { active: active === node.id })">
      <div :class="b('node-header')">
        <span v-if="editable"
              :class="b('node-drag')"
              title="拖动节点"></span>
        <el-icon><el-icon-rank /></el-icon>
        <slot name="header"
              :node="node"></slot>
      </div>
      <div :class="b('node-body')">
        <slot :node="node">{{ node.name }}</slot>
      </div>
    </div>
  </div>
</template>

<script>
import create from "core/create";

export default create({
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
})
</script>
