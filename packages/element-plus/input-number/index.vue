<template>
  <el-input-number v-model="text"
                   :class="b()"
                   @click="handleClick"
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
                   :disabled="disabled">
    <template #prefix
              v-if="prefix">
      <span @click="prefixClick(text)">{{prefix}}</span>
    </template>
    <template #suffix
              v-if="suffix">
      <span @click="suffixClick(text)">{{suffix}}</span>
    </template>
  </el-input-number>
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
    },
    prefix: {
      type: String,
    },
    prefixClick: {
      type: Function,
      default: () => { }
    },
    suffix: {
      type: String,
    },
    suffixClick: {
      type: Function,
      default: () => { }
    },
  },
  created () { },
  mounted () { },
  methods: {}
});
</script>