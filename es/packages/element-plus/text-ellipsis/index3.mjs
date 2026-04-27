/*! Avue.js v3.9.1 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { resolveComponent, openBlock, createElementBlock, normalizeStyle, normalizeClass, renderSlot, createVNode, withCtx, createElementVNode, toDisplayString } from 'vue';

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_tooltip = resolveComponent("el-tooltip");

  return (openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.b()),
    style: normalizeStyle({width:_ctx.setPx(_ctx.width,'100%')})
  }, [
    renderSlot(_ctx.$slots, "before", {
      class: normalizeClass(_ctx.b('before'))
    }),
    createVNode(_component_el_tooltip, {
      content: _ctx.text,
      disabled: !(_ctx.useTooltip&&_ctx.isHide),
      placement: _ctx.placement
    }, {
      default: withCtx(() => [
        createElementVNode("span", null, [
          (openBlock(), createElementBlock("span", {
            class: normalizeClass(_ctx.b('text')),
            ref: "text",
            key: _ctx.keyIndex
          }, toDisplayString(_ctx.text), 3 /* TEXT, CLASS */))
        ])
      ]),
      _: 1 /* STABLE */
    }, 8 /* PROPS */, ["content", "disabled", "placement"]),
    createElementVNode("span", {
      class: normalizeClass(_ctx.b('more')),
      ref: "more"
    }, [
      renderSlot(_ctx.$slots, "more")
    ], 2 /* CLASS */),
    renderSlot(_ctx.$slots, "after", {
      class: normalizeClass(_ctx.b('after'))
    })
  ], 6 /* CLASS, STYLE */))
}

export { render };
