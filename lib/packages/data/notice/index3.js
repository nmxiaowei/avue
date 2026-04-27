/*! Avue.js v3.9.0 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

var vue = require('vue');

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
  return (vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [
    (_ctx.title)
      ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_2, [
          vue.createElementVNode("span", _hoisted_3, vue.toDisplayString(_ctx.title), 1 /* TEXT */),
          (_ctx.showMore)
            ? (vue.openBlock(), vue.createElementBlock("span", {
                key: 0,
                class: "data-notice__more",
                onClick: _cache[0] || (_cache[0] = (...args) => (_ctx.handleMore && _ctx.handleMore(...args)))
              }, vue.toDisplayString(_ctx.moreText), 1 /* TEXT */))
            : vue.createCommentVNode("v-if", true)
        ]))
      : vue.createCommentVNode("v-if", true),
    vue.createElementVNode("div", _hoisted_4, [
      (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.data, (item, index) => {
        return (vue.openBlock(), vue.createElementBlock("div", {
          class: "data-notice__item",
          key: index,
          onClick: $event => (_ctx.handleClick(item))
        }, [
          (item.tag)
            ? (vue.openBlock(), vue.createElementBlock("div", {
                key: 0,
                class: "data-notice__tag",
                style: vue.normalizeStyle({backgroundColor: item.tagColor || '#409eff'})
              }, vue.toDisplayString(item.tag), 5 /* TEXT, STYLE */))
            : vue.createCommentVNode("v-if", true),
          vue.createElementVNode("div", _hoisted_6, [
            vue.createElementVNode("div", _hoisted_7, vue.toDisplayString(item.title), 1 /* TEXT */),
            (item.date)
              ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_8, vue.toDisplayString(item.date), 1 /* TEXT */))
              : vue.createCommentVNode("v-if", true)
          ])
        ], 8 /* PROPS */, _hoisted_5))
      }), 128 /* KEYED_FRAGMENT */))
    ])
  ]))
}

exports.render = render;
