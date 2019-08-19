<template>
  <a-switch v-model="text"
            @change="handleChange"
            @click.native="handleClick"
            :checkedChildren="active[labelKey]"
            :unCheckedChildren="inactive[labelKey]"
            :disabled="disabled"
            :readonly="readonly"></a-switch>
</template>

<script>
import create from "core/create";
import props from "../../core/common/props.js";
import event from "../../core/common/event.js";
export default create({
  name: "switch",
  mixins: [props(), event()],
  props: {
    value: {}
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

