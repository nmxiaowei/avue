/*! Avue.js v3.8.6 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { resolveComponent, openBlock, createElementBlock, createVNode, withCtx, Fragment, renderList, createBlock, createElementVNode, normalizeStyle, toDisplayString, normalizeClass, createCommentVNode } from 'vue';

const _hoisted_1 = { class: "data-weather" };
const _hoisted_2 = ["onClick"];
const _hoisted_3 = { class: "data-weather__header" };
const _hoisted_4 = { class: "data-weather__city" };
const _hoisted_5 = { class: "data-weather__date" };
const _hoisted_6 = { class: "data-weather__body" };
const _hoisted_7 = { class: "data-weather__icon" };
const _hoisted_8 = { class: "data-weather__temp" };
const _hoisted_9 = { class: "data-weather__temp-value" };
const _hoisted_10 = { class: "data-weather__footer" };
const _hoisted_11 = { class: "data-weather__desc" };
const _hoisted_12 = {
  key: 0,
  class: "data-weather__wind"
};
const _hoisted_13 = {
  key: 0,
  class: "data-weather__range"
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
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
                class: "data-weather__item",
                style: normalizeStyle(_ctx.getItemStyle(item)),
                onClick: $event => (item.click && item.click(item))
              }, [
                createElementVNode("div", _hoisted_3, [
                  createElementVNode("span", _hoisted_4, toDisplayString(item.city), 1 /* TEXT */),
                  createElementVNode("span", _hoisted_5, toDisplayString(item.date), 1 /* TEXT */)
                ]),
                createElementVNode("div", _hoisted_6, [
                  createElementVNode("div", _hoisted_7, [
                    createElementVNode("i", {
                      class: normalizeClass(_ctx.getWeatherIcon(item.weather)),
                      style: {fontSize: '48px'}
                    }, null, 2 /* CLASS */)
                  ]),
                  createElementVNode("div", _hoisted_8, [
                    createElementVNode("span", _hoisted_9, toDisplayString(item.temp), 1 /* TEXT */),
                    _cache[0] || (_cache[0] = createElementVNode("span", { class: "data-weather__temp-unit" }, "°C", -1 /* HOISTED */))
                  ])
                ]),
                createElementVNode("div", _hoisted_10, [
                  createElementVNode("span", _hoisted_11, toDisplayString(item.weather), 1 /* TEXT */),
                  (item.wind)
                    ? (openBlock(), createElementBlock("span", _hoisted_12, toDisplayString(item.wind), 1 /* TEXT */))
                    : createCommentVNode("v-if", true)
                ]),
                (item.tempLow !== undefined)
                  ? (openBlock(), createElementBlock("div", _hoisted_13, toDisplayString(item.tempLow) + "° ~ " + toDisplayString(item.tempHigh) + "° ", 1 /* TEXT */))
                  : createCommentVNode("v-if", true)
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
