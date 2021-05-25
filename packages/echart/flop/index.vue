<template>
  <div :class="b()"
       :style="styleSizeName">
    <div v-for="(item,index) in listData"
         :key="index"
         :style="styleParentSize">
      <el-tooltip :disabled="!item.formatter"
                  placement="top-start"
                  :style="[styleParentName,{
               backgroundColor: item.backgroundColor || option.backgroundColor,
           }]">
        <template #content>
          <div v-html="item.formatter && item.formatter()"></div>
        </template>
        <div :class="b('item',{'none':(statusDIC.includes(item) || type===''),'whole':isWhole,'img':isWhole&&(isImg || isBorder)})"
             :style="!isWhole?'':styleName"
             @click="handleClick(item,index)">
          <div :style="prefixStyle"
               v-if="getValByArray(item,'prefixText')">{{getValByArray(item,'prefixText')}}</div>
          <avue-count-up v-if="isWhole"
                         :decimals="decimals"
                         :end="item.data || item.value"></avue-count-up>
          <div :class="b('count')"
               v-else>
            <div :class="b('item',{'none':(statusDIC.includes(item) || type===''),'img':isImg})"
                 v-for="(item,index) in (item.data || item.value)+''.split(',')"
                 :key="index"
                 @click="handleClick(item,index)"
                 :style="styleName">
              <div v-if="statusDIC.includes(item)">{{item}}</div>
              <avue-count-up :decimals="decimals"
                             v-else
                             :end="item"></avue-count-up>
            </div>
          </div>
          <div :style="suffixStyle"
               v-if="getValByArray(item,'suffixText')">{{getValByArray(item,'suffixText')}}</div>
        </div>
      </el-tooltip>
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
      return this.option.decimals || 0
    },
    listData () {
      if (this.isArray) {
        return this.dataChart;
      } else {
        return [this.dataChart];
      }
    },
    isWhole () {
      return this.vaildData(this.option.whole, false);
    },
    type () {
      return this.option.type;
    },
    isBorder () {
      return this.type === 'border';
    },
    isImg () {
      return this.type === 'img';
    },
    span () {
      return this.option.span || 1;
    },
    prefixStyle () {
      return {
        display: this.option.prefixInline ? 'inline-block' : 'block',
        textAlign: this.option.prefixTextAlign,
        marginBottom: this.setPx(this.option.prefixSplity),
        marginRight: this.setPx(this.option.prefixSplitx),
        color: this.option.prefixColor || "#fff",
        fontSize: this.setPx(this.option.prefixFontSize || 24)
      };
    },
    suffixStyle () {
      return {
        display: this.option.suffixInline ? 'inline-block' : 'block',
        textAlign: this.option.suffixTextAlign,
        marginTop: this.setPx(this.option.suffixSplity),
        marginLeft: this.setPx(this.option.suffixSplitx),
        color: this.option.suffixColor || "#fff",
        fontSize: this.setPx(this.option.suffixFontSize || 24)
      };
    },
    styleParentSize () {
      let obj = {
        boxSizing: 'border-box',
        display: 'inline-block',
        width: (100 / this.span) - 1 + '%'
      }
      if (this.option.splitx) {
        obj.paddingRight = this.setPx(this.option.splitx)
      }
      if (this.option.splity) {
        obj.paddingBottom = this.setPx(this.option.splity)
      }
      return obj
    },
    styleParentName () {
      let obj = {};
      if (!this.isImg && !this.isBorder) {
        obj = Object.assign(obj, {
          backgroundImage: `url(${this.option.backgroundImage})`,
          backgroundColor: this.option.backgroundColor
        });
      }
      if (this.option.padding) {
        obj.padding = this.setPx(this.option.padding)
      }
      return obj
    },
    styleName () {
      return Object.assign(
        (() => {
          let obj = {}
          if (this.option.splitx) {
            obj.marginRight = this.setPx(this.option.splitx)
          }
          if (this.option.splity) {
            obj.marginBottom = this.setPx(this.option.splity)
          }
          if (this.option.backgroundImage) {
            obj = Object.assign(obj, {
              backgroundImage: `url(${this.option.backgroundImage})`,
              backgroundSize: "100% 100%"
            })
          }
          return obj;
        })(),
        {
          textAlign: this.option.textAlign,
          backgroundColor: this.option.backgroundColor,
          color: this.option.color || "#fff",
          fontSize: this.setPx(this.option.fontSize || 64),
          fontWeight: this.option.fontWeight
        },
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
      this.clickFormatter && this.clickFormatter({
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