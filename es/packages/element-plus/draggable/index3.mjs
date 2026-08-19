/*! Avue.js v3.9.4 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { openBlock, createElementBlock, withModifiers, normalizeStyle, normalizeClass, createElementVNode, Fragment, toDisplayString, createCommentVNode, renderList, withDirectives, renderSlot, vShow } from 'vue';

const _hoisted_1 = ["aria-label"];
const _hoisted_2 = ["onPointerdown"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", {
    ref: "root",
    class: normalizeClass(_ctx.b({
         active: (_ctx.active || _ctx.overActive || _ctx.moveActive) && !_ctx.readonly,
         move: _ctx.moveActive,
         disabled: _ctx.disabled
       })),
    style: normalizeStyle(_ctx.styleName),
    tabindex: "0",
    role: "group",
    "aria-label": `可拖拽元素 ${_ctx.index || ''}`,
    onPointerdown: _cache[0] || (_cache[0] = withModifiers((...args) => (_ctx.handleMove && _ctx.handleMove(...args)), ["stop"])),
    onMouseenter: _cache[1] || (_cache[1] = (...args) => (_ctx.handleOver && _ctx.handleOver(...args))),
    onMouseleave: _cache[2] || (_cache[2] = (...args) => (_ctx.handleOut && _ctx.handleOut(...args))),
    onKeydown: _cache[3] || (_cache[3] = (...args) => (_ctx.handleKeydown && _ctx.handleKeydown(...args)))
  }, [
    createElementVNode("div", {
      ref: "wrapper",
      class: normalizeClass(_ctx.b('wrapper'))
    }, [
      ((_ctx.active || _ctx.overActive || _ctx.moveActive) && !_ctx.readonly)
        ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
            createElementVNode("div", {
              style: normalizeStyle(_ctx.styleLineName),
              class: normalizeClass(_ctx.b('line', ['left']))
            }, null, 6 /* CLASS, STYLE */),
            createElementVNode("div", {
              style: normalizeStyle(_ctx.styleLineName),
              class: normalizeClass(_ctx.b('line', ['top']))
            }, null, 6 /* CLASS, STYLE */),
            createElementVNode("div", {
              class: normalizeClass(_ctx.b('line', ['label'])),
              style: normalizeStyle(_ctx.styleLabelName)
            }, toDisplayString(_ctx.baseLeft) + ", " + toDisplayString(_ctx.baseTop) + " · " + toDisplayString(_ctx.baseWidth) + " × " + toDisplayString(_ctx.baseHeight), 7 /* TEXT, CLASS, STYLE */)
          ], 64 /* STABLE_FRAGMENT */))
        : createCommentVNode("v-if", true),
      (_ctx.active && _ctx.resize && !_ctx.readonly && !_ctx.disabled)
        ? (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(_ctx.rangeList, (item) => {
            return (openBlock(), createElementBlock("div", {
              key: item.classname,
              class: normalizeClass(_ctx.b('range', [item.classname])),
              style: normalizeStyle([_ctx.styleRangeName, _ctx.getRangeStyle(item.classname)]),
              onPointerdown: withModifiers($event => (_ctx.rangeMove($event, item.classname)), ["stop","prevent"])
            }, null, 46 /* CLASS, STYLE, PROPS, NEED_HYDRATION */, _hoisted_2))
          }), 128 /* KEYED_FRAGMENT */))
        : createCommentVNode("v-if", true),
      withDirectives(createElementVNode("div", {
        class: normalizeClass(_ctx.b('menu')),
        style: normalizeStyle(_ctx.styleMenuName)
      }, [
        renderSlot(_ctx.$slots, "menu", {
          zIndex: _ctx.zIndex,
          index: _ctx.index
        })
      ], 6 /* CLASS, STYLE */), [
        [vShow, _ctx.active || _ctx.overActive]
      ]),
      createElementVNode("div", {
        ref: "item",
        class: normalizeClass(_ctx.b('item'))
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 2 /* CLASS */),
      (!_ctx.disabled && _ctx.mask)
        ? (openBlock(), createElementBlock("div", {
            key: 2,
            class: normalizeClass(_ctx.b('mask'))
          }, null, 2 /* CLASS */))
        : createCommentVNode("v-if", true)
    ], 2 /* CLASS */)
  ], 46 /* CLASS, STYLE, PROPS, NEED_HYDRATION */, _hoisted_1))
}

export { render };
