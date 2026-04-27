/*! Avue.js v3.9.1 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

var vue = require('vue');

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
  const _component_avue_count_up = vue.resolveComponent("avue-count-up");
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
                class: "data-statistic__item",
                style: vue.normalizeStyle(_ctx.getItemStyle(item)),
                onClick: $event => (item.click && item.click(item))
              }, [
                (item.icon)
                  ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_3, [
                      vue.createElementVNode("i", {
                        class: vue.normalizeClass(item.icon),
                        style: vue.normalizeStyle({color: item.iconColor || '#409eff', fontSize: (item.iconSize || 40) + 'px'})
                      }, null, 6 /* CLASS, STYLE */)
                    ]))
                  : vue.createCommentVNode("v-if", true),
                vue.createElementVNode("div", _hoisted_4, [
                  vue.createElementVNode("div", _hoisted_5, vue.toDisplayString(item.title), 1 /* TEXT */),
                  vue.createElementVNode("div", {
                    class: "data-statistic__value",
                    style: vue.normalizeStyle({color: item.valueColor})
                  }, [
                    (item.prefix)
                      ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_6, vue.toDisplayString(item.prefix), 1 /* TEXT */))
                      : vue.createCommentVNode("v-if", true),
                    vue.createVNode(_component_avue_count_up, {
                      animation: item.animation !== false,
                      decimals: item.decimals || 0,
                      end: item.value
                    }, null, 8 /* PROPS */, ["animation", "decimals", "end"]),
                    (item.suffix)
                      ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_7, vue.toDisplayString(item.suffix), 1 /* TEXT */))
                      : vue.createCommentVNode("v-if", true)
                  ], 4 /* STYLE */),
                  (item.trend !== undefined)
                    ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_8, [
                        vue.createElementVNode("span", {
                          class: vue.normalizeClass(['data-statistic__trend-icon', item.trend >= 0 ? 'is-up' : 'is-down'])
                        }, vue.toDisplayString(item.trend >= 0 ? '↑' : '↓'), 3 /* TEXT, CLASS */),
                        vue.createElementVNode("span", _hoisted_9, vue.toDisplayString(Math.abs(item.trend)) + "%", 1 /* TEXT */),
                        (item.trendText)
                          ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_10, vue.toDisplayString(item.trendText), 1 /* TEXT */))
                          : vue.createCommentVNode("v-if", true)
                      ]))
                    : vue.createCommentVNode("v-if", true)
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

exports.render = render;
