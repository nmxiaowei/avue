/*! Avue.js v3.9.1 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { resolveComponent, openBlock, createBlock, normalizeClass, createSlots, withCtx, renderSlot, createElementBlock, toDisplayString, createElementVNode } from 'vue';

const _hoisted_1 = { key: 1 };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_input_tag = resolveComponent("el-input-tag");

  return (openBlock(), createBlock(_component_el_input_tag, {
    modelValue: _ctx.text,
    "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((_ctx.text) = $event)),
    class: normalizeClass(_ctx.b()),
    onClick: _ctx.handleClick,
    onFocus: _ctx.handleFocus,
    onBlur: _ctx.handleBlur,
    onChange: _ctx.handleValueChange,
    placeholder: _ctx.placeholder,
    size: _ctx.size,
    min: _ctx.min,
    max: _ctx.max,
    draggable: _ctx.drag,
    clearable: _ctx.clearableVal,
    readonly: _ctx.readonly,
    disabled: _ctx.disabled
  }, createSlots({
    tag: withCtx(({ value }) => [
      (_ctx.$slots.default)
        ? renderSlot(_ctx.$slots, "default", {
            key: 0,
            value: value
          })
        : (openBlock(), createElementBlock("span", _hoisted_1, toDisplayString(value), 1 /* TEXT */))
    ]),
    _: 2 /* DYNAMIC */
  }, [
    (_ctx.prefix)
      ? {
          name: "prefix",
          fn: withCtx(() => [
            createElementVNode("span", {
              onClick: _cache[0] || (_cache[0] = $event => (_ctx.prefixClick(_ctx.text)))
            }, toDisplayString(_ctx.prefix), 1 /* TEXT */)
          ]),
          key: "0"
        }
      : undefined,
    (_ctx.suffix)
      ? {
          name: "suffix",
          fn: withCtx(() => [
            createElementVNode("span", {
              onClick: _cache[1] || (_cache[1] = $event => (_ctx.suffixClick(_ctx.text)))
            }, toDisplayString(_ctx.suffix), 1 /* TEXT */)
          ]),
          key: "1"
        }
      : undefined
  ]), 1032 /* PROPS, DYNAMIC_SLOTS */, ["modelValue", "class", "onClick", "onFocus", "onBlur", "onChange", "placeholder", "size", "min", "max", "draggable", "clearable", "readonly", "disabled"]))
}

export { render };
