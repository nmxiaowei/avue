/*! Avue.js v3.9.4 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

var vue = require('vue');

const _hoisted_1 = { class: "data-profile" };
const _hoisted_2 = ["onClick"];
const _hoisted_3 = { class: "data-profile__avatar" };
const _hoisted_4 = ["src", "alt"];
const _hoisted_5 = {
  key: 1,
  class: "data-profile__avatar-text"
};
const _hoisted_6 = { class: "data-profile__name" };
const _hoisted_7 = {
  key: 1,
  class: "data-profile__title"
};
const _hoisted_8 = {
  key: 2,
  class: "data-profile__desc"
};
const _hoisted_9 = {
  key: 3,
  class: "data-profile__tags"
};
const _hoisted_10 = {
  key: 4,
  class: "data-profile__contact"
};
const _hoisted_11 = {
  key: 0,
  class: "data-profile__contact-item"
};
const _hoisted_12 = {
  key: 1,
  class: "data-profile__contact-item"
};
const _hoisted_13 = {
  key: 5,
  class: "data-profile__stats"
};
const _hoisted_14 = { class: "data-profile__stat-value" };
const _hoisted_15 = { class: "data-profile__stat-label" };
const _hoisted_16 = {
  key: 6,
  class: "data-profile__actions"
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_tag = vue.resolveComponent("el-tag");
  const _component_el_button = vue.resolveComponent("el-button");
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
                class: "data-profile__item",
                style: vue.normalizeStyle(_ctx.getItemStyle(item)),
                onClick: $event => (item.click && item.click(item))
              }, [
                (item.cover)
                  ? (vue.openBlock(), vue.createElementBlock("div", {
                      key: 0,
                      class: "data-profile__cover",
                      style: vue.normalizeStyle({backgroundImage: 'url(' + item.cover + ')'})
                    }, null, 4 /* STYLE */))
                  : vue.createCommentVNode("v-if", true),
                vue.createElementVNode("div", _hoisted_3, [
                  (item.avatar)
                    ? (vue.openBlock(), vue.createElementBlock("img", {
                        key: 0,
                        src: item.avatar,
                        alt: item.name
                      }, null, 8 /* PROPS */, _hoisted_4))
                    : (vue.openBlock(), vue.createElementBlock("span", _hoisted_5, vue.toDisplayString(_ctx.getAvatarText(item.name)), 1 /* TEXT */))
                ]),
                vue.createElementVNode("div", _hoisted_6, vue.toDisplayString(item.name), 1 /* TEXT */),
                (item.title)
                  ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_7, vue.toDisplayString(item.title), 1 /* TEXT */))
                  : vue.createCommentVNode("v-if", true),
                (item.desc)
                  ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_8, vue.toDisplayString(item.desc), 1 /* TEXT */))
                  : vue.createCommentVNode("v-if", true),
                (item.tags && item.tags.length)
                  ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_9, [
                      (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(item.tags, (tag, idx) => {
                        return (vue.openBlock(), vue.createBlock(_component_el_tag, {
                          key: idx,
                          size: "small",
                          type: tag.type || ''
                        }, {
                          default: vue.withCtx(() => [
                            vue.createTextVNode(vue.toDisplayString(tag.text || tag), 1 /* TEXT */)
                          ]),
                          _: 2 /* DYNAMIC */
                        }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["type"]))
                      }), 128 /* KEYED_FRAGMENT */))
                    ]))
                  : vue.createCommentVNode("v-if", true),
                (item.phone || item.email)
                  ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_10, [
                      (item.phone)
                        ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_11, [
                            _cache[0] || (_cache[0] = vue.createElementVNode("span", { class: "data-profile__contact-icon" }, "📱", -1 /* HOISTED */)),
                            vue.createElementVNode("span", null, vue.toDisplayString(item.phone), 1 /* TEXT */)
                          ]))
                        : vue.createCommentVNode("v-if", true),
                      (item.email)
                        ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_12, [
                            _cache[1] || (_cache[1] = vue.createElementVNode("span", { class: "data-profile__contact-icon" }, "📧", -1 /* HOISTED */)),
                            vue.createElementVNode("span", null, vue.toDisplayString(item.email), 1 /* TEXT */)
                          ]))
                        : vue.createCommentVNode("v-if", true)
                    ]))
                  : vue.createCommentVNode("v-if", true),
                (item.stats && item.stats.length)
                  ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_13, [
                      (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(item.stats, (stat, idx) => {
                        return (vue.openBlock(), vue.createElementBlock("div", {
                          class: "data-profile__stat",
                          key: idx
                        }, [
                          vue.createElementVNode("div", _hoisted_14, vue.toDisplayString(stat.value), 1 /* TEXT */),
                          vue.createElementVNode("div", _hoisted_15, vue.toDisplayString(stat.label), 1 /* TEXT */)
                        ]))
                      }), 128 /* KEYED_FRAGMENT */))
                    ]))
                  : vue.createCommentVNode("v-if", true),
                (item.actions && item.actions.length)
                  ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_16, [
                      (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(item.actions, (action, idx) => {
                        return (vue.openBlock(), vue.createBlock(_component_el_button, {
                          key: idx,
                          type: action.type || 'primary',
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
