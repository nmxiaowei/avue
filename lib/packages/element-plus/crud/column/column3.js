/*! Avue.js v3.8.6 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

var vue = require('vue');

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_column_dynamic = vue.resolveComponent("column-dynamic");
  const _component_column_slot = vue.resolveComponent("column-slot");

  return (vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
    vue.renderSlot(_ctx.$slots, "header"),
    vue.createCommentVNode(" 动态列 "),
    (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.list, (column) => {
      return (vue.openBlock(), vue.createElementBlock(vue.Fragment, {
        key: column.prop
      }, [
        (column.children && column.children.length > 0)
          ? (vue.openBlock(), vue.createBlock(_component_column_dynamic, {
              key: 0,
              columnOption: column
            }, vue.createSlots({ _: 2 /* DYNAMIC */ }, [
              vue.renderList(_ctx.crud.mainSlot, (item) => {
                return {
                  name: item,
                  fn: vue.withCtx((scope) => [
                    vue.renderSlot(_ctx.$slots, item, vue.mergeProps({ ref_for: true }, scope))
                  ])
                }
              })
            ]), 1032 /* PROPS, DYNAMIC_SLOTS */, ["columnOption"]))
          : (vue.openBlock(), vue.createBlock(_component_column_slot, {
              key: column.prop,
              column: column,
              "column-option": _ctx.columnOption
            }, vue.createSlots({ _: 2 /* DYNAMIC */ }, [
              vue.renderList(_ctx.crud.mainSlot, (item) => {
                return {
                  name: item,
                  fn: vue.withCtx((scope) => [
                    vue.renderSlot(_ctx.$slots, item, vue.mergeProps({ ref_for: true }, scope))
                  ])
                }
              })
            ]), 1032 /* PROPS, DYNAMIC_SLOTS */, ["column", "column-option"]))
      ], 64 /* STABLE_FRAGMENT */))
    }), 128 /* KEYED_FRAGMENT */)),
    vue.renderSlot(_ctx.$slots, "footer")
  ], 64 /* STABLE_FRAGMENT */))
}

exports.render = render;
