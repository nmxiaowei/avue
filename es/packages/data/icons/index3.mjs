/*! Avue.js v3.9.1 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { resolveComponent, openBlock, createElementBlock, createVNode, withCtx, Fragment, renderList, createBlock, createElementVNode, normalizeClass, resolveDynamicComponent, toDisplayString, normalizeStyle } from 'vue';

const _hoisted_1 = { class: "data-icons" };
const _hoisted_2 = ["href", "onClick", "target"];
const _hoisted_3 = { class: "item-icon" };
const _hoisted_4 = { class: "item-info" };

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
            xs: 12,
            sm: 6,
            md: _ctx.span,
            key: index
          }, {
            default: withCtx(() => [
              createElementVNode("div", {
                class: normalizeClass(["item", [{'item--easy':_ctx.discount}]])
              }, [
                createElementVNode("a", {
                  href: item.href,
                  onClick: $event => (item.click&&item.click(item)),
                  target: item.target
                }, [
                  createElementVNode("div", _hoisted_3, [
                    createVNode(_component_el_icon, {
                      color: item.color
                    }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock(resolveDynamicComponent(item.icon)))
                      ]),
                      _: 2 /* DYNAMIC */
                    }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["color"])
                  ]),
                  createElementVNode("div", _hoisted_4, [
                    createElementVNode("span", null, toDisplayString(item.title), 1 /* TEXT */),
                    createVNode(_component_avue_count_up, {
                      animation: item.animation || _ctx.animation,
                      decimals: item.decimals || _ctx.decimals,
                      style: normalizeStyle({color:_ctx.color}),
                      class: "count",
                      end: item.count
                    }, null, 8 /* PROPS */, ["animation", "decimals", "style", "end"])
                  ])
                ], 8 /* PROPS */, _hoisted_2)
              ], 2 /* CLASS */)
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
