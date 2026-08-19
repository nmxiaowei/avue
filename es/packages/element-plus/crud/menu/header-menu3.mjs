/*! Avue.js v3.9.4 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { resolveComponent, resolveDirective, openBlock, createElementBlock, normalizeClass, withDirectives, createBlock, withCtx, Fragment, createTextVNode, toDisplayString, createCommentVNode, renderSlot, createVNode } from 'vue';

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_button = resolveComponent("el-button");
  const _component_avue_date = resolveComponent("avue-date");
  const _component_el_tooltip = resolveComponent("el-tooltip");
  const _directive_permission = resolveDirective("permission");

  return (openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.b('header'))
  }, [
    (_ctx.validData(_ctx.crud.tableOption.menuLeft,true))
      ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(_ctx.b('left'))
        }, [
          (_ctx.validData(_ctx.crud.tableOption.addBtn,_ctx.config.addBtn))
            ? withDirectives((openBlock(), createBlock(_component_el_button, {
                key: 0,
                type: "primary",
                class: normalizeClass(_ctx.b('addBtn')),
                onClick: _ctx.crud.rowAdd,
                icon: _ctx.crud.getBtnIcon('addBtn'),
                size: _ctx.crud.size
              }, {
                default: withCtx(() => [
                  (!_ctx.crud.isIconMenu)
                    ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                        createTextVNode(toDisplayString(_ctx.crud.menuIcon('addBtn')), 1 /* TEXT */)
                      ], 64 /* STABLE_FRAGMENT */))
                    : createCommentVNode("v-if", true)
                ]),
                _: 1 /* STABLE */
              }, 8 /* PROPS */, ["class", "onClick", "icon", "size"])), [
                [_directive_permission, _ctx.crud.getPermission('addBtn')]
              ])
            : createCommentVNode("v-if", true),
          (_ctx.validData(_ctx.crud.tableOption.addRowBtn,_ctx.config.addRowBtn))
            ? withDirectives((openBlock(), createBlock(_component_el_button, {
                key: 1,
                type: "primary",
                class: normalizeClass(_ctx.b('addBtn')),
                onClick: _ctx.crud.rowCellAdd,
                icon: _ctx.crud.getBtnIcon('addBtn'),
                size: _ctx.crud.size
              }, {
                default: withCtx(() => [
                  (!_ctx.crud.isIconMenu)
                    ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                        createTextVNode(toDisplayString(_ctx.crud.menuIcon('addBtn')), 1 /* TEXT */)
                      ], 64 /* STABLE_FRAGMENT */))
                    : createCommentVNode("v-if", true)
                ]),
                _: 1 /* STABLE */
              }, 8 /* PROPS */, ["class", "onClick", "icon", "size"])), [
                [_directive_permission, _ctx.crud.getPermission('addRowBtn')]
              ])
            : createCommentVNode("v-if", true),
          renderSlot(_ctx.$slots, "menu-left", {
            size: _ctx.crud.size
          })
        ], 2 /* CLASS */))
      : createCommentVNode("v-if", true),
    (_ctx.validData(_ctx.crud.tableOption.menuRight,true))
      ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: normalizeClass(_ctx.b('right'))
        }, [
          (_ctx.validData(_ctx.crud.tableOption.dateBtn,_ctx.config.dateBtn))
            ? (openBlock(), createBlock(_component_avue_date, {
                key: 0,
                type: "datetimerange",
                onChange: _ctx.dateChange,
                "value-format": "YYYY-MM-DD HH:mm:ss",
                format: "YYYY-MM-DD HH:mm:ss",
                shortcuts: _ctx.shortcuts,
                style: {"display":"inline-block","margin-right":"20px"},
                size: _ctx.crud.size
              }, null, 8 /* PROPS */, ["onChange", "shortcuts", "size"]))
            : createCommentVNode("v-if", true),
          renderSlot(_ctx.$slots, "menu-right", {
            size: _ctx.crud.size
          }),
          (_ctx.validData(_ctx.crud.tableOption.excelBtn,_ctx.config.excelBtn))
            ? (openBlock(), createBlock(_component_el_tooltip, {
                key: 1,
                content: _ctx.t('crud.excelBtn'),
                placement: "top"
              }, {
                default: withCtx(() => [
                  withDirectives(createVNode(_component_el_button, {
                    icon: _ctx.crud.getBtnIcon('excelBtn'),
                    class: normalizeClass(_ctx.b('excelBtn')),
                    circle: "",
                    size: _ctx.crud.size,
                    onClick: _ctx.rowExcel
                  }, null, 8 /* PROPS */, ["icon", "class", "size", "onClick"]), [
                    [_directive_permission, _ctx.crud.getPermission('excelBtn')]
                  ])
                ]),
                _: 1 /* STABLE */
              }, 8 /* PROPS */, ["content"]))
            : createCommentVNode("v-if", true),
          (_ctx.validData(_ctx.crud.tableOption.printBtn,_ctx.config.printBtn))
            ? (openBlock(), createBlock(_component_el_tooltip, {
                key: 2,
                content: _ctx.t('crud.printBtn'),
                placement: "top"
              }, {
                default: withCtx(() => [
                  withDirectives(createVNode(_component_el_button, {
                    icon: _ctx.crud.getBtnIcon('printBtn'),
                    class: normalizeClass(_ctx.b('printBtn')),
                    circle: "",
                    size: _ctx.crud.size,
                    loading: _ctx.printLoading,
                    onClick: _ctx.rowPrint
                  }, null, 8 /* PROPS */, ["icon", "class", "size", "loading", "onClick"]), [
                    [_directive_permission, _ctx.crud.getPermission('printBtn')]
                  ])
                ]),
                _: 1 /* STABLE */
              }, 8 /* PROPS */, ["content"]))
            : createCommentVNode("v-if", true),
          (_ctx.validData(_ctx.crud.tableOption.refreshBtn,_ctx.config.refreshBtn))
            ? (openBlock(), createBlock(_component_el_tooltip, {
                key: 3,
                content: _ctx.t('crud.refreshBtn'),
                placement: "top"
              }, {
                default: withCtx(() => [
                  withDirectives(createVNode(_component_el_button, {
                    icon: _ctx.crud.getBtnIcon('refreshBtn'),
                    class: normalizeClass(_ctx.b('refreshBtn')),
                    circle: "",
                    size: _ctx.crud.size,
                    onClick: _ctx.crud.refreshChange
                  }, null, 8 /* PROPS */, ["icon", "class", "size", "onClick"]), [
                    [_directive_permission, _ctx.crud.getPermission('refreshBtn')]
                  ])
                ]),
                _: 1 /* STABLE */
              }, 8 /* PROPS */, ["content"]))
            : createCommentVNode("v-if", true),
          (_ctx.validData(_ctx.crud.tableOption.columnBtn,_ctx.config.columnBtn))
            ? (openBlock(), createBlock(_component_el_tooltip, {
                key: 4,
                content: _ctx.t('crud.columnBtn'),
                placement: "top"
              }, {
                default: withCtx(() => [
                  withDirectives(createVNode(_component_el_button, {
                    icon: _ctx.crud.getBtnIcon('columnBtn'),
                    class: normalizeClass(_ctx.b('columnBtn')),
                    circle: "",
                    size: _ctx.crud.size,
                    onClick: _cache[0] || (_cache[0] = $event => (_ctx.crud.$refs.dialogColumn.handleShow($event.currentTarget)))
                  }, null, 8 /* PROPS */, ["icon", "class", "size"]), [
                    [_directive_permission, _ctx.crud.getPermission('columnBtn')]
                  ])
                ]),
                _: 1 /* STABLE */
              }, 8 /* PROPS */, ["content"]))
            : createCommentVNode("v-if", true),
          ((_ctx.crud.$refs.headerSearch || {}).searchFlag&&_ctx.validData(_ctx.crud.tableOption.searchShowBtn,true))
            ? (openBlock(), createBlock(_component_el_tooltip, {
                key: 5,
                content: _ctx.t('crud.searchBtn'),
                placement: "top"
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_button, {
                    icon: _ctx.crud.getBtnIcon('searchBtn'),
                    class: normalizeClass(_ctx.b('searchBtn')),
                    type: _ctx.crud.searchShow ? 'primary' : undefined,
                    circle: "",
                    size: _ctx.crud.size,
                    onClick: _cache[1] || (_cache[1] = $event => (_ctx.crud.$refs.headerSearch.handleSearchShow()))
                  }, null, 8 /* PROPS */, ["icon", "class", "type", "size"])
                ]),
                _: 1 /* STABLE */
              }, 8 /* PROPS */, ["content"]))
            : createCommentVNode("v-if", true),
          (_ctx.validData(_ctx.crud.tableOption.filterBtn,_ctx.config.filterBtn))
            ? (openBlock(), createBlock(_component_el_tooltip, {
                key: 6,
                content: _ctx.t('crud.filterBtn'),
                placement: "top"
              }, {
                default: withCtx(() => [
                  withDirectives(createVNode(_component_el_button, {
                    icon: _ctx.crud.getBtnIcon('filterBtn'),
                    class: normalizeClass(_ctx.b('filterBtn')),
                    circle: "",
                    size: _ctx.crud.size,
                    onClick: _cache[2] || (_cache[2] = $event => (_ctx.crud.$refs.dialogFilter.handleShow()))
                  }, null, 8 /* PROPS */, ["icon", "class", "size"]), [
                    [_directive_permission, _ctx.crud.getPermission('filterBtn')]
                  ])
                ]),
                _: 1 /* STABLE */
              }, 8 /* PROPS */, ["content"]))
            : createCommentVNode("v-if", true),
          (_ctx.validData(_ctx.crud.tableOption.gridBtn,_ctx.config.gridBtn))
            ? (openBlock(), createBlock(_component_el_tooltip, {
                key: 7,
                content: _ctx.t('crud.gridBtn'),
                placement: "top"
              }, {
                default: withCtx(() => [
                  withDirectives(createVNode(_component_el_button, {
                    icon: _ctx.crud.getBtnIcon('gridBtn'),
                    class: normalizeClass(_ctx.b('gridBtn')),
                    type: _ctx.crud.gridShow ? 'primary' : undefined,
                    circle: "",
                    size: _ctx.crud.size,
                    onClick: _cache[3] || (_cache[3] = $event => (_ctx.crud.handleGridShow()))
                  }, null, 8 /* PROPS */, ["icon", "class", "type", "size"]), [
                    [_directive_permission, _ctx.crud.getPermission('gridBtn')]
                  ])
                ]),
                _: 1 /* STABLE */
              }, 8 /* PROPS */, ["content"]))
            : createCommentVNode("v-if", true)
        ], 2 /* CLASS */))
      : createCommentVNode("v-if", true)
  ], 2 /* CLASS */))
}

export { render };
