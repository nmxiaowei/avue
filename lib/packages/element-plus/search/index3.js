/*! Avue.js v3.9.0 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

var vue = require('vue');

const _hoisted_1 = ["onClick"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_col = vue.resolveComponent("el-col");
  const _component_el_row = vue.resolveComponent("el-row");

  return (vue.openBlock(), vue.createBlock(_component_el_row, {
    class: vue.normalizeClass([_ctx.b(),{'avue--card':_ctx.isCard}]),
    span: 24
  }, {
    default: vue.withCtx(() => [
      (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.columnOption, (column, index) => {
        return (vue.openBlock(), vue.createBlock(_component_el_col, {
          span: column.span || 24,
          key: column.prop,
          class: vue.normalizeClass(_ctx.b('item'))
        }, {
          default: vue.withCtx(() => [
            vue.createElementVNode("p", {
              class: vue.normalizeClass(_ctx.b('title'))
            }, vue.toDisplayString(column.label) + ":", 3 /* TEXT, CLASS */),
            vue.createElementVNode("div", {
              class: vue.normalizeClass(_ctx.b('content'))
            }, [
              (_ctx.mainSlot.includes(column.prop))
                ? vue.renderSlot(_ctx.$slots, column.prop, {
                    key: 0,
                    dic: _ctx.DIC[column.prop]
                  })
                : (vue.openBlock(true), vue.createElementBlock(vue.Fragment, { key: 1 }, vue.renderList(_ctx.DIC[column.prop], (item) => {
                    return (vue.openBlock(), vue.createElementBlock("span", {
                      class: vue.normalizeClass([_ctx.b('tags'),{'avue-search__tags--active':_ctx.getActive(item,column)}]),
                      onClick: $event => (_ctx.handleClick(column,item)),
                      key: _ctx.getKey(item,column.props,_ctx.valueKey)
                    }, vue.toDisplayString(_ctx.getKey(item,column.props,_ctx.labelKey)), 11 /* TEXT, CLASS, PROPS */, _hoisted_1))
                  }), 128 /* KEYED_FRAGMENT */))
            ], 2 /* CLASS */)
          ]),
          _: 2 /* DYNAMIC */
        }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["span", "class"]))
      }), 128 /* KEYED_FRAGMENT */))
    ]),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["class"]))
}

exports.render = render;
