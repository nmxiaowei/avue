/*! Avue.js v3.9.4 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

var vue = require('vue');

const _hoisted_1 = { class: "avue-data-tabs" };
const _hoisted_2 = ["href", "onClick", "target"];
const _hoisted_3 = { class: "item-header" };
const _hoisted_4 = { class: "item-body" };
const _hoisted_5 = { class: "item-footer" };
const _hoisted_6 = { class: "item-tip" };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_avue_count_up = vue.resolveComponent("avue-count-up");
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
                style: vue.normalizeStyle({background:item.color})
              }, [
                vue.createElementVNode("a", {
                  href: item.href,
                  onClick: $event => (item.click&&item.click(item)),
                  target: item.target
                }, [
                  vue.createElementVNode("div", _hoisted_3, [
                    vue.createElementVNode("p", null, vue.toDisplayString(item.title), 1 /* TEXT */),
                    vue.createElementVNode("span", null, vue.toDisplayString(item.subtitle), 1 /* TEXT */)
                  ]),
                  vue.createElementVNode("div", _hoisted_4, [
                    vue.createVNode(_component_avue_count_up, {
                      class: "h2",
                      decimals: item.decimals || _ctx.decimals,
                      animation: item.animation || _ctx.animation,
                      end: item.count
                    }, null, 8 /* PROPS */, ["decimals", "animation", "end"])
                  ]),
                  vue.createElementVNode("div", _hoisted_5, [
                    vue.createElementVNode("span", null, vue.toDisplayString(item.allcount), 1 /* TEXT */),
                    vue.createElementVNode("p", null, vue.toDisplayString(item.text), 1 /* TEXT */)
                  ]),
                  vue.createElementVNode("p", _hoisted_6, vue.toDisplayString(item.key), 1 /* TEXT */)
                ], 8 /* PROPS */, _hoisted_2)
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
