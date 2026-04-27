/*! Avue.js v3.9.0 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { resolveComponent, openBlock, createElementBlock, createVNode, withCtx, Fragment, renderList, createBlock, createElementVNode, normalizeStyle, toDisplayString } from 'vue';

const _hoisted_1 = { class: "data-card" };
const _hoisted_2 = { class: "item" };
const _hoisted_3 = ["href", "onClick", "target"];
const _hoisted_4 = ["src"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_col = resolveComponent("el-col");
  const _component_el_row = resolveComponent("el-row");

  return (openBlock(), createElementBlock("div", _hoisted_1, [
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
              createElementVNode("div", _hoisted_2, [
                createElementVNode("a", {
                  href: item.href,
                  onClick: $event => (item.click&&item.click(item)),
                  target: item.target
                }, [
                  createElementVNode("img", {
                    src: item.src,
                    class: "item-img"
                  }, null, 8 /* PROPS */, _hoisted_4),
                  createElementVNode("div", {
                    class: "item-text",
                    style: normalizeStyle({backgroundColor:_ctx.bgText})
                  }, [
                    createElementVNode("h3", {
                      style: normalizeStyle({color:_ctx.colorText})
                    }, toDisplayString(item.name), 5 /* TEXT, STYLE */),
                    createElementVNode("p", {
                      style: normalizeStyle({color:_ctx.colorText})
                    }, toDisplayString(item.text), 5 /* TEXT, STYLE */)
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

export { render };
