<template>
  <div :class="b()">
    <a-time-picker :defaultValue="moment(text, format)"
                   :placeholder="placeholder"
                   :readonly="readonly"
                   :disabled="disabled"
                   :format="format"
                   @click.native="handleClick"
                   @change="handleChange" />
  </div>
</template>

<script>
import create from "core/create";
import props from "../../core/common/props.js";
import event from "../../core/common/event.js";
export default create({
  name: "time",
  mixins: [props(), event()],
  data () {
    return {
      name: 'time',
    };
  },
  props: {
    format: {}
  },
  watch: {},
  created () { },
  mounted () { },
  methods: {}
});
</script>

