/*! Avue.js v3.9.3 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

var vue = require('vue');

const _hoisted_1 = { key: 1 };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_icon_arrow_down = vue.resolveComponent("el-icon-arrow-down");
  const _component_el_icon = vue.resolveComponent("el-icon");
  const _component_el_button = vue.resolveComponent("el-button");
  const _component_el_dropdown_item = vue.resolveComponent("el-dropdown-item");
  const _component_el_dropdown_menu = vue.resolveComponent("el-dropdown-menu");
  const _component_el_dropdown = vue.resolveComponent("el-dropdown");
  const _directive_permission = vue.resolveDirective("permission");

  return (vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
    vue.createCommentVNode(" 操作栏 "),
    (
      _ctx.validData(_ctx.crud.tableOption.menu, _ctx.config.menu) &&
      _ctx.crud.getPermission('menu')
    )
      ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.crud.tableColumnName), {
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
          header: vue.withCtx((scope) => [
            (_ctx.crud.getSlotName({ prop: 'menu' }, 'H', _ctx.crud.$slots))
              ? vue.renderSlot(_ctx.$slots, "menu-header", vue.mergeProps({ key: 0 }, scope, {
                  size: _ctx.crud.size
                }))
              : (vue.openBlock(), vue.createElementBlock("span", _hoisted_1, vue.toDisplayString(_ctx.crud.tableOption.menuTitle || _ctx.t("crud.menu")), 1 /* TEXT */))
          ]),
          default: vue.withCtx(({ row, column, $index }) => [
            vue.createElementVNode("div", {
              class: vue.normalizeClass(_ctx.b('menu'))
            }, [
              vue.renderSlot(_ctx.$slots, "menu-before", vue.normalizeProps(vue.guardReactiveProps(_ctx.menuParams({ row, column, $index })))),
              (_ctx.isMenu)
                ? (vue.openBlock(), vue.createBlock(_component_el_dropdown, {
                    key: 0,
                    size: _ctx.crud.size
                  }, {
                    dropdown: vue.withCtx(() => [
                      vue.createVNode(_component_el_dropdown_menu, null, {
                        default: vue.withCtx(() => [
                          vue.renderSlot(_ctx.$slots, "menu-btn-before", vue.normalizeProps(vue.guardReactiveProps(_ctx.menuParams({ row, column, $index })))),
                          (_ctx.validData(_ctx.crud.tableOption.viewBtn, _ctx.config.viewBtn) && _ctx.crud.getPermission('viewBtn', row, $index))
                            ? (vue.openBlock(), vue.createBlock(_component_el_dropdown_item, {
                                key: 0,
                                icon: _ctx.crud.getBtnIcon('viewBtn'),
                                class: vue.normalizeClass(_ctx.b('viewBtn')),
                                onClick: $event => (_ctx.crud.rowView(row, $index))
                              }, {
                                default: vue.withCtx(() => [
                                  vue.createTextVNode(vue.toDisplayString(_ctx.crud.menuIcon("viewBtn")), 1 /* TEXT */)
                                ]),
                                _: 2 /* DYNAMIC */
                              }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["icon", "class", "onClick"]))
                            : vue.createCommentVNode("v-if", true),
                          (_ctx.validData(_ctx.crud.tableOption.copyBtn, _ctx.config.copyBtn) && _ctx.crud.getPermission('copyBtn', row, $index))
                            ? (vue.openBlock(), vue.createBlock(_component_el_dropdown_item, {
                                key: 1,
                                icon: _ctx.crud.getBtnIcon('copyBtn'),
                                class: vue.normalizeClass(_ctx.b('copyBtn')),
                                onClick: $event => (_ctx.crud.rowCopy(row))
                              }, {
                                default: vue.withCtx(() => [
                                  vue.createTextVNode(vue.toDisplayString(_ctx.crud.menuIcon("copyBtn")), 1 /* TEXT */)
                                ]),
                                _: 2 /* DYNAMIC */
                              }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["icon", "class", "onClick"]))
                            : vue.createCommentVNode("v-if", true),
                          (_ctx.validData(_ctx.crud.tableOption.editBtn, _ctx.config.editBtn) && _ctx.crud.getPermission('editBtn', row, $index))
                            ? (vue.openBlock(), vue.createBlock(_component_el_dropdown_item, {
                                key: 2,
                                icon: _ctx.crud.getBtnIcon('editBtn'),
                                class: vue.normalizeClass(_ctx.b('editBtn')),
                                onClick: $event => (_ctx.crud.rowEdit(row, $index))
                              }, {
                                default: vue.withCtx(() => [
                                  vue.createTextVNode(vue.toDisplayString(_ctx.crud.menuIcon("editBtn")), 1 /* TEXT */)
                                ]),
                                _: 2 /* DYNAMIC */
                              }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["icon", "class", "onClick"]))
                            : vue.createCommentVNode("v-if", true),
                          (_ctx.validData(_ctx.crud.tableOption.delBtn, _ctx.config.delBtn) && _ctx.crud.getPermission('delBtn', row, $index))
                            ? (vue.openBlock(), vue.createBlock(_component_el_dropdown_item, {
                                key: 3,
                                icon: _ctx.crud.getBtnIcon('delBtn'),
                                class: vue.normalizeClass(_ctx.b('delBtn')),
                                onClick: $event => (_ctx.crud.rowDel(row, $index))
                              }, {
                                default: vue.withCtx(() => [
                                  vue.createTextVNode(vue.toDisplayString(_ctx.crud.menuIcon("delBtn")), 1 /* TEXT */)
                                ]),
                                _: 2 /* DYNAMIC */
                              }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["icon", "class", "onClick"]))
                            : vue.createCommentVNode("v-if", true),
                          vue.renderSlot(_ctx.$slots, "menu-btn", vue.normalizeProps(vue.guardReactiveProps(_ctx.menuParams({ row, column, $index }))))
                        ]),
                        _: 2 /* DYNAMIC */
                      }, 1024 /* DYNAMIC_SLOTS */)
                    ]),
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_el_button, {
                        text: "",
                        type: "primary",
                        size: _ctx.crud.size
                      }, {
                        default: vue.withCtx(() => [
                          vue.createTextVNode(vue.toDisplayString(_ctx.crud.tableOption.menuBtnTitle || _ctx.t("crud.menuBtn")) + " ", 1 /* TEXT */),
                          vue.createVNode(_component_el_icon, { class: "el-icon--right\"" }, {
                            default: vue.withCtx(() => [
                              vue.createVNode(_component_el_icon_arrow_down)
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
                  ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
                      (_ctx.validData(_ctx.crud.tableOption.cellBtn, _ctx.config.cellBtn))
                        ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
                            (
                _ctx.validData(_ctx.crud.tableOption.editBtn, _ctx.config.editBtn) &&
                !row.$cellEdit
              )
                              ? vue.withDirectives((vue.openBlock(), vue.createBlock(_component_el_button, {
                                  key: 0,
                                  type: _ctx.menuText('primary'),
                                  class: vue.normalizeClass(_ctx.b('editBtn')),
                                  text: _ctx.isTextMenu,
                                  icon: _ctx.crud.getBtnIcon('editBtn'),
                                  size: _ctx.crud.size,
                                  disabled: _ctx.crud.btnDisabledList[$index],
                                  onClick: vue.withModifiers($event => (_ctx.crud.rowCell(row, $index)), ["stop"])
                                }, {
                                  default: vue.withCtx(() => [
                                    (!_ctx.isIconMenu)
                                      ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
                                          vue.createTextVNode(vue.toDisplayString(_ctx.crud.menuIcon("editBtn")), 1 /* TEXT */)
                                        ], 64 /* STABLE_FRAGMENT */))
                                      : vue.createCommentVNode("v-if", true)
                                  ]),
                                  _: 2 /* DYNAMIC */
                                }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["type", "class", "text", "icon", "size", "disabled", "onClick"])), [
                                  [_directive_permission, _ctx.crud.getPermission('editBtn', row, $index)]
                                ])
                              : (
                _ctx.validData(_ctx.crud.tableOption.saveBtn, _ctx.config.saveBtn) &&
                row.$cellEdit
              )
                                ? vue.withDirectives((vue.openBlock(), vue.createBlock(_component_el_button, {
                                    key: 1,
                                    type: _ctx.menuText('primary'),
                                    class: vue.normalizeClass(_ctx.b('saveBtn')),
                                    text: _ctx.isTextMenu,
                                    icon: _ctx.crud.getBtnIcon('saveBtn'),
                                    size: _ctx.crud.size,
                                    disabled: _ctx.crud.btnDisabledList[$index],
                                    onClick: vue.withModifiers($event => (_ctx.crud.rowCell(row, $index)), ["stop"])
                                  }, {
                                    default: vue.withCtx(() => [
                                      (!_ctx.isIconMenu)
                                        ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
                                            vue.createTextVNode(vue.toDisplayString(_ctx.crud.menuIcon("saveBtn")), 1 /* TEXT */)
                                          ], 64 /* STABLE_FRAGMENT */))
                                        : vue.createCommentVNode("v-if", true)
                                    ]),
                                    _: 2 /* DYNAMIC */
                                  }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["type", "class", "text", "icon", "size", "disabled", "onClick"])), [
                                    [_directive_permission, _ctx.crud.getPermission('saveBtn', row, $index)]
                                  ])
                                : vue.createCommentVNode("v-if", true),
                            (
                row.$cellEdit &&
                _ctx.validData(_ctx.crud.tableOption.cancelBtn, _ctx.config.cancelBtn)
              )
                              ? vue.withDirectives((vue.openBlock(), vue.createBlock(_component_el_button, {
                                  key: 2,
                                  type: _ctx.menuText('primary'),
                                  class: vue.normalizeClass(_ctx.b('cancelBtn')),
                                  text: _ctx.isTextMenu,
                                  icon: _ctx.crud.getBtnIcon('cancelBtn'),
                                  size: _ctx.crud.size,
                                  disabled: _ctx.crud.btnDisabledList[$index],
                                  onClick: vue.withModifiers($event => (_ctx.crud.rowCancel(row, $index)), ["stop"])
                                }, {
                                  default: vue.withCtx(() => [
                                    (!_ctx.isIconMenu)
                                      ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
                                          vue.createTextVNode(vue.toDisplayString(_ctx.crud.menuIcon("cancelBtn")), 1 /* TEXT */)
                                        ], 64 /* STABLE_FRAGMENT */))
                                      : vue.createCommentVNode("v-if", true)
                                  ]),
                                  _: 2 /* DYNAMIC */
                                }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["type", "class", "text", "icon", "size", "disabled", "onClick"])), [
                                  [_directive_permission, _ctx.crud.getPermission('cancelBtn', row, $index)]
                                ])
                              : vue.createCommentVNode("v-if", true)
                          ], 64 /* STABLE_FRAGMENT */))
                        : vue.createCommentVNode("v-if", true),
                      (_ctx.validData(_ctx.crud.tableOption.viewBtn, _ctx.config.viewBtn))
                        ? vue.withDirectives((vue.openBlock(), vue.createBlock(_component_el_button, {
                            key: 1,
                            type: _ctx.menuText('primary'),
                            class: vue.normalizeClass(_ctx.b('viewBtn')),
                            text: _ctx.isTextMenu,
                            icon: _ctx.crud.getBtnIcon('viewBtn'),
                            size: _ctx.crud.size,
                            disabled: _ctx.crud.btnDisabled,
                            onClick: vue.withModifiers($event => (_ctx.crud.rowView(row, $index)), ["stop"])
                          }, {
                            default: vue.withCtx(() => [
                              (!_ctx.isIconMenu)
                                ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
                                    vue.createTextVNode(vue.toDisplayString(_ctx.crud.menuIcon("viewBtn")), 1 /* TEXT */)
                                  ], 64 /* STABLE_FRAGMENT */))
                                : vue.createCommentVNode("v-if", true)
                            ]),
                            _: 2 /* DYNAMIC */
                          }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["type", "class", "text", "icon", "size", "disabled", "onClick"])), [
                            [_directive_permission, _ctx.crud.getPermission('viewBtn', row, $index)]
                          ])
                        : vue.createCommentVNode("v-if", true),
                      (_ctx.validData(_ctx.crud.tableOption.copyBtn, _ctx.config.copyBtn))
                        ? vue.withDirectives((vue.openBlock(), vue.createBlock(_component_el_button, {
                            key: 2,
                            type: _ctx.menuText('primary'),
                            class: vue.normalizeClass(_ctx.b('copyBtn')),
                            text: _ctx.isTextMenu,
                            icon: _ctx.crud.getBtnIcon('copyBtn'),
                            size: _ctx.crud.size,
                            disabled: _ctx.crud.btnDisabled,
                            onClick: vue.withModifiers($event => (_ctx.crud.rowCopy(row)), ["stop"])
                          }, {
                            default: vue.withCtx(() => [
                              (!_ctx.isIconMenu)
                                ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
                                    vue.createTextVNode(vue.toDisplayString(_ctx.crud.menuIcon("copyBtn")), 1 /* TEXT */)
                                  ], 64 /* STABLE_FRAGMENT */))
                                : vue.createCommentVNode("v-if", true)
                            ]),
                            _: 2 /* DYNAMIC */
                          }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["type", "class", "text", "icon", "size", "disabled", "onClick"])), [
                            [_directive_permission, _ctx.crud.getPermission('copyBtn', row, $index)]
                          ])
                        : vue.createCommentVNode("v-if", true),
                      (
              _ctx.validData(_ctx.crud.tableOption.editBtn, _ctx.config.editBtn) &&
              !_ctx.crud.tableOption.cellBtn
            )
                        ? vue.withDirectives((vue.openBlock(), vue.createBlock(_component_el_button, {
                            key: 3,
                            type: _ctx.menuText('primary'),
                            class: vue.normalizeClass(_ctx.b('editBtn')),
                            text: _ctx.isTextMenu,
                            icon: _ctx.crud.getBtnIcon('editBtn'),
                            size: _ctx.crud.size,
                            disabled: _ctx.crud.btnDisabled,
                            onClick: vue.withModifiers($event => (_ctx.crud.rowEdit(row, $index)), ["stop"])
                          }, {
                            default: vue.withCtx(() => [
                              (!_ctx.isIconMenu)
                                ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
                                    vue.createTextVNode(vue.toDisplayString(_ctx.crud.menuIcon("editBtn")), 1 /* TEXT */)
                                  ], 64 /* STABLE_FRAGMENT */))
                                : vue.createCommentVNode("v-if", true)
                            ]),
                            _: 2 /* DYNAMIC */
                          }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["type", "class", "text", "icon", "size", "disabled", "onClick"])), [
                            [_directive_permission, _ctx.crud.getPermission('editBtn', row, $index)]
                          ])
                        : vue.createCommentVNode("v-if", true),
                      (
              _ctx.validData(_ctx.crud.tableOption.delBtn, _ctx.config.delBtn) &&
              !row.$cellEdit
            )
                        ? vue.withDirectives((vue.openBlock(), vue.createBlock(_component_el_button, {
                            key: 4,
                            type: _ctx.menuText('primary'),
                            class: vue.normalizeClass(_ctx.b('delBtn')),
                            text: _ctx.isTextMenu,
                            icon: _ctx.crud.getBtnIcon('delBtn'),
                            size: _ctx.crud.size,
                            disabled: _ctx.crud.btnDisabled,
                            onClick: vue.withModifiers($event => (_ctx.crud.rowDel(row, $index)), ["stop"])
                          }, {
                            default: vue.withCtx(() => [
                              (!_ctx.isIconMenu)
                                ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
                                    vue.createTextVNode(vue.toDisplayString(_ctx.crud.menuIcon("delBtn")), 1 /* TEXT */)
                                  ], 64 /* STABLE_FRAGMENT */))
                                : vue.createCommentVNode("v-if", true)
                            ]),
                            _: 2 /* DYNAMIC */
                          }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["type", "class", "text", "icon", "size", "disabled", "onClick"])), [
                            [_directive_permission, _ctx.crud.getPermission('delBtn', row, $index)]
                          ])
                        : vue.createCommentVNode("v-if", true)
                    ], 64 /* STABLE_FRAGMENT */))
                  : vue.createCommentVNode("v-if", true),
              vue.renderSlot(_ctx.$slots, "menu", vue.normalizeProps(vue.guardReactiveProps(_ctx.menuParams({ row, column, $index }))))
            ], 2 /* CLASS */)
          ]),
          _: 3 /* FORWARDED */
        }, 8 /* PROPS */, ["class-name", "label-class-name", "fixed", "label", "align", "header-align", "width"]))
      : vue.createCommentVNode("v-if", true)
  ], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */))
}

exports.render = render;
