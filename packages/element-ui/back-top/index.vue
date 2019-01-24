<template>
  <div :class="b({'show':backTop})"
       :style="styles"
       @click="back">
    <slot>
      <div :class="b('icon')">
        <i class="el-icon-caret-top"></i>
      </div>
    </slot>
  </div>
</template>

<script>
import create from "core/create";
import { scrollTop } from "../../util/assist";
export default create({
  name: "back-top",
  props: {
    height: {
      type: Number,
      default: 400
    },
    bottom: {
      type: Number,
      default: 30
    },
    right: {
      type: Number,
      default: 30
    },
    duration: {
      type: Number,
      default: 1000
    }
  },
  data() {
    return {
      backTop: false
    };
  },
  computed: {
    styles() {
      return {
        bottom: `${this.bottom}px`,
        right: `${this.right}px`
      };
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll, false);
    window.addEventListener("resize", this.handleScroll, false);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll, false);
    window.removeEventListener("resize", this.handleScroll, false);
  },

  methods: {
    handleScroll() {
      this.backTop = window.pageYOffset >= this.height;
    },
    back() {
      const sTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      scrollTop(window, sTop, 0, this.duration);
      this.$emit("on-click");
    }
  }
});
</script>
