<template>
  <el-input-number v-model.number="text"
                   :class="b()"
                   @click.native="handleClick"
                   @focus="handleFocus"
                   @blur="handleBlur"
                   :precision="precision"
                   :placeholder="placeholder"
                   :step-strictly="stepStrictly"
                   :size="size"
                   :min="min"
                   :max="max"
                   :step="step"
                   :clearable="clearableVal"
                   :readonly="readonly"
                   :controls-position="controlsPosition"
                   :controls="controls"
                   :label="placeholder"
                   :disabled="disabled"></el-input-number>
</template>

<script>
import create from "core/create";
import props from "common/common/props.js";
import event from "common/common/event.js";
export default create({
  name: "input-number",
  mixins: [props(), event()],
  data () {
    return {};
  },
  props: {
    stepStrictly: {
      type: Boolean,
      default: false
    },
    controls: {
      type: Boolean,
      default: true
    },
    step: {
      type: Number,
      default: 1
    },
    controlsPosition: {
      type: String,
      default: "right"
    },
    precision: {
      type: Number
    },
    min: {
      type: Number,
      default: -Infinity
    },
    max: {
      type: Number,
      default: Infinity
    }
  },
  created () { },
  mounted () { },
  methods: {}
});
</script>