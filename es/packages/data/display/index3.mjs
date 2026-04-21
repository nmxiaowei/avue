/*! Avue.js v3.8.6 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { resolveComponent, openBlock, createElementBlock, createVNode, withCtx, Fragment, renderList, createBlock, createElementVNode, normalizeStyle, toDisplayString } from 'vue';

const _hoisted_1 = { class: "avue-data-display" };
const _hoisted_2 = ["href", "onClick", "target"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
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
            xs: 12,
            sm: 12
          }, {
            default: withCtx(() => [
              createElementVNode("div", {
                class: "item",
                style: normalizeStyle({color:_ctx.color})
              }, [
                createElementVNode("a", {
                  href: item.href,
                  onClick: $event => (item.click&&item.click(item)),
                  target: item.target
                }, [
                  createVNode(_component_avue_count_up, {
                    animation: item.animation || _ctx.animation,
                    decimals: item.decimals || _ctx.decimals,
                    class: "count",
                    style: normalizeStyle({color:item.color}),
                    end: item.count
                  }, null, 8 /* PROPS */, ["animation", "decimals", "style", "end"]),
                  _cache[0] || (_cache[0] = createElementVNode("span", { class: "splitLine" }, null, -1 /* HOISTED */)),
                  createElementVNode("div", {
                    class: "title",
                    style: normalizeStyle({color:item.fontColor})
                  }, toDisplayString(item.title), 5 /* TEXT, STYLE */)
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
