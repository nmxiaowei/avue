/*! Avue.js v3.9.4 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

var vue = require('vue');

const _hoisted_1 = { class: "data-rank" };
const _hoisted_2 = {
  key: 0,
  class: "data-rank__header"
};
const _hoisted_3 = { class: "data-rank__title" };
const _hoisted_4 = { class: "data-rank__list" };
const _hoisted_5 = ["onClick"];
const _hoisted_6 = { key: 0 };
const _hoisted_7 = { key: 1 };
const _hoisted_8 = {
  key: 0,
  class: "data-rank__avatar"
};
const _hoisted_9 = ["src", "alt"];
const _hoisted_10 = { class: "data-rank__info" };
const _hoisted_11 = { class: "data-rank__name" };
const _hoisted_12 = {
  key: 0,
  class: "data-rank__desc"
};
const _hoisted_13 = { class: "data-rank__value" };
const _hoisted_14 = {
  key: 0,
  class: "data-rank__unit"
};
const _hoisted_15 = {
  key: 1,
  class: "data-rank__bar"
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_avue_count_up = vue.resolveComponent("avue-count-up");
  const _component_el_progress = vue.resolveComponent("el-progress");

  return (vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [
    (_ctx.title)
      ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_2, [
          vue.createElementVNode("span", _hoisted_3, vue.toDisplayString(_ctx.title), 1 /* TEXT */)
        ]))
      : vue.createCommentVNode("v-if", true),
    vue.createElementVNode("div", _hoisted_4, [
      (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.data, (item, index) => {
        return (vue.openBlock(), vue.createElementBlock("div", {
          class: "data-rank__item",
          key: index,
          onClick: $event => (item.click && item.click(item))
        }, [
          vue.createElementVNode("div", {
            class: vue.normalizeClass(["data-rank__index", _ctx.getRankClass(index)])
          }, [
            (index < 3)
              ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_6, vue.toDisplayString(_ctx.getMedal(index)), 1 /* TEXT */))
              : (vue.openBlock(), vue.createElementBlock("span", _hoisted_7, vue.toDisplayString(index + 1), 1 /* TEXT */))
          ], 2 /* CLASS */),
          (item.avatar)
            ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_8, [
                vue.createElementVNode("img", {
                  src: item.avatar,
                  alt: item.name
                }, null, 8 /* PROPS */, _hoisted_9)
              ]))
            : vue.createCommentVNode("v-if", true),
          vue.createElementVNode("div", _hoisted_10, [
            vue.createElementVNode("div", _hoisted_11, vue.toDisplayString(item.name), 1 /* TEXT */),
            (item.desc)
              ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_12, vue.toDisplayString(item.desc), 1 /* TEXT */))
              : vue.createCommentVNode("v-if", true)
          ]),
          vue.createElementVNode("div", _hoisted_13, [
            vue.createVNode(_component_avue_count_up, {
              animation: _ctx.animation,
              decimals: item.decimals || 0,
              end: item.value
            }, null, 8 /* PROPS */, ["animation", "decimals", "end"]),
            (item.unit || _ctx.unit)
              ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_14, vue.toDisplayString(item.unit || _ctx.unit), 1 /* TEXT */))
              : vue.createCommentVNode("v-if", true)
          ]),
          (_ctx.showBar)
            ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_15, [
                vue.createVNode(_component_el_progress, {
                  percentage: _ctx.getPercentage(item.value),
                  "show-text": false,
                  "stroke-width": 6,
                  color: item.color || _ctx.barColor
                }, null, 8 /* PROPS */, ["percentage", "color"])
              ]))
            : vue.createCommentVNode("v-if", true)
        ], 8 /* PROPS */, _hoisted_5))
      }), 128 /* KEYED_FRAGMENT */))
    ])
  ]))
}

exports.render = render;
