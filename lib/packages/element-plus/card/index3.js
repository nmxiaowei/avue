/*! Avue.js v3.9.3 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

var vue = require('vue');

const _hoisted_1 = ["onClick"];
const _hoisted_2 = ["src"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_icon_plus = vue.resolveComponent("el-icon-plus");
  const _component_el_icon = vue.resolveComponent("el-icon");
  const _component_el_col = vue.resolveComponent("el-col");
  const _component_el_row = vue.resolveComponent("el-row");

  return (vue.openBlock(), vue.createElementBlock("div", {
    class: vue.normalizeClass(_ctx.b())
  }, [
    vue.createVNode(_component_el_row, {
      span: 24,
      gutter: _ctx.gutter
    }, {
      default: vue.withCtx(() => [
        (_ctx.validData(_ctx.option.addBtn,true))
          ? (vue.openBlock(), vue.createBlock(_component_el_col, {
              key: 0,
              span: _ctx.span
            }, {
              default: vue.withCtx(() => [
                vue.createElementVNode("div", {
                  class: vue.normalizeClass(_ctx.b('item',{'add':true})),
                  onClick: _cache[0] || (_cache[0] = $event => (_ctx.rowAdd()))
                }, [
                  vue.createVNode(_component_el_icon, null, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_el_icon_plus)
                    ]),
                    _: 1 /* STABLE */
                  }),
                  vue.createElementVNode("span", null, vue.toDisplayString(_ctx.t('crud.addBtn')), 1 /* TEXT */)
                ], 2 /* CLASS */)
              ]),
              _: 1 /* STABLE */
            }, 8 /* PROPS */, ["span"]))
          : vue.createCommentVNode("v-if", true),
        (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.data, (item, index) => {
          return (vue.openBlock(), vue.createBlock(_component_el_col, {
            span: _ctx.span,
            key: index
          }, {
            default: vue.withCtx(() => [
              vue.createElementVNode("div", {
                class: vue.normalizeClass(_ctx.b('item')),
                onClick: $event => (_ctx.rowClick(item,index))
              }, [
                vue.createElementVNode("div", {
                  class: vue.normalizeClass(_ctx.b('body'))
                }, [
                  vue.createElementVNode("div", {
                    class: vue.normalizeClass(_ctx.b('avatar'))
                  }, [
                    vue.createElementVNode("img", {
                      src: item[_ctx.imgKey],
                      alt: ""
                    }, null, 8 /* PROPS */, _hoisted_2)
                  ], 2 /* CLASS */),
                  vue.createElementVNode("div", {
                    class: vue.normalizeClass(_ctx.b('detail'))
                  }, [
                    vue.createElementVNode("div", {
                      class: vue.normalizeClass(_ctx.b('title'))
                    }, vue.toDisplayString(item[_ctx.titleKey]), 3 /* TEXT, CLASS */),
                    vue.createElementVNode("div", {
                      class: vue.normalizeClass(_ctx.b('info'))
                    }, vue.toDisplayString(item[_ctx.infoKey]), 3 /* TEXT, CLASS */)
                  ], 2 /* CLASS */)
                ], 2 /* CLASS */),
                vue.createElementVNode("div", {
                  class: vue.normalizeClass(_ctx.b('menu'))
                }, [
                  vue.renderSlot(_ctx.$slots, "menu", {
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

exports.render = render;
