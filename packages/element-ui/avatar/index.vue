<template>
  <span :class="[b(),sizeCls,b('icon')]"
        :style="sizeStyle">
    <img v-if="src"
         :class="b('images')"
         :src="src"
         alt="">
    <i :class="icon"
       v-else-if="icon"></i>
    <span v-else
          :class="b('string')"
          :style="sizeChildrenStyle"
          ref="avatarChildren">
      <slot></slot>
    </span>
  </span>
</template>
<script>
import create from "core/create";
const prefixCls = "avue-avatar";
export default create({
  name: "avatar",
  props: {
    src: String,
    shape: {
      validator: val => ["circle", "square"].includes(val),
      default: "circle"
    },
    shape: String,
    size: {
      validator: val => {
        return (
          typeof val === "number" || ["small", "large", "default"].includes(val)
        );
      },
      default: "default"
    },
    icon: String
  },
  data() {
    return {
      scale: 1
    };
  },

  updated() {
    this.$nextTick(() => {
      this.setScale();
    });
  },
  computed: {
    sizeChildrenStyle() {
      let childrenStyle = {};
      const childrenNode = this.$refs.avatarChildren;
      const transformString = `scale(${this.scale}) translateX(-50%)`;
      childrenStyle = {
        msTransform: transformString,
        WebkitTransform: transformString,
        transform: transformString
      };
      if (typeof size === "number") {
        childrenStyle.lineHeight = `${this.size}px`;
      }
      return childrenStyle;
    },
    sizeCls() {
      return {
        [`${prefixCls}--${this.shape}`]: this.shape,
        [`${prefixCls}--lg`]: this.size === "large",
        [`${prefixCls}--sm`]: this.size === "small"
      };
    },
    sizeStyle() {
      return typeof this.size === "number"
        ? {
            width: `${this.size}px`,
            height: `${this.size}px`,
            lineHeight: `${this.size}px`,
            fontSize: this.icon ? `${this.size / 2}px` : "18px"
          }
        : {};
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.setScale();
    });
  },
  methods: {
    setScale() {
      const childrenNode = this.$refs.avatarChildren;
      if (childrenNode) {
        const childrenWidth = childrenNode.offsetWidth;
        const avatarWidth = this.$el.getBoundingClientRect().width;
        if (avatarWidth - 8 < childrenWidth) {
          this.scale = (avatarWidth - 8) / childrenWidth;
        } else {
          this.scale = 1;
        }
      }
    }
  }
});
</script>