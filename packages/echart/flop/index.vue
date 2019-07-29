<template>
  <div :class="b()"
       :style="styleParentName">
    <template v-if="whole">
      <el-tooltip :disabled="!item.formatter"
                  placement="top-start"
                  :key="index"
                  v-for="(item,index) in listData">
        <div slot="content"
             v-html="item.formatter && item.formatter()"></div>
        <div :class="b('item',{'none':(statusDIC.includes(item) || type===''),'img':type==='img','whole':whole,'row':isRow})"
             :style="styleName"
             @click="handleClick(item,index)">
          <div :style="prefixStyle"
               v-if="getValByArray(item,'prefixText')">{{getValByArray(item,'prefixText')}}</div>
          <avue-count-up :decimals="decimals"
                         :style="styleValueName"
                         :end="isArray?item.data:dataChart.value"></avue-count-up>
          <div :style="suffixStyle"
               v-if="getValByArray(item,'suffixText')">{{getValByArray(item,'suffixText')}}</div>
        </div>
      </el-tooltip>
    </template>
    <div v-else>
      <div :style="prefixStyle"
           v-if="option.prefixText">{{option.prefixText}}</div>
      <div :class="b('flop')">
        <div :class="b('item',{'none':(statusDIC.includes(item) || type===''),'img':type==='img'})"
             v-for="(item,index) in text"
             :key="index"
             @click="handleClick(item,index)"
             :style="[styleItemName,styleName]">
          <div v-if="statusDIC.includes(item)">{{item}}</div>
          <avue-count-up :decimals="decimals"
                         v-else
                         :style="styleValueName"
                         :end="item"></avue-count-up>
        </div>
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
  data () {
    return {
      statusDIC: [".", ","]
    };
  },
  computed: {
    isArray () {
      return Array.isArray(this.dataChart);
    },
    decimals () {
      return this.option.decimals || 2
    },
    listData () {
      if (this.isArray) {
        return this.dataChart;
      } else {
        return [this.dataChart];
      }
    },
    isRow () {
      return this.option.row;
    },
    whole () {
      return this.vaildData(this.option.whole, false);
    },
    type () {
      return this.option.type;
    },
    text () {
      return this.dataChart.value + "".split("");
    },
    prefixStyle () {
      return {
        textAlign: this.option.prefixTextAlign,
        marginBottom: this.option.prefixSplity + "px",
        marginRight: this.option.prefixSplitx + "px",
        color: this.option.prefixColor || "#fff",
        fontSize: (this.option.prefixFontSize || 24) + "px"
      };
    },
    suffixStyle () {
      return {
        textAlign: this.option.suffixTextAlign,
        marginTop: this.option.suffixSplity + "px",
        marginLeft: this.option.suffixSplitx + "px",
        color: this.option.suffixColor || "#fff",
        fontSize: (this.option.suffixFontSize || 24) + "px"
      };
    },
    styleParentName () {
      if (!["img", "border"].includes(this.type)) {
        return Object.assign(this.styleSizeName, {
          backgroundImage: `url(${this.option.backgroundImage})`,
          backgroundColor: this.option.backgroundColor
        });
      }
      return this.styleSizeName;
    },
    styleItemName () {
      return {
        marginRight: `${this.option.gridY}px`
      };
    },
    styleValueName () {
      if (this.whole) {
        return {
          marginTop: `${this.option.gridY}px`
        };
      }
    },
    styleName () {
      return Object.assign(
        (() => {
          if (this.option.backgroundImage) {
            return {
              backgroundImage: `url(${this.option.backgroundImage})`,
              backgroundSize: "100% 100%"
            };
          }
          return {};
        })(),
        {
          textAlign: this.option.textAlign,
          backgroundColor: this.option.backgroundColor,
          color: this.option.color || "#fff",
          fontSize: (this.option.fontSize || 64) + "px",
          fontWeight: this.option.fontWeight
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
              borderImageSource: `url(${this.option.backgroundBorder})`
            };
          } else if (this.type === "border") {
            return {
              borderColor: this.option.borderColor || "#fff",
              borderStyle: "solid",
              borderWidth: this.setPx(this.option.borderWidth)
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
  created () { },
  methods: {
    handleClick (item, index) {
      this.clickFormatter({
        type: index,
        value: item,
        data: this.dataChart
      });
    },
    getValByArray (item, prop) {
      return this.isArray ? item[prop] : this.option[prop];
    }
  }
});
</script>