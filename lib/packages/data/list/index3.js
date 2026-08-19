/*! Avue.js v3.9.4 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

var vue = require('vue');

const _hoisted_1 = { class: "data-list" };
const _hoisted_2 = {
  key: 0,
  class: "data-list__header"
};
const _hoisted_3 = { class: "data-list__title" };
const _hoisted_4 = {
  key: 0,
  class: "data-list__extra"
};
const _hoisted_5 = { class: "data-list__content" };
const _hoisted_6 = ["onClick"];
const _hoisted_7 = {
  key: 0,
  class: "data-list__avatar"
};
const _hoisted_8 = ["src", "alt"];
const _hoisted_9 = { class: "data-list__body" };
const _hoisted_10 = { class: "data-list__title-row" };
const _hoisted_11 = { class: "data-list__name" };
const _hoisted_12 = {
  key: 0,
  class: "data-list__desc"
};
const _hoisted_13 = {
  key: 1,
  class: "data-list__extra"
};
const _hoisted_14 = {
  key: 0,
  class: "data-list__label"
};
const _hoisted_15 = {
  key: 2,
  class: "data-list__action"
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_icon_temp = vue.resolveComponent("icon-temp");
  const _component_el_tag = vue.resolveComponent("el-tag");
  const _component_el_button = vue.resolveComponent("el-button");

  return (vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [
    (_ctx.title)
      ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_2, [
          vue.createElementVNode("span", _hoisted_3, vue.toDisplayString(_ctx.title), 1 /* TEXT */),
          (_ctx.$slots.extra)
            ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_4, [
                vue.renderSlot(_ctx.$slots, "extra")
              ]))
            : vue.createCommentVNode("v-if", true)
        ]))
      : vue.createCommentVNode("v-if", true),
    vue.createElementVNode("div", _hoisted_5, [
      (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.data, (item, index) => {
        return (vue.openBlock(), vue.createElementBlock("div", {
          class: "data-list__item",
          key: index,
          onClick: $event => (_ctx.handleClick(item))
        }, [
          (item.avatar || item.icon)
            ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_7, [
                (item.avatar)
                  ? (vue.openBlock(), vue.createElementBlock("img", {
                      key: 0,
                      src: item.avatar,
                      alt: item.title
                    }, null, 8 /* PROPS */, _hoisted_8))
                  : (item.icon)
                    ? (vue.openBlock(), vue.createBlock(_component_icon_temp, {
                        key: 1,
                        text: item.icon,
                        color: item.iconColor,
                        size: 24,
                        "icon-style": {color: item.iconColor}
                      }, null, 8 /* PROPS */, ["text", "color", "icon-style"]))
                    : vue.createCommentVNode("v-if", true)
              ]))
            : vue.createCommentVNode("v-if", true),
          vue.createElementVNode("div", _hoisted_9, [
            vue.createElementVNode("div", _hoisted_10, [
              vue.createElementVNode("span", _hoisted_11, vue.toDisplayString(item.title), 1 /* TEXT */),
              (item.tag)
                ? (vue.openBlock(), vue.createBlock(_component_el_tag, {
                    key: 0,
                    size: "small",
                    type: item.tagType || ''
                  }, {
                    default: vue.withCtx(() => [
                      vue.createTextVNode(vue.toDisplayString(item.tag), 1 /* TEXT */)
                    ]),
                    _: 2 /* DYNAMIC */
                  }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["type"]))
                : vue.createCommentVNode("v-if", true)
            ]),
            (item.desc)
              ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_12, vue.toDisplayString(item.desc), 1 /* TEXT */))
              : vue.createCommentVNode("v-if", true)
          ]),
          (item.extra)
            ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_13, [
                vue.createElementVNode("span", {
                  class: "data-list__value",
                  style: vue.normalizeStyle({color: item.valueColor})
                }, vue.toDisplayString(item.extra), 5 /* TEXT, STYLE */),
                (item.label)
                  ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_14, vue.toDisplayString(item.label), 1 /* TEXT */))
                  : vue.createCommentVNode("v-if", true)
              ]))
            : vue.createCommentVNode("v-if", true),
          (item.actions && item.actions.length)
            ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_15, [
                (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(item.actions, (action, idx) => {
                  return (vue.openBlock(), vue.createBlock(_component_el_button, {
                    key: idx,
                    type: action.type || 'text',
                    size: "small",
                    onClick: vue.withModifiers($event => (action.click && action.click(item)), ["stop"])
                  }, {
                    default: vue.withCtx(() => [
                      vue.createTextVNode(vue.toDisplayString(action.text), 1 /* TEXT */)
                    ]),
                    _: 2 /* DYNAMIC */
                  }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["type", "onClick"]))
                }), 128 /* KEYED_FRAGMENT */))
              ]))
            : vue.createCommentVNode("v-if", true)
        ], 8 /* PROPS */, _hoisted_6))
      }), 128 /* KEYED_FRAGMENT */))
    ])
  ]))
}

exports.render = render;
