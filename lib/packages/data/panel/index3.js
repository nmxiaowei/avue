/*! Avue.js v3.9.3 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

var vue = require('vue');

const _hoisted_1 = { class: "avue-data-panel" };
const _hoisted_2 = ["href", "onClick"];
const _hoisted_3 = { class: "item" };
const _hoisted_4 = { class: "item-icon" };
const _hoisted_5 = { class: "item-info" };
const _hoisted_6 = { class: "item-title" };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_icon = vue.resolveComponent("el-icon");
  const _component_avue_count_up = vue.resolveComponent("avue-count-up");
  const _component_el_col = vue.resolveComponent("el-col");
  const _component_el_row = vue.resolveComponent("el-row");

  return (vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [
    vue.createVNode(_component_el_row, { span: 24 }, {
      default: vue.withCtx(() => [
        (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.data, (item, index) => {
          return (vue.openBlock(), vue.createBlock(_component_el_col, {
            key: index,
            md: _ctx.span,
            xs: 24,
            sm: 12
          }, {
            default: vue.withCtx(() => [
              vue.createElementVNode("a", {
                href: item.href,
                onClick: $event => (item.click&&item.click(item))
              }, [
                vue.createElementVNode("div", _hoisted_3, [
                  vue.createElementVNode("div", _hoisted_4, [
                    vue.createVNode(_component_el_icon, {
                      color: item.color
                    }, {
                      default: vue.withCtx(() => [
                        (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(item.icon)))
                      ]),
                      _: 2 /* DYNAMIC */
                    }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["color"])
                  ]),
                  vue.createElementVNode("div", _hoisted_5, [
                    vue.createElementVNode("div", _hoisted_6, vue.toDisplayString(item.title), 1 /* TEXT */),
                    vue.createVNode(_component_avue_count_up, {
                      animation: item.animation || _ctx.animation,
                      decimals: item.decimals || _ctx.decimals,
                      class: "item-count",
                      end: item.count
                    }, null, 8 /* PROPS */, ["animation", "decimals", "end"])
                  ])
                ])
              ], 8 /* PROPS */, _hoisted_2)
            ]),
            _: 2 /* DYNAMIC */
          }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["md"]))
        }), 128 /* KEYED_FRAGMENT */))
      ]),
      _: 1 /* STABLE */
    })
  ]))
}

exports.render = render;
