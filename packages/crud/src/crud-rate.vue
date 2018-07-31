<template>
  <el-rate v-model="text"
           style="margin-top:10px"
           @change="handleChange"
           :max="max"
           :show-text="showText"
           :icon-classes="iconClasses"
           :void-icon-class="voidIconClass"
           :disabled="disabled"
           :colors="colors"></el-rate>
</template>

<script>
import crudCompoents from "../../mixins/crud-compoents.js";
export default {
  name: "AvueCrudRate",
  mixins: [crudCompoents()],
  props: {
    value: {
      type: Number,
      default: 0,
    },
    colors: {
      type: Array,
    },
    max: {
      type: Number,
      default: 5,
    },
    iconClasses: {
      type: Array,
    },
    texts: {
      type: Array,
    },
    showText: {
      type: Boolean,
      default: false,
    },
    voidIconClass: {
      type: String,
    }
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
    }
  }
};
</script>
