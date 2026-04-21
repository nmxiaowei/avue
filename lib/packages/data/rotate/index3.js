/*! Avue.js v3.8.6 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

var vue = require('vue');

const _hoisted_1 = { class: "avue-data-rotate" };
const _hoisted_2 = { class: "item-box" };
const _hoisted_3 = { class: "item-title" };
const _hoisted_4 = ["href", "onClick"];
const _hoisted_5 = { class: "item-more" };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_avue_count_up = vue.resolveComponent("avue-count-up");
  const _component_el_icon = vue.resolveComponent("el-icon");
  const _component_el_icon_arrow_right = vue.resolveComponent("el-icon-arrow-right");
  const _component_el_col = vue.resolveComponent("el-col");
  const _component_el_row = vue.resolveComponent("el-row");

  return (vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [
    vue.createVNode(_component_el_row, { span: 24 }, {
      default: vue.withCtx(() => [
        (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.data, (item, index) => {
          return (vue.openBlock(), vue.createBlock(_component_el_col, {
            md: _ctx.span,
            xs: 24,
            sm: 12,
            key: index
          }, {
            default: vue.withCtx(() => [
              vue.createElementVNode("div", {
                class: "item",
                style: vue.normalizeStyle({backgroundColor:item.color})
              }, [
                vue.createElementVNode("div", _hoisted_2, [
                  vue.createVNode(_component_avue_count_up, {
                    class: "item-count",
                    decimals: item.decimals || _ctx.decimals,
                    animation: item.animation || _ctx.animation,
                    end: item.count
                  }, null, 8 /* PROPS */, ["decimals", "animation", "end"]),
                  vue.createElementVNode("span", _hoisted_3, vue.toDisplayString(item.title), 1 /* TEXT */),
                  vue.createVNode(_component_el_icon, {
                    color: item.color,
                    class: "item-icon"
                  }, {
                    default: vue.withCtx(() => [
                      (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(item.icon)))
                    ]),
                    _: 2 /* DYNAMIC */
                  }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["color"])
                ]),
                vue.createElementVNode("a", {
                  href: item.href,
                  onClick: $event => (item.click&&item.click(item))
                }, [
                  vue.createElementVNode("p", _hoisted_5, [
                    vue.createTextVNode(vue.toDisplayString(_ctx.t('common.more')) + " ", 1 /* TEXT */),
                    vue.createVNode(_component_el_icon, null, {
                      default: vue.withCtx(() => [
                        vue.createVNode(_component_el_icon_arrow_right)
                      ]),
                      _: 1 /* STABLE */
                    })
                  ])
                ], 8 /* PROPS */, _hoisted_4)
              ], 4 /* STYLE */)
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
