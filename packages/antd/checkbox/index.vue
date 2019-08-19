<template>
  <div :class="b()">
    <a-checkbox-group v-model="text"
                      :readonly="readonly"
                      :disabled="disabled"
                      @click.native="handleClick"
                      @change="handleChange"
                      :options="dic">
    </a-checkbox-group>
  </div>
</template>

<script>
import create from "core/create";
import props from "../../core/common/props.js";
import event from "../../core/common/event.js";
export default create({
  name: "checkbox",
  mixins: [props(), event()],
  data () {
    return {
      name: 'checkbox',
    };
  },
  watch: {},
  created () { },
  mounted () { },
  methods: {}
});
</script>

