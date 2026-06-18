/*! Avue.js v3.9.2 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { resolveComponent, openBlock, createBlock } from 'vue';

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_rate = resolveComponent("el-rate");

  return (openBlock(), createBlock(_component_el_rate, {
    modelValue: _ctx.text,
    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((_ctx.text) = $event)),
    onClick: _ctx.handleClick,
    max: _ctx.max,
    readonly: _ctx.readonly,
    texts: _ctx.texts,
    "show-text": _ctx.showText,
    "icon-classes": _ctx.iconClasses,
    "void-icon-class": _ctx.voidIconClass,
    disabled: _ctx.disabled,
    colors: _ctx.colors
  }, null, 8 /* PROPS */, ["modelValue", "onClick", "max", "readonly", "texts", "show-text", "icon-classes", "void-icon-class", "disabled", "colors"]))
}

export { render };
