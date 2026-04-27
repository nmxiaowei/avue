/*! Avue.js v3.9.1 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { resolveComponent, openBlock, createElementBlock, Fragment, renderSlot, createCommentVNode, renderList, createBlock, createSlots, withCtx, mergeProps } from 'vue';

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_column_dynamic = resolveComponent("column-dynamic");
  const _component_column_slot = resolveComponent("column-slot");

  return (openBlock(), createElementBlock(Fragment, null, [
    renderSlot(_ctx.$slots, "header"),
    createCommentVNode(" 动态列 "),
    (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.list, (column) => {
      return (openBlock(), createElementBlock(Fragment, {
        key: column.prop
      }, [
        (column.children && column.children.length > 0)
          ? (openBlock(), createBlock(_component_column_dynamic, {
              key: 0,
              columnOption: column
            }, createSlots({ _: 2 /* DYNAMIC */ }, [
              renderList(_ctx.crud.mainSlot, (item) => {
                return {
                  name: item,
                  fn: withCtx((scope) => [
                    renderSlot(_ctx.$slots, item, mergeProps({ ref_for: true }, scope))
                  ])
                }
              })
            ]), 1032 /* PROPS, DYNAMIC_SLOTS */, ["columnOption"]))
          : (openBlock(), createBlock(_component_column_slot, {
              key: column.prop,
              column: column,
              "column-option": _ctx.columnOption
            }, createSlots({ _: 2 /* DYNAMIC */ }, [
              renderList(_ctx.crud.mainSlot, (item) => {
                return {
                  name: item,
                  fn: withCtx((scope) => [
                    renderSlot(_ctx.$slots, item, mergeProps({ ref_for: true }, scope))
                  ])
                }
              })
            ]), 1032 /* PROPS, DYNAMIC_SLOTS */, ["column", "column-option"]))
      ], 64 /* STABLE_FRAGMENT */))
    }), 128 /* KEYED_FRAGMENT */)),
    renderSlot(_ctx.$slots, "footer")
  ], 64 /* STABLE_FRAGMENT */))
}

export { render };
