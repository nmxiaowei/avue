/*! Avue.js v3.9.1 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { resolveComponent, openBlock, createElementBlock, createVNode, withCtx, Fragment, renderList, createBlock, createElementVNode, normalizeStyle, toDisplayString, resolveDynamicComponent, createTextVNode } from 'vue';

const _hoisted_1 = { class: "avue-data-rotate" };
const _hoisted_2 = { class: "item-box" };
const _hoisted_3 = { class: "item-title" };
const _hoisted_4 = ["href", "onClick"];
const _hoisted_5 = { class: "item-more" };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_avue_count_up = resolveComponent("avue-count-up");
  const _component_el_icon = resolveComponent("el-icon");
  const _component_el_icon_arrow_right = resolveComponent("el-icon-arrow-right");
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
                style: normalizeStyle({backgroundColor:item.color})
              }, [
                createElementVNode("div", _hoisted_2, [
                  createVNode(_component_avue_count_up, {
                    class: "item-count",
                    decimals: item.decimals || _ctx.decimals,
                    animation: item.animation || _ctx.animation,
                    end: item.count
                  }, null, 8 /* PROPS */, ["decimals", "animation", "end"]),
                  createElementVNode("span", _hoisted_3, toDisplayString(item.title), 1 /* TEXT */),
                  createVNode(_component_el_icon, {
                    color: item.color,
                    class: "item-icon"
                  }, {
                    default: withCtx(() => [
                      (openBlock(), createBlock(resolveDynamicComponent(item.icon)))
                    ]),
                    _: 2 /* DYNAMIC */
                  }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["color"])
                ]),
                createElementVNode("a", {
                  href: item.href,
                  onClick: $event => (item.click&&item.click(item))
                }, [
                  createElementVNode("p", _hoisted_5, [
                    createTextVNode(toDisplayString(_ctx.t('common.more')) + " ", 1 /* TEXT */),
                    createVNode(_component_el_icon, null, {
                      default: withCtx(() => [
                        createVNode(_component_el_icon_arrow_right)
                      ]),
                      _: 1 /* STABLE */
                    })
                  ])
                ], 8 /* PROPS */, _hoisted_4)
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
