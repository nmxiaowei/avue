/*! Avue.js v3.8.6 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

var vue = require('vue');

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_tab_pane = vue.resolveComponent("el-tab-pane");
  const _component_el_tabs = vue.resolveComponent("el-tabs");

  return (vue.openBlock(), vue.createElementBlock("div", {
    class: vue.normalizeClass(_ctx.b())
  }, [
    vue.createVNode(_component_el_tabs, {
      modelValue: _ctx.active,
      "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((_ctx.active) = $event)),
      "tab-position": _ctx.parentOption.position,
      type: _ctx.parentOption.type
    }, {
      default: vue.withCtx(() => [
        (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.columnOption, (column, index) => {
          return (vue.openBlock(), vue.createBlock(_component_el_tab_pane, {
            name: index+'',
            disabled: column.disabled,
            key: index
          }, {
            label: vue.withCtx(() => [
              vue.createElementVNode("i", {
                class: vue.normalizeClass(column.icon)
              }, null, 2 /* CLASS */),
              vue.createTextVNode("  " + vue.toDisplayString(column.label), 1 /* TEXT */)
            ]),
            _: 2 /* DYNAMIC */
          }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["name", "disabled"]))
        }), 128 /* KEYED_FRAGMENT */))
      ]),
      _: 1 /* STABLE */
    }, 8 /* PROPS */, ["modelValue", "tab-position", "type"])
  ], 2 /* CLASS */))
}

exports.render = render;
