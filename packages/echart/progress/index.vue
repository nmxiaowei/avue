<template>
  <div :class="b()"
       :style="styleSizeName"
       ref="main"
       @click="handleClick">
    <div :class="b('text',{'line':type==='line','circle':type==='circle'})">
      <p :style="styleSuffixName">{{dataChart.label}}</p>
      <p :style="styleName">
        <avue-count-up v-if="dataChart.value"
                       :end="Number(dataChart.value)"></avue-count-up>
      </p>
    </div>
    <avue-progress :color="color"
                   :width="width"
                   :showText="false"
                   :strokeWidth="strokeWidth"
                   :percentage="dataChart.data"
                   :type="type">
    </avue-progress>
  </div>
</template>

<script>
import create from "core/echart/create";
export default create({
  name: "progress",
  computed: {
    styleSuffixName () {
      return {
        fontWeight: this.option.suffixFontWeight || "normal",
        fontSize: (this.option.suffixFontSize || 40) + "px",
        color: this.option.suffixColor || "#333"
      };
    },
    styleName () {
      return {
        marginBottom: this.option.split + "px",
        fontWeight: this.option.fontWeight || "normal",
        fontSize: (this.option.fontSize || 40) + "px",
        color: this.option.color || "#333"
      };
    },
    type () {
      return this.option.type || "line";
    },
    color () {
      return this.option.borderColor || "#333";
    },
    strokeWidth () {
      return this.option.strokeWidth || 14;
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
  methods: {
    handleClick () {
      this.clickFormatter({
        data: this.dataChart
      });
    }
  }
});
</script>


