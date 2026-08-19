/*! Avue.js v3.9.4 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

var vue = require('vue');

const _hoisted_1 = ["aria-label"];
const _hoisted_2 = ["onPointerdown"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createElementBlock("div", {
    ref: "root",
    class: vue.normalizeClass(_ctx.b({
         active: (_ctx.active || _ctx.overActive || _ctx.moveActive) && !_ctx.readonly,
         move: _ctx.moveActive,
         disabled: _ctx.disabled
       })),
    style: vue.normalizeStyle(_ctx.styleName),
    tabindex: "0",
    role: "group",
    "aria-label": `可拖拽元素 ${_ctx.index || ''}`,
    onPointerdown: _cache[0] || (_cache[0] = vue.withModifiers((...args) => (_ctx.handleMove && _ctx.handleMove(...args)), ["stop"])),
    onMouseenter: _cache[1] || (_cache[1] = (...args) => (_ctx.handleOver && _ctx.handleOver(...args))),
    onMouseleave: _cache[2] || (_cache[2] = (...args) => (_ctx.handleOut && _ctx.handleOut(...args))),
    onKeydown: _cache[3] || (_cache[3] = (...args) => (_ctx.handleKeydown && _ctx.handleKeydown(...args)))
  }, [
    vue.createElementVNode("div", {
      ref: "wrapper",
      class: vue.normalizeClass(_ctx.b('wrapper'))
    }, [
      ((_ctx.active || _ctx.overActive || _ctx.moveActive) && !_ctx.readonly)
        ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
            vue.createElementVNode("div", {
              style: vue.normalizeStyle(_ctx.styleLineName),
              class: vue.normalizeClass(_ctx.b('line', ['left']))
            }, null, 6 /* CLASS, STYLE */),
            vue.createElementVNode("div", {
              style: vue.normalizeStyle(_ctx.styleLineName),
              class: vue.normalizeClass(_ctx.b('line', ['top']))
            }, null, 6 /* CLASS, STYLE */),
            vue.createElementVNode("div", {
              class: vue.normalizeClass(_ctx.b('line', ['label'])),
              style: vue.normalizeStyle(_ctx.styleLabelName)
            }, vue.toDisplayString(_ctx.baseLeft) + ", " + vue.toDisplayString(_ctx.baseTop) + " · " + vue.toDisplayString(_ctx.baseWidth) + " × " + vue.toDisplayString(_ctx.baseHeight), 7 /* TEXT, CLASS, STYLE */)
          ], 64 /* STABLE_FRAGMENT */))
        : vue.createCommentVNode("v-if", true),
      (_ctx.active && _ctx.resize && !_ctx.readonly && !_ctx.disabled)
        ? (vue.openBlock(true), vue.createElementBlock(vue.Fragment, { key: 1 }, vue.renderList(_ctx.rangeList, (item) => {
            return (vue.openBlock(), vue.createElementBlock("div", {
              key: item.classname,
              class: vue.normalizeClass(_ctx.b('range', [item.classname])),
              style: vue.normalizeStyle([_ctx.styleRangeName, _ctx.getRangeStyle(item.classname)]),
              onPointerdown: vue.withModifiers($event => (_ctx.rangeMove($event, item.classname)), ["stop","prevent"])
            }, null, 46 /* CLASS, STYLE, PROPS, NEED_HYDRATION */, _hoisted_2))
          }), 128 /* KEYED_FRAGMENT */))
        : vue.createCommentVNode("v-if", true),
      vue.withDirectives(vue.createElementVNode("div", {
        class: vue.normalizeClass(_ctx.b('menu')),
        style: vue.normalizeStyle(_ctx.styleMenuName)
      }, [
        vue.renderSlot(_ctx.$slots, "menu", {
          zIndex: _ctx.zIndex,
          index: _ctx.index
        })
      ], 6 /* CLASS, STYLE */), [
        [vue.vShow, _ctx.active || _ctx.overActive]
      ]),
      vue.createElementVNode("div", {
        ref: "item",
        class: vue.normalizeClass(_ctx.b('item'))
      }, [
        vue.renderSlot(_ctx.$slots, "default")
      ], 2 /* CLASS */),
      (!_ctx.disabled && _ctx.mask)
        ? (vue.openBlock(), vue.createElementBlock("div", {
            key: 2,
            class: vue.normalizeClass(_ctx.b('mask'))
          }, null, 2 /* CLASS */))
        : vue.createCommentVNode("v-if", true)
    ], 2 /* CLASS */)
  ], 46 /* CLASS, STYLE, PROPS, NEED_HYDRATION */, _hoisted_1))
}

exports.render = render;
