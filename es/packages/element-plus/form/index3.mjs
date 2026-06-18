/*! Avue.js v3.9.2 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { resolveComponent, openBlock, createElementBlock, normalizeStyle, normalizeClass, createVNode, withModifiers, withCtx, Fragment, renderList, createBlock, createSlots, withDirectives, resolveDynamicComponent, createElementVNode, renderSlot, mergeProps, toDisplayString, createCommentVNode, vShow, createTextVNode, normalizeProps, guardReactiveProps } from 'vue';

const _hoisted_1 = ["innerHTML"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_tab_pane = resolveComponent("el-tab-pane");
  const _component_el_tabs = resolveComponent("el-tabs");
  const _component_el_icon_info_filled = resolveComponent("el-icon-info-filled");
  const _component_el_icon = resolveComponent("el-icon");
  const _component_el_tooltip = resolveComponent("el-tooltip");
  const _component_form_temp = resolveComponent("form-temp");
  const _component_el_form_item = resolveComponent("el-form-item");
  const _component_el_col = resolveComponent("el-col");
  const _component_form_menu = resolveComponent("form-menu");
  const _component_avue_group = resolveComponent("avue-group");
  const _component_el_row = resolveComponent("el-row");
  const _component_el_form = resolveComponent("el-form");

  return (openBlock(), createElementBlock("div", {
    class: normalizeClass([_ctx.b(), { 'avue--detail': _ctx.isDetail }]),
    style: normalizeStyle({ width: _ctx.setPx(_ctx.tableOption.formWidth, '100%') })
  }, [
    createVNode(_component_el_form, {
      ref: "form",
      "status-icon": _ctx.tableOption.statusIcon,
      onSubmit: _cache[1] || (_cache[1] = withModifiers(() => {}, ["prevent"])),
      model: _ctx.form,
      "scroll-to-error": _ctx.tableOption.scrollToError,
      "hide-required-asterisk": _ctx.tableOption.hideRequiredAsterisk,
      "require-asterisk-position": _ctx.tableOption.requireAsteriskPosition,
      "scroll-into-view-options": _ctx.tableOption.scrollIntoViewOptions,
      "label-suffix": _ctx.labelSuffix,
      size: _ctx.size,
      "label-position": _ctx.tableOption.labelPosition,
      "label-width": _ctx.setPx(_ctx.tableOption.labelWidth, _ctx.config.labelWidth)
    }, {
      default: withCtx(() => [
        createVNode(_component_el_row, {
          span: 24,
          gutter: _ctx.tableOption.gutter,
          class: normalizeClass({ 'avue-form__tabs': _ctx.isTabs })
        }, {
          default: withCtx(() => [
            (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.columnOption, (item, index) => {
              return (openBlock(), createBlock(_component_avue_group, {
                onChange: _ctx.handleGroupClick,
                key: item.prop,
                tabs: _ctx.isTabs,
                arrow: item.arrow,
                collapse: item.collapse,
                display: _ctx.vaildDisplay(item),
                icon: item.icon,
                index: index,
                header: !_ctx.isTabs,
                active: _ctx.activeName,
                label: item.label
              }, createSlots({
                tabs: withCtx(() => [
                  (_ctx.isTabs && index == 1)
                    ? (openBlock(), createBlock(_component_el_tabs, {
                        key: 0,
                        modelValue: _ctx.activeName,
                        "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((_ctx.activeName) = $event)),
                        onTabClick: _ctx.handleTabClick,
                        class: normalizeClass(_ctx.b('tabs')),
                        type: _ctx.tabsType
                      }, {
                        default: withCtx(() => [
                          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.columnOption, (tabs, index) => {
                            return (openBlock(), createElementBlock(Fragment, null, [
                              (_ctx.vaildDisplay(tabs) && index != 0)
                                ? (openBlock(), createBlock(_component_el_tab_pane, {
                                    key: index,
                                    name: index + ''
                                  }, {
                                    label: withCtx(() => [
                                      createElementVNode("span", null, [
                                        (_ctx.getSlotName(tabs, 'H', _ctx.$slots))
                                          ? renderSlot(_ctx.$slots, _ctx.getSlotName(tabs, 'H'), {
                                              key: 0,
                                              column: tabs
                                            })
                                          : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                                              createElementVNode("i", {
                                                class: normalizeClass(tabs.icon)
                                              }, " ", 2 /* CLASS */),
                                              createTextVNode(" " + toDisplayString(tabs.label), 1 /* TEXT */)
                                            ], 64 /* STABLE_FRAGMENT */))
                                      ])
                                    ]),
                                    _: 2 /* DYNAMIC */
                                  }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["name"]))
                                : createCommentVNode("v-if", true)
                            ], 64 /* STABLE_FRAGMENT */))
                          }), 256 /* UNKEYED_FRAGMENT */))
                        ]),
                        _: 2 /* DYNAMIC */
                      }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["modelValue", "onTabClick", "class", "type"]))
                    : createCommentVNode("v-if", true)
                ]),
                default: withCtx(() => [
                  (_ctx.isGroupShow(item, index, _ctx.isVerifyAll))
                    ? withDirectives((openBlock(), createElementBlock("div", {
                        key: 0,
                        class: normalizeClass(_ctx.b('group', { flex: _ctx.validData(item.flex, true) }))
                      }, [
                        (openBlock(true), createElementBlock(Fragment, null, renderList(item.column, (column, cindex) => {
                          return (openBlock(), createElementBlock(Fragment, null, [
                            (_ctx.vaildDisplay(column))
                              ? (openBlock(), createBlock(_component_el_col, {
                                  key: cindex,
                                  span: _ctx.getItemParams(column, item, 'span'),
                                  md: _ctx.getItemParams(column, item, 'span'),
                                  sm: _ctx.getItemParams(column, item, 'span'),
                                  xs: _ctx.getItemParams(column, item, 'xsSpan'),
                                  offset: _ctx.getItemParams(column, item, 'offset'),
                                  push: _ctx.getItemParams(column, item, 'push'),
                                  pull: _ctx.getItemParams(column, item, 'pull'),
                                  class: normalizeClass([
                  _ctx.b('row'),
                  { 'avue--detail avue--detail__column': _ctx.vaildDetail(column) },
                  column.className,
                ])
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_el_form_item, {
                                      prop: column.prop,
                                      label: column.label,
                                      rules: column.rules,
                                      class: normalizeClass(
                    _ctx.b(
                      'item--' +
                        (column.labelPosition ||
                          item.labelPosition ||
                          _ctx.tableOption.labelPosition ||
                          '')
                    )
                  ),
                                      "label-position": 
                    column.labelPosition ||
                    item.labelPosition ||
                    _ctx.tableOption.labelPosition
                  ,
                                      "label-width": _ctx.getItemParams(column, item, 'labelWidth', true)
                                    }, createSlots({
                                      default: withCtx(() => [
                                        (openBlock(), createBlock(resolveDynamicComponent(_ctx.validTip(column) ? 'div' : 'elTooltip'), {
                                          disabled: _ctx.validTip(column),
                                          content: _ctx.validData(column.tip, _ctx.getPlaceholder(column)),
                                          placement: column.tipPlacement
                                        }, {
                                          default: withCtx(() => [
                                            createElementVNode("div", null, [
                                              (_ctx.$slots[column.prop])
                                                ? renderSlot(_ctx.$slots, column.prop, {
                                                    key: 0,
                                                    value: _ctx.form[column.prop],
                                                    column: column,
                                                    label: _ctx.form['$' + column.prop],
                                                    size: column.size || _ctx.size,
                                                    readonly: column.readonly || _ctx.readonly,
                                                    disabled: _ctx.getDisabled(column),
                                                    dic: _ctx.DIC[column.prop]
                                                  })
                                                : (openBlock(), createBlock(_component_form_temp, mergeProps({
                                                    key: 1,
                                                    column: column,
                                                    "box-type": _ctx.boxType,
                                                    ref_for: true,
                                                    ref: column.prop,
                                                    dic: _ctx.DIC[column.prop],
                                                    props: _ctx.tableOption.props,
                                                    propsHttp: _ctx.tableOption.propsHttp,
                                                    render: column.render,
                                                    row: _ctx.form,
                                                    clearValidate: _ctx.clearValidate,
                                                    "table-data": _ctx.tableData,
                                                    readonly: column.readonly || _ctx.readonly
                                                  }, _ctx.$uploadFun(column), {
                                                    disabled: _ctx.getDisabled(column),
                                                    enter: _ctx.tableOption.enter,
                                                    size: _ctx.size,
                                                    modelValue: _ctx.form[column.prop],
                                                    "onUpdate:modelValue": $event => ((_ctx.form[column.prop]) = $event),
                                                    onEnter: _ctx.submit,
                                                    "column-slot": _ctx.columnSlot,
                                                    onChange: $event => (_ctx.propChange(item.column, column))
                                                  }), createSlots({ _: 2 /* DYNAMIC */ }, [
                                                    (_ctx.getSlotName(column, 'T', _ctx.$slots))
                                                      ? {
                                                          name: "default",
                                                          fn: withCtx((scope) => [
                                                            renderSlot(_ctx.$slots, _ctx.getSlotName(column, 'T'), mergeProps({ ref_for: true }, scope))
                                                          ]),
                                                          key: "0"
                                                        }
                                                      : undefined,
                                                    renderList(_ctx.columnSlot, (item) => {
                                                      return {
                                                        name: item,
                                                        fn: withCtx((scope) => [
                                                          renderSlot(_ctx.$slots, item, mergeProps({ ref_for: true }, scope))
                                                        ])
                                                      }
                                                    })
                                                  ]), 1040 /* FULL_PROPS, DYNAMIC_SLOTS */, ["column", "box-type", "dic", "props", "propsHttp", "render", "row", "clearValidate", "table-data", "readonly", "disabled", "enter", "size", "modelValue", "onUpdate:modelValue", "onEnter", "column-slot", "onChange"]))
                                            ])
                                          ]),
                                          _: 2 /* DYNAMIC */
                                        }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["disabled", "content", "placement"]))
                                      ]),
                                      _: 2 /* DYNAMIC */
                                    }, [
                                      (_ctx.getSlotName(column, 'L', _ctx.$slots))
                                        ? {
                                            name: "label",
                                            fn: withCtx(() => [
                                              renderSlot(_ctx.$slots, _ctx.getSlotName(column, 'L'), {
                                                column: column,
                                                value: _ctx.form[column.prop],
                                                readonly: column.readonly || _ctx.readonly,
                                                disabled: _ctx.getDisabled(column),
                                                size: column.size || _ctx.size,
                                                dic: _ctx.DIC[column.prop]
                                              })
                                            ]),
                                            key: "0"
                                          }
                                        : (column.labelTip)
                                          ? {
                                              name: "label",
                                              fn: withCtx(() => [
                                                createVNode(_component_el_tooltip, {
                                                  class: "item",
                                                  effect: "dark",
                                                  placement: column.labelTipPlacement || 'top-start'
                                                }, {
                                                  content: withCtx(() => [
                                                    createElementVNode("div", {
                                                      innerHTML: column.labelTip
                                                    }, null, 8 /* PROPS */, _hoisted_1)
                                                  ]),
                                                  default: withCtx(() => [
                                                    createVNode(_component_el_icon, null, {
                                                      default: withCtx(() => [
                                                        createVNode(_component_el_icon_info_filled)
                                                      ]),
                                                      _: 1 /* STABLE */
                                                    })
                                                  ]),
                                                  _: 2 /* DYNAMIC */
                                                }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["placement"]),
                                                createElementVNode("span", null, toDisplayString(column.label) + toDisplayString(_ctx.labelSuffix), 1 /* TEXT */)
                                              ]),
                                              key: "1"
                                            }
                                          : undefined,
                                      (_ctx.getSlotName(column, 'E'))
                                        ? {
                                            name: "error",
                                            fn: withCtx((scope) => [
                                              renderSlot(_ctx.$slots, _ctx.getSlotName(column, 'E'), mergeProps({ ref_for: true }, 
                        Object.assign(scope, {
                          column,
                          value: _ctx.form[column.prop],
                          readonly: column.readonly || _ctx.readonly,
                          disabled: _ctx.getDisabled(column),
                          size: column.size || _ctx.size,
                          dic: _ctx.DIC[column.prop],
                        })
                      ))
                                            ]),
                                            key: "2"
                                          }
                                        : undefined
                                    ]), 1032 /* PROPS, DYNAMIC_SLOTS */, ["prop", "label", "rules", "class", "label-position", "label-width"])
                                  ]),
                                  _: 2 /* DYNAMIC */
                                }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["span", "md", "sm", "xs", "offset", "push", "pull", "class"]))
                              : createCommentVNode("v-if", true),
                            (_ctx.shouldShowDivider(column))
                              ? (openBlock(), createElementBlock("div", {
                                  class: normalizeClass(_ctx.b('line')),
                                  key: `line${cindex}`,
                                  style: normalizeStyle({ width: (column.count / 24) * 100 + '%' })
                                }, null, 6 /* CLASS, STYLE */))
                              : createCommentVNode("v-if", true)
                          ], 64 /* STABLE_FRAGMENT */))
                        }), 256 /* UNKEYED_FRAGMENT */)),
                        (!_ctx.isMenu)
                          ? (openBlock(), createBlock(_component_form_menu, { key: 0 }, {
                              "menu-form-before": withCtx((scope) => [
                                renderSlot(_ctx.$slots, "menu-form-before", mergeProps({ ref_for: true }, scope))
                              ]),
                              "menu-form": withCtx((scope) => [
                                renderSlot(_ctx.$slots, "menu-form", mergeProps({ ref_for: true }, scope))
                              ]),
                              _: 3 /* FORWARDED */
                            }))
                          : createCommentVNode("v-if", true)
                      ], 2 /* CLASS */)), [
                        [vShow, _ctx.isGroupShow(item, index)]
                      ])
                    : createCommentVNode("v-if", true)
                ]),
                _: 2 /* DYNAMIC */
              }, [
                (_ctx.getSlotName(item, 'H', _ctx.$slots))
                  ? {
                      name: "header",
                      fn: withCtx(() => [
                        renderSlot(_ctx.$slots, _ctx.getSlotName(item, 'H'), { column: item })
                      ]),
                      key: "0"
                    }
                  : undefined
              ]), 1032 /* PROPS, DYNAMIC_SLOTS */, ["onChange", "tabs", "arrow", "collapse", "display", "icon", "index", "header", "active", "label"]))
            }), 128 /* KEYED_FRAGMENT */)),
            (_ctx.isMenu)
              ? (openBlock(), createBlock(_component_form_menu, { key: 0 }, {
                  "menu-form": withCtx((scope) => [
                    renderSlot(_ctx.$slots, "menu-form", normalizeProps(guardReactiveProps(scope)))
                  ]),
                  _: 3 /* FORWARDED */
                }))
              : createCommentVNode("v-if", true)
          ]),
          _: 3 /* FORWARDED */
        }, 8 /* PROPS */, ["gutter", "class"])
      ]),
      _: 3 /* FORWARDED */
    }, 8 /* PROPS */, ["status-icon", "model", "scroll-to-error", "hide-required-asterisk", "require-asterisk-position", "scroll-into-view-options", "label-suffix", "size", "label-position", "label-width"])
  ], 6 /* CLASS, STYLE */))
}

export { render };
