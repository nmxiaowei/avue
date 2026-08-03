<template>
  <el-input-otp
    ref="inputOtp"
    v-model="text"
    :class="b()"
    :length="length"
    :validator="validator"
    :inputmode="inputmode"
    :type="resolvedType"
    :size="size"
    :mask="mask"
    :disabled="disabled"
    :separator="separator"
    :validate-event="validateEvent"
    :readonly="readonly"
    :id="id"
    :aria-label="ariaLabel"
    @focus="handleFocus"
    @blur="handleBlur"
    @change="handleNativeChange"
    @finish="handleFinish"
  >
    <template v-if="$slots.separator" #separator="scope">
      <slot name="separator" v-bind="scope"></slot>
    </template>
  </el-input-otp>
</template>

<script>
import create from "core/create";
import props from "common/common/props";
import event from "common/common/event";

const OTP_TYPES = ["outlined", "filled", "underlined"];

export default create({
  name: "input-otp",
  mixins: [props(), event()],
  emits: ["finish"],
  expose: ["inputRefs", "focus", "blur"],
  props: {
    length: {
      type: Number,
      default: 6,
    },
    validator: Function,
    inputmode: String,
    otpType: {
      type: String,
      default: "outlined",
      validator: (value) => OTP_TYPES.includes(value),
    },
    mask: Boolean,
    separator: {
      type: [String, Object, Function],
      default: undefined,
    },
    validateEvent: {
      type: Boolean,
      default: true,
    },
    id: String,
    ariaLabel: String,
    finish: Function,
  },
  computed: {
    resolvedType() {
      return OTP_TYPES.includes(this.type) ? this.type : this.otpType;
    },
    inputRefs() {
      return this.$refs.inputOtp?.inputRefs || [];
    },
  },
  methods: {
    handleChange(value) {
      this.$emit("update:modelValue", value);
    },
    handleNativeChange(value) {
      this.bindEvent("change", { value });
    },
    focus(index) {
      const inputOtp = this.$refs.inputOtp;
      if (!inputOtp) return;
      index === undefined ? inputOtp.focus() : inputOtp.focus(index);
    },
    blur() {
      this.$refs.inputOtp?.blur();
    },
    handleFinish(value) {
      this.bindEvent("finish", { value });
    },
  },
});
</script>
