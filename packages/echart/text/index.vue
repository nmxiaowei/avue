<template>
  <div :class="b()"
       :style="styleSizeName"
       ref="main">
    <div ref="box"
         :class="b('box')">
      <a ref="text"
         :class="b('text')"
         :href="linkHref"
         :style="styleName"
         :target="linkTarget">{{data}}</a>
    </div>

  </div>
</template>

<script>
import create from "core/echart/create";
export default create({
  name: "text",
  data() {
    return {
      check: "",
      date: new Date(),
      left: 0,
      textWidth: 0
    };
  },
  computed: {
    scroll() {
      return this.vaildData(this.option.scroll, false);
    },
    linkHref() {
      return this.option.linkHref || "#";
    },
    linkTarget() {
      return this.option.linkTarget || "_self";
    },
    step() {
      return this.option.step || 5;
    },
    speed() {
      return this.option.speed || 100;
    },
    fontSize() {
      return this.option.fontSize || 30;
    },
    styleName() {
      return {
        transform: "translateX(" + this.left + "px)",
        textAlign: this.option.textAlign,
        backgroundColor: this.option.backgroundColor,
        fontWeight: this.option.fontWeight || "normal",
        fontSize: this.fontSize + "px",
        color: this.option.color || "#333"
      };
    }
  },
  watch: {
    scroll() {
      this.move();
    },
    speed() {
      this.move();
    }
  },
  created() {
    setInterval(() => {
      this.date = new Date();
    }, 1000);
  },
  mounted() {
    this.move();
  },
  methods: {
    move() {
      clearInterval(this.check);
      if (this.scroll) {
        const textLen = this.data.length;
        this.textWidth = textLen * this.fontSize;
        this.check = setInterval(() => {
          if (this.left < -this.textWidth) {
            this.left = this.width;
          }
          this.left = this.left - this.step;
        }, this.speed);
      } else {
        this.left = 0;
      }
    }
  },
  props: {
    option: {
      type: Object,
      default: () => {
        return {};
      }
    },
    data: {
      type: Object,
      default: () => {
        return {};
      }
    }
  }
});
</script>


