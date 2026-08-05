/*! Avue.js v3.9.3 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { resolveComponent, openBlock, createElementBlock, createElementVNode, toDisplayString, renderSlot, createCommentVNode, Fragment, renderList, createBlock, withCtx, createTextVNode, normalizeStyle, withModifiers } from 'vue';

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
  const _component_icon_temp = resolveComponent("icon-temp");
  const _component_el_tag = resolveComponent("el-tag");
  const _component_el_button = resolveComponent("el-button");

  return (openBlock(), createElementBlock("div", _hoisted_1, [
    (_ctx.title)
      ? (openBlock(), createElementBlock("div", _hoisted_2, [
          createElementVNode("span", _hoisted_3, toDisplayString(_ctx.title), 1 /* TEXT */),
          (_ctx.$slots.extra)
            ? (openBlock(), createElementBlock("span", _hoisted_4, [
                renderSlot(_ctx.$slots, "extra")
              ]))
            : createCommentVNode("v-if", true)
        ]))
      : createCommentVNode("v-if", true),
    createElementVNode("div", _hoisted_5, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.data, (item, index) => {
        return (openBlock(), createElementBlock("div", {
          class: "data-list__item",
          key: index,
          onClick: $event => (_ctx.handleClick(item))
        }, [
          (item.avatar || item.icon)
            ? (openBlock(), createElementBlock("div", _hoisted_7, [
                (item.avatar)
                  ? (openBlock(), createElementBlock("img", {
                      key: 0,
                      src: item.avatar,
                      alt: item.title
                    }, null, 8 /* PROPS */, _hoisted_8))
                  : (item.icon)
                    ? (openBlock(), createBlock(_component_icon_temp, {
                        key: 1,
                        text: item.icon,
                        color: item.iconColor,
                        size: 24,
                        "icon-style": {color: item.iconColor}
                      }, null, 8 /* PROPS */, ["text", "color", "icon-style"]))
                    : createCommentVNode("v-if", true)
              ]))
            : createCommentVNode("v-if", true),
          createElementVNode("div", _hoisted_9, [
            createElementVNode("div", _hoisted_10, [
              createElementVNode("span", _hoisted_11, toDisplayString(item.title), 1 /* TEXT */),
              (item.tag)
                ? (openBlock(), createBlock(_component_el_tag, {
                    key: 0,
                    size: "small",
                    type: item.tagType || ''
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(item.tag), 1 /* TEXT */)
                    ]),
                    _: 2 /* DYNAMIC */
                  }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["type"]))
                : createCommentVNode("v-if", true)
            ]),
            (item.desc)
              ? (openBlock(), createElementBlock("div", _hoisted_12, toDisplayString(item.desc), 1 /* TEXT */))
              : createCommentVNode("v-if", true)
          ]),
          (item.extra)
            ? (openBlock(), createElementBlock("div", _hoisted_13, [
                createElementVNode("span", {
                  class: "data-list__value",
                  style: normalizeStyle({color: item.valueColor})
                }, toDisplayString(item.extra), 5 /* TEXT, STYLE */),
                (item.label)
                  ? (openBlock(), createElementBlock("span", _hoisted_14, toDisplayString(item.label), 1 /* TEXT */))
                  : createCommentVNode("v-if", true)
              ]))
            : createCommentVNode("v-if", true),
          (item.actions && item.actions.length)
            ? (openBlock(), createElementBlock("div", _hoisted_15, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(item.actions, (action, idx) => {
                  return (openBlock(), createBlock(_component_el_button, {
                    key: idx,
                    type: action.type || 'text',
                    size: "small",
                    onClick: withModifiers($event => (action.click && action.click(item)), ["stop"])
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(action.text), 1 /* TEXT */)
                    ]),
                    _: 2 /* DYNAMIC */
                  }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["type", "onClick"]))
                }), 128 /* KEYED_FRAGMENT */))
              ]))
            : createCommentVNode("v-if", true)
        ], 8 /* PROPS */, _hoisted_6))
      }), 128 /* KEYED_FRAGMENT */))
    ])
  ]))
}

export { render };
