/*! Avue.js v3.9.4 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { resolveComponent, openBlock, createElementBlock, normalizeClass, createVNode, withCtx } from 'vue';

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_color_picker = resolveComponent("el-color-picker");
  const _component_el_input = resolveComponent("el-input");

  return (openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.b())
  }, [
    createVNode(_component_el_input, {
      "prefix-icon": _ctx.prefixIcon,
      "suffix-icon": _ctx.suffixIcon,
      placeholder: _ctx.placeholder,
      modelValue: _ctx.text,
      "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((_ctx.text) = $event)),
      size: _ctx.size,
      ref: "main",
      readonly: _ctx.readonly,
      onClick: _ctx.handleClick,
      clearable: _ctx.clearableVal,
      disabled: _ctx.disabled
    }, {
      append: withCtx(() => [
        createVNode(_component_el_color_picker, {
          size: "small",
          modelValue: _ctx.text,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((_ctx.text) = $event)),
          "color-format": _ctx.colorFormat,
          onFocus: _ctx.handleFocus,
          onBlur: _ctx.handleBlur,
          disabled: _ctx.disabled,
          "show-alpha": _ctx.showAlpha,
          predefine: _ctx.predefineColors
        }, null, 8 /* PROPS */, ["modelValue", "color-format", "onFocus", "onBlur", "disabled", "show-alpha", "predefine"])
      ]),
      _: 1 /* STABLE */
    }, 8 /* PROPS */, ["prefix-icon", "suffix-icon", "placeholder", "modelValue", "size", "readonly", "onClick", "clearable", "disabled"])
  ], 2 /* CLASS */))
}

export { render };
