<template>
  <div>
    <div ref="point"
         :class="{'avue-affix':affix}"
         :style="styles">
      <slot></slot>
    </div>
    <div v-show="slot"
         :style="slotStyle"></div>
  </div>
</template>
<script>
import create from "core/create";
import { isDom } from "utils/vdom";
export default create({
  name: "affix",
  props: {
    id: {},
    offsetTop: {
      type: Number,
      default: 0
    },
    offsetBottom: {
      type: Number
    }
  },
  data() {
    return {
      affix: false,
      styles: {},
      slot: false,
      slotStyle: {}
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
    offsetType() {
      let type = "top";
      if (this.offsetBottom >= 0) {
        type = "bottom";
      }

      return type;
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
    getScroll(target, top) {
      const prop = top ? "pageYOffset" : "pageXOffset";
      const method = top ? "scrollTop" : "scrollLeft";

      let ret = target[prop];

      if (typeof ret !== "number") {
        ret = window.document.documentElement[method];
      }

      return ret;
    },

    getOffset(element) {
      const rect = element.getBoundingClientRect();

      const scrollTop = this.getScroll(this.parent, true);
      const scrollLeft = this.getScroll(this.parent);

      const docEl = window.document.body;
      const clientTop = docEl.clientTop || 0;
      const clientLeft = docEl.clientLeft || 0;

      return {
        top: rect.top + scrollTop - clientTop,
        left: rect.left + scrollLeft - clientLeft
      };
    },
    handleScroll() {
      const affix = this.affix;
      const scrollTop = this.getScroll(window, true);
      const elOffset = this.getOffset(this.$el);
      const windowHeight = window.innerHeight;
      const elHeight = this.$el.getElementsByTagName("div")[0].offsetHeight;

      // Fixed Top
      if (
        elOffset.top - this.offsetTop < scrollTop &&
        this.offsetType == "top" &&
        !affix
      ) {
        this.affix = true;
        this.slotStyle = {
          width: this.$refs.point.clientWidth + "px",
          height: this.$refs.point.clientHeight + "px"
        };
        this.slot = true;
        this.styles = {
          top: `${this.offsetTop}px`,
          left: `${elOffset.left}px`,
          width: `${this.$el.offsetWidth}px`
        };

        this.$emit("on-change", true);
      } else if (
        elOffset.top - this.offsetTop > scrollTop &&
        this.offsetType == "top" &&
        affix
      ) {
        this.slot = false;
        this.slotStyle = {};
        this.affix = false;
        this.styles = null;

        this.$emit("on-change", false);
      }

      // Fixed Bottom
      if (
        elOffset.top + this.offsetBottom + elHeight >
          scrollTop + windowHeight &&
        this.offsetType == "bottom" &&
        !affix
      ) {
        this.affix = true;
        this.styles = {
          bottom: `${this.offsetBottom}px`,
          left: `${elOffset.left}px`,
          width: `${this.$el.offsetWidth}px`
        };

        this.$emit("on-change", true);
      } else if (
        elOffset.top + this.offsetBottom + elHeight <
          scrollTop + windowHeight &&
        this.offsetType == "bottom" &&
        affix
      ) {
        this.affix = false;
        this.styles = null;

        this.$emit("on-change", false);
      }
    }
  }
});
</script>