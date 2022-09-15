<template>
  <el-rate v-model="text"
           style="margin-top:10px"
           @change="handleChange"
           @click.native="handleClick"
           :max="max"
           :low-threshold="lowThreshold"
           :high-threshold="highThreshold"
           :disabled-void-color="disabledVoidColor"
           :disabled-void-icon-class="disabledVoidIconClass"
           :allow-half="allowHalf"
           :readonly="readonly"
           :texts="texts"
           :show-score="showScore"
           :score-template="scoreTemplate"
           :show-text="showText"
           :icon-classes="iconClasses"
           :void-icon-class="voidIconClass"
           :disabled="disabled"
           :colors="colors"></el-rate>
</template>

<script>
import create from "core/create";
import props from "common/common/props.js";
import event from "common/common/event.js";
export default create({
  name: "rate",
  mixins: [props(), event()],
  props: {
    allowHalf: Boolean,
    lowThreshold: Number,
    highThreshold: Number,
    disabledVoidColor: String,
    disabledVoidIconClass: String,
    value: {
      type: Number,
      default: 0
    },
    colors: {
      type: Array
    },
    max: {
      type: Number,
      default: 5
    },
    iconClasses: {
      type: Array
    },
    texts: {
      type: Array
    },
    scoreTemplate: String,
    showScore: {
      type: Boolean,
      default: false
    },
    showText: {
      type: Boolean,
      default: false
    },
    voidIconClass: {
      type: String
    }
  },
  data () {
    return {};
  },
  watch: {},
  created () { },
  mounted () { },
  methods: {}
});
</script>
