/*! Avue.js v3.9.3 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { resolveComponent, openBlock, createElementBlock, createVNode, withCtx, Fragment, renderList, createBlock, createElementVNode, toDisplayString } from 'vue';

const _hoisted_1 = { class: "data-price" };
const _hoisted_2 = { class: "item item--active" };
const _hoisted_3 = ["href", "onClick", "target"];
const _hoisted_4 = { class: "title" };
const _hoisted_5 = { class: "body" };
const _hoisted_6 = { class: "price" };
const _hoisted_7 = { class: "append" };
const _hoisted_8 = { class: "list" };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_col = resolveComponent("el-col");
  const _component_el_row = resolveComponent("el-row");

  return (openBlock(), createElementBlock("div", _hoisted_1, [
    createVNode(_component_el_row, { span: 24 }, {
      default: withCtx(() => [
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.data, (item, index) => {
          return (openBlock(), createBlock(_component_el_col, {
            xs: 12,
            sm: 6,
            md: _ctx.span,
            key: index
          }, {
            default: withCtx(() => [
              createElementVNode("div", _hoisted_2, [
                createElementVNode("a", {
                  href: item.href,
                  onClick: $event => (item.click&&item.click(item)),
                  target: item.target
                }, [
                  createElementVNode("div", _hoisted_4, toDisplayString(item.title), 1 /* TEXT */),
                  createElementVNode("div", _hoisted_5, [
                    createElementVNode("span", _hoisted_6, toDisplayString(item.price), 1 /* TEXT */),
                    createElementVNode("span", _hoisted_7, toDisplayString(item.append), 1 /* TEXT */)
                  ]),
                  createElementVNode("div", _hoisted_8, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(item.list, (citem, cindex) => {
                      return (openBlock(), createElementBlock("p", { key: cindex }, toDisplayString(citem), 1 /* TEXT */))
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

export { render };
