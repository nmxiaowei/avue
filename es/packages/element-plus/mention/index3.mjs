/*! Avue.js v3.9.1 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { resolveComponent, openBlock, createBlock, normalizeClass, createSlots, withCtx, renderSlot, createElementBlock, toDisplayString, createElementVNode } from 'vue';

const _hoisted_1 = { key: 1 };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_mention = resolveComponent("el-mention");

  return (openBlock(), createBlock(_component_el_mention, {
    modelValue: _ctx.text,
    "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((_ctx.text) = $event)),
    class: normalizeClass(_ctx.b()),
    onClick: _ctx.handleClick,
    onFocus: _ctx.handleFocus,
    onBlur: _ctx.handleBlur,
    placeholder: _ctx.placeholder,
    size: _ctx.size,
    prefix: _ctx.prefix,
    options: _ctx.options,
    loading: _ctx.loading,
    split: _ctx.split,
    whole: _ctx.whole,
    "check-is-whole": _ctx.checkIsWhole,
    onSearch: _cache[3] || (_cache[3] = $event => (_ctx.remote?_ctx.handleRemoteMethod:undefined)),
    clearable: _ctx.clearableVal,
    readonly: _ctx.readonly,
    disabled: _ctx.disabled
  }, createSlots({
    label: withCtx(({ item }) => [
      (_ctx.$slots.default)
        ? renderSlot(_ctx.$slots, "default", {
            key: 0,
            item: item,
            label: _ctx.labelKey,
            value: _ctx.valueKey
          })
        : (openBlock(), createElementBlock("span", _hoisted_1, toDisplayString(item.label), 1 /* TEXT */))
    ]),
    _: 2 /* DYNAMIC */
  }, [
    (_ctx.prepend)
      ? {
          name: "prepend",
          fn: withCtx(() => [
            createElementVNode("span", {
              onClick: _cache[0] || (_cache[0] = $event => (_ctx.prependClick(_ctx.text)))
            }, toDisplayString(_ctx.prepend), 1 /* TEXT */)
          ]),
          key: "0"
        }
      : undefined,
    (_ctx.append)
      ? {
          name: "append",
          fn: withCtx(() => [
            createElementVNode("span", {
              onClick: _cache[1] || (_cache[1] = $event => (_ctx.appendClick(_ctx.text)))
            }, toDisplayString(_ctx.append), 1 /* TEXT */)
          ]),
          key: "1"
        }
      : undefined
  ]), 1032 /* PROPS, DYNAMIC_SLOTS */, ["modelValue", "class", "onClick", "onFocus", "onBlur", "placeholder", "size", "prefix", "options", "loading", "split", "whole", "check-is-whole", "clearable", "readonly", "disabled"]))
}

export { render };
