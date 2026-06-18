/*! Avue.js v3.9.2 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { resolveComponent, openBlock, createElementBlock, normalizeClass, createVNode, withCtx, Fragment, renderList, createBlock, createElementVNode, createTextVNode, toDisplayString } from 'vue';

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_tab_pane = resolveComponent("el-tab-pane");
  const _component_el_tabs = resolveComponent("el-tabs");

  return (openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.b())
  }, [
    createVNode(_component_el_tabs, {
      modelValue: _ctx.active,
      "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((_ctx.active) = $event)),
      "tab-position": _ctx.parentOption.position,
      type: _ctx.parentOption.type
    }, {
      default: withCtx(() => [
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.columnOption, (column, index) => {
          return (openBlock(), createBlock(_component_el_tab_pane, {
            name: index+'',
            disabled: column.disabled,
            key: index
          }, {
            label: withCtx(() => [
              createElementVNode("i", {
                class: normalizeClass(column.icon)
              }, null, 2 /* CLASS */),
              createTextVNode("  " + toDisplayString(column.label), 1 /* TEXT */)
            ]),
            _: 2 /* DYNAMIC */
          }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["name", "disabled"]))
        }), 128 /* KEYED_FRAGMENT */))
      ]),
      _: 1 /* STABLE */
    }, 8 /* PROPS */, ["modelValue", "tab-position", "type"])
  ], 2 /* CLASS */))
}

export { render };
