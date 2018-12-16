<template>
  <div class="avue-cell">
    <van-field v-model="text"
               :placeholder="placeholder"
               :clearable="clearable"
               :left-icon="prefixIcon"
               :input-align="inputAlign"
               :type="typeParam"
               :required="required"
               :autosize="{ minHeight: minRows*50, maxHeight: maxRows*50}"
               @click.native="handleClick"
               :readonly="readonly"
               :disabled="disabled"
               :icon="suffixIcon"
               :label="label" />
  </div>
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
    prefixIcon: {
      type: String
    },
    suffixIcon: {
      type: String
    },
    rules: {
      type: Array
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
  data() {
    return {};
  },
  computed: {
    typeParam: function() {
      if (this.type === "textarea") {
        return "textarea";
      } else if (this.type === "password") {
        return "password";
      } else {
        return "text";
      }
    },
    inputAlign() {
      if (this.typeParam === "textarea") {
        return "left";
      }
      return "right";
    }
  },
  watch: {
    text() {
      this.handleChange(this.text);
    }
  },
  created() {},
  mounted() {},
  methods: {}
});
</script>

