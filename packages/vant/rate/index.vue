<template>
  <van-field :placeholder="placeholder"
             :rules="rules"
             :clearable="clearable"
             :disabled="disabled"
             :input-align="inputAlign"
             :required="required"
             @click.native="handleClick"
             readonly
             :label="label">
    <van-rate v-model="text"
              :icon="icon"
              :color="color"
              :void-icon="voidIcon"
              :void-color="voidColor"
              :allow-half="allowHalf"
              :count="count"
              :disabled="disabled"
              slot="input"></van-rate>
  </van-field>
</template>

<script>
import create from "core/create";
import props from "../../core/common/props.js";
import event from "../../core/common/event.js";
export default create({
  name: "rate",
  mixins: [props(), event()],
  props: {
    icon: String,
    color: String,
    voidIcon: String,
    voidColor: String,
    allowHalf: String,
    count: [String, Number]
  },
  data () {
    return {
    };
  },
  watch: {},
  computed: {

  }
});
</script>


