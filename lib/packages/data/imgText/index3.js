/*! Avue.js v3.9.2 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

var vue = require('vue');

const _hoisted_1 = { class: "avue-data-imgtext" };
const _hoisted_2 = ["href", "onClick", "target"];
const _hoisted_3 = { class: "item-header" };
const _hoisted_4 = ["src"];
const _hoisted_5 = { class: "item-content" };
const _hoisted_6 = { class: "item-footer" };
const _hoisted_7 = { class: "time" };
const _hoisted_8 = { class: "imgs" };
const _hoisted_9 = ["src"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_tooltip = vue.resolveComponent("el-tooltip");
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
              vue.createElementVNode("div", {
                class: "item",
                style: vue.normalizeStyle({color:_ctx.color})
              }, [
                vue.createElementVNode("a", {
                  href: item.href,
                  onClick: $event => (item.click&&item.click(item)),
                  target: item.target
                }, [
                  vue.createElementVNode("div", _hoisted_3, [
                    vue.createElementVNode("img", {
                      src: item.imgsrc,
                      alt: ""
                    }, null, 8 /* PROPS */, _hoisted_4)
                  ]),
                  vue.createElementVNode("div", _hoisted_5, [
                    vue.createElementVNode("span", null, vue.toDisplayString(item.title), 1 /* TEXT */),
                    vue.createElementVNode("p", null, vue.toDisplayString(item.content), 1 /* TEXT */)
                  ]),
                  vue.createElementVNode("div", _hoisted_6, [
                    vue.createElementVNode("div", _hoisted_7, [
                      vue.createElementVNode("span", null, vue.toDisplayString(item.time), 1 /* TEXT */)
                    ]),
                    vue.createElementVNode("div", _hoisted_8, [
                      vue.createElementVNode("ul", null, [
                        (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(item.headimg, (imgs, index) => {
                          return (vue.openBlock(), vue.createElementBlock("li", { key: index }, [
                            vue.createVNode(_component_el_tooltip, {
                              effect: "dark",
                              content: imgs.name,
                              placement: "top-start"
                            }, {
                              default: vue.withCtx(() => [
                                vue.createElementVNode("img", {
                                  src: imgs.src,
                                  alt: ""
                                }, null, 8 /* PROPS */, _hoisted_9)
                              ]),
                              _: 2 /* DYNAMIC */
                            }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["content"])
                          ]))
                        }), 128 /* KEYED_FRAGMENT */))
                      ])
                    ])
                  ])
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
