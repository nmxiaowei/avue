/*! Avue.js v3.8.6 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { resolveComponent, openBlock, createElementBlock, createVNode, withCtx, Fragment, renderList, createBlock, createElementVNode, normalizeStyle, toDisplayString } from 'vue';

const _hoisted_1 = { class: "avue-data-tabs" };
const _hoisted_2 = ["href", "onClick", "target"];
const _hoisted_3 = { class: "item-header" };
const _hoisted_4 = { class: "item-body" };
const _hoisted_5 = { class: "item-footer" };
const _hoisted_6 = { class: "item-tip" };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_avue_count_up = resolveComponent("avue-count-up");
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
              createElementVNode("div", {
                class: "item",
                style: normalizeStyle({background:item.color})
              }, [
                createElementVNode("a", {
                  href: item.href,
                  onClick: $event => (item.click&&item.click(item)),
                  target: item.target
                }, [
                  createElementVNode("div", _hoisted_3, [
                    createElementVNode("p", null, toDisplayString(item.title), 1 /* TEXT */),
                    createElementVNode("span", null, toDisplayString(item.subtitle), 1 /* TEXT */)
                  ]),
                  createElementVNode("div", _hoisted_4, [
                    createVNode(_component_avue_count_up, {
                      class: "h2",
                      decimals: item.decimals || _ctx.decimals,
                      animation: item.animation || _ctx.animation,
                      end: item.count
                    }, null, 8 /* PROPS */, ["decimals", "animation", "end"])
                  ]),
                  createElementVNode("div", _hoisted_5, [
                    createElementVNode("span", null, toDisplayString(item.allcount), 1 /* TEXT */),
                    createElementVNode("p", null, toDisplayString(item.text), 1 /* TEXT */)
                  ]),
                  createElementVNode("p", _hoisted_6, toDisplayString(item.key), 1 /* TEXT */)
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

export { render };
