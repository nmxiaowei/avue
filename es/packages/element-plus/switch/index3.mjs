/*! Avue.js v3.9.0 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { resolveComponent, openBlock, createElementBlock, createVNode } from 'vue';

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_switch = resolveComponent("el-switch");

  return (openBlock(), createElementBlock("div", null, [
    createVNode(_component_el_switch, {
      modelValue: _ctx.text,
      "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((_ctx.text) = $event)),
      onClick: _ctx.handleClick,
      loading: _ctx.loading,
      "inline-prompt": _ctx.inlinePrompt,
      "active-icon": _ctx.activeIcon,
      "before-change": _ctx.handleBeforeChange,
      "active-action-icon": _ctx.activeActionIcon,
      "active-text": _ctx.active[_ctx.labelKey],
      "active-value": _ctx.active[_ctx.valueKey],
      "inactive-icon": _ctx.inactiveIcon,
      "inactive-action-icon": _ctx.inactiveActionIcon,
      "inactive-value": _ctx.inactive[_ctx.valueKey],
      "inactive-text": _ctx.inactive[_ctx.labelKey],
      width: _ctx.len,
      disabled: _ctx.disabled
    }, null, 8 /* PROPS */, ["modelValue", "onClick", "loading", "inline-prompt", "active-icon", "before-change", "active-action-icon", "active-text", "active-value", "inactive-icon", "inactive-action-icon", "inactive-value", "inactive-text", "width", "disabled"])
  ]))
}

export { render };
