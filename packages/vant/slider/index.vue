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
    <van-slider v-model="text"
                :button-size="setPx(len)"
                slot="input"></van-slider>
  </van-field>
</template>

<script>
import create from "core/create";
import props from "../../core/common/props.js";
import event from "../../core/common/event.js";
export default create({
  name: "slider",
  mixins: [props(), event()],
  props: {
    len: {
      type: [String, Number],
      default: 20
    }
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


