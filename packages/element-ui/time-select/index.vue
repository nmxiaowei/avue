<template>
  <div :class="b()">
    <el-time-select
      :prefix-icon="prefixIcon"
      :clear-icon="clearIcon"
      :effect="effect"
      :start="start"
      :end="end"
      :step="step"
      :min-time="minTime"
      :max-time="maxTime"
      :format="format"
      :placeholder="placeholder"
      v-model="text"
      :size="size"
      ref="main"
      :readonly="readonly"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
      @click="handleClick"
      :clearable="clearableVal"
      :disabled="disabled"
    >
    </el-time-select>
  </div>
</template>

<script>
import create from "core/create";
import props from "common/common/props.js";
import event from "common/common/event.js";
export default create({
  name: "time-select",
  mixins: [props(), event()],
  props: {
    prefixIcon: {
      type: String,
    },
    clearIcon: {
      type: String,
    },
    effect: String,
    start: String,
    end: String,
    step: String,
    minTime: String,
    maxTime: String,
    format: String,
  },
});
</script>
