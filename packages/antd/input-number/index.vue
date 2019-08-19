<template>
  <div :class="b()">
    <a-input-number :precision="precision"
                    :size="size"
                    :step="step"
                    :min="minRows"
                    :max="maxRows"
                    :placeholder="placeholder"
                    :readonly="readonly"
                    :disabled="disabled"
                    @click.native="handleClick"
                    @change="handleChange"
                    v-model="text" />
  </div>
</template>

<script>
import create from "core/create";
import props from "../../core/common/props.js";
import event from "../../core/common/event.js";
export default create({
  name: "input-number",
  mixins: [props(), event()],
  data () {
    return {
      name: 'input-number',
    };
  },
  props: {
    step: {
      type: Number,
      default: 1
    },
    precision: {
      type: Number,
      default: 0
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
  watch: {},
  created () { },
  mounted () { },
  methods: {}
});
</script>

