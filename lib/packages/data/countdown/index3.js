/*! Avue.js v3.9.1 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

var vue = require('vue');

const _hoisted_1 = { class: "data-countdown" };
const _hoisted_2 = {
  key: 0,
  class: "data-countdown__title"
};
const _hoisted_3 = { class: "data-countdown__timer" };
const _hoisted_4 = {
  key: 0,
  class: "data-countdown__block"
};
const _hoisted_5 = { class: "data-countdown__number" };
const _hoisted_6 = { class: "data-countdown__label" };
const _hoisted_7 = {
  key: 1,
  class: "data-countdown__separator"
};
const _hoisted_8 = { class: "data-countdown__block" };
const _hoisted_9 = { class: "data-countdown__number" };
const _hoisted_10 = { class: "data-countdown__label" };
const _hoisted_11 = { class: "data-countdown__block" };
const _hoisted_12 = { class: "data-countdown__number" };
const _hoisted_13 = { class: "data-countdown__label" };
const _hoisted_14 = { class: "data-countdown__block" };
const _hoisted_15 = { class: "data-countdown__number" };
const _hoisted_16 = { class: "data-countdown__label" };
const _hoisted_17 = {
  key: 1,
  class: "data-countdown__desc"
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
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
                class: "data-countdown__item",
                style: vue.normalizeStyle(_ctx.getItemStyle(item))
              }, [
                (item.title)
                  ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_2, vue.toDisplayString(item.title), 1 /* TEXT */))
                  : vue.createCommentVNode("v-if", true),
                vue.createElementVNode("div", _hoisted_3, [
                  (_ctx.showDays)
                    ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_4, [
                        vue.createElementVNode("span", _hoisted_5, vue.toDisplayString(_ctx.formatNumber(item.days || 0)), 1 /* TEXT */),
                        vue.createElementVNode("span", _hoisted_6, vue.toDisplayString(_ctx.t('countdown.day')), 1 /* TEXT */)
                      ]))
                    : vue.createCommentVNode("v-if", true),
                  (_ctx.showDays)
                    ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_7, ":"))
                    : vue.createCommentVNode("v-if", true),
                  vue.createElementVNode("div", _hoisted_8, [
                    vue.createElementVNode("span", _hoisted_9, vue.toDisplayString(_ctx.formatNumber(item.hours || 0)), 1 /* TEXT */),
                    vue.createElementVNode("span", _hoisted_10, vue.toDisplayString(_ctx.t('countdown.hour')), 1 /* TEXT */)
                  ]),
                  _cache[0] || (_cache[0] = vue.createElementVNode("span", { class: "data-countdown__separator" }, ":", -1 /* HOISTED */)),
                  vue.createElementVNode("div", _hoisted_11, [
                    vue.createElementVNode("span", _hoisted_12, vue.toDisplayString(_ctx.formatNumber(item.minutes || 0)), 1 /* TEXT */),
                    vue.createElementVNode("span", _hoisted_13, vue.toDisplayString(_ctx.t('countdown.minute')), 1 /* TEXT */)
                  ]),
                  _cache[1] || (_cache[1] = vue.createElementVNode("span", { class: "data-countdown__separator" }, ":", -1 /* HOISTED */)),
                  vue.createElementVNode("div", _hoisted_14, [
                    vue.createElementVNode("span", _hoisted_15, vue.toDisplayString(_ctx.formatNumber(item.seconds || 0)), 1 /* TEXT */),
                    vue.createElementVNode("span", _hoisted_16, vue.toDisplayString(_ctx.t('countdown.second')), 1 /* TEXT */)
                  ])
                ]),
                (item.desc)
                  ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_17, vue.toDisplayString(item.desc), 1 /* TEXT */))
                  : vue.createCommentVNode("v-if", true)
              ], 4 /* STYLE */)
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
