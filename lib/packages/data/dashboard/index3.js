/*! Avue.js v3.9.4 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

var vue = require('vue');

const _hoisted_1 = { class: "data-dashboard" };
const _hoisted_2 = { class: "data-dashboard__header" };
const _hoisted_3 = { class: "data-dashboard__title" };
const _hoisted_4 = { class: "data-dashboard__value" };
const _hoisted_5 = {
  key: 0,
  class: "data-dashboard__unit"
};
const _hoisted_6 = {
  key: 0,
  class: "data-dashboard__chart"
};
const _hoisted_7 = {
  key: 1,
  class: "data-dashboard__footer"
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_tag = vue.resolveComponent("el-tag");
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
                class: "data-dashboard__item",
                style: vue.normalizeStyle(_ctx.getItemStyle(item))
              }, [
                vue.createElementVNode("div", _hoisted_2, [
                  vue.createElementVNode("span", _hoisted_3, vue.toDisplayString(item.title), 1 /* TEXT */),
                  (item.status)
                    ? (vue.openBlock(), vue.createBlock(_component_el_tag, {
                        key: 0,
                        size: "small",
                        type: item.statusType || ''
                      }, {
                        default: vue.withCtx(() => [
                          vue.createTextVNode(vue.toDisplayString(item.status), 1 /* TEXT */)
                        ]),
                        _: 2 /* DYNAMIC */
                      }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["type"]))
                    : vue.createCommentVNode("v-if", true)
                ]),
                vue.createElementVNode("div", _hoisted_4, [
                  vue.createVNode(_component_avue_count_up, {
                    animation: _ctx.animation,
                    decimals: item.decimals || 0,
                    end: item.value
                  }, null, 8 /* PROPS */, ["animation", "decimals", "end"]),
                  (item.unit)
                    ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_5, vue.toDisplayString(item.unit), 1 /* TEXT */))
                    : vue.createCommentVNode("v-if", true)
                ]),
                (item.chartData)
                  ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_6, [
                      (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(item.chartData, (bar, idx) => {
                        return (vue.openBlock(), vue.createElementBlock("div", {
                          class: "data-dashboard__bar",
                          key: idx,
                          style: vue.normalizeStyle({height: bar + '%', backgroundColor: item.chartColor || '#409eff'})
                        }, null, 4 /* STYLE */))
                      }), 128 /* KEYED_FRAGMENT */))
                    ]))
                  : vue.createCommentVNode("v-if", true),
                (item.footerText)
                  ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_7, [
                      vue.createElementVNode("span", null, vue.toDisplayString(item.footerText), 1 /* TEXT */),
                      (item.footerValue)
                        ? (vue.openBlock(), vue.createElementBlock("span", {
                            key: 0,
                            style: vue.normalizeStyle({color: item.footerColor})
                          }, vue.toDisplayString(item.footerValue), 5 /* TEXT, STYLE */))
                        : vue.createCommentVNode("v-if", true)
                    ]))
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
