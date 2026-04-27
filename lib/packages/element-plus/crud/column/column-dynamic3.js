/*! Avue.js v3.9.0 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

var vue = require('vue');

const _hoisted_1 = { key: 1 };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_column_dynamic = vue.resolveComponent("column-dynamic", true);
  const _component_column_slot = vue.resolveComponent("column-slot");

  return (_ctx.getColumnProp($props.columnOption, 'hide'))
    ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($options.crud.tableColumnName), {
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
        header: vue.withCtx(({ $index }) => [
          ($options.crud.getSlotName($props.columnOption, 'H', $options.crud.$slots))
            ? vue.renderSlot(_ctx.$slots, $options.crud.getSlotName($props.columnOption, 'H'), vue.normalizeProps(vue.mergeProps({ key: 0 }, { column: $props.columnOption, $index })))
            : (vue.openBlock(), vue.createElementBlock("span", _hoisted_1, vue.toDisplayString($props.columnOption.label), 1 /* TEXT */))
        ]),
        default: vue.withCtx(() => [
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($props.columnOption.children, (column) => {
            return (vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
              (column.children && column.children.length > 0)
                ? (vue.openBlock(), vue.createBlock(_component_column_dynamic, {
                    key: column.label,
                    columnOption: column
                  }, vue.createSlots({ _: 2 /* DYNAMIC */ }, [
                    vue.renderList($options.crud.mainSlot, (item) => {
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
                    "column-option": $props.columnOption.children
                  }, vue.createSlots({ _: 2 /* DYNAMIC */ }, [
                    vue.renderList($options.crud.mainSlot, (item) => {
                      return {
                        name: item,
                        fn: vue.withCtx((scope) => [
                          vue.renderSlot(_ctx.$slots, item, vue.mergeProps({ ref_for: true }, scope))
                        ])
                      }
                    })
                  ]), 1032 /* PROPS, DYNAMIC_SLOTS */, ["column", "column-option"]))
            ], 64 /* STABLE_FRAGMENT */))
          }), 256 /* UNKEYED_FRAGMENT */))
        ]),
        _: 3 /* FORWARDED */
      }, 8 /* PROPS */, ["prop", "label", "class-name", "label-class-name", "filters", "filter-method", "filter-multiple", "show-overflow-tooltip", "tooltip-formatter", "min-width", "sortable", "render-header", "align", "header-align", "width", "fixed"]))
    : vue.createCommentVNode("v-if", true)
}

exports.render = render;
