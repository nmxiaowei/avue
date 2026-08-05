/*! Avue.js v3.9.3 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var src_core_create = require('../../../src/core/create.js');
var packages_core_common_props = require('../../core/common/props.js');
var packages_core_common_event = require('../../core/common/event.js');

const OTP_TYPES = ["outlined", "filled", "underlined"];

var script = src_core_create.default({
  name: "input-otp",
  mixins: [packages_core_common_props.default(), packages_core_common_event.default()],
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

exports.default = script;
