<template>
  <el-rate
    v-model="text"
    style="margin-top:10px"
    @change="handleChange"
    @click.native="handleClick"
    :max="max"
    :readonly="readonly"
    :show-text="showText"
    :icon-classes="iconClasses"
    :void-icon-class="voidIconClass"
    :disabled="disabled"
    :colors="colors"
  ></el-rate>
</template>

<script>
import create from "core/create";
import props from "../../core/common/props.js";
import event from "../../core/common/event.js";
export default create({
  name: "rate",
  mixins: [props(), event()],
  props: {
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
    showText: {
      type: Boolean,
      default: false
    },
    voidIconClass: {
      type: String
    }
  },
  data() {
    return {};
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {}
});
</script>
