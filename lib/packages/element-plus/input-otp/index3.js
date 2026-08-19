/*! Avue.js v3.9.4 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

var vue = require('vue');

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_input_otp = vue.resolveComponent("el-input-otp");

  return (vue.openBlock(), vue.createBlock(_component_el_input_otp, {
    ref: "inputOtp",
    modelValue: _ctx.text,
    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((_ctx.text) = $event)),
    class: vue.normalizeClass(_ctx.b()),
    length: _ctx.length,
    validator: _ctx.validator,
    inputmode: _ctx.inputmode,
    type: _ctx.resolvedType,
    size: _ctx.size,
    mask: _ctx.mask,
    disabled: _ctx.disabled,
    separator: _ctx.separator,
    "validate-event": _ctx.validateEvent,
    readonly: _ctx.readonly,
    id: _ctx.id,
    "aria-label": _ctx.ariaLabel,
    onFocus: _ctx.handleFocus,
    onBlur: _ctx.handleBlur,
    onChange: _ctx.handleNativeChange,
    onFinish: _ctx.handleFinish
  }, vue.createSlots({ _: 2 /* DYNAMIC */ }, [
    (_ctx.$slots.separator)
      ? {
          name: "separator",
          fn: vue.withCtx((scope) => [
            vue.renderSlot(_ctx.$slots, "separator", vue.normalizeProps(vue.guardReactiveProps(scope)))
          ]),
          key: "0"
        }
      : undefined
  ]), 1032 /* PROPS, DYNAMIC_SLOTS */, ["modelValue", "class", "length", "validator", "inputmode", "type", "size", "mask", "disabled", "separator", "validate-event", "readonly", "id", "aria-label", "onFocus", "onBlur", "onChange", "onFinish"]))
}

exports.render = render;
