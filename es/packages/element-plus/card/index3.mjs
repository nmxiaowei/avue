/*! Avue.js v3.9.3 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { resolveComponent, openBlock, createElementBlock, normalizeClass, createVNode, withCtx, createBlock, createElementVNode, toDisplayString, createCommentVNode, Fragment, renderList, renderSlot } from 'vue';

const _hoisted_1 = ["onClick"];
const _hoisted_2 = ["src"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_icon_plus = resolveComponent("el-icon-plus");
  const _component_el_icon = resolveComponent("el-icon");
  const _component_el_col = resolveComponent("el-col");
  const _component_el_row = resolveComponent("el-row");

  return (openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.b())
  }, [
    createVNode(_component_el_row, {
      span: 24,
      gutter: _ctx.gutter
    }, {
      default: withCtx(() => [
        (_ctx.validData(_ctx.option.addBtn,true))
          ? (openBlock(), createBlock(_component_el_col, {
              key: 0,
              span: _ctx.span
            }, {
              default: withCtx(() => [
                createElementVNode("div", {
                  class: normalizeClass(_ctx.b('item',{'add':true})),
                  onClick: _cache[0] || (_cache[0] = $event => (_ctx.rowAdd()))
                }, [
                  createVNode(_component_el_icon, null, {
                    default: withCtx(() => [
                      createVNode(_component_el_icon_plus)
                    ]),
                    _: 1 /* STABLE */
                  }),
                  createElementVNode("span", null, toDisplayString(_ctx.t('crud.addBtn')), 1 /* TEXT */)
                ], 2 /* CLASS */)
              ]),
              _: 1 /* STABLE */
            }, 8 /* PROPS */, ["span"]))
          : createCommentVNode("v-if", true),
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.data, (item, index) => {
          return (openBlock(), createBlock(_component_el_col, {
            span: _ctx.span,
            key: index
          }, {
            default: withCtx(() => [
              createElementVNode("div", {
                class: normalizeClass(_ctx.b('item')),
                onClick: $event => (_ctx.rowClick(item,index))
              }, [
                createElementVNode("div", {
                  class: normalizeClass(_ctx.b('body'))
                }, [
                  createElementVNode("div", {
                    class: normalizeClass(_ctx.b('avatar'))
                  }, [
                    createElementVNode("img", {
                      src: item[_ctx.imgKey],
                      alt: ""
                    }, null, 8 /* PROPS */, _hoisted_2)
                  ], 2 /* CLASS */),
                  createElementVNode("div", {
                    class: normalizeClass(_ctx.b('detail'))
                  }, [
                    createElementVNode("div", {
                      class: normalizeClass(_ctx.b('title'))
                    }, toDisplayString(item[_ctx.titleKey]), 3 /* TEXT, CLASS */),
                    createElementVNode("div", {
                      class: normalizeClass(_ctx.b('info'))
                    }, toDisplayString(item[_ctx.infoKey]), 3 /* TEXT, CLASS */)
                  ], 2 /* CLASS */)
                ], 2 /* CLASS */),
                createElementVNode("div", {
                  class: normalizeClass(_ctx.b('menu'))
                }, [
                  renderSlot(_ctx.$slots, "menu", {
                    index: index,
                    row: item
                  })
                ], 2 /* CLASS */)
              ], 10 /* CLASS, PROPS */, _hoisted_1)
            ]),
            _: 2 /* DYNAMIC */
          }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["span"]))
        }), 128 /* KEYED_FRAGMENT */))
      ]),
      _: 3 /* FORWARDED */
    }, 8 /* PROPS */, ["gutter"])
  ], 2 /* CLASS */))
}

export { render };
