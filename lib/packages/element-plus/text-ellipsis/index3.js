/*! Avue.js v3.9.4 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

var vue = require('vue');

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_tooltip = vue.resolveComponent("el-tooltip");

  return (vue.openBlock(), vue.createElementBlock("div", {
    class: vue.normalizeClass(_ctx.b()),
    style: vue.normalizeStyle({width:_ctx.setPx(_ctx.width,'100%')})
  }, [
    vue.renderSlot(_ctx.$slots, "before", {
      class: vue.normalizeClass(_ctx.b('before'))
    }),
    vue.createVNode(_component_el_tooltip, {
      content: _ctx.text,
      disabled: !(_ctx.useTooltip&&_ctx.isHide),
      placement: _ctx.placement
    }, {
      default: vue.withCtx(() => [
        vue.createElementVNode("span", null, [
          (vue.openBlock(), vue.createElementBlock("span", {
            class: vue.normalizeClass(_ctx.b('text')),
            ref: "text",
            key: _ctx.keyIndex
          }, vue.toDisplayString(_ctx.text), 3 /* TEXT, CLASS */))
        ])
      ]),
      _: 1 /* STABLE */
    }, 8 /* PROPS */, ["content", "disabled", "placement"]),
    vue.createElementVNode("span", {
      class: vue.normalizeClass(_ctx.b('more')),
      ref: "more"
    }, [
      vue.renderSlot(_ctx.$slots, "more")
    ], 2 /* CLASS */),
    vue.renderSlot(_ctx.$slots, "after", {
      class: vue.normalizeClass(_ctx.b('after'))
    })
  ], 6 /* CLASS, STYLE */))
}

exports.render = render;
