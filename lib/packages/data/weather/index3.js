/*! Avue.js v3.9.4 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

var vue = require('vue');

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
  const _component_icon_temp = vue.resolveComponent("icon-temp");
  const _component_el_col = vue.resolveComponent("el-col");
  const _component_el_row = vue.resolveComponent("el-row");

  return (vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [
    vue.createVNode(_component_el_row, { gutter: _ctx.gutter }, {
      default: vue.withCtx(() => [
        (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.data, (item, index) => {
          return (vue.openBlock(), vue.createBlock(_component_el_col, {
            md: _ctx.span,
            xs: 24,
            sm: 12,
            key: index
          }, {
            default: vue.withCtx(() => [
              vue.createElementVNode("div", {
                class: "data-weather__item",
                style: vue.normalizeStyle(_ctx.getItemStyle(item)),
                onClick: $event => (item.click && item.click(item))
              }, [
                vue.createElementVNode("div", _hoisted_3, [
                  vue.createElementVNode("span", _hoisted_4, vue.toDisplayString(item.city), 1 /* TEXT */),
                  vue.createElementVNode("span", _hoisted_5, vue.toDisplayString(item.date), 1 /* TEXT */)
                ]),
                vue.createElementVNode("div", _hoisted_6, [
                  vue.createElementVNode("div", _hoisted_7, [
                    vue.createVNode(_component_icon_temp, {
                      text: _ctx.getWeatherIcon(item.weather),
                      size: 48
                    }, null, 8 /* PROPS */, ["text"])
                  ]),
                  vue.createElementVNode("div", _hoisted_8, [
                    vue.createElementVNode("span", _hoisted_9, vue.toDisplayString(item.temp), 1 /* TEXT */),
                    _cache[0] || (_cache[0] = vue.createElementVNode("span", { class: "data-weather__temp-unit" }, "°C", -1 /* HOISTED */))
                  ])
                ]),
                vue.createElementVNode("div", _hoisted_10, [
                  vue.createElementVNode("span", _hoisted_11, vue.toDisplayString(item.weather), 1 /* TEXT */),
                  (item.wind)
                    ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_12, vue.toDisplayString(item.wind), 1 /* TEXT */))
                    : vue.createCommentVNode("v-if", true)
                ]),
                (item.tempLow !== undefined)
                  ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_13, vue.toDisplayString(item.tempLow) + "° ~ " + vue.toDisplayString(item.tempHigh) + "° ", 1 /* TEXT */))
                  : vue.createCommentVNode("v-if", true)
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

exports.render = render;
