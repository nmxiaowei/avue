/*! Avue.js v3.9.3 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

var vue = require('vue');

const _hoisted_1 = ["onClick", "onDblclick"];
const _hoisted_2 = { key: 0 };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_checkbox = vue.resolveComponent("el-checkbox");
  const _component_el_col = vue.resolveComponent("el-col");
  const _component_el_row = vue.resolveComponent("el-row");
  const _component_el_checkbox_group = vue.resolveComponent("el-checkbox-group");
  const _component_el_empty = vue.resolveComponent("el-empty");

  return (vue.openBlock(), vue.createElementBlock("div", {
    class: vue.normalizeClass(_ctx.b()),
    style: vue.normalizeStyle(_ctx.styleName)
  }, [
    vue.createElementVNode("div", {
      class: vue.normalizeClass(_ctx.b('hide'))
    }, [
      vue.renderSlot(_ctx.$slots, "default")
    ], 2 /* CLASS */),
    (_ctx.data.length !== 0)
      ? (vue.openBlock(), vue.createBlock(_component_el_checkbox_group, {
          key: 0,
          modelValue: _ctx.checkList,
          "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((_ctx.checkList) = $event)),
          onChange: _ctx.checkListChange
        }, {
          default: vue.withCtx(() => [
            vue.createVNode(_component_el_row, null, {
              default: vue.withCtx(() => [
                (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.data, (row, index) => {
                  return (vue.openBlock(), vue.createBlock(_component_el_col, {
                    onClick: vue.withModifiers($event => (_ctx.handleRowClick(row, index)), ["stop"]),
                    onDblclick: vue.withModifiers($event => (_ctx.handleRowDblClick(row, index)), ["stop"]),
                    span: _ctx.crud.tableOption.gridSpan || _ctx.span,
                    md: _ctx.crud.tableOption.gridSpan || _ctx.span,
                    sm: _ctx.crud.tableOption.gridSpan || _ctx.span,
                    xs: _ctx.crud.tableOption.gridXsSpan || _ctx.xsSpan,
                    class: vue.normalizeClass(_ctx.getRowClass(row, index)),
                    key: index
                  }, {
                    default: vue.withCtx(() => [
                      vue.createElementVNode("div", {
                        class: vue.normalizeClass(_ctx.b('content')),
                        style: vue.normalizeStyle([_ctx.getGradientColor(row, index), _ctx.getRowStyle(row, index)])
                      }, [
                        (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.column, (item, columnIndex) => {
                          return (vue.openBlock(), vue.createElementBlock("div", {
                            class: vue.normalizeClass([
                _ctx.b('item'),
                item.type || item.prop,
                _ctx.getClass(row, index, item),
              ]),
                            style: vue.normalizeStyle(_ctx.getCellStyle(row, index, item, columnIndex)),
                            onClick: vue.withModifiers($event => (_ctx.handleCellClick(row, item)), ["stop"]),
                            onDblclick: vue.withModifiers($event => (_ctx.handleCellDblClick(row, item)), ["stop"]),
                            key: columnIndex
                          }, [
                            (item.type == 'selection')
                              ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_2, [
                                  vue.createVNode(_component_el_checkbox, {
                                    value: index,
                                    label: index,
                                    disabled: _ctx.isDisabled(row, index),
                                    onClick: _cache[0] || (_cache[0] = vue.withModifiers(() => {}, ["stop"]))
                                  }, {
                                    default: vue.withCtx(() => [...(_cache[2] || (_cache[2] = [
                                      vue.createTextVNode(" ")
                                    ]))]),
                                    _: 2 /* DYNAMIC */
                                  }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["value", "label", "disabled"])
                                ]))
                              : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
                                  (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(item.header &&
                  item.header({ row: row, $index: index, column: item }), (comp, compIndex) => {
                                    return (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(comp), {
                                      key: compIndex,
                                      class: vue.normalizeClass([_ctx.b('label'), item.labelClassName])
                                    }, null, 8 /* PROPS */, ["class"]))
                                  }), 128 /* KEYED_FRAGMENT */)),
                                  (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(item.default &&
                  item.default({ row: row, $index: index, column: item }), (comp, compIndex) => {
                                    return (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(
                      item.overHidden || item.showOverflowTooltip
                        ? 'elTooltip'
                        : 'div'
                    ), {
                                      key: compIndex,
                                      placement: "top",
                                      class: vue.normalizeClass([_ctx.b('value'), item.className]),
                                      content: row[item.prop]
                                    }, {
                                      default: vue.withCtx(() => [
                                        (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(comp)))
                                      ]),
                                      _: 2 /* DYNAMIC */
                                    }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["class", "content"]))
                                  }), 128 /* KEYED_FRAGMENT */))
                                ], 64 /* STABLE_FRAGMENT */))
                          ], 46 /* CLASS, STYLE, PROPS, NEED_HYDRATION */, _hoisted_1))
                        }), 128 /* KEYED_FRAGMENT */))
                      ], 6 /* CLASS, STYLE */)
                    ]),
                    _: 2 /* DYNAMIC */
                  }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["onClick", "onDblclick", "span", "md", "sm", "xs", "class"]))
                }), 128 /* KEYED_FRAGMENT */))
              ]),
              _: 1 /* STABLE */
            })
          ]),
          _: 1 /* STABLE */
        }, 8 /* PROPS */, ["modelValue", "onChange"]))
      : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
          (_ctx.$slots.empty)
            ? vue.renderSlot(_ctx.$slots, "empty", { key: 0 })
            : (vue.openBlock(), vue.createBlock(_component_el_empty, {
                key: 1,
                "image-size": 100,
                description: _ctx.crud.tableOption.emptyText || _ctx.t('crud.emptyText')
              }, null, 8 /* PROPS */, ["description"]))
        ], 64 /* STABLE_FRAGMENT */))
  ], 6 /* CLASS, STYLE */))
}

exports.render = render;
