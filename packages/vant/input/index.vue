<template>
  <van-field v-model="text"
             :rules="rules"
             :placeholder="placeholder"
             :clearable="clearable"
             :left-icon="prefixIcon"
             :input-align="inputAlign"
             :type="typeParam"
             :required="required"
             :show-word-limit="showWordLimit"
             :autosize="{ minHeight: minRows*50, maxHeight: maxRows*50}"
             @click.native="handleClick"
             :readonly="readonly"
             :disabled="disabled"
             :icon="suffixIcon"
             :label="label" />
</template>

<script>
import create from "core/create";
import props from "../../core/common/props.js";
import event from "../../core/common/event.js";
import { validatenull } from "utils/validate";
export default create({
  name: "input",
  mixins: [props(), event()],
  props: {
    showWordLimit: {
      type: Boolean,
      default: false
    },
    inputType: {
      type: String
    },
    prefixIcon: {
      type: String
    },
    suffixIcon: {
      type: String
    },
    labelPosition: {
      type: String
    },
    minRows: {
      type: Number,
      default: 3
    },
    maxRows: {
      type: Number,
      default: 4
    }
  },
  data () {
    return {};
  },
  computed: {
    typeParam: function () {
      if (this.inputType) {
        return this.inputType
      } else if (this.type === "textarea") {
        return "textarea";
      } else if (this.type === "password") {
        return "password";
      } else {
        return "text";
      }
    }
  },
  watch: {
    text () {
      this.handleChange(this.text);
    }
  },
  created () { },
  mounted () { },
  methods: {}
});
</script>

