<template>
  <div>
    <el-switch v-model="text"
               @click="handleClick"
               :inline-prompt="inlinePrompt"
               :inactive-action-icon="activeIcon"
               :active-text="active[labelKey]"
               :active-value="active[valueKey]"
               :inactive-icon="inactiveIcon"
               :inactive-value="inactive[valueKey]"
               :inactive-text="inactive[labelKey]"
               :active-icon-class="activeIconClass"
               :inactive-icon-class="inactiveIconClass"
               :active-color="activeColor"
               :inactive-color="inactiveColor"
               :width="len"
               :disabled="disabled"></el-switch>
  </div>
</template>

<script>
import create from "core/create";
import props from "common/common/props.js";
import event from "common/common/event.js";
export default create({
  name: "switch",
  mixins: [props(), event()],
  props: {
    modelValue: {},
    inlinePrompt: Boolean,
    activeIconClass: String,
    inactiveIconClass: String,
    inactiveIcon: String,
    activeIcon: String,
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

