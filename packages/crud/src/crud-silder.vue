<template>
  <el-slider v-model="text"
             :disabled="disabled"
             :step="step"
             :min="min"
             :max="max"
             :range="range"
             :show-stops="showStops"
             :show-input="showInput"
             :format-tooltip="formatTooltip"
             @change="handleChange"></el-slider>
</template>

<script>
import crudCompoents from "../../mixins/crud-compoents.js";
export default {
  name: "AvueCrudSilder",
  mixins: [crudCompoents()],
  props: {
    value: {

    },
    step: {
      type: Number,
    },
    min: {
      type: Number,
    },
    max: {
      type: Number
    },
    range: {
      type: Boolean,
      default: false,
    },
    showInput: {
      type: Boolean,
      default: false,
    },
    showStops: {
      type: Boolean,
      default: false,
    },
    formatTooltip: Function
  },
  data () {
    return {};
  },
  watch: {},
  created () { },
  mounted () { },
  methods: {
    handleChange (value) {
      this.$emit("input", value);
      this.$emit("change", value);
    },
    getDic (index) {
      return this.dic[index] ? this.dic[index] : {};
    }
  }
};
</script>
