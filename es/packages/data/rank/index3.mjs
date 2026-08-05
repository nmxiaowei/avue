/*! Avue.js v3.9.3 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { resolveComponent, openBlock, createElementBlock, createElementVNode, toDisplayString, createCommentVNode, Fragment, renderList, normalizeClass, createVNode } from 'vue';

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
  const _component_avue_count_up = resolveComponent("avue-count-up");
  const _component_el_progress = resolveComponent("el-progress");

  return (openBlock(), createElementBlock("div", _hoisted_1, [
    (_ctx.title)
      ? (openBlock(), createElementBlock("div", _hoisted_2, [
          createElementVNode("span", _hoisted_3, toDisplayString(_ctx.title), 1 /* TEXT */)
        ]))
      : createCommentVNode("v-if", true),
    createElementVNode("div", _hoisted_4, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.data, (item, index) => {
        return (openBlock(), createElementBlock("div", {
          class: "data-rank__item",
          key: index,
          onClick: $event => (item.click && item.click(item))
        }, [
          createElementVNode("div", {
            class: normalizeClass(["data-rank__index", _ctx.getRankClass(index)])
          }, [
            (index < 3)
              ? (openBlock(), createElementBlock("span", _hoisted_6, toDisplayString(_ctx.getMedal(index)), 1 /* TEXT */))
              : (openBlock(), createElementBlock("span", _hoisted_7, toDisplayString(index + 1), 1 /* TEXT */))
          ], 2 /* CLASS */),
          (item.avatar)
            ? (openBlock(), createElementBlock("div", _hoisted_8, [
                createElementVNode("img", {
                  src: item.avatar,
                  alt: item.name
                }, null, 8 /* PROPS */, _hoisted_9)
              ]))
            : createCommentVNode("v-if", true),
          createElementVNode("div", _hoisted_10, [
            createElementVNode("div", _hoisted_11, toDisplayString(item.name), 1 /* TEXT */),
            (item.desc)
              ? (openBlock(), createElementBlock("div", _hoisted_12, toDisplayString(item.desc), 1 /* TEXT */))
              : createCommentVNode("v-if", true)
          ]),
          createElementVNode("div", _hoisted_13, [
            createVNode(_component_avue_count_up, {
              animation: _ctx.animation,
              decimals: item.decimals || 0,
              end: item.value
            }, null, 8 /* PROPS */, ["animation", "decimals", "end"]),
            (item.unit || _ctx.unit)
              ? (openBlock(), createElementBlock("span", _hoisted_14, toDisplayString(item.unit || _ctx.unit), 1 /* TEXT */))
              : createCommentVNode("v-if", true)
          ]),
          (_ctx.showBar)
            ? (openBlock(), createElementBlock("div", _hoisted_15, [
                createVNode(_component_el_progress, {
                  percentage: _ctx.getPercentage(item.value),
                  "show-text": false,
                  "stroke-width": 6,
                  color: item.color || _ctx.barColor
                }, null, 8 /* PROPS */, ["percentage", "color"])
              ]))
            : createCommentVNode("v-if", true)
        ], 8 /* PROPS */, _hoisted_5))
      }), 128 /* KEYED_FRAGMENT */))
    ])
  ]))
}

export { render };
