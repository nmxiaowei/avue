<template>
  <div :class="b({'warp':isWarp})"
       :style="styleParentName">
    <div v-if="whole"
         :class="[b('item',{'none':(statusDIC.includes(item) || type===''),'img':type==='img','whole':whole}),b({'row':isRow})]"
         :style="styleName"
         v-for="(item,index) in listData"
         :key="index">
      <div :style="prefixStyle"
           v-if="getValByArray(item,'prefixText')">{{getValByArray(item,'prefixText')}}</div>
      <avue-count-up v-if="isArray?item.data:dataChart"
                     :end="Number(isArray?item.data:dataChart)"></avue-count-up>
      <div :style="suffixStyle"
           v-if="getValByArray(item,'suffixText')">{{getValByArray(item,'suffixText')}}</div>
    </div>
    <div v-else
         :class="b({'row':isRow})">
      <div :style="prefixStyle"
           v-if="option.prefixText">{{option.prefixText}}</div>
      <div :class="b('item',{'none':(statusDIC.includes(item) || type===''),'img':type==='img'})"
           v-for="(item,index) in text"
           :key="index"
           :style="styleName">
        <span v-if="statusDIC.includes(item)">{{item}}</span>
        <avue-count-up v-else
                       :end="Number(item)"></avue-count-up>
      </div>
      <div :style="suffixStyle"
           v-if="option.suffixText">{{option.suffixText}}</div>
    </div>
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
    isRow() {
      return this.option.row;
    },
    isWarp() {
      return this.option.warp;
    },
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
        marginBottom: this.option.prefixSplity + "px",
        marginRight: this.option.prefixSplitx + "px",
        color: this.option.prefixColor || "#fff",
        fontSize: (this.option.prefixFontSize || 24) + "px"
      };
    },
    suffixStyle() {
      return {
        textAlign: this.option.suffixTextAlign,
        marginTop: this.option.suffixSplity + "px",
        marginLeft: this.option.suffixSplitx + "px",
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
          fontWeight: this.option.fontWeight,
          marginRight: `${this.option.splitx}px`,
          marginBottom: `${this.option.splity}px`
        },
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
  methods: {
    getValByArray(item, prop) {
      return this.isArray ? item[prop] : this.option[prop];
    }
  }
});
</script>