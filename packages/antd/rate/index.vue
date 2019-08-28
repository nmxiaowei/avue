<template>
  <div :class="b()">
    <a-rate v-model="text"
            :readonly="readonly"
            :disabled="disabled"
            @click.native="handleClick"
            @change="handleChange"></a-rate>
  </div>
</template>

<script>
import create from "core/create";
import props from "../../core/common/props.js";
import event from "../../core/common/event.js";
export default create({
  name: "rate",
  mixins: [props(), event()],
  data () {
    return {
      name: 'rate',
    };
  },
  props: {

  },
  watch: {},
  created () { },
  mounted () { },
  methods: {}
});
</script>

