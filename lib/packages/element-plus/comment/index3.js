/*! Avue.js v3.9.4 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

var vue = require('vue');

const _hoisted_1 = ["disabled", "aria-label"];
const _hoisted_2 = ["src", "alt"];
const _hoisted_3 = ["innerHTML"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createElementBlock("article", {
    class: vue.normalizeClass(_ctx.b({ reverse: _ctx.reverse }))
  }, [
    (_ctx.showAvatar)
      ? (vue.openBlock(), vue.createElementBlock("button", {
          key: 0,
          type: "button",
          class: vue.normalizeClass(_ctx.b('avatar-button')),
          disabled: !_ctx.avatar,
          "aria-label": _ctx.avatar ? `查看 ${_ctx.author || '用户'} 的头像` : '暂无头像',
          onClick: _cache[0] || (_cache[0] = $event => (_ctx.$emit('avatar-click', _ctx.data)))
        }, [
          (_ctx.avatar)
            ? (vue.openBlock(), vue.createElementBlock("img", {
                key: 0,
                src: _ctx.avatar,
                alt: _ctx.avatarAlt,
                class: vue.normalizeClass(_ctx.b('avatar'))
              }, null, 10 /* CLASS, PROPS */, _hoisted_2))
            : (vue.openBlock(), vue.createElementBlock("span", {
                key: 1,
                class: vue.normalizeClass(_ctx.b('avatar-fallback'))
              }, vue.toDisplayString(_ctx.authorInitial), 3 /* TEXT, CLASS */))
        ], 10 /* CLASS, PROPS */, _hoisted_1))
      : vue.createCommentVNode("v-if", true),
    vue.createElementVNode("div", {
      class: vue.normalizeClass(_ctx.b('main'))
    }, [
      vue.createElementVNode("header", {
        class: vue.normalizeClass(_ctx.b('header'))
      }, [
        vue.createElementVNode("div", {
          class: vue.normalizeClass(_ctx.b('meta'))
        }, [
          (_ctx.author)
            ? (vue.openBlock(), vue.createElementBlock("strong", {
                key: 0,
                class: vue.normalizeClass(_ctx.b('author'))
              }, vue.toDisplayString(_ctx.author), 3 /* TEXT, CLASS */))
            : vue.createCommentVNode("v-if", true),
          (_ctx.time)
            ? (vue.openBlock(), vue.createElementBlock("time", {
                key: 1,
                class: vue.normalizeClass(_ctx.b('time'))
              }, vue.toDisplayString(_ctx.time), 3 /* TEXT, CLASS */))
            : vue.createCommentVNode("v-if", true)
        ], 2 /* CLASS */),
        vue.createElementVNode("div", {
          class: vue.normalizeClass(_ctx.b('actions'))
        }, [
          vue.renderSlot(_ctx.$slots, "default", { data: _ctx.data }),
          vue.renderSlot(_ctx.$slots, "actions", { data: _ctx.data })
        ], 2 /* CLASS */)
      ], 2 /* CLASS */),
      (_ctx.body !== undefined && _ctx.body !== null && _ctx.body !== '')
        ? (vue.openBlock(), vue.createElementBlock("div", {
            key: 0,
            class: vue.normalizeClass(_ctx.b('body')),
            innerHTML: _ctx.formattedBody
          }, null, 10 /* CLASS, PROPS */, _hoisted_3))
        : vue.createCommentVNode("v-if", true),
      (_ctx.$slots.footer)
        ? (vue.openBlock(), vue.createElementBlock("footer", {
            key: 1,
            class: vue.normalizeClass(_ctx.b('footer'))
          }, [
            vue.renderSlot(_ctx.$slots, "footer", { data: _ctx.data })
          ], 2 /* CLASS */))
        : vue.createCommentVNode("v-if", true)
    ], 2 /* CLASS */)
  ], 2 /* CLASS */))
}

exports.render = render;
