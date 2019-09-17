<template>
  <div ref="node"
       :style="flowNodeContainer"
       @mouseenter="showDelete"
       @mouseleave="hideDelete"
       @mouseup="changeNodeSite"
       :left="node.left"
       :top="node.top"
       disabled
       :mask="false">
    <div :class="b('node',{'active':active===node.id})">
      <div :class="b('node-header')">
        <i class="el-icon-rank"
           :class="b('node-drag')"></i>
        <slot name="header"
              :node="node">
        </slot>
      </div>
      <div :class="b('node-body')">
        {{node.name}}
      </div>
    </div>
  </div>
</template>

<script>
import create from "core/create";
export default create({
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
      this.mouseEnter = true
    },
    // 鼠标离开
    hideDelete () {
      this.mouseEnter = false
    },
    // 鼠标移动后抬起
    changeNodeSite () {
      // 避免抖动
      if (this.node.left == this.$refs.node.style.left && this.node.top == this.$refs.node.style.top) {
        return;
      }
      this.$emit('changeNodeSite', {
        index: this.index,
        left: this.$refs.node.style.left,
        top: this.$refs.node.style.top,
      })
    }
  }
})
</script>
