<template>
  <div :class="b()"
       :style="styleParentName">
    <div :style="prefixStyle">{{option.prefixText}}</div>
    <div :class="b('item',{'none':(statusDIC.includes(item) || type===''),'img':type==='img'})"
         v-for="(item,index) in text"
         :key="index"
         :style="styleName">
      <span v-if="statusDIC.includes(item)">{{item}}</span>
      <avue-count-up v-else
                     :end="Number(item)"></avue-count-up>
    </div>
    <div :style="suffixStyle">{{option.suffixText}}</div>
  </div>
</template>

<script>
import create from "core/echart/create";
export default create({
  name: "flop",
  data() {
    return {
      statusDIC: [".", ","]
    };
  },
  computed: {
    type() {
      return this.option.type;
    },
    text() {
      return this.dataChart + "".split("");
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
    styleParentName() {
      if (!["img", "border"].includes(this.type)) {
        return Object.assign(this.styleSizeName, {
          backgroundColor: this.option.backgroundColor
        });
      }
      return this.styleSizeName;
    },
    styleName() {
      return Object.assign(
        {
          backgroundColor: this.option.backgroundColor,
          color: this.option.color || "#fff",
          fontSize: (this.option.fontSize || 64) + "px",
          fontWeight: this.option.fontWeight,
          margin: `0 ${this.option.split}px`
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