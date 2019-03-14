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
import { isDom } from "utils/vdom";
import { scrollTop } from "../../util/assist";
export default create({
  name: "back-top",
  props: {
    id: {},
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
    parent() {
      if (this.validatenull(this.id)) {
        return window;
      } else {
        if (isDom(this.id)) return this.id;
        else return window.document.getElementById(this.id);
      }
    },
    styles() {
      return {
        bottom: `${this.bottom}px`,
        right: `${this.right}px`
      };
    }
  },
  mounted() {
    this.parent.addEventListener("scroll", this.handleScroll, false);
    this.parent.addEventListener("resize", this.handleScroll, false);
  },
  beforeDestroy() {
    this.parent.removeEventListener("scroll", this.handleScroll, false);
    this.parent.removeEventListener("resize", this.handleScroll, false);
  },

  methods: {
    handleScroll() {
      this.backTop =
        (this.parent.pageYOffset || this.parent.scrollTop) >= this.height;
    },
    back() {
      const sTop = this.parent.pageYOffset || this.parent.scrollTop;
      scrollTop(this.parent, sTop, 0, this.duration);
      this.$emit("on-click");
    }
  }
});
</script>
