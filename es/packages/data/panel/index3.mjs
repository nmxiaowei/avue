/*! Avue.js v3.9.2 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { resolveComponent, openBlock, createElementBlock, createVNode, withCtx, Fragment, renderList, createBlock, createElementVNode, resolveDynamicComponent, toDisplayString } from 'vue';

const _hoisted_1 = { class: "avue-data-panel" };
const _hoisted_2 = ["href", "onClick"];
const _hoisted_3 = { class: "item" };
const _hoisted_4 = { class: "item-icon" };
const _hoisted_5 = { class: "item-info" };
const _hoisted_6 = { class: "item-title" };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_icon = resolveComponent("el-icon");
  const _component_avue_count_up = resolveComponent("avue-count-up");
  const _component_el_col = resolveComponent("el-col");
  const _component_el_row = resolveComponent("el-row");

  return (openBlock(), createElementBlock("div", _hoisted_1, [
    createVNode(_component_el_row, { span: 24 }, {
      default: withCtx(() => [
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.data, (item, index) => {
          return (openBlock(), createBlock(_component_el_col, {
            key: index,
            md: _ctx.span,
            xs: 24,
            sm: 12
          }, {
            default: withCtx(() => [
              createElementVNode("a", {
                href: item.href,
                onClick: $event => (item.click&&item.click(item))
              }, [
                createElementVNode("div", _hoisted_3, [
                  createElementVNode("div", _hoisted_4, [
                    createVNode(_component_el_icon, {
                      color: item.color
                    }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock(resolveDynamicComponent(item.icon)))
                      ]),
                      _: 2 /* DYNAMIC */
                    }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["color"])
                  ]),
                  createElementVNode("div", _hoisted_5, [
                    createElementVNode("div", _hoisted_6, toDisplayString(item.title), 1 /* TEXT */),
                    createVNode(_component_avue_count_up, {
                      animation: item.animation || _ctx.animation,
                      decimals: item.decimals || _ctx.decimals,
                      class: "item-count",
                      end: item.count
                    }, null, 8 /* PROPS */, ["animation", "decimals", "end"])
                  ])
                ])
              ], 8 /* PROPS */, _hoisted_2)
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
