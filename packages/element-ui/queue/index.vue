<template>
  <div :class="[b(),{'avue-queue--block':block}]">
    <div class="animated"
         :class="animate"
         ref="queue">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import create from "core/create";
export default create({
  name: "queue",
  props: {
    enter: {
      type: String,
      default: "fadeInLeft"
    },
    leave: {
      type: String,
      default: "fadeOutRight"
    },
    block: {
      type: Boolean,
      default: false
    },
    delay: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      isFixed: 0,
      animate: []
    };
  },
  mounted() {
    this.$nextTick(() => {
      addEventListener("scroll", this.handleAnimate);
      this.handleAnimate();
    });
  },
  methods: {
    handleAnimate() {
      let top =
        pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      let vh = document.documentElement.clientHeight;
      let v = this.$refs.queue;
      if (top + vh > v.offsetTop) {
        setTimeout(() => {
          this.animate = [this.enter, "avuex-opacity--active"];
        }, this.delay);
      } else {
        this.animate = ["avuex-opacity"];
      }
    }
  },
  destroyed() {
    removeEventListener("scroll", this.handleAnimate);
  }
});
</script>

