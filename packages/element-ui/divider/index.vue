<template>
  <div :class="[b(),classString]">
    <span :class="b('text')">
      <slot></slot>
    </span>
  </div>
</template>
<script>
import create from "core/create";
const prefixCls = "avue-divider";
export default create({
  name: "divider",
  props: {
    type: {
      type: String,
      default: "horizontal"
    },
    dashed: Boolean,
    orientation: {
      type: String
    }
  },
  data() {
    return {};
  },
  computed: {
    classString() {
      const { type, $slots, dashed, orientation = "" } = this;
      const orientationPrefix =
        orientation.length > 0 ? "-" + orientation : orientation;

      return {
        [`${prefixCls}--${type}`]: true,
        [`${prefixCls}--text${orientationPrefix}`]: $slots.default,
        [`${prefixCls}--dashed`]: !!dashed
      };
    }
  },
  mounted() {},
  methods: {}
});
</script>