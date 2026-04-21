/*! Avue.js v3.8.6 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { resolveComponent, openBlock, createElementBlock, normalizeStyle, withModifiers, normalizeClass, createVNode, createElementVNode, Fragment, toDisplayString, createCommentVNode, renderList, withDirectives, renderSlot, vShow } from 'vue';

const _hoisted_1 = ["onMousedown"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_input = resolveComponent("el-input");

  return (openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.b({'active':((_ctx.active || _ctx.overActive)&&!_ctx.readonly),'move':_ctx.moveActive,'click':_ctx.disabled})),
    onMousedown: _cache[1] || (_cache[1] = withModifiers((...args) => (_ctx.handleMove && _ctx.handleMove(...args)), ["stop"])),
    onMouseover: _cache[2] || (_cache[2] = withModifiers((...args) => (_ctx.handleOver && _ctx.handleOver(...args)), ["stop"])),
    onMouseout: _cache[3] || (_cache[3] = withModifiers((...args) => (_ctx.handleOut && _ctx.handleOut(...args)), ["stop"])),
    style: normalizeStyle(_ctx.styleName)
  }, [
    createVNode(_component_el_input, {
      ref: "input",
      class: normalizeClass(_ctx.b('focus')),
      modelValue: _ctx.value,
      "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((_ctx.value) = $event))
    }, null, 8 /* PROPS */, ["class", "modelValue"]),
    createElementVNode("div", {
      class: normalizeClass(_ctx.b('wrapper')),
      ref: "wrapper"
    }, [
      ((_ctx.active || _ctx.overActive || _ctx.moveActive)&&!_ctx.readonly)
        ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
            createElementVNode("div", {
              style: normalizeStyle(_ctx.styleLineName),
              class: normalizeClass(_ctx.b('line',['left']))
            }, null, 6 /* CLASS, STYLE */),
            createElementVNode("div", {
              style: normalizeStyle(_ctx.styleLineName),
              class: normalizeClass(_ctx.b('line',['top']))
            }, null, 6 /* CLASS, STYLE */),
            createElementVNode("div", {
              class: normalizeClass(_ctx.b('line',['label'])),
              style: normalizeStyle(_ctx.styleLabelName)
            }, toDisplayString(_ctx.baseLeft) + "," + toDisplayString(_ctx.baseTop), 7 /* TEXT, CLASS, STYLE */)
          ], 64 /* STABLE_FRAGMENT */))
        : createCommentVNode("v-if", true),
      (!_ctx.readonly)
        ? (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(_ctx.rangeList, (item, index) => {
            return (openBlock(), createElementBlock(Fragment, null, [
              (_ctx.active)
                ? (openBlock(), createElementBlock("div", {
                    class: normalizeClass(_ctx.b('range',[item.classname])),
                    key: index,
                    style: normalizeStyle([_ctx.styleRangeName,_ctx.getRangeStyle(item.classname)]),
                    onMousedown: withModifiers($event => (_ctx.rangeMove($event,item.classname)), ["stop"])
                  }, null, 46 /* CLASS, STYLE, PROPS, NEED_HYDRATION */, _hoisted_1))
                : createCommentVNode("v-if", true)
            ], 64 /* STABLE_FRAGMENT */))
          }), 256 /* UNKEYED_FRAGMENT */))
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
        class: normalizeClass(_ctx.b('item')),
        ref: "item"
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
  ], 38 /* CLASS, STYLE, NEED_HYDRATION */))
}

export { render };
