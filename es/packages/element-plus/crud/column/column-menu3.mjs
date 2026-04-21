/*! Avue.js v3.8.6 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { resolveComponent, resolveDirective, openBlock, createElementBlock, Fragment, createCommentVNode, createBlock, resolveDynamicComponent, withCtx, createElementVNode, normalizeClass, renderSlot, normalizeProps, guardReactiveProps, createVNode, createTextVNode, toDisplayString, withDirectives, withModifiers, mergeProps } from 'vue';

const _hoisted_1 = { key: 1 };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_icon_arrow_down = resolveComponent("el-icon-arrow-down");
  const _component_el_icon = resolveComponent("el-icon");
  const _component_el_button = resolveComponent("el-button");
  const _component_el_dropdown_item = resolveComponent("el-dropdown-item");
  const _component_el_dropdown_menu = resolveComponent("el-dropdown-menu");
  const _component_el_dropdown = resolveComponent("el-dropdown");
  const _directive_permission = resolveDirective("permission");

  return (openBlock(), createElementBlock(Fragment, null, [
    createCommentVNode(" 操作栏 "),
    (
      _ctx.validData(_ctx.crud.tableOption.menu, _ctx.config.menu) &&
      _ctx.crud.getPermission('menu')
    )
      ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.crud.tableColumnName), {
          key: 0,
          prop: "menu",
          "class-name": _ctx.crud.tableOption.menuClassName,
          "label-class-name": _ctx.crud.tableOption.menuLabelClassName,
          fixed: _ctx.validData(_ctx.crud.tableOption.menuFixed, _ctx.config.menuFixed),
          label: _ctx.crud.tableOption.menuTitle || _ctx.t('crud.menu'),
          align: _ctx.crud.tableOption.menuAlign || _ctx.config.menuAlign,
          "header-align": _ctx.crud.tableOption.menuHeaderAlign || _ctx.config.menuHeaderAlign,
          width: 
      _ctx.crud.isMobile
        ? _ctx.crud.tableOption.menuXsWidth || _ctx.config.menuXsWidth
        : _ctx.crud.tableOption.menuWidth || _ctx.config.menuWidth
    
        }, {
          header: withCtx((scope) => [
            (_ctx.crud.getSlotName({ prop: 'menu' }, 'H', _ctx.crud.$slots))
              ? renderSlot(_ctx.$slots, "menu-header", mergeProps({ key: 0 }, scope, {
                  size: _ctx.crud.size
                }))
              : (openBlock(), createElementBlock("span", _hoisted_1, toDisplayString(_ctx.crud.tableOption.menuTitle || _ctx.t("crud.menu")), 1 /* TEXT */))
          ]),
          default: withCtx(({ row, column, $index }) => [
            createElementVNode("div", {
              class: normalizeClass(_ctx.b('menu'))
            }, [
              renderSlot(_ctx.$slots, "menu-before", normalizeProps(guardReactiveProps(_ctx.menuParams({ row, column, $index })))),
              (_ctx.isMenu)
                ? (openBlock(), createBlock(_component_el_dropdown, {
                    key: 0,
                    size: _ctx.crud.size
                  }, {
                    dropdown: withCtx(() => [
                      createVNode(_component_el_dropdown_menu, null, {
                        default: withCtx(() => [
                          renderSlot(_ctx.$slots, "menu-btn-before", normalizeProps(guardReactiveProps(_ctx.menuParams({ row, column, $index })))),
                          (_ctx.validData(_ctx.crud.tableOption.viewBtn, _ctx.config.viewBtn) && _ctx.crud.getPermission('viewBtn', row, $index))
                            ? (openBlock(), createBlock(_component_el_dropdown_item, {
                                key: 0,
                                icon: _ctx.crud.getBtnIcon('viewBtn'),
                                class: normalizeClass(_ctx.b('viewBtn')),
                                onClick: $event => (_ctx.crud.rowView(row, $index))
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(_ctx.crud.menuIcon("viewBtn")), 1 /* TEXT */)
                                ]),
                                _: 2 /* DYNAMIC */
                              }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["icon", "class", "onClick"]))
                            : createCommentVNode("v-if", true),
                          (_ctx.validData(_ctx.crud.tableOption.copyBtn, _ctx.config.copyBtn) && _ctx.crud.getPermission('copyBtn', row, $index))
                            ? (openBlock(), createBlock(_component_el_dropdown_item, {
                                key: 1,
                                icon: _ctx.crud.getBtnIcon('copyBtn'),
                                class: normalizeClass(_ctx.b('copyBtn')),
                                onClick: $event => (_ctx.crud.rowCopy(row))
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(_ctx.crud.menuIcon("copyBtn")), 1 /* TEXT */)
                                ]),
                                _: 2 /* DYNAMIC */
                              }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["icon", "class", "onClick"]))
                            : createCommentVNode("v-if", true),
                          (_ctx.validData(_ctx.crud.tableOption.editBtn, _ctx.config.editBtn) && _ctx.crud.getPermission('editBtn', row, $index))
                            ? (openBlock(), createBlock(_component_el_dropdown_item, {
                                key: 2,
                                icon: _ctx.crud.getBtnIcon('editBtn'),
                                class: normalizeClass(_ctx.b('editBtn')),
                                onClick: $event => (_ctx.crud.rowEdit(row, $index))
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(_ctx.crud.menuIcon("editBtn")), 1 /* TEXT */)
                                ]),
                                _: 2 /* DYNAMIC */
                              }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["icon", "class", "onClick"]))
                            : createCommentVNode("v-if", true),
                          (_ctx.validData(_ctx.crud.tableOption.delBtn, _ctx.config.delBtn) && _ctx.crud.getPermission('delBtn', row, $index))
                            ? (openBlock(), createBlock(_component_el_dropdown_item, {
                                key: 3,
                                icon: _ctx.crud.getBtnIcon('delBtn'),
                                class: normalizeClass(_ctx.b('delBtn')),
                                onClick: $event => (_ctx.crud.rowDel(row, $index))
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(_ctx.crud.menuIcon("delBtn")), 1 /* TEXT */)
                                ]),
                                _: 2 /* DYNAMIC */
                              }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["icon", "class", "onClick"]))
                            : createCommentVNode("v-if", true),
                          renderSlot(_ctx.$slots, "menu-btn", normalizeProps(guardReactiveProps(_ctx.menuParams({ row, column, $index }))))
                        ]),
                        _: 2 /* DYNAMIC */
                      }, 1024 /* DYNAMIC_SLOTS */)
                    ]),
                    default: withCtx(() => [
                      createVNode(_component_el_button, {
                        text: "",
                        type: "primary",
                        size: _ctx.crud.size
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(_ctx.crud.tableOption.menuBtnTitle || _ctx.t("crud.menuBtn")) + " ", 1 /* TEXT */),
                          createVNode(_component_el_icon, { class: "el-icon--right\"" }, {
                            default: withCtx(() => [
                              createVNode(_component_el_icon_arrow_down)
                            ]),
                            _: 1 /* STABLE */
                          })
                        ]),
                        _: 1 /* STABLE */
                      }, 8 /* PROPS */, ["size"])
                    ]),
                    _: 2 /* DYNAMIC */
                  }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["size"]))
                : (['button', 'text', 'icon'].includes(_ctx.menuType))
                  ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                      (_ctx.validData(_ctx.crud.tableOption.cellBtn, _ctx.config.cellBtn))
                        ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                            (
                _ctx.validData(_ctx.crud.tableOption.editBtn, _ctx.config.editBtn) &&
                !row.$cellEdit
              )
                              ? withDirectives((openBlock(), createBlock(_component_el_button, {
                                  key: 0,
                                  type: _ctx.menuText('primary'),
                                  class: normalizeClass(_ctx.b('editBtn')),
                                  text: _ctx.isTextMenu,
                                  icon: _ctx.crud.getBtnIcon('editBtn'),
                                  size: _ctx.crud.size,
                                  disabled: _ctx.crud.btnDisabledList[$index],
                                  onClick: withModifiers($event => (_ctx.crud.rowCell(row, $index)), ["stop"])
                                }, {
                                  default: withCtx(() => [
                                    (!_ctx.isIconMenu)
                                      ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                                          createTextVNode(toDisplayString(_ctx.crud.menuIcon("editBtn")), 1 /* TEXT */)
                                        ], 64 /* STABLE_FRAGMENT */))
                                      : createCommentVNode("v-if", true)
                                  ]),
                                  _: 2 /* DYNAMIC */
                                }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["type", "class", "text", "icon", "size", "disabled", "onClick"])), [
                                  [_directive_permission, _ctx.crud.getPermission('editBtn', row, $index)]
                                ])
                              : (
                _ctx.validData(_ctx.crud.tableOption.saveBtn, _ctx.config.saveBtn) &&
                row.$cellEdit
              )
                                ? withDirectives((openBlock(), createBlock(_component_el_button, {
                                    key: 1,
                                    type: _ctx.menuText('primary'),
                                    class: normalizeClass(_ctx.b('saveBtn')),
                                    text: _ctx.isTextMenu,
                                    icon: _ctx.crud.getBtnIcon('saveBtn'),
                                    size: _ctx.crud.size,
                                    disabled: _ctx.crud.btnDisabledList[$index],
                                    onClick: withModifiers($event => (_ctx.crud.rowCell(row, $index)), ["stop"])
                                  }, {
                                    default: withCtx(() => [
                                      (!_ctx.isIconMenu)
                                        ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                                            createTextVNode(toDisplayString(_ctx.crud.menuIcon("saveBtn")), 1 /* TEXT */)
                                          ], 64 /* STABLE_FRAGMENT */))
                                        : createCommentVNode("v-if", true)
                                    ]),
                                    _: 2 /* DYNAMIC */
                                  }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["type", "class", "text", "icon", "size", "disabled", "onClick"])), [
                                    [_directive_permission, _ctx.crud.getPermission('saveBtn', row, $index)]
                                  ])
                                : createCommentVNode("v-if", true),
                            (
                row.$cellEdit &&
                _ctx.validData(_ctx.crud.tableOption.cancelBtn, _ctx.config.cancelBtn)
              )
                              ? withDirectives((openBlock(), createBlock(_component_el_button, {
                                  key: 2,
                                  type: _ctx.menuText('primary'),
                                  class: normalizeClass(_ctx.b('cancelBtn')),
                                  text: _ctx.isTextMenu,
                                  icon: _ctx.crud.getBtnIcon('cancelBtn'),
                                  size: _ctx.crud.size,
                                  disabled: _ctx.crud.btnDisabledList[$index],
                                  onClick: withModifiers($event => (_ctx.crud.rowCancel(row, $index)), ["stop"])
                                }, {
                                  default: withCtx(() => [
                                    (!_ctx.isIconMenu)
                                      ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                                          createTextVNode(toDisplayString(_ctx.crud.menuIcon("cancelBtn")), 1 /* TEXT */)
                                        ], 64 /* STABLE_FRAGMENT */))
                                      : createCommentVNode("v-if", true)
                                  ]),
                                  _: 2 /* DYNAMIC */
                                }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["type", "class", "text", "icon", "size", "disabled", "onClick"])), [
                                  [_directive_permission, _ctx.crud.getPermission('cancelBtn', row, $index)]
                                ])
                              : createCommentVNode("v-if", true)
                          ], 64 /* STABLE_FRAGMENT */))
                        : createCommentVNode("v-if", true),
                      (_ctx.validData(_ctx.crud.tableOption.viewBtn, _ctx.config.viewBtn))
                        ? withDirectives((openBlock(), createBlock(_component_el_button, {
                            key: 1,
                            type: _ctx.menuText('primary'),
                            class: normalizeClass(_ctx.b('viewBtn')),
                            text: _ctx.isTextMenu,
                            icon: _ctx.crud.getBtnIcon('viewBtn'),
                            size: _ctx.crud.size,
                            disabled: _ctx.crud.btnDisabled,
                            onClick: withModifiers($event => (_ctx.crud.rowView(row, $index)), ["stop"])
                          }, {
                            default: withCtx(() => [
                              (!_ctx.isIconMenu)
                                ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                                    createTextVNode(toDisplayString(_ctx.crud.menuIcon("viewBtn")), 1 /* TEXT */)
                                  ], 64 /* STABLE_FRAGMENT */))
                                : createCommentVNode("v-if", true)
                            ]),
                            _: 2 /* DYNAMIC */
                          }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["type", "class", "text", "icon", "size", "disabled", "onClick"])), [
                            [_directive_permission, _ctx.crud.getPermission('viewBtn', row, $index)]
                          ])
                        : createCommentVNode("v-if", true),
                      (_ctx.validData(_ctx.crud.tableOption.copyBtn, _ctx.config.copyBtn))
                        ? withDirectives((openBlock(), createBlock(_component_el_button, {
                            key: 2,
                            type: _ctx.menuText('primary'),
                            class: normalizeClass(_ctx.b('copyBtn')),
                            text: _ctx.isTextMenu,
                            icon: _ctx.crud.getBtnIcon('copyBtn'),
                            size: _ctx.crud.size,
                            disabled: _ctx.crud.btnDisabled,
                            onClick: withModifiers($event => (_ctx.crud.rowCopy(row)), ["stop"])
                          }, {
                            default: withCtx(() => [
                              (!_ctx.isIconMenu)
                                ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                                    createTextVNode(toDisplayString(_ctx.crud.menuIcon("copyBtn")), 1 /* TEXT */)
                                  ], 64 /* STABLE_FRAGMENT */))
                                : createCommentVNode("v-if", true)
                            ]),
                            _: 2 /* DYNAMIC */
                          }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["type", "class", "text", "icon", "size", "disabled", "onClick"])), [
                            [_directive_permission, _ctx.crud.getPermission('copyBtn', row, $index)]
                          ])
                        : createCommentVNode("v-if", true),
                      (
              _ctx.validData(_ctx.crud.tableOption.editBtn, _ctx.config.editBtn) &&
              !_ctx.crud.tableOption.cellBtn
            )
                        ? withDirectives((openBlock(), createBlock(_component_el_button, {
                            key: 3,
                            type: _ctx.menuText('primary'),
                            class: normalizeClass(_ctx.b('editBtn')),
                            text: _ctx.isTextMenu,
                            icon: _ctx.crud.getBtnIcon('editBtn'),
                            size: _ctx.crud.size,
                            disabled: _ctx.crud.btnDisabled,
                            onClick: withModifiers($event => (_ctx.crud.rowEdit(row, $index)), ["stop"])
                          }, {
                            default: withCtx(() => [
                              (!_ctx.isIconMenu)
                                ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                                    createTextVNode(toDisplayString(_ctx.crud.menuIcon("editBtn")), 1 /* TEXT */)
                                  ], 64 /* STABLE_FRAGMENT */))
                                : createCommentVNode("v-if", true)
                            ]),
                            _: 2 /* DYNAMIC */
                          }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["type", "class", "text", "icon", "size", "disabled", "onClick"])), [
                            [_directive_permission, _ctx.crud.getPermission('editBtn', row, $index)]
                          ])
                        : createCommentVNode("v-if", true),
                      (
              _ctx.validData(_ctx.crud.tableOption.delBtn, _ctx.config.delBtn) &&
              !row.$cellEdit
            )
                        ? withDirectives((openBlock(), createBlock(_component_el_button, {
                            key: 4,
                            type: _ctx.menuText('primary'),
                            class: normalizeClass(_ctx.b('delBtn')),
                            text: _ctx.isTextMenu,
                            icon: _ctx.crud.getBtnIcon('delBtn'),
                            size: _ctx.crud.size,
                            disabled: _ctx.crud.btnDisabled,
                            onClick: withModifiers($event => (_ctx.crud.rowDel(row, $index)), ["stop"])
                          }, {
                            default: withCtx(() => [
                              (!_ctx.isIconMenu)
                                ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                                    createTextVNode(toDisplayString(_ctx.crud.menuIcon("delBtn")), 1 /* TEXT */)
                                  ], 64 /* STABLE_FRAGMENT */))
                                : createCommentVNode("v-if", true)
                            ]),
                            _: 2 /* DYNAMIC */
                          }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["type", "class", "text", "icon", "size", "disabled", "onClick"])), [
                            [_directive_permission, _ctx.crud.getPermission('delBtn', row, $index)]
                          ])
                        : createCommentVNode("v-if", true)
                    ], 64 /* STABLE_FRAGMENT */))
                  : createCommentVNode("v-if", true),
              renderSlot(_ctx.$slots, "menu", normalizeProps(guardReactiveProps(_ctx.menuParams({ row, column, $index }))))
            ], 2 /* CLASS */)
          ]),
          _: 3 /* FORWARDED */
        }, 8 /* PROPS */, ["class-name", "label-class-name", "fixed", "label", "align", "header-align", "width"]))
      : createCommentVNode("v-if", true)
  ], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */))
}

export { render };
