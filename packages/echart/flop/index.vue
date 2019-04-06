<template>
  <div :class="b()"
       :style="styleParentName">
    <template v-if="whole">
      <div :class="b('item',{'none':(statusDIC.includes(item) || type===''),'img':type==='img','whole':whole})"
           :style="styleName"
           v-for="(item,index) in listData"
           :key="index">
        <div :style="prefixStyle">{{isArray?item.prefixText:option.prefixText}}</div>
        <avue-count-up :end="Number(isArray?item.data:dataChart)"></avue-count-up>
        <div :style="suffixStyle">{{isArray?item.suffixText:option.suffixText}}</div>
      </div>
    </template>
    <template v-else>
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
    </template>

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
    isArray() {
      return Array.isArray(this.dataChart);
    },
    listData() {
      if (this.isArray) {
        return this.dataChart;
      } else {
        return [this.dataChart];
      }
    },
    whole() {
      return this.vaildData(this.option.whole, false);
    },
    type() {
      return this.option.type;
    },
    text() {
      return this.dataChart + "".split("");
    },
    prefixStyle() {
      return {
        textAlign: this.option.prefixTextAlign,
        marginBottom: this.option.prefixSplit + "px",
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
          textAlign: this.option.textAlign,
          backgroundColor: this.option.backgroundColor,
          color: this.option.color || "#fff",
          fontSize: (this.option.fontSize || 64) + "px",
          fontWeight: this.option.fontWeight
        },
        (() => {
          if (this.isArray) {
            return {
              marginBottom: `${this.option.split}px`
            };
          } else {
            return {
              margin: `0 ${this.option.split}px`
            };
          }
        })(),
        (() => {
          if (this.whole && !this.isArray) {
            return {
              width: this.setPx(this.width - 40),
              height: this.setPx(this.height - 40)
            };
          } else {
            return {
              width: this.setPx(this.option.width),
              height: this.setPx(this.option.height)
            };
          }
        })(),
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
    }
  },
  created() {},
  methods: {}
});
</script>