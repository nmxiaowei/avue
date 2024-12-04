<template>
  <span>{{end}}</span>
</template>

<script>
import CountUp from "countup.js";
import create from "core/create";
export default create({
  name: "count-up",
  props: {
    animation: {
      type: Boolean,
      default: true
    },
    start: {
      type: Number,
      required: false,
      default: 0
    },
    end: {
      required: true
    },
    decimals: {
      type: Number,
      required: false,
      default: 0
    },
    duration: {
      type: Number,
      required: false,
      default: 2
    },
    options: {
      type: Object,
      required: false,
      default () {
        return {};
      }
    },
    callback: {
      type: Function,
      required: false,
      default: () => { }
    }
  },
  data () {
    return {
      c: null
    };
  },
  watch: {
    decimals () {
      if (this.c && this.c.update) {
        this.c.update(this.end);
      }
    },
    end (value) {
      if (this.c && this.c.update) {
        this.c.update(value);
      }
    }
  },
  mounted () {
    if (this.animation) {
      this.init();
    }

  },
  methods: {
    init () {
      if (!this.c) {
        this.c = new CountUp(
          this.$el,
          this.start,
          this.end,
          this.decimals,
          this.duration,
          this.options
        );
        this.c.start();
      }
    },
    pauseResume () {
      if (this.c && this.c.pauseResume) {
        this.c.pauseResume();
      }
    },
    reset () {
      if (this.c && this.c.reset) {
        this.c.reset();
      }
    },
    update (newEndVal) {
      if (this.c && this.c.update) {
        this.c.update(newEndVal);
      }
    },
    destroy () {
      this.c = null;
    }
  },
  beforeUnmount () {
    this.destroy();
  },

});
</script>