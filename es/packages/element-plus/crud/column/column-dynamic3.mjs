/*! Avue.js v3.9.0 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { resolveComponent, openBlock, createBlock, resolveDynamicComponent, withCtx, createElementBlock, Fragment, renderList, createSlots, renderSlot, mergeProps, normalizeProps, toDisplayString, createCommentVNode } from 'vue';

const _hoisted_1 = { key: 1 };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_column_dynamic = resolveComponent("column-dynamic", true);
  const _component_column_slot = resolveComponent("column-slot");

  return (_ctx.getColumnProp($props.columnOption, 'hide'))
    ? (openBlock(), createBlock(resolveDynamicComponent($options.crud.tableColumnName), {
        key: 0,
        prop: $props.columnOption.prop,
        label: $props.columnOption.label,
        "class-name": $props.columnOption.className,
        "label-class-name": $props.columnOption.labelClassName,
        "filter-placement": "bottom-end",
        filters: _ctx.getColumnProp($props.columnOption, 'filters'),
        "filter-method": 
      $props.columnOption.filters
        ? (value, row) =>
            _ctx.getColumnProp($props.columnOption, 'filterMethod', {
              value,
              row,
              column: $props.columnOption,
            })
        : undefined
    ,
        "filter-multiple": _ctx.validData($props.columnOption.filterMultiple, true),
        "show-overflow-tooltip": 
      $props.columnOption.showOverflowTooltip || $props.columnOption.overHidden
    ,
        "tooltip-formatter": $props.columnOption.tooltipFormatter,
        "min-width": $props.columnOption.minWidth,
        sortable: _ctx.getColumnProp($props.columnOption, 'sortable'),
        "render-header": $props.columnOption.renderHeader,
        align: $props.columnOption.align || $options.crud.tableOption.align,
        "header-align": $props.columnOption.headerAlign || $options.crud.tableOption.headerAlign,
        width: _ctx.getColumnProp($props.columnOption, 'width'),
        fixed: _ctx.getColumnProp($props.columnOption, 'fixed')
      }, {
        header: withCtx(({ $index }) => [
          ($options.crud.getSlotName($props.columnOption, 'H', $options.crud.$slots))
            ? renderSlot(_ctx.$slots, $options.crud.getSlotName($props.columnOption, 'H'), normalizeProps(mergeProps({ key: 0 }, { column: $props.columnOption, $index })))
            : (openBlock(), createElementBlock("span", _hoisted_1, toDisplayString($props.columnOption.label), 1 /* TEXT */))
        ]),
        default: withCtx(() => [
          (openBlock(true), createElementBlock(Fragment, null, renderList($props.columnOption.children, (column) => {
            return (openBlock(), createElementBlock(Fragment, null, [
              (column.children && column.children.length > 0)
                ? (openBlock(), createBlock(_component_column_dynamic, {
                    key: column.label,
                    columnOption: column
                  }, createSlots({ _: 2 /* DYNAMIC */ }, [
                    renderList($options.crud.mainSlot, (item) => {
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
                    "column-option": $props.columnOption.children
                  }, createSlots({ _: 2 /* DYNAMIC */ }, [
                    renderList($options.crud.mainSlot, (item) => {
                      return {
                        name: item,
                        fn: withCtx((scope) => [
                          renderSlot(_ctx.$slots, item, mergeProps({ ref_for: true }, scope))
                        ])
                      }
                    })
                  ]), 1032 /* PROPS, DYNAMIC_SLOTS */, ["column", "column-option"]))
            ], 64 /* STABLE_FRAGMENT */))
          }), 256 /* UNKEYED_FRAGMENT */))
        ]),
        _: 3 /* FORWARDED */
      }, 8 /* PROPS */, ["prop", "label", "class-name", "label-class-name", "filters", "filter-method", "filter-multiple", "show-overflow-tooltip", "tooltip-formatter", "min-width", "sortable", "render-header", "align", "header-align", "width", "fixed"]))
    : createCommentVNode("v-if", true)
}

export { render };
