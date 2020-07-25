<template>
  <el-input-number v-model.number="text"
                   :class="b()"
                   @click.native="handleClick"
                   @focus="handleFocus"
                   @blur="handleBlur"
                   :precision="precision"
                   :placeholder="placeholder"
                   :size="size"
                   :min="minRows"
                   :max="maxRows"
                   :step="step"
                   :clearable="disabled?false:clearable"
                   :readonly="readonly"
                   :controls-position="controlsPosition"
                   :controls="controls"
                   :label="placeholder"
                   :disabled="disabled"></el-input-number>
</template>

<script>
import create from "core/create";
import props from "../../core/common/props.js";
import event from "../../core/common/event.js";
export default create({
  name: "input-number",
  mixins: [props(), event()],
  data () {
    return {};
  },
  props: {
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
    minRows: {
      type: Number,
      default: -Infinity
    },
    maxRows: {
      type: Number,
      default: Infinity
    }
  },
  created () { },
  mounted () { },
  methods: {}
});
</script>