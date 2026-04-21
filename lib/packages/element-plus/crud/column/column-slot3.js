/*! Avue.js v3.8.6 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

var vue = require('vue');

const _hoisted_1 = { key: 1 };
const _hoisted_2 = {
  key: 0,
  class: "avue-crud__img"
};
const _hoisted_3 = ["innerHTML"];
const _hoisted_4 = ["title", "textContent"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_form_temp = vue.resolveComponent("form-temp");
  const _component_el_tooltip = vue.resolveComponent("el-tooltip");
  const _component_el_form_item = vue.resolveComponent("el-form-item");
  const _component_custom = vue.resolveComponent("custom");
  const _component_el_icon_document = vue.resolveComponent("el-icon-document");
  const _component_el_icon = vue.resolveComponent("el-icon");
  const _component_el_link = vue.resolveComponent("el-link");
  const _component_avue_rate = vue.resolveComponent("avue-rate");
  const _component_icon_temp = vue.resolveComponent("icon-temp");

  return (_ctx.getColumnProp($props.column, 'hide'))
    ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($options.crud.tableColumnName), {
        key: $props.column.prop,
        prop: $props.column.prop,
        "grid-row": $props.column.gridRow,
        label: $props.column.label,
        "class-name": $props.column.className,
        "label-class-name": $props.column.labelClassName,
        "column-key": $props.column.prop,
        "filter-placement": $props.column.filterPlacement,
        "filtered-value": $props.column.filteredValue,
        "filtered-multiple": $props.column.filterMultiple,
        filters: _ctx.getColumnProp($props.column, 'filters'),
        "filter-method": 
      $props.column.filters
        ? (value, row) =>
            _ctx.getColumnProp($props.columnOption, 'filterMethod', { value, row, column: $props.column })
        : undefined
    ,
        "filter-multiple": _ctx.validData($props.column.filterMultiple, true),
        "show-overflow-tooltip": $props.column.showOverflowTooltip || $props.column.overHidden,
        "tooltip-formatter": $props.column.tooltipFormatter,
        "min-width": $props.column.minWidth,
        sortable: _ctx.getColumnProp($props.column, 'sortable'),
        "sort-method": $props.column.sortMethod,
        "sort-orders": $props.column.sortOrders,
        "sort-by": $props.column.sortBy,
        resizable: $props.column.resizable,
        "render-header": $props.column.renderHeader,
        align: $props.column.align || $options.crud.tableOption.align,
        "header-align": $props.column.headerAlign || $options.crud.tableOption.headerAlign,
        width: _ctx.getColumnProp($props.column, 'width'),
        fixed: _ctx.getColumnProp($props.column, 'fixed')
      }, {
        header: vue.withCtx(({ $index }) => [
          ($options.crud.getSlotName($props.column, 'H', $options.crud.$slots))
            ? vue.renderSlot(_ctx.$slots, $options.crud.getSlotName($props.column, 'H'), vue.normalizeProps(vue.mergeProps({ key: 0 }, { column: $props.column, $index })))
            : (vue.openBlock(), vue.createElementBlock("span", _hoisted_1, vue.toDisplayString($props.column.label), 1 /* TEXT */))
        ]),
        default: vue.withCtx(({ row, column: tableColumn, $index }) => [
          (row.$cellEdit && $props.column.cell)
            ? (vue.openBlock(), vue.createBlock(_component_el_form_item, {
                key: 0,
                prop: $options.crud.isTree ? '' : `list.${$index}.${$props.column.prop}`,
                label: $options.validLabel($props.column, row, ' '),
                "label-width": $options.validLabel($props.column, row, '-1px'),
                rules: $props.column.rules
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_el_tooltip, {
                    content: ($options.crud.listError[`list.${$index}.${$props.column.prop}`] || {}).msg,
                    disabled: 
            !($options.crud.listError[`list.${$index}.${$props.column.prop}`] || {}).valid
          ,
                    placement: "top"
                  }, {
                    default: vue.withCtx(() => [
                      vue.createElementVNode("div", null, [
                        ($options.crud.getSlotName($props.column, 'F', $options.crud.$slots))
                          ? vue.renderSlot(_ctx.$slots, $options.crud.getSlotName($props.column, 'F'), vue.normalizeProps(vue.mergeProps({ key: 0 }, {
                row: row,
                tableColumn: tableColumn,
                column: $props.column,
                dic: $options.crud.DIC[$props.column.prop],
                size: $options.crud.size,
                index: $index,
                disabled: $options.crud.btnDisabledList[$index],
                label: $options.handleDetail(row, $props.column),
                $cell: row.$cellEdit,
              })))
                          : (vue.openBlock(), vue.createBlock(_component_form_temp, vue.mergeProps({
                              key: 1,
                              column: $props.column,
                              size: $options.crud.size,
                              index: $index,
                              row: row,
                              prop: `list.${$index}.${$props.column.prop}`,
                              clearValidate: $options.crud.clearValidate,
                              render: $props.column.renderForm,
                              "table-data": {
                index: $index,
                row: row,
                label: $options.handleDetail(row, $props.column),
              },
                              dic: 
                ($options.crud.cascaderDIC[$index] || {})[$props.column.prop] ||
                $options.crud.DIC[$props.column.prop]
              ,
                              props: $props.column.props || $options.crud.tableOption.props,
                              readonly: $props.column.readonly,
                              disabled: 
                $options.crud.disabled ||
                $options.crud.tableOption.disabled ||
                $props.column.disabled ||
                $options.crud.btnDisabledList[$index]
              ,
                              clearable: _ctx.validData($props.column.clearable, false)
                            }, _ctx.$uploadFun($props.column, $options.crud), {
                              modelValue: row[$props.column.prop],
                              "onUpdate:modelValue": $event => ((row[$props.column.prop]) = $event),
                              "column-slot": $options.crud.mainSlot,
                              onChange: $event => ($options.columnChange(row, $props.column, $index))
                            }), vue.createSlots({ _: 2 /* DYNAMIC */ }, [
                              vue.renderList($options.crud.mainSlot, (item) => {
                                return {
                                  name: item,
                                  fn: vue.withCtx((scope) => [
                                    vue.renderSlot(_ctx.$slots, item, vue.normalizeProps(vue.guardReactiveProps(scope)))
                                  ])
                                }
                              })
                            ]), 1040 /* FULL_PROPS, DYNAMIC_SLOTS */, ["column", "size", "index", "row", "prop", "clearValidate", "render", "table-data", "dic", "props", "readonly", "disabled", "clearable", "modelValue", "onUpdate:modelValue", "column-slot", "onChange"]))
                      ])
                    ]),
                    _: 2 /* DYNAMIC */
                  }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["content", "disabled"])
                ]),
                _: 2 /* DYNAMIC */
              }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["prop", "label", "label-width", "rules"]))
            : ($props.column.render)
              ? (vue.openBlock(), vue.createBlock(_component_custom, {
                  key: 1,
                  column: $props.column,
                  row: row,
                  index: $index,
                  render: $props.column.render,
                  event: $props.column.event,
                  params: $props.column.params
                }, null, 8 /* PROPS */, ["column", "row", "index", "render", "event", "params"]))
              : ($options.crud.$slots[$props.column.prop])
                ? vue.renderSlot(_ctx.$slots, $props.column.prop, {
                    key: 2,
                    row: row,
                    tableColumn: tableColumn,
                    column: $props.column,
                    index: $index,
                    dic: $options.crud.DIC[$props.column.prop],
                    size: $options.crud.size,
                    label: $options.handleDetail(row, $props.column)
                  })
                : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 3 }, [
                    (['img', 'upload'].includes($props.column.type))
                      ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_2, [
                          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($options.getImgList(row, $props.column), (item, index) => {
                            return (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: index }, [
                              ($options.isMediaType(item, $props.column.fileType))
                                ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($options.isMediaType(item, $props.column.fileType)), {
                                    key: 0,
                                    src: item,
                                    onClick: vue.withModifiers($event => ($options.openImg(row, $props.column, index)), ["stop"])
                                  }, null, 8 /* PROPS */, ["src", "onClick"]))
                                : (vue.openBlock(), vue.createBlock(_component_el_icon, {
                                    key: 1,
                                    onClick: vue.withModifiers($event => ($options.openImg(row, $props.column, index)), ["stop"])
                                  }, {
                                    default: vue.withCtx(() => [
                                      vue.createVNode(_component_el_icon_document)
                                    ]),
                                    _: 2 /* DYNAMIC */
                                  }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["onClick"]))
                            ], 64 /* STABLE_FRAGMENT */))
                          }), 128 /* KEYED_FRAGMENT */))
                        ]))
                      : ('url' === $props.column.type)
                        ? (vue.openBlock(true), vue.createElementBlock(vue.Fragment, { key: 1 }, vue.renderList($options.corArray(row, $props.column), (item, index) => {
                            return (vue.openBlock(), vue.createBlock(_component_el_link, {
                              type: "primary",
                              key: index,
                              href: item,
                              target: $props.column.target || '_blank'
                            }, {
                              default: vue.withCtx(() => [
                                vue.createTextVNode(vue.toDisplayString(item), 1 /* TEXT */)
                              ]),
                              _: 2 /* DYNAMIC */
                            }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["href", "target"]))
                          }), 128 /* KEYED_FRAGMENT */))
                        : ('rate' === $props.column.type)
                          ? (vue.openBlock(), vue.createBlock(_component_avue_rate, {
                              key: 2,
                              disabled: "",
                              modelValue: row[$props.column.prop],
                              "onUpdate:modelValue": $event => ((row[$props.column.prop]) = $event)
                            }, null, 8 /* PROPS */, ["modelValue", "onUpdate:modelValue"]))
                          : ('color' === $props.column.type)
                            ? (vue.openBlock(), vue.createElementBlock("i", {
                                key: 3,
                                class: "avue-crud__color",
                                style: vue.normalizeStyle({ backgroundColor: row[$props.column.prop] })
                              }, null, 4 /* STYLE */))
                            : ('icon' === $props.column.type)
                              ? (vue.openBlock(), vue.createBlock(_component_icon_temp, {
                                  key: 4,
                                  text: row[$props.column.prop]
                                }, null, 8 /* PROPS */, ["text"]))
                              : ($props.column.html)
                                ? (vue.openBlock(), vue.createElementBlock("span", {
                                    key: 5,
                                    innerHTML: $options.handleDetail(row, $props.column)
                                  }, null, 8 /* PROPS */, _hoisted_3))
                                : (vue.openBlock(), vue.createElementBlock("span", {
                                    key: 6,
                                    class: vue.normalizeClass({ 'avue-crud__ellipsis': $props.column.ellipsis }),
                                    title: $props.column.ellipsis ? $options.handleDetail(row, $props.column) : '',
                                    textContent: vue.toDisplayString($options.handleDetail(row, $props.column))
                                  }, null, 10 /* CLASS, PROPS */, _hoisted_4))
                  ], 64 /* STABLE_FRAGMENT */))
        ]),
        _: 3 /* FORWARDED */
      }, 8 /* PROPS */, ["prop", "grid-row", "label", "class-name", "label-class-name", "column-key", "filter-placement", "filtered-value", "filtered-multiple", "filters", "filter-method", "filter-multiple", "show-overflow-tooltip", "tooltip-formatter", "min-width", "sortable", "sort-method", "sort-orders", "sort-by", "resizable", "render-header", "align", "header-align", "width", "fixed"]))
    : vue.createCommentVNode("v-if", true)
}

exports.render = render;
