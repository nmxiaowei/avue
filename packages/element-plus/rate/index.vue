<template>
  <el-rate v-model="text"
           @click="handleClick"
           :max="max"
           :readonly="readonly"
           :texts="texts"
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
