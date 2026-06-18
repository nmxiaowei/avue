/*! Avue.js v3.9.2 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

var vue = require('vue');

const _hoisted_1 = { class: "item" };
const _hoisted_2 = { class: "header" };
const _hoisted_3 = { class: "title" };
const _hoisted_4 = ["src"];
const _hoisted_5 = ["href", "onClick"];
const _hoisted_6 = { class: "list" };
const _hoisted_7 = {
  key: 1,
  class: "list-item-icon list-item--no"
};
const _hoisted_8 = ["href"];
const _hoisted_9 = ["innerHTML"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_avue_count_up = vue.resolveComponent("avue-count-up");
  const _component_el_tooltip = vue.resolveComponent("el-tooltip");
  const _component_el_col = vue.resolveComponent("el-col");
  const _component_el_row = vue.resolveComponent("el-row");

  return (vue.openBlock(), vue.createElementBlock("div", {
    class: vue.normalizeClass(_ctx.b())
  }, [
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
              vue.createElementVNode("div", _hoisted_1, [
                vue.createElementVNode("div", {
                  class: "top",
                  style: vue.normalizeStyle({backgroundColor:item.color})
                }, null, 4 /* STYLE */),
                vue.createElementVNode("div", _hoisted_2, [
                  vue.createElementVNode("p", _hoisted_3, vue.toDisplayString(item.title), 1 /* TEXT */),
                  vue.createElementVNode("img", {
                    src: item.src,
                    alt: "",
                    class: "img"
                  }, null, 8 /* PROPS */, _hoisted_4),
                  (item.subtitle)
                    ? (vue.openBlock(), vue.createElementBlock("p", {
                        key: 0,
                        class: "subtitle",
                        style: vue.normalizeStyle({color:item.color})
                      }, vue.toDisplayString(item.subtitle), 5 /* TEXT, STYLE */))
                    : vue.createCommentVNode("v-if", true),
                  (item.money || item.dismoney)
                    ? (vue.openBlock(), vue.createElementBlock("p", {
                        key: 1,
                        class: "money",
                        style: vue.normalizeStyle({color:item.color})
                      }, [
                        _cache[0] || (_cache[0] = vue.createElementVNode("span", null, "¥", -1 /* HOISTED */)),
                        vue.createVNode(_component_avue_count_up, {
                          class: "b",
                          decimals: item.decimals || _ctx.decimals,
                          animation: item.animation || _ctx.animation,
                          end: item.dismoney
                        }, null, 8 /* PROPS */, ["decimals", "animation", "end"]),
                        vue.createElementVNode("s", null, vue.toDisplayString(item.money), 1 /* TEXT */),
                        vue.createElementVNode("em", null, vue.toDisplayString(item.tip), 1 /* TEXT */)
                      ], 4 /* STYLE */))
                    : vue.createCommentVNode("v-if", true),
                  _cache[1] || (_cache[1] = vue.createElementVNode("div", { class: "line" }, null, -1 /* HOISTED */)),
                  vue.createElementVNode("a", {
                    class: "btn",
                    href: item.href,
                    onClick: $event => (item.click&&item.click(item)),
                    style: vue.normalizeStyle({backgroundColor:item.color})
                  }, vue.toDisplayString(item.subtext), 13 /* TEXT, STYLE, PROPS */, _hoisted_5)
                ]),
                vue.createElementVNode("div", _hoisted_6, [
                  (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(item.list, (citem, cindex) => {
                    return (vue.openBlock(), vue.createElementBlock("div", {
                      class: "list-item",
                      key: cindex
                    }, [
                      (citem.check)
                        ? (vue.openBlock(), vue.createElementBlock("i", {
                            key: 0,
                            class: "list-item-icon list-item--check",
                            style: vue.normalizeStyle({color:item.color})
                          }, "√", 4 /* STYLE */))
                        : (vue.openBlock(), vue.createElementBlock("i", _hoisted_7, "x")),
                      vue.createElementVNode("a", {
                        href: citem.href?citem.href:'javascript:void(0);'
                      }, [
                        vue.createVNode(_component_el_tooltip, {
                          effect: "dark",
                          disabled: !citem.tip,
                          placement: "top"
                        }, {
                          content: vue.withCtx(() => [
                            vue.createElementVNode("div", {
                              innerHTML: citem.tip
                            }, null, 8 /* PROPS */, _hoisted_9)
                          ]),
                          default: vue.withCtx(() => [
                            vue.createElementVNode("span", {
                              class: vue.normalizeClass({'list-item--link':citem.href})
                            }, vue.toDisplayString(citem.title), 3 /* TEXT, CLASS */)
                          ]),
                          _: 2 /* DYNAMIC */
                        }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["disabled"])
                      ], 8 /* PROPS */, _hoisted_8)
                    ]))
                  }), 128 /* KEYED_FRAGMENT */))
                ])
              ])
            ]),
            _: 2 /* DYNAMIC */
          }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["md"]))
        }), 128 /* KEYED_FRAGMENT */))
      ]),
      _: 1 /* STABLE */
    })
  ], 2 /* CLASS */))
}

exports.render = render;
