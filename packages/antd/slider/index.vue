<template>
  <div :class="b()">
    <a-slider v-model="text"
              :placeholder="placeholder"
              :readonly="readonly"
              :disabled="disabled"
              @click.native="handleClick"
              @change="handleChange"></a-slider>
  </div>
</template>

<script>
import create from "core/create";
import props from "../../core/common/props.js";
import event from "../../core/common/event.js";
export default create({
  name: "slider",
  mixins: [props(), event()],
  data () {
    return {
      name: 'slider',
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

