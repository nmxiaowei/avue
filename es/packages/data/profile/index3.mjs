/*! Avue.js v3.9.2 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { resolveComponent, openBlock, createElementBlock, createVNode, withCtx, Fragment, renderList, createBlock, createElementVNode, normalizeStyle, createCommentVNode, toDisplayString, createTextVNode, withModifiers } from 'vue';

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
  const _component_el_tag = resolveComponent("el-tag");
  const _component_el_button = resolveComponent("el-button");
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
                class: "data-profile__item",
                style: normalizeStyle(_ctx.getItemStyle(item)),
                onClick: $event => (item.click && item.click(item))
              }, [
                (item.cover)
                  ? (openBlock(), createElementBlock("div", {
                      key: 0,
                      class: "data-profile__cover",
                      style: normalizeStyle({backgroundImage: 'url(' + item.cover + ')'})
                    }, null, 4 /* STYLE */))
                  : createCommentVNode("v-if", true),
                createElementVNode("div", _hoisted_3, [
                  (item.avatar)
                    ? (openBlock(), createElementBlock("img", {
                        key: 0,
                        src: item.avatar,
                        alt: item.name
                      }, null, 8 /* PROPS */, _hoisted_4))
                    : (openBlock(), createElementBlock("span", _hoisted_5, toDisplayString(_ctx.getAvatarText(item.name)), 1 /* TEXT */))
                ]),
                createElementVNode("div", _hoisted_6, toDisplayString(item.name), 1 /* TEXT */),
                (item.title)
                  ? (openBlock(), createElementBlock("div", _hoisted_7, toDisplayString(item.title), 1 /* TEXT */))
                  : createCommentVNode("v-if", true),
                (item.desc)
                  ? (openBlock(), createElementBlock("div", _hoisted_8, toDisplayString(item.desc), 1 /* TEXT */))
                  : createCommentVNode("v-if", true),
                (item.tags && item.tags.length)
                  ? (openBlock(), createElementBlock("div", _hoisted_9, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(item.tags, (tag, idx) => {
                        return (openBlock(), createBlock(_component_el_tag, {
                          key: idx,
                          size: "small",
                          type: tag.type || ''
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(tag.text || tag), 1 /* TEXT */)
                          ]),
                          _: 2 /* DYNAMIC */
                        }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["type"]))
                      }), 128 /* KEYED_FRAGMENT */))
                    ]))
                  : createCommentVNode("v-if", true),
                (item.phone || item.email)
                  ? (openBlock(), createElementBlock("div", _hoisted_10, [
                      (item.phone)
                        ? (openBlock(), createElementBlock("div", _hoisted_11, [
                            _cache[0] || (_cache[0] = createElementVNode("span", { class: "data-profile__contact-icon" }, "📱", -1 /* HOISTED */)),
                            createElementVNode("span", null, toDisplayString(item.phone), 1 /* TEXT */)
                          ]))
                        : createCommentVNode("v-if", true),
                      (item.email)
                        ? (openBlock(), createElementBlock("div", _hoisted_12, [
                            _cache[1] || (_cache[1] = createElementVNode("span", { class: "data-profile__contact-icon" }, "📧", -1 /* HOISTED */)),
                            createElementVNode("span", null, toDisplayString(item.email), 1 /* TEXT */)
                          ]))
                        : createCommentVNode("v-if", true)
                    ]))
                  : createCommentVNode("v-if", true),
                (item.stats && item.stats.length)
                  ? (openBlock(), createElementBlock("div", _hoisted_13, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(item.stats, (stat, idx) => {
                        return (openBlock(), createElementBlock("div", {
                          class: "data-profile__stat",
                          key: idx
                        }, [
                          createElementVNode("div", _hoisted_14, toDisplayString(stat.value), 1 /* TEXT */),
                          createElementVNode("div", _hoisted_15, toDisplayString(stat.label), 1 /* TEXT */)
                        ]))
                      }), 128 /* KEYED_FRAGMENT */))
                    ]))
                  : createCommentVNode("v-if", true),
                (item.actions && item.actions.length)
                  ? (openBlock(), createElementBlock("div", _hoisted_16, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(item.actions, (action, idx) => {
                        return (openBlock(), createBlock(_component_el_button, {
                          key: idx,
                          type: action.type || 'primary',
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

export { render };
