<template>
  <van-field :placeholder="placeholder"
             :rules="rules"
             :class="b()"
             :clearable="clearable"
             :disabled="disabled"
             :input-align="inputAlign"
             :required="required"
             v-model="text"
             @click.native="handleClick"
             :label="label">
    <van-stepper v-model="text"
                 :step="step"
                 :min="minRows"
                 allow-empty
                 default-value=""
                 :show-input="false"
                 :max="maxRows"
                 :disabled="disabled"
                 :button-size="setPx(len)"
                 slot="button"></van-stepper>
  </van-field>
</template>

<script>
import create from "core/create";
import props from "../../core/common/props.js";
import event from "../../core/common/event.js";
export default create({
  name: "input-number",
  mixins: [props(), event()],
  props: {
    step: {
      type: Number,
      default: 1
    },
    minRows: {
      type: Number,
      default: ''
    },
    maxRows: {
      type: Number
    },
    len: {
      type: [String, Number],
      default: 24
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


