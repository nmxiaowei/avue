/*! Avue.js v3.9.3 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { resolveComponent, openBlock, createElementBlock, normalizeStyle, normalizeClass, createElementVNode, renderSlot, createBlock, withCtx, createVNode, Fragment, renderList, withModifiers, createTextVNode, resolveDynamicComponent } from 'vue';

const _hoisted_1 = ["onClick", "onDblclick"];
const _hoisted_2 = { key: 0 };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_checkbox = resolveComponent("el-checkbox");
  const _component_el_col = resolveComponent("el-col");
  const _component_el_row = resolveComponent("el-row");
  const _component_el_checkbox_group = resolveComponent("el-checkbox-group");
  const _component_el_empty = resolveComponent("el-empty");

  return (openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.b()),
    style: normalizeStyle(_ctx.styleName)
  }, [
    createElementVNode("div", {
      class: normalizeClass(_ctx.b('hide'))
    }, [
      renderSlot(_ctx.$slots, "default")
    ], 2 /* CLASS */),
    (_ctx.data.length !== 0)
      ? (openBlock(), createBlock(_component_el_checkbox_group, {
          key: 0,
          modelValue: _ctx.checkList,
          "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((_ctx.checkList) = $event)),
          onChange: _ctx.checkListChange
        }, {
          default: withCtx(() => [
            createVNode(_component_el_row, null, {
              default: withCtx(() => [
                (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.data, (row, index) => {
                  return (openBlock(), createBlock(_component_el_col, {
                    onClick: withModifiers($event => (_ctx.handleRowClick(row, index)), ["stop"]),
                    onDblclick: withModifiers($event => (_ctx.handleRowDblClick(row, index)), ["stop"]),
                    span: _ctx.crud.tableOption.gridSpan || _ctx.span,
                    md: _ctx.crud.tableOption.gridSpan || _ctx.span,
                    sm: _ctx.crud.tableOption.gridSpan || _ctx.span,
                    xs: _ctx.crud.tableOption.gridXsSpan || _ctx.xsSpan,
                    class: normalizeClass(_ctx.getRowClass(row, index)),
                    key: index
                  }, {
                    default: withCtx(() => [
                      createElementVNode("div", {
                        class: normalizeClass(_ctx.b('content')),
                        style: normalizeStyle([_ctx.getGradientColor(row, index), _ctx.getRowStyle(row, index)])
                      }, [
                        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.column, (item, columnIndex) => {
                          return (openBlock(), createElementBlock("div", {
                            class: normalizeClass([
                _ctx.b('item'),
                item.type || item.prop,
                _ctx.getClass(row, index, item),
              ]),
                            style: normalizeStyle(_ctx.getCellStyle(row, index, item, columnIndex)),
                            onClick: withModifiers($event => (_ctx.handleCellClick(row, item)), ["stop"]),
                            onDblclick: withModifiers($event => (_ctx.handleCellDblClick(row, item)), ["stop"]),
                            key: columnIndex
                          }, [
                            (item.type == 'selection')
                              ? (openBlock(), createElementBlock("span", _hoisted_2, [
                                  createVNode(_component_el_checkbox, {
                                    value: index,
                                    label: index,
                                    disabled: _ctx.isDisabled(row, index),
                                    onClick: _cache[0] || (_cache[0] = withModifiers(() => {}, ["stop"]))
                                  }, {
                                    default: withCtx(() => [...(_cache[2] || (_cache[2] = [
                                      createTextVNode(" ")
                                    ]))]),
                                    _: 2 /* DYNAMIC */
                                  }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["value", "label", "disabled"])
                                ]))
                              : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                                  (openBlock(true), createElementBlock(Fragment, null, renderList(item.header &&
                  item.header({ row: row, $index: index, column: item }), (comp, compIndex) => {
                                    return (openBlock(), createBlock(resolveDynamicComponent(comp), {
                                      key: compIndex,
                                      class: normalizeClass([_ctx.b('label'), item.labelClassName])
                                    }, null, 8 /* PROPS */, ["class"]))
                                  }), 128 /* KEYED_FRAGMENT */)),
                                  (openBlock(true), createElementBlock(Fragment, null, renderList(item.default &&
                  item.default({ row: row, $index: index, column: item }), (comp, compIndex) => {
                                    return (openBlock(), createBlock(resolveDynamicComponent(
                      item.overHidden || item.showOverflowTooltip
                        ? 'elTooltip'
                        : 'div'
                    ), {
                                      key: compIndex,
                                      placement: "top",
                                      class: normalizeClass([_ctx.b('value'), item.className]),
                                      content: row[item.prop]
                                    }, {
                                      default: withCtx(() => [
                                        (openBlock(), createBlock(resolveDynamicComponent(comp)))
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
      : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          (_ctx.$slots.empty)
            ? renderSlot(_ctx.$slots, "empty", { key: 0 })
            : (openBlock(), createBlock(_component_el_empty, {
                key: 1,
                "image-size": 100,
                description: _ctx.crud.tableOption.emptyText || _ctx.t('crud.emptyText')
              }, null, 8 /* PROPS */, ["description"]))
        ], 64 /* STABLE_FRAGMENT */))
  ], 6 /* CLASS, STYLE */))
}

export { render };
