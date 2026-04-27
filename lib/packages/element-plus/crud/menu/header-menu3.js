/*! Avue.js v3.9.0 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

var vue = require('vue');

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_button = vue.resolveComponent("el-button");
  const _component_avue_date = vue.resolveComponent("avue-date");
  const _directive_permission = vue.resolveDirective("permission");

  return (vue.openBlock(), vue.createElementBlock("div", {
    class: vue.normalizeClass(_ctx.b('header'))
  }, [
    (_ctx.validData(_ctx.crud.tableOption.menuLeft,true))
      ? (vue.openBlock(), vue.createElementBlock("div", {
          key: 0,
          class: vue.normalizeClass(_ctx.b('left'))
        }, [
          (_ctx.validData(_ctx.crud.tableOption.addBtn,_ctx.config.addBtn))
            ? vue.withDirectives((vue.openBlock(), vue.createBlock(_component_el_button, {
                key: 0,
                type: "primary",
                class: vue.normalizeClass(_ctx.b('addBtn')),
                onClick: _ctx.crud.rowAdd,
                icon: _ctx.crud.getBtnIcon('addBtn'),
                size: _ctx.crud.size
              }, {
                default: vue.withCtx(() => [
                  (!_ctx.crud.isIconMenu)
                    ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
                        vue.createTextVNode(vue.toDisplayString(_ctx.crud.menuIcon('addBtn')), 1 /* TEXT */)
                      ], 64 /* STABLE_FRAGMENT */))
                    : vue.createCommentVNode("v-if", true)
                ]),
                _: 1 /* STABLE */
              }, 8 /* PROPS */, ["class", "onClick", "icon", "size"])), [
                [_directive_permission, _ctx.crud.getPermission('addBtn')]
              ])
            : vue.createCommentVNode("v-if", true),
          (_ctx.validData(_ctx.crud.tableOption.addRowBtn,_ctx.config.addRowBtn))
            ? vue.withDirectives((vue.openBlock(), vue.createBlock(_component_el_button, {
                key: 1,
                type: "primary",
                class: vue.normalizeClass(_ctx.b('addBtn')),
                onClick: _ctx.crud.rowCellAdd,
                icon: _ctx.crud.getBtnIcon('addBtn'),
                size: _ctx.crud.size
              }, {
                default: vue.withCtx(() => [
                  (!_ctx.crud.isIconMenu)
                    ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
                        vue.createTextVNode(vue.toDisplayString(_ctx.crud.menuIcon('addBtn')), 1 /* TEXT */)
                      ], 64 /* STABLE_FRAGMENT */))
                    : vue.createCommentVNode("v-if", true)
                ]),
                _: 1 /* STABLE */
              }, 8 /* PROPS */, ["class", "onClick", "icon", "size"])), [
                [_directive_permission, _ctx.crud.getPermission('addRowBtn')]
              ])
            : vue.createCommentVNode("v-if", true),
          vue.renderSlot(_ctx.$slots, "menu-left", {
            size: _ctx.crud.size
          })
        ], 2 /* CLASS */))
      : vue.createCommentVNode("v-if", true),
    (_ctx.validData(_ctx.crud.tableOption.menuRight,true))
      ? (vue.openBlock(), vue.createElementBlock("div", {
          key: 1,
          class: vue.normalizeClass(_ctx.b('right'))
        }, [
          (_ctx.validData(_ctx.crud.tableOption.dateBtn,_ctx.config.dateBtn))
            ? (vue.openBlock(), vue.createBlock(_component_avue_date, {
                key: 0,
                type: "datetimerange",
                onChange: _ctx.dateChange,
                "value-format": "YYYY-MM-DD HH:mm:ss",
                format: "YYYY-MM-DD HH:mm:ss",
                shortcuts: _ctx.shortcuts,
                style: {"display":"inline-block","margin-right":"20px"},
                size: _ctx.crud.size
              }, null, 8 /* PROPS */, ["onChange", "shortcuts", "size"]))
            : vue.createCommentVNode("v-if", true),
          vue.renderSlot(_ctx.$slots, "menu-right", {
            size: _ctx.crud.size
          }),
          (_ctx.validData(_ctx.crud.tableOption.excelBtn,_ctx.config.excelBtn))
            ? vue.withDirectives((vue.openBlock(), vue.createBlock(_component_el_button, {
                key: 1,
                icon: _ctx.crud.getBtnIcon('excelBtn'),
                class: vue.normalizeClass(_ctx.b('excelBtn')),
                circle: "",
                size: _ctx.crud.size,
                onClick: _ctx.rowExcel
              }, null, 8 /* PROPS */, ["icon", "class", "size", "onClick"])), [
                [_directive_permission, _ctx.crud.getPermission('excelBtn')]
              ])
            : vue.createCommentVNode("v-if", true),
          (_ctx.validData(_ctx.crud.tableOption.printBtn,_ctx.config.printBtn))
            ? vue.withDirectives((vue.openBlock(), vue.createBlock(_component_el_button, {
                key: 2,
                icon: _ctx.crud.getBtnIcon('printBtn'),
                class: vue.normalizeClass(_ctx.b('printBtn')),
                circle: "",
                size: _ctx.crud.size,
                onClick: _ctx.rowPrint
              }, null, 8 /* PROPS */, ["icon", "class", "size", "onClick"])), [
                [_directive_permission, _ctx.crud.getPermission('printBtn')]
              ])
            : vue.createCommentVNode("v-if", true),
          (_ctx.validData(_ctx.crud.tableOption.refreshBtn,_ctx.config.refreshBtn))
            ? vue.withDirectives((vue.openBlock(), vue.createBlock(_component_el_button, {
                key: 3,
                icon: _ctx.crud.getBtnIcon('refreshBtn'),
                class: vue.normalizeClass(_ctx.b('refreshBtn')),
                circle: "",
                size: _ctx.crud.size,
                onClick: _ctx.crud.refreshChange
              }, null, 8 /* PROPS */, ["icon", "class", "size", "onClick"])), [
                [_directive_permission, _ctx.crud.getPermission('refreshBtn')]
              ])
            : vue.createCommentVNode("v-if", true),
          (_ctx.validData(_ctx.crud.tableOption.columnBtn,_ctx.config.columnBtn))
            ? vue.withDirectives((vue.openBlock(), vue.createBlock(_component_el_button, {
                key: 4,
                icon: _ctx.crud.getBtnIcon('columnBtn'),
                class: vue.normalizeClass(_ctx.b('columnBtn')),
                circle: "",
                size: _ctx.crud.size,
                onClick: _cache[0] || (_cache[0] = $event => (_ctx.crud.$refs.dialogColumn.handleShow()))
              }, null, 8 /* PROPS */, ["icon", "class", "size"])), [
                [_directive_permission, _ctx.crud.getPermission('columnBtn')]
              ])
            : vue.createCommentVNode("v-if", true),
          ((_ctx.crud.$refs.headerSearch || {}).searchFlag&&_ctx.validData(_ctx.crud.tableOption.searchShowBtn,true))
            ? (vue.openBlock(), vue.createBlock(_component_el_button, {
                key: 5,
                icon: _ctx.crud.getBtnIcon('searchBtn'),
                class: vue.normalizeClass(_ctx.b('searchBtn')),
                circle: "",
                size: _ctx.crud.size,
                onClick: _cache[1] || (_cache[1] = $event => (_ctx.crud.$refs.headerSearch.handleSearchShow()))
              }, null, 8 /* PROPS */, ["icon", "class", "size"]))
            : vue.createCommentVNode("v-if", true),
          (_ctx.validData(_ctx.crud.tableOption.filterBtn,_ctx.config.filterBtn))
            ? vue.withDirectives((vue.openBlock(), vue.createBlock(_component_el_button, {
                key: 6,
                icon: _ctx.crud.getBtnIcon('filterBtn'),
                class: vue.normalizeClass(_ctx.b('filterBtn')),
                circle: "",
                size: _ctx.crud.size,
                onClick: _cache[2] || (_cache[2] = $event => (_ctx.crud.$refs.dialogFilter.handleShow()))
              }, null, 8 /* PROPS */, ["icon", "class", "size"])), [
                [_directive_permission, _ctx.crud.getPermission('filterBtn')]
              ])
            : vue.createCommentVNode("v-if", true),
          (_ctx.validData(_ctx.crud.tableOption.gridBtn,_ctx.config.gridBtn))
            ? vue.withDirectives((vue.openBlock(), vue.createBlock(_component_el_button, {
                key: 7,
                icon: _ctx.crud.getBtnIcon('gridBtn'),
                class: vue.normalizeClass(_ctx.b('gridBtn')),
                circle: "",
                size: _ctx.crud.size,
                onClick: _cache[3] || (_cache[3] = $event => (_ctx.crud.handleGridShow()))
              }, null, 8 /* PROPS */, ["icon", "class", "size"])), [
                [_directive_permission, _ctx.crud.getPermission('gridBtn')]
              ])
            : vue.createCommentVNode("v-if", true)
        ], 2 /* CLASS */))
      : vue.createCommentVNode("v-if", true)
  ], 2 /* CLASS */))
}

exports.render = render;
