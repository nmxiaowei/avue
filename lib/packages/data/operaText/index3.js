/*! Avue.js v3.9.2 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

var vue = require('vue');

const _hoisted_1 = { class: "avue-data-operatext" };
const _hoisted_2 = { class: "item" };
const _hoisted_3 = ["href", "onClick"];
const _hoisted_4 = { class: "item-title" };
const _hoisted_5 = { class: "item-subtitle" };
const _hoisted_6 = { class: "item-content" };
const _hoisted_7 = { class: "item-img" };
const _hoisted_8 = ["src"];
const _hoisted_9 = { class: "item-list" };
const _hoisted_10 = { class: "item-label" };
const _hoisted_11 = { class: "item-value" };

function render(_ctx, _cache, $props, $setup, $data, $options) {
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
              vue.createElementVNode("div", _hoisted_2, [
                vue.createElementVNode("a", {
                  href: item.href,
                  onClick: $event => (item.click&&item.click(item))
                }, [
                  vue.createElementVNode("div", {
                    class: "item-header",
                    style: vue.normalizeStyle({backgroundColor:item.color,backgroundImage:`url(${item.colorImg})`})
                  }, [
                    vue.createElementVNode("span", _hoisted_4, vue.toDisplayString(item.title), 1 /* TEXT */),
                    vue.createElementVNode("span", _hoisted_5, vue.toDisplayString(item.subtitle), 1 /* TEXT */)
                  ], 4 /* STYLE */),
                  vue.createElementVNode("div", _hoisted_6, [
                    vue.createElementVNode("div", _hoisted_7, [
                      vue.createElementVNode("img", {
                        src: item.img,
                        alt: ""
                      }, null, 8 /* PROPS */, _hoisted_8)
                    ]),
                    vue.createElementVNode("div", _hoisted_9, [
                      (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(item.list, (citem, cindex) => {
                        return (vue.openBlock(), vue.createElementBlock("div", {
                          class: "item-row",
                          key: cindex
                        }, [
                          vue.createElementVNode("span", _hoisted_10, vue.toDisplayString(citem.label), 1 /* TEXT */),
                          vue.createElementVNode("span", _hoisted_11, vue.toDisplayString(citem.value), 1 /* TEXT */)
                        ]))
                      }), 128 /* KEYED_FRAGMENT */))
                    ])
                  ])
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
