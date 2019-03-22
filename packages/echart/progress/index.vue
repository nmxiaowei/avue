<template>
  <div :class="b()"
       :style="styleSizeName"
       ref="main">
    <div :class="b('text',{'line':type==='line','circle':type==='circle'})"
         :style="styleName">
      <p>{{dataChart.label}}</p>
      <p>
        <avue-count-up :end="Number(dataChart.value)"></avue-count-up>
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
    styleName() {
      return {
        fontWeight: this.option.fontWeight || "normal",
        fontSize: (this.option.fontSize || 40) + "px",
        color: this.option.color || "#333"
      };
    },
    width() {
      return this.option.width || 200;
    },
    type() {
      return this.option.type || "line";
    },
    color() {
      return this.option.borderColor || "#333";
    },
    strokeWidth() {
      return this.option.strokeWidth || 14;
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


