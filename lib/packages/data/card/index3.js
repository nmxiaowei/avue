/*! Avue.js v3.9.0 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

var vue = require('vue');

const _hoisted_1 = { class: "data-card" };
const _hoisted_2 = { class: "item" };
const _hoisted_3 = ["href", "onClick", "target"];
const _hoisted_4 = ["src"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
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
              vue.createElementVNode("div", _hoisted_2, [
                vue.createElementVNode("a", {
                  href: item.href,
                  onClick: $event => (item.click&&item.click(item)),
                  target: item.target
                }, [
                  vue.createElementVNode("img", {
                    src: item.src,
                    class: "item-img"
                  }, null, 8 /* PROPS */, _hoisted_4),
                  vue.createElementVNode("div", {
                    class: "item-text",
                    style: vue.normalizeStyle({backgroundColor:_ctx.bgText})
                  }, [
                    vue.createElementVNode("h3", {
                      style: vue.normalizeStyle({color:_ctx.colorText})
                    }, vue.toDisplayString(item.name), 5 /* TEXT, STYLE */),
                    vue.createElementVNode("p", {
                      style: vue.normalizeStyle({color:_ctx.colorText})
                    }, vue.toDisplayString(item.text), 5 /* TEXT, STYLE */)
                  ], 4 /* STYLE */)
                ], 8 /* PROPS */, _hoisted_3)
              ])
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
