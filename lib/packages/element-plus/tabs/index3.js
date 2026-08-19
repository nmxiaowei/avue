/*! Avue.js v3.9.4 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

var vue = require('vue');

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_icon_temp = vue.resolveComponent("icon-temp");
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
            key: column.prop
          }, {
            label: vue.withCtx(() => [
              (_ctx.$slots.label)
                ? vue.renderSlot(_ctx.$slots, "label", {
                    key: 0,
                    column: column,
                    index: index,
                    active: _ctx.active === index + ''
                  })
                : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
                    (column.icon)
                      ? (vue.openBlock(), vue.createBlock(_component_icon_temp, {
                          key: 0,
                          text: column.icon,
                          size: 14,
                          "icon-style": {fontSize: '14px', width: '14px', height: '14px'}
                        }, null, 8 /* PROPS */, ["text"]))
                      : vue.createCommentVNode("v-if", true),
                    vue.createTextVNode("  " + vue.toDisplayString(column.label), 1 /* TEXT */)
                  ], 64 /* STABLE_FRAGMENT */))
            ]),
            _: 2 /* DYNAMIC */
          }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["name", "disabled"]))
        }), 128 /* KEYED_FRAGMENT */))
      ]),
      _: 3 /* FORWARDED */
    }, 8 /* PROPS */, ["modelValue", "tab-position", "type"])
  ], 2 /* CLASS */))
}

exports.render = render;
