/*! Avue.js v3.9.4 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { resolveComponent, openBlock, createElementBlock, normalizeClass, createVNode, withCtx, Fragment, renderList, createBlock, resolveDynamicComponent, createTextVNode, toDisplayString } from 'vue';

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_radio_group = resolveComponent("el-radio-group");

  return (openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.b())
  }, [
    createVNode(_component_el_radio_group, {
      modelValue: _ctx.text,
      "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((_ctx.text) = $event)),
      size: _ctx.size,
      onClick: _ctx.handleClick,
      disabled: _ctx.disabled
    }, {
      default: withCtx(() => [
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.dic, (item, index) => {
          return (openBlock(), createBlock(resolveDynamicComponent(_ctx.componentName), {
            value: item[_ctx.valueKey],
            border: _ctx.border,
            readonly: _ctx.readonly,
            disabled: item[_ctx.disabledKey],
            key: index
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(item[_ctx.labelKey]), 1 /* TEXT */)
            ]),
            _: 2 /* DYNAMIC */
          }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["value", "border", "readonly", "disabled"]))
        }), 128 /* KEYED_FRAGMENT */))
      ]),
      _: 1 /* STABLE */
    }, 8 /* PROPS */, ["modelValue", "size", "onClick", "disabled"])
  ], 2 /* CLASS */))
}

export { render };
