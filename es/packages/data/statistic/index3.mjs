/*! Avue.js v3.9.0 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { resolveComponent, openBlock, createElementBlock, createVNode, withCtx, Fragment, renderList, createBlock, createElementVNode, normalizeStyle, normalizeClass, createCommentVNode, toDisplayString } from 'vue';

const _hoisted_1 = { class: "data-statistic" };
const _hoisted_2 = ["onClick"];
const _hoisted_3 = {
  key: 0,
  class: "data-statistic__icon"
};
const _hoisted_4 = { class: "data-statistic__content" };
const _hoisted_5 = { class: "data-statistic__title" };
const _hoisted_6 = {
  key: 0,
  class: "data-statistic__prefix"
};
const _hoisted_7 = {
  key: 1,
  class: "data-statistic__suffix"
};
const _hoisted_8 = {
  key: 0,
  class: "data-statistic__trend"
};
const _hoisted_9 = { class: "data-statistic__trend-value" };
const _hoisted_10 = {
  key: 0,
  class: "data-statistic__trend-text"
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_avue_count_up = resolveComponent("avue-count-up");
  const _component_el_col = resolveComponent("el-col");
  const _component_el_row = resolveComponent("el-row");

  return (openBlock(), createElementBlock("div", _hoisted_1, [
    createVNode(_component_el_row, { gutter: _ctx.gutter }, {
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
                class: "data-statistic__item",
                style: normalizeStyle(_ctx.getItemStyle(item)),
                onClick: $event => (item.click && item.click(item))
              }, [
                (item.icon)
                  ? (openBlock(), createElementBlock("div", _hoisted_3, [
                      createElementVNode("i", {
                        class: normalizeClass(item.icon),
                        style: normalizeStyle({color: item.iconColor || '#409eff', fontSize: (item.iconSize || 40) + 'px'})
                      }, null, 6 /* CLASS, STYLE */)
                    ]))
                  : createCommentVNode("v-if", true),
                createElementVNode("div", _hoisted_4, [
                  createElementVNode("div", _hoisted_5, toDisplayString(item.title), 1 /* TEXT */),
                  createElementVNode("div", {
                    class: "data-statistic__value",
                    style: normalizeStyle({color: item.valueColor})
                  }, [
                    (item.prefix)
                      ? (openBlock(), createElementBlock("span", _hoisted_6, toDisplayString(item.prefix), 1 /* TEXT */))
                      : createCommentVNode("v-if", true),
                    createVNode(_component_avue_count_up, {
                      animation: item.animation !== false,
                      decimals: item.decimals || 0,
                      end: item.value
                    }, null, 8 /* PROPS */, ["animation", "decimals", "end"]),
                    (item.suffix)
                      ? (openBlock(), createElementBlock("span", _hoisted_7, toDisplayString(item.suffix), 1 /* TEXT */))
                      : createCommentVNode("v-if", true)
                  ], 4 /* STYLE */),
                  (item.trend !== undefined)
                    ? (openBlock(), createElementBlock("div", _hoisted_8, [
                        createElementVNode("span", {
                          class: normalizeClass(['data-statistic__trend-icon', item.trend >= 0 ? 'is-up' : 'is-down'])
                        }, toDisplayString(item.trend >= 0 ? '↑' : '↓'), 3 /* TEXT, CLASS */),
                        createElementVNode("span", _hoisted_9, toDisplayString(Math.abs(item.trend)) + "%", 1 /* TEXT */),
                        (item.trendText)
                          ? (openBlock(), createElementBlock("span", _hoisted_10, toDisplayString(item.trendText), 1 /* TEXT */))
                          : createCommentVNode("v-if", true)
                      ]))
                    : createCommentVNode("v-if", true)
                ])
              ], 12 /* STYLE, PROPS */, _hoisted_2)
            ]),
            _: 2 /* DYNAMIC */
          }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["md"]))
        }), 128 /* KEYED_FRAGMENT */))
      ]),
      _: 1 /* STABLE */
    }, 8 /* PROPS */, ["gutter"])
  ]))
}

export { render };
