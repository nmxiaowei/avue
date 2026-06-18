/*! Avue.js v3.9.2 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { resolveComponent, openBlock, createElementBlock, createVNode, withCtx, Fragment, renderList, createBlock, createElementVNode, normalizeStyle, toDisplayString, createCommentVNode } from 'vue';

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
                class: "data-countdown__item",
                style: normalizeStyle(_ctx.getItemStyle(item))
              }, [
                (item.title)
                  ? (openBlock(), createElementBlock("div", _hoisted_2, toDisplayString(item.title), 1 /* TEXT */))
                  : createCommentVNode("v-if", true),
                createElementVNode("div", _hoisted_3, [
                  (_ctx.showDays)
                    ? (openBlock(), createElementBlock("div", _hoisted_4, [
                        createElementVNode("span", _hoisted_5, toDisplayString(_ctx.formatNumber(item.days || 0)), 1 /* TEXT */),
                        createElementVNode("span", _hoisted_6, toDisplayString(_ctx.t('countdown.day')), 1 /* TEXT */)
                      ]))
                    : createCommentVNode("v-if", true),
                  (_ctx.showDays)
                    ? (openBlock(), createElementBlock("span", _hoisted_7, ":"))
                    : createCommentVNode("v-if", true),
                  createElementVNode("div", _hoisted_8, [
                    createElementVNode("span", _hoisted_9, toDisplayString(_ctx.formatNumber(item.hours || 0)), 1 /* TEXT */),
                    createElementVNode("span", _hoisted_10, toDisplayString(_ctx.t('countdown.hour')), 1 /* TEXT */)
                  ]),
                  _cache[0] || (_cache[0] = createElementVNode("span", { class: "data-countdown__separator" }, ":", -1 /* HOISTED */)),
                  createElementVNode("div", _hoisted_11, [
                    createElementVNode("span", _hoisted_12, toDisplayString(_ctx.formatNumber(item.minutes || 0)), 1 /* TEXT */),
                    createElementVNode("span", _hoisted_13, toDisplayString(_ctx.t('countdown.minute')), 1 /* TEXT */)
                  ]),
                  _cache[1] || (_cache[1] = createElementVNode("span", { class: "data-countdown__separator" }, ":", -1 /* HOISTED */)),
                  createElementVNode("div", _hoisted_14, [
                    createElementVNode("span", _hoisted_15, toDisplayString(_ctx.formatNumber(item.seconds || 0)), 1 /* TEXT */),
                    createElementVNode("span", _hoisted_16, toDisplayString(_ctx.t('countdown.second')), 1 /* TEXT */)
                  ])
                ]),
                (item.desc)
                  ? (openBlock(), createElementBlock("div", _hoisted_17, toDisplayString(item.desc), 1 /* TEXT */))
                  : createCommentVNode("v-if", true)
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

export { render };
