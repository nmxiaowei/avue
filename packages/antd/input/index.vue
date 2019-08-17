<template>
  <div :class="b()">
    <a-input :placeholder="placeholder"
             v-model="text" />
  </div>
</template>

<script>
import create from "core/create";
import props from "../../core/common/props.js";
import event from "../../core/common/event.js";
export default create({
  name: "input",
  mixins: [props(), event()],
  data () {
    return {};
  },
  watch: {},
  created () { },
  mounted () { },
  methods: {}
});
</script>

