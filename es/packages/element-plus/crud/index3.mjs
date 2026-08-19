/*! Avue.js v3.9.4 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { resolveComponent, resolveDirective, openBlock, createElementBlock, normalizeClass, createBlock, resolveDynamicComponent, normalizeStyle, withCtx, createTextVNode, toDisplayString, createCommentVNode, createVNode, createSlots, renderSlot, normalizeProps, guardReactiveProps, renderList, createElementVNode, withDirectives } from 'vue';

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_header_search = resolveComponent("header-search");
  const _component_header_menu = resolveComponent("header-menu");
  const _component_el_icon_circle_check_filled = resolveComponent("el-icon-circle-check-filled");
  const _component_el_button = resolveComponent("el-button");
  const _component_el_empty = resolveComponent("el-empty");
  const _component_column_default = resolveComponent("column-default");
  const _component_column_menu = resolveComponent("column-menu");
  const _component_column = resolveComponent("column");
  const _component_el_form = resolveComponent("el-form");
  const _component_el_card = resolveComponent("el-card");
  const _component_table_page = resolveComponent("table-page");
  const _component_dialog_form = resolveComponent("dialog-form");
  const _component_dialog_excel = resolveComponent("dialog-excel");
  const _component_dialog_column = resolveComponent("dialog-column");
  const _component_dialog_filter = resolveComponent("dialog-filter");
  const _directive_loading = resolveDirective("loading");

  return (openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.b({ card: !_ctx.option.card }))
  }, [
    (_ctx.tableOption.title)
      ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.tableOption.titleSize || 'h2'), {
          key: 0,
          style: normalizeStyle(_ctx.tableOption.titleStyle)
        }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(_ctx.tableOption.title), 1 /* TEXT */)
          ]),
          _: 1 /* STABLE */
        }, 8 /* PROPS */, ["style"]))
      : createCommentVNode("v-if", true),
    createCommentVNode(" 搜索组件 "),
    createVNode(_component_header_search, { ref: "headerSearch" }, createSlots({
      search: withCtx((scope) => [
        renderSlot(_ctx.$slots, "search", normalizeProps(guardReactiveProps(scope)))
      ]),
      "search-menu": withCtx((scope) => [
        renderSlot(_ctx.$slots, "search-menu", normalizeProps(guardReactiveProps(scope)))
      ]),
      _: 2 /* DYNAMIC */
    }, [
      renderList(_ctx.searchSlot, (item) => {
        return {
          name: item,
          fn: withCtx((scope) => [
            renderSlot(_ctx.$slots, item, normalizeProps(guardReactiveProps(scope)))
          ])
        }
      })
    ]), 1536 /* NEED_PATCH, DYNAMIC_SLOTS */),
    createVNode(_component_el_card, {
      shadow: _ctx.isCard,
      class: normalizeClass(_ctx.b('body'))
    }, {
      default: withCtx(() => [
        renderSlot(_ctx.$slots, "header"),
        createCommentVNode(" 表格功能列 "),
        (_ctx.validData(_ctx.tableOption.header, true))
          ? (openBlock(), createBlock(_component_header_menu, {
              key: 0,
              ref: "headerMenu"
            }, {
              "menu-left": withCtx((scope) => [
                renderSlot(_ctx.$slots, "menu-left", normalizeProps(guardReactiveProps(scope)))
              ]),
              "menu-right": withCtx((scope) => [
                renderSlot(_ctx.$slots, "menu-right", normalizeProps(guardReactiveProps(scope)))
              ]),
              _: 3 /* FORWARDED */
            }, 512 /* NEED_PATCH */))
          : createCommentVNode("v-if", true),
        (_ctx.validData(_ctx.tableOption.tip, _ctx.config.tip) && _ctx.tableOption.selection)
          ? (openBlock(), createElementBlock("div", {
              key: 1,
              class: normalizeClass(_ctx.b('tip')),
              role: "status",
              "aria-live": "polite"
            }, [
              createElementVNode("div", {
                class: normalizeClass(_ctx.b('tip-content'))
              }, [
                createVNode(_component_el_icon_circle_check_filled, {
                  class: normalizeClass(_ctx.b('tip-icon')),
                  "aria-hidden": "true"
                }, null, 8 /* PROPS */, ["class"]),
                createElementVNode("span", {
                  class: normalizeClass(_ctx.b('tip-name'))
                }, toDisplayString(_ctx.t("crud.tipStartTitle")), 3 /* TEXT, CLASS */),
                createElementVNode("span", {
                  class: normalizeClass(_ctx.b('tip-count'))
                }, toDisplayString(_ctx.selectLen), 3 /* TEXT, CLASS */),
                createElementVNode("span", {
                  class: normalizeClass(_ctx.b('tip-suffix'))
                }, toDisplayString(_ctx.t("crud.tipEndTitle")), 3 /* TEXT, CLASS */)
              ], 2 /* CLASS */),
              createElementVNode("div", {
                class: normalizeClass(_ctx.b('tip-actions'))
              }, [
                renderSlot(_ctx.$slots, "tip", {
                  selection: _ctx.tableSelect,
                  count: _ctx.selectLen
                }),
                (_ctx.selectLen > 0)
                  ? (openBlock(), createBlock(_component_el_button, {
                      key: 0,
                      text: "",
                      type: "primary",
                      icon: _ctx.getBtnIcon('emptyBtn'),
                      class: normalizeClass(_ctx.b('tip-button')),
                      size: _ctx.size,
                      onClick: _ctx.clearSelection
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(_ctx.t("crud.emptyBtn")), 1 /* TEXT */)
                      ]),
                      _: 1 /* STABLE */
                    }, 8 /* PROPS */, ["icon", "class", "size", "onClick"]))
                  : createCommentVNode("v-if", true)
              ], 2 /* CLASS */)
            ], 2 /* CLASS */))
          : createCommentVNode("v-if", true),
        renderSlot(_ctx.$slots, "body"),
        createVNode(_component_el_form, {
          model: _ctx.cellForm,
          onValidate: _ctx.handleValidate,
          ref: "cellForm"
        }, {
          default: withCtx(() => [
            withDirectives((openBlock(), createBlock(resolveDynamicComponent(_ctx.tableName), {
              key: _ctx.reload,
              data: _ctx.cellForm.list,
              fixed: _ctx.tableOption.fixed,
              columns: _ctx.columnVirtualizeOption,
              "row-key": _ctx.rowKey,
              class: normalizeClass({
            'avue-crud--indeterminate': _ctx.validData(
              _ctx.tableOption.indeterminate,
              false,
            ),
          }),
              size: _ctx.size,
              "append-filter-panel-to": _ctx.tableOption.appendFilterPanelTo,
              "allow-drag-last-column": _ctx.tableOption.allowDragLastColumn,
              lazy: _ctx.validData(_ctx.tableOption.lazy, false),
              load: _ctx.treeLoad,
              "tree-props": _ctx.treeProps,
              "scrollbar-always-on": _ctx.tableOption.scrollbarAlwaysOn,
              flexible: _ctx.tableOption.flexible,
              "table-layout": _ctx.tableOption.tableLayout,
              "expand-row-keys": _ctx.tableOption.expandRowKeys,
              "default-expand-all": _ctx.tableOption.defaultExpandAll,
              "highlight-current-row": _ctx.tableOption.highlightCurrentRow,
              "tooltip-effect": _ctx.tableOption.tooltipEffect,
              "tooltip-options": _ctx.tableOption.tooltipOptions,
              "show-overflow-tooltip": 
            _ctx.tableOption.showOverflowTooltip || _ctx.tableOption.overHidden
          ,
              "tooltip-formatter": _ctx.tableOption.tooltipFormatter,
              onCurrentChange: _ctx.currentRowChange,
              onExpandChange: _ctx.expandChange,
              onHeaderDragend: _ctx.headerDragend,
              "show-summary": _ctx.tableOption.showSummary,
              "summary-method": _ctx.tableSummaryMethod,
              "span-method": _ctx.tableSpanMethod,
              stripe: _ctx.tableOption.stripe,
              "show-header": _ctx.tableOption.showHeader,
              "default-sort": _ctx.tableOption.defaultSort,
              "expand-column-key": _ctx.tableOption.expandColumnKey,
              onScroll: _ctx.scroll,
              onRowClick: _ctx.rowClick,
              onRowDblclick: _ctx.rowDblclick,
              onCellMouseEnter: _ctx.cellMouseEnter,
              onCellMouseLeave: _ctx.cellMouseLeave,
              onCellClick: _ctx.cellClick,
              onHeaderClick: _ctx.headerClick,
              onRowContextmenu: _ctx.rowContextmenu,
              onHeaderContextmenu: _ctx.headerContextmenu,
              onCellDblclick: _ctx.cellDblclick,
              "row-class-name": _ctx.rowClassName,
              "cell-class-name": _ctx.cellClassName,
              "row-style": _ctx.rowStyle,
              "cell-style": _ctx.cellStyle,
              fit: _ctx.tableOption.fit,
              "header-cell-class-name": _ctx.headerCellClassName,
              "header-row-class-name": _ctx.headerRowClassName,
              "header-row-style": _ctx.headerRowStyle,
              "header-cell-style": _ctx.headerCellStyle,
              "max-height": _ctx.isAutoHeight ? _ctx.tableHeight : _ctx.tableOption.maxHeight,
              height: _ctx.height ? _ctx.height : _ctx.tableHeight,
              ref: "table",
              width: _ctx.width ? _ctx.width : _ctx.setPx(_ctx.tableOption.width, _ctx.config.width),
              border: _ctx.tableOption.border,
              "element-loading-text": _ctx.tableOption.loadingText,
              "element-loading-spinner": _ctx.tableOption.loadingSpinner,
              "element-loading-svg": _ctx.tableOption.loadingSvg,
              "element-loading-background": _ctx.tableOption.loadingBackground,
              onFilterChange: _ctx.filterChange,
              onSelectionChange: _ctx.selectionChange,
              onSelect: _ctx.select,
              onSelectAll: _ctx.selectAll,
              onSortChange: _ctx.sortChange
            }, {
              empty: withCtx(() => [
                createElementVNode("div", {
                  class: normalizeClass(_ctx.b('empty'))
                }, [
                  (_ctx.$slots.empty)
                    ? renderSlot(_ctx.$slots, "empty", { key: 0 })
                    : (openBlock(), createBlock(_component_el_empty, {
                        key: 1,
                        "image-size": 100,
                        description: _ctx.tableOption.emptyText || _ctx.t('crud.emptyText')
                      }, null, 8 /* PROPS */, ["description"]))
                ], 2 /* CLASS */)
              ]),
              default: withCtx(() => [
                (!_ctx.virtualize)
                  ? (openBlock(), createBlock(_component_column, {
                      key: 0,
                      columnOption: _ctx.columnOption
                    }, createSlots({
                      header: withCtx(() => [
                        createVNode(_component_column_default, { ref: "columnDefault" }, {
                          expand: withCtx(({ row, index }) => [
                            renderSlot(_ctx.$slots, "expand", {
                              row: row,
                              index: index
                            })
                          ]),
                          _: 3 /* FORWARDED */
                        }, 512 /* NEED_PATCH */)
                      ]),
                      footer: withCtx(() => [
                        createVNode(_component_column_menu, null, {
                          "menu-header": withCtx((scope) => [
                            renderSlot(_ctx.$slots, "menu-header", normalizeProps(guardReactiveProps(scope)))
                          ]),
                          menu: withCtx((scope) => [
                            renderSlot(_ctx.$slots, "menu", normalizeProps(guardReactiveProps(scope)))
                          ]),
                          "menu-btn": withCtx((scope) => [
                            renderSlot(_ctx.$slots, "menu-btn", normalizeProps(guardReactiveProps(scope)))
                          ]),
                          "menu-before": withCtx((scope) => [
                            renderSlot(_ctx.$slots, "menu-before", normalizeProps(guardReactiveProps(scope)))
                          ]),
                          "menu-btn-before": withCtx((scope) => [
                            renderSlot(_ctx.$slots, "menu-btn-before", normalizeProps(guardReactiveProps(scope)))
                          ]),
                          _: 3 /* FORWARDED */
                        })
                      ]),
                      _: 2 /* DYNAMIC */
                    }, [
                      renderList(_ctx.mainSlot, (item) => {
                        return {
                          name: item,
                          fn: withCtx((scope) => [
                            renderSlot(_ctx.$slots, item, normalizeProps(guardReactiveProps(scope)))
                          ])
                        }
                      })
                    ]), 1032 /* PROPS, DYNAMIC_SLOTS */, ["columnOption"]))
                  : createCommentVNode("v-if", true)
              ]),
              _: 3 /* FORWARDED */
            }, 40 /* PROPS, NEED_HYDRATION */, ["data", "fixed", "columns", "row-key", "class", "size", "append-filter-panel-to", "allow-drag-last-column", "lazy", "load", "tree-props", "scrollbar-always-on", "flexible", "table-layout", "expand-row-keys", "default-expand-all", "highlight-current-row", "tooltip-effect", "tooltip-options", "show-overflow-tooltip", "tooltip-formatter", "onCurrentChange", "onExpandChange", "onHeaderDragend", "show-summary", "summary-method", "span-method", "stripe", "show-header", "default-sort", "expand-column-key", "onScroll", "onRowClick", "onRowDblclick", "onCellMouseEnter", "onCellMouseLeave", "onCellClick", "onHeaderClick", "onRowContextmenu", "onHeaderContextmenu", "onCellDblclick", "row-class-name", "cell-class-name", "row-style", "cell-style", "fit", "header-cell-class-name", "header-row-class-name", "header-row-style", "header-cell-style", "max-height", "height", "width", "border", "element-loading-text", "element-loading-spinner", "element-loading-svg", "element-loading-background", "onFilterChange", "onSelectionChange", "onSelect", "onSelectAll", "onSortChange"])), [
              [
                _directive_loading,
                _ctx.tableLoading,
                void 0,
                { lock: true }
              ]
            ])
          ]),
          _: 3 /* FORWARDED */
        }, 8 /* PROPS */, ["model", "onValidate"]),
        renderSlot(_ctx.$slots, "footer")
      ]),
      _: 3 /* FORWARDED */
    }, 8 /* PROPS */, ["shadow", "class"]),
    createCommentVNode(" 分页 "),
    createVNode(_component_table_page, { ref: "tablePage" }, {
      page: withCtx(() => [
        renderSlot(_ctx.$slots, "page")
      ]),
      _: 3 /* FORWARDED */
    }, 512 /* NEED_PATCH */),
    createCommentVNode(" 表单 "),
    createVNode(_component_dialog_form, { ref: "dialogForm" }, createSlots({
      "menu-form": withCtx((scope) => [
        renderSlot(_ctx.$slots, "menu-form", normalizeProps(guardReactiveProps(scope)))
      ]),
      "menu-form-before": withCtx((scope) => [
        renderSlot(_ctx.$slots, "menu-form-before", normalizeProps(guardReactiveProps(scope)))
      ]),
      _: 2 /* DYNAMIC */
    }, [
      renderList(_ctx.formSlot, (item) => {
        return {
          name: item,
          fn: withCtx((scope) => [
            renderSlot(_ctx.$slots, item, normalizeProps(guardReactiveProps(scope)))
          ])
        }
      })
    ]), 1536 /* NEED_PATCH, DYNAMIC_SLOTS */),
    createVNode(_component_dialog_excel, { ref: "dialogExcel" }, null, 512 /* NEED_PATCH */),
    createVNode(_component_dialog_column, { ref: "dialogColumn" }, null, 512 /* NEED_PATCH */),
    createVNode(_component_dialog_filter, { ref: "dialogFilter" }, null, 512 /* NEED_PATCH */)
  ], 2 /* CLASS */))
}

export { render };
