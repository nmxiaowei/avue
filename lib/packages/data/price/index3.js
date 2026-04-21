/*! Avue.js v3.8.6 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

var vue = require('vue');

const _hoisted_1 = { class: "data-price" };
const _hoisted_2 = { class: "item item--active" };
const _hoisted_3 = ["href", "onClick", "target"];
const _hoisted_4 = { class: "title" };
const _hoisted_5 = { class: "body" };
const _hoisted_6 = { class: "price" };
const _hoisted_7 = { class: "append" };
const _hoisted_8 = { class: "list" };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_col = vue.resolveComponent("el-col");
  const _component_el_row = vue.resolveComponent("el-row");

  return (vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [
    vue.createVNode(_component_el_row, { span: 24 }, {
      default: vue.withCtx(() => [
        (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.data, (item, index) => {
          return (vue.openBlock(), vue.createBlock(_component_el_col, {
            xs: 12,
            sm: 6,
            md: _ctx.span,
            key: index
          }, {
            default: vue.withCtx(() => [
              vue.createElementVNode("div", _hoisted_2, [
                vue.createElementVNode("a", {
                  href: item.href,
                  onClick: $event => (item.click&&item.click(item)),
                  target: item.target
                }, [
                  vue.createElementVNode("div", _hoisted_4, vue.toDisplayString(item.title), 1 /* TEXT */),
                  vue.createElementVNode("div", _hoisted_5, [
                    vue.createElementVNode("span", _hoisted_6, vue.toDisplayString(item.price), 1 /* TEXT */),
                    vue.createElementVNode("span", _hoisted_7, vue.toDisplayString(item.append), 1 /* TEXT */)
                  ]),
                  vue.createElementVNode("div", _hoisted_8, [
                    (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(item.list, (citem, cindex) => {
                      return (vue.openBlock(), vue.createElementBlock("p", { key: cindex }, vue.toDisplayString(citem), 1 /* TEXT */))
                    }), 128 /* KEYED_FRAGMENT */))
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
