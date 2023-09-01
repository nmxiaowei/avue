<template>
  <div>
    <el-switch v-model="text"
               @click="handleClick"
               :inline-prompt="inlinePrompt"
               :active-icon="activeIcon"
               :before-change="beforeChange"
               :active-action-icon="activeActionIcon"
               :active-text="active[labelKey]"
               :active-value="active[valueKey]"
               :inactive-icon="inactiveIcon"
               :inactive-action-icon="inactiveActionIcon"
               :inactive-value="inactive[valueKey]"
               :inactive-text="inactive[labelKey]"
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
    inlinePrompt: Boolean,
    inactiveActionIcon: String,
    activeActionIcon: String,
    inactiveIcon: String,
    activeIcon: String,
    len: Number,
    beforeChange: [Boolean, Function]
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

