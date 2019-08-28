<template>
  <el-time-picker v-model="text"
                  :is-range="isRange"
                  :size="size"
                  range-separator="至"
                  :start-placeholder="startPlaceholder"
                  :end-placeholder="endPlaceholder"
                  :format="format"
                  :readonly="readonly"
                  :clearable="disabled?false:clearable"
                  :value-format="valueFormat"
                  :placeholder="placeholder"
                  @change="handleChange"
                  @click.native="handleClick"
                  :disabled="disabled"></el-time-picker>
</template>

<script>
import create from "core/create";
import props from "../../core/common/props.js";
import event from "../../core/common/event.js";
export default create({
  name: "time",
  mixins: [props(), event()],
  data () {
    return {};
  },
  props: {
    startPlaceholder: {
      type: String,
      default: "开始时间"
    },
    endPlaceholder: {
      type: String,
      default: "结束时间"
    },
    value: {
      required: true
    },
    valueFormat: {
      default: ""
    },
    type: {
      default: ""
    },
    format: {
      default: ""
    }
  },
  watch: {},
  created () { },
  mounted () { },
  computed: {
    isRange () {
      return this.type === "timerange";
    }
  },
  methods: {}
});
</script>