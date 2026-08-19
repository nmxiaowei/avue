/*! Avue.js v3.9.4 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { openBlock, createElementBlock, normalizeClass, toDisplayString, createCommentVNode, createElementVNode, renderSlot } from 'vue';

const _hoisted_1 = ["disabled", "aria-label"];
const _hoisted_2 = ["src", "alt"];
const _hoisted_3 = ["innerHTML"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("article", {
    class: normalizeClass(_ctx.b({ reverse: _ctx.reverse }))
  }, [
    (_ctx.showAvatar)
      ? (openBlock(), createElementBlock("button", {
          key: 0,
          type: "button",
          class: normalizeClass(_ctx.b('avatar-button')),
          disabled: !_ctx.avatar,
          "aria-label": _ctx.avatar ? `查看 ${_ctx.author || '用户'} 的头像` : '暂无头像',
          onClick: _cache[0] || (_cache[0] = $event => (_ctx.$emit('avatar-click', _ctx.data)))
        }, [
          (_ctx.avatar)
            ? (openBlock(), createElementBlock("img", {
                key: 0,
                src: _ctx.avatar,
                alt: _ctx.avatarAlt,
                class: normalizeClass(_ctx.b('avatar'))
              }, null, 10 /* CLASS, PROPS */, _hoisted_2))
            : (openBlock(), createElementBlock("span", {
                key: 1,
                class: normalizeClass(_ctx.b('avatar-fallback'))
              }, toDisplayString(_ctx.authorInitial), 3 /* TEXT, CLASS */))
        ], 10 /* CLASS, PROPS */, _hoisted_1))
      : createCommentVNode("v-if", true),
    createElementVNode("div", {
      class: normalizeClass(_ctx.b('main'))
    }, [
      createElementVNode("header", {
        class: normalizeClass(_ctx.b('header'))
      }, [
        createElementVNode("div", {
          class: normalizeClass(_ctx.b('meta'))
        }, [
          (_ctx.author)
            ? (openBlock(), createElementBlock("strong", {
                key: 0,
                class: normalizeClass(_ctx.b('author'))
              }, toDisplayString(_ctx.author), 3 /* TEXT, CLASS */))
            : createCommentVNode("v-if", true),
          (_ctx.time)
            ? (openBlock(), createElementBlock("time", {
                key: 1,
                class: normalizeClass(_ctx.b('time'))
              }, toDisplayString(_ctx.time), 3 /* TEXT, CLASS */))
            : createCommentVNode("v-if", true)
        ], 2 /* CLASS */),
        createElementVNode("div", {
          class: normalizeClass(_ctx.b('actions'))
        }, [
          renderSlot(_ctx.$slots, "default", { data: _ctx.data }),
          renderSlot(_ctx.$slots, "actions", { data: _ctx.data })
        ], 2 /* CLASS */)
      ], 2 /* CLASS */),
      (_ctx.body !== undefined && _ctx.body !== null && _ctx.body !== '')
        ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(_ctx.b('body')),
            innerHTML: _ctx.formattedBody
          }, null, 10 /* CLASS, PROPS */, _hoisted_3))
        : createCommentVNode("v-if", true),
      (_ctx.$slots.footer)
        ? (openBlock(), createElementBlock("footer", {
            key: 1,
            class: normalizeClass(_ctx.b('footer'))
          }, [
            renderSlot(_ctx.$slots, "footer", { data: _ctx.data })
          ], 2 /* CLASS */))
        : createCommentVNode("v-if", true)
    ], 2 /* CLASS */)
  ], 2 /* CLASS */))
}

export { render };
