<template>
  <el-input-tag v-model="text"
                :class="b()"
                @click="handleClick"
                @focus="handleFocus"
                @blur="handleBlur"
                :placeholder="placeholder"
                :size="size"
                :min="min"
                :max="max"
                :draggable="drag"
                :clearable="clearableVal"
                :readonly="readonly"
                :disabled="disabled">
    <template #prefix
              v-if="prefix">
      <span @click="prefixClick(text)">{{prefix}}</span>
    </template>
    <template #suffix
              v-if="suffix">
      <span @click="suffixClick(text)">{{suffix}}</span>
    </template>
    <template #tag="{ value }">
      <slot :value="value"
            v-if="$slots.default">
      </slot>
      <span v-else>{{ value }}</span>
    </template>
  </el-input-tag>
</template>

<script>
import create from "core/create";
import props from "common/common/props.js";
import event from "common/common/event.js";
export default create({
  name: "input-tag",
  mixins: [props(), event()],
  data () {
    return {};
  },
  props: {
    drag: Boolean,
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