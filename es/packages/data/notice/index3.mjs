/*! Avue.js v3.9.0 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { openBlock, createElementBlock, createElementVNode, toDisplayString, createCommentVNode, Fragment, renderList, normalizeStyle } from 'vue';

const _hoisted_1 = { class: "data-notice" };
const _hoisted_2 = {
  key: 0,
  class: "data-notice__header"
};
const _hoisted_3 = { class: "data-notice__title" };
const _hoisted_4 = { class: "data-notice__list" };
const _hoisted_5 = ["onClick"];
const _hoisted_6 = { class: "data-notice__content" };
const _hoisted_7 = { class: "data-notice__text" };
const _hoisted_8 = {
  key: 0,
  class: "data-notice__date"
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", _hoisted_1, [
    (_ctx.title)
      ? (openBlock(), createElementBlock("div", _hoisted_2, [
          createElementVNode("span", _hoisted_3, toDisplayString(_ctx.title), 1 /* TEXT */),
          (_ctx.showMore)
            ? (openBlock(), createElementBlock("span", {
                key: 0,
                class: "data-notice__more",
                onClick: _cache[0] || (_cache[0] = (...args) => (_ctx.handleMore && _ctx.handleMore(...args)))
              }, toDisplayString(_ctx.moreText), 1 /* TEXT */))
            : createCommentVNode("v-if", true)
        ]))
      : createCommentVNode("v-if", true),
    createElementVNode("div", _hoisted_4, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.data, (item, index) => {
        return (openBlock(), createElementBlock("div", {
          class: "data-notice__item",
          key: index,
          onClick: $event => (_ctx.handleClick(item))
        }, [
          (item.tag)
            ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: "data-notice__tag",
                style: normalizeStyle({backgroundColor: item.tagColor || '#409eff'})
              }, toDisplayString(item.tag), 5 /* TEXT, STYLE */))
            : createCommentVNode("v-if", true),
          createElementVNode("div", _hoisted_6, [
            createElementVNode("div", _hoisted_7, toDisplayString(item.title), 1 /* TEXT */),
            (item.date)
              ? (openBlock(), createElementBlock("div", _hoisted_8, toDisplayString(item.date), 1 /* TEXT */))
              : createCommentVNode("v-if", true)
          ])
        ], 8 /* PROPS */, _hoisted_5))
      }), 128 /* KEYED_FRAGMENT */))
    ])
  ]))
}

export { render };
