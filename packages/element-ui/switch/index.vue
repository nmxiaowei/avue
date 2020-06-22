<template>
  <el-switch v-model="text"
             @click.native="handleClick"
             :active-text="active[labelKey]"
             :active-value="active[valueKey]"
             :inactive-value="inactive[valueKey]"
             :inactive-text="inactive[labelKey]"
             :active-icon-class="activeIconClass"
             :inactive-icon-class="inactiveIconClass"
             :active-color="activeColor"
             :inactive-color="inactiveColor"
             :width="len"
             :disabled="disabled"
             :readonly="readonly"
             :size="size"></el-switch>
</template>

<script>
import create from "core/create";
import props from "../../core/common/props.js";
import event from "../../core/common/event.js";
export default create({
  name: "switch",
  mixins: [props(), event()],
  props: {
    value: {},
    activeIconClass: String,
    inactiveIconClass: String,
    activeColor: String,
    inactiveColor: String,
    len: Number
  },
  data () {
    return {};
  },
  watch: {},
  created () { },
  mounted () { },
  computed: {
    active () {
      return this.dic[1] || {};
    },
    inactive () {
      return this.dic[0] || {};
    }
  },
  methods: {}
});
</script>

