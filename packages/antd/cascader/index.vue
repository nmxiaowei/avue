<template>
  <div :class="b()">
    <a-cascader :options="dic"
                :placeholder="placeholder"
                :readonly="readonly"
                :disabled="disabled"
                @click.native="handleClick"
                @change="handleChange"
                v-model="text" />
  </div>
</template>

<script>
import create from "core/create";
import props from "../../core/common/props.js";
import event from "../../core/common/event.js";
export default create({
  name: "cascader",
  mixins: [props(), event()],
  data () {
    return {
      name: 'cascader',
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

