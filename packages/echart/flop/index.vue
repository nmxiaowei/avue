<template>
  <div :class="b()">
    <div :style="prefixStyle">{{option.prefixText}}</div>
    <div :class="b('item',{'none':(item===',' || type===''),'img':type==='img'})"
         v-for="(item,index) in text"
         :key="index"
         :style="styleName">
      {{item}}
    </div>
    <div :style="suffixStyle">{{option.suffixText}}</div>
  </div>
</template>

<script>
import create from "core/echart/create";
export default create({
  name: "flop",
  data() {
    return {};
  },
  computed: {
    type() {
      return this.option.type;
    },
    text() {
      return this.data + "".split("");
    },
    prefixStyle() {
      return {
        textAlign: this.option.prefixTextAlign,
        marginTop: this.option.prefixSplit + "px",
        color: this.option.prefixColor || "#fff",
        fontSize: (this.option.prefixFontSize || 24) + "px"
      };
    },
    suffixStyle() {
      return {
        textAlign: this.option.suffixTextAlign,
        marginTop: this.option.suffixSplit + "px",
        color: this.option.suffixColor || "#fff",
        fontSize: (this.option.suffixFontSize || 24) + "px"
      };
    },
    styleName() {
      return Object.assign(
        {
          color: this.option.color || "#fff",
          fontSize: (this.option.fontSize || 64) + "px",
          fontWeight: this.option.fontWeight,
          margin: `0 ${this.option.split}px`,
          backgroundColor: this.option.backgroundColor
        },
        (() => {
          if (this.type === "img") {
            return {
              borderImageSource: `url(${this.option.backgroundImage})`
            };
          } else if (this.type === "border") {
            return {
              borderColor: this.option.borderColor || "#fff",
              borderStyle: "solid",
              borderWidth: (this.option.borderWidth || 2) + "px"
            };
          }
        })()
      );
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
      type: [String, Number],
      default: ""
    }
  },
  created() {},
  methods: {}
});
</script>