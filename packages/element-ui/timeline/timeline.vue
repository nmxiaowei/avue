<template>
  <ul :class="classes">
    <slot></slot>
  </ul>
</template>
<script>
import create from "core/create";
const prefixCls = "avue-timeline";
export default create({
  name: "timeline",
  props: {
    pending: {
      type: Boolean,
      default: false
    },
    time: {
      type: Boolean,
      default: false
    },
    timeWidth: {
      type: Number,
      default: 100
    }
  },
  computed: {
    classes() {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-pending`]: this.pending,
          [`${prefixCls}-time`]: this.time
        }
      ];
    }
  }
});
</script>