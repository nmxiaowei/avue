/*! Avue.js v3.9.0 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

var vue = require('vue');

const _hoisted_1 = ["onMousedown"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_input = vue.resolveComponent("el-input");

  return (vue.openBlock(), vue.createElementBlock("div", {
    class: vue.normalizeClass(_ctx.b({'active':((_ctx.active || _ctx.overActive)&&!_ctx.readonly),'move':_ctx.moveActive,'click':_ctx.disabled})),
    onMousedown: _cache[1] || (_cache[1] = vue.withModifiers((...args) => (_ctx.handleMove && _ctx.handleMove(...args)), ["stop"])),
    onMouseover: _cache[2] || (_cache[2] = vue.withModifiers((...args) => (_ctx.handleOver && _ctx.handleOver(...args)), ["stop"])),
    onMouseout: _cache[3] || (_cache[3] = vue.withModifiers((...args) => (_ctx.handleOut && _ctx.handleOut(...args)), ["stop"])),
    style: vue.normalizeStyle(_ctx.styleName)
  }, [
    vue.createVNode(_component_el_input, {
      ref: "input",
      class: vue.normalizeClass(_ctx.b('focus')),
      modelValue: _ctx.value,
      "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((_ctx.value) = $event))
    }, null, 8 /* PROPS */, ["class", "modelValue"]),
    vue.createElementVNode("div", {
      class: vue.normalizeClass(_ctx.b('wrapper')),
      ref: "wrapper"
    }, [
      ((_ctx.active || _ctx.overActive || _ctx.moveActive)&&!_ctx.readonly)
        ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
            vue.createElementVNode("div", {
              style: vue.normalizeStyle(_ctx.styleLineName),
              class: vue.normalizeClass(_ctx.b('line',['left']))
            }, null, 6 /* CLASS, STYLE */),
            vue.createElementVNode("div", {
              style: vue.normalizeStyle(_ctx.styleLineName),
              class: vue.normalizeClass(_ctx.b('line',['top']))
            }, null, 6 /* CLASS, STYLE */),
            vue.createElementVNode("div", {
              class: vue.normalizeClass(_ctx.b('line',['label'])),
              style: vue.normalizeStyle(_ctx.styleLabelName)
            }, vue.toDisplayString(_ctx.baseLeft) + "," + vue.toDisplayString(_ctx.baseTop), 7 /* TEXT, CLASS, STYLE */)
          ], 64 /* STABLE_FRAGMENT */))
        : vue.createCommentVNode("v-if", true),
      (!_ctx.readonly)
        ? (vue.openBlock(true), vue.createElementBlock(vue.Fragment, { key: 1 }, vue.renderList(_ctx.rangeList, (item, index) => {
            return (vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
              (_ctx.active)
                ? (vue.openBlock(), vue.createElementBlock("div", {
                    class: vue.normalizeClass(_ctx.b('range',[item.classname])),
                    key: index,
                    style: vue.normalizeStyle([_ctx.styleRangeName,_ctx.getRangeStyle(item.classname)]),
                    onMousedown: vue.withModifiers($event => (_ctx.rangeMove($event,item.classname)), ["stop"])
                  }, null, 46 /* CLASS, STYLE, PROPS, NEED_HYDRATION */, _hoisted_1))
                : vue.createCommentVNode("v-if", true)
            ], 64 /* STABLE_FRAGMENT */))
          }), 256 /* UNKEYED_FRAGMENT */))
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
        class: vue.normalizeClass(_ctx.b('item')),
        ref: "item"
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
  ], 38 /* CLASS, STYLE, NEED_HYDRATION */))
}

exports.render = render;
