/*! Avue.js v3.9.3 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import create from '../../../src/core/create.mjs';
import props from '../../core/common/props.mjs';
import event from '../../core/common/event.mjs';

const OTP_TYPES = ["outlined", "filled", "underlined"];

var script = create({
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

export { script as default };
