/*! Avue.js v3.9.1 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { resolveComponent, openBlock, createElementBlock, normalizeClass, createVNode, withCtx, Fragment, renderList, createBlock, createElementVNode, normalizeStyle, toDisplayString, createCommentVNode } from 'vue';

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
  const _component_avue_count_up = resolveComponent("avue-count-up");
  const _component_el_tooltip = resolveComponent("el-tooltip");
  const _component_el_col = resolveComponent("el-col");
  const _component_el_row = resolveComponent("el-row");

  return (openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.b())
  }, [
    createVNode(_component_el_row, { span: 24 }, {
      default: withCtx(() => [
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.data, (item, index) => {
          return (openBlock(), createBlock(_component_el_col, {
            md: _ctx.span,
            xs: 24,
            sm: 12,
            key: index
          }, {
            default: withCtx(() => [
              createElementVNode("div", _hoisted_1, [
                createElementVNode("div", {
                  class: "top",
                  style: normalizeStyle({backgroundColor:item.color})
                }, null, 4 /* STYLE */),
                createElementVNode("div", _hoisted_2, [
                  createElementVNode("p", _hoisted_3, toDisplayString(item.title), 1 /* TEXT */),
                  createElementVNode("img", {
                    src: item.src,
                    alt: "",
                    class: "img"
                  }, null, 8 /* PROPS */, _hoisted_4),
                  (item.subtitle)
                    ? (openBlock(), createElementBlock("p", {
                        key: 0,
                        class: "subtitle",
                        style: normalizeStyle({color:item.color})
                      }, toDisplayString(item.subtitle), 5 /* TEXT, STYLE */))
                    : createCommentVNode("v-if", true),
                  (item.money || item.dismoney)
                    ? (openBlock(), createElementBlock("p", {
                        key: 1,
                        class: "money",
                        style: normalizeStyle({color:item.color})
                      }, [
                        _cache[0] || (_cache[0] = createElementVNode("span", null, "¥", -1 /* HOISTED */)),
                        createVNode(_component_avue_count_up, {
                          class: "b",
                          decimals: item.decimals || _ctx.decimals,
                          animation: item.animation || _ctx.animation,
                          end: item.dismoney
                        }, null, 8 /* PROPS */, ["decimals", "animation", "end"]),
                        createElementVNode("s", null, toDisplayString(item.money), 1 /* TEXT */),
                        createElementVNode("em", null, toDisplayString(item.tip), 1 /* TEXT */)
                      ], 4 /* STYLE */))
                    : createCommentVNode("v-if", true),
                  _cache[1] || (_cache[1] = createElementVNode("div", { class: "line" }, null, -1 /* HOISTED */)),
                  createElementVNode("a", {
                    class: "btn",
                    href: item.href,
                    onClick: $event => (item.click&&item.click(item)),
                    style: normalizeStyle({backgroundColor:item.color})
                  }, toDisplayString(item.subtext), 13 /* TEXT, STYLE, PROPS */, _hoisted_5)
                ]),
                createElementVNode("div", _hoisted_6, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(item.list, (citem, cindex) => {
                    return (openBlock(), createElementBlock("div", {
                      class: "list-item",
                      key: cindex
                    }, [
                      (citem.check)
                        ? (openBlock(), createElementBlock("i", {
                            key: 0,
                            class: "list-item-icon list-item--check",
                            style: normalizeStyle({color:item.color})
                          }, "√", 4 /* STYLE */))
                        : (openBlock(), createElementBlock("i", _hoisted_7, "x")),
                      createElementVNode("a", {
                        href: citem.href?citem.href:'javascript:void(0);'
                      }, [
                        createVNode(_component_el_tooltip, {
                          effect: "dark",
                          disabled: !citem.tip,
                          placement: "top"
                        }, {
                          content: withCtx(() => [
                            createElementVNode("div", {
                              innerHTML: citem.tip
                            }, null, 8 /* PROPS */, _hoisted_9)
                          ]),
                          default: withCtx(() => [
                            createElementVNode("span", {
                              class: normalizeClass({'list-item--link':citem.href})
                            }, toDisplayString(citem.title), 3 /* TEXT, CLASS */)
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

export { render };
