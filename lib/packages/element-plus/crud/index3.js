/*! Avue.js v3.9.1 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

var vue = require('vue');

const _hoisted_1 = {
  key: 1,
  class: "avue-crud__tip"
};
const _hoisted_2 = { class: "avue-crud__tip-name" };
const _hoisted_3 = { class: "avue-crud__tip-count" };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_header_search = vue.resolveComponent("header-search");
  const _component_header_menu = vue.resolveComponent("header-menu");
  const _component_el_empty = vue.resolveComponent("el-empty");
  const _component_column_default = vue.resolveComponent("column-default");
  const _component_column_menu = vue.resolveComponent("column-menu");
  const _component_column = vue.resolveComponent("column");
  const _component_el_form = vue.resolveComponent("el-form");
  const _component_el_card = vue.resolveComponent("el-card");
  const _component_table_page = vue.resolveComponent("table-page");
  const _component_dialog_form = vue.resolveComponent("dialog-form");
  const _component_dialog_excel = vue.resolveComponent("dialog-excel");
  const _component_dialog_column = vue.resolveComponent("dialog-column");
  const _component_dialog_filter = vue.resolveComponent("dialog-filter");
  const _directive_loading = vue.resolveDirective("loading");

  return (vue.openBlock(), vue.createElementBlock("div", {
    class: vue.normalizeClass(_ctx.b({ card: !_ctx.option.card }))
  }, [
    (_ctx.tableOption.title)
      ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.tableOption.titleSize || 'h2'), {
          key: 0,
          style: vue.normalizeStyle(_ctx.tableOption.titleStyle)
        }, {
          default: vue.withCtx(() => [
            vue.createTextVNode(vue.toDisplayString(_ctx.tableOption.title), 1 /* TEXT */)
          ]),
          _: 1 /* STABLE */
        }, 8 /* PROPS */, ["style"]))
      : vue.createCommentVNode("v-if", true),
    vue.createCommentVNode(" 搜索组件 "),
    vue.createVNode(_component_header_search, { ref: "headerSearch" }, vue.createSlots({
      search: vue.withCtx((scope) => [
        vue.renderSlot(_ctx.$slots, "search", vue.normalizeProps(vue.guardReactiveProps(scope)))
      ]),
      "search-menu": vue.withCtx((scope) => [
        vue.renderSlot(_ctx.$slots, "search-menu", vue.normalizeProps(vue.guardReactiveProps(scope)))
      ]),
      _: 2 /* DYNAMIC */
    }, [
      vue.renderList(_ctx.searchSlot, (item) => {
        return {
          name: item,
          fn: vue.withCtx((scope) => [
            vue.renderSlot(_ctx.$slots, item, vue.normalizeProps(vue.guardReactiveProps(scope)))
          ])
        }
      })
    ]), 1536 /* NEED_PATCH, DYNAMIC_SLOTS */),
    vue.createVNode(_component_el_card, {
      shadow: _ctx.isCard,
      class: vue.normalizeClass(_ctx.b('body'))
    }, {
      default: vue.withCtx(() => [
        vue.renderSlot(_ctx.$slots, "header"),
        vue.createCommentVNode(" 表格功能列 "),
        (_ctx.validData(_ctx.tableOption.header, true))
          ? (vue.openBlock(), vue.createBlock(_component_header_menu, {
              key: 0,
              ref: "headerMenu"
            }, {
              "menu-left": vue.withCtx((scope) => [
                vue.renderSlot(_ctx.$slots, "menu-left", vue.normalizeProps(vue.guardReactiveProps(scope)))
              ]),
              "menu-right": vue.withCtx((scope) => [
                vue.renderSlot(_ctx.$slots, "menu-right", vue.normalizeProps(vue.guardReactiveProps(scope)))
              ]),
              _: 3 /* FORWARDED */
            }, 512 /* NEED_PATCH */))
          : vue.createCommentVNode("v-if", true),
        (_ctx.validData(_ctx.tableOption.tip, _ctx.config.tip) && _ctx.tableOption.selection)
          ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [
              vue.createElementVNode("span", _hoisted_2, [
                vue.createTextVNode(vue.toDisplayString(_ctx.t("crud.tipStartTitle")) + " ", 1 /* TEXT */),
                vue.createElementVNode("span", _hoisted_3, vue.toDisplayString(_ctx.selectLen), 1 /* TEXT */),
                vue.createTextVNode(" " + vue.toDisplayString(_ctx.t("crud.tipEndTitle")), 1 /* TEXT */)
              ]),
              vue.createElementVNode("span", {
                class: "avue-crud__tip-button",
                onClick: _cache[0] || (_cache[0] = (...args) => (_ctx.clearSelection && _ctx.clearSelection(...args)))
              }, vue.toDisplayString(_ctx.t("crud.emptyBtn")), 1 /* TEXT */),
              vue.renderSlot(_ctx.$slots, "tip")
            ]))
          : vue.createCommentVNode("v-if", true),
        vue.renderSlot(_ctx.$slots, "body"),
        vue.createVNode(_component_el_form, {
          model: _ctx.cellForm,
          onValidate: _ctx.handleValidate,
          ref: "cellForm"
        }, {
          default: vue.withCtx(() => [
            vue.withDirectives((vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.tableName), {
              key: _ctx.reload,
              data: _ctx.cellForm.list,
              fixed: _ctx.tableOption.fixed,
              columns: _ctx.columnVirtualizeOption,
              "row-key": _ctx.rowKey,
              class: vue.normalizeClass({
            'avue-crud--indeterminate': _ctx.validData(
              _ctx.tableOption.indeterminate,
              false
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
              empty: vue.withCtx(() => [
                vue.createElementVNode("div", {
                  class: vue.normalizeClass(_ctx.b('empty'))
                }, [
                  (_ctx.$slots.empty)
                    ? vue.renderSlot(_ctx.$slots, "empty", { key: 0 })
                    : (vue.openBlock(), vue.createBlock(_component_el_empty, {
                        key: 1,
                        "image-size": 100,
                        description: _ctx.tableOption.emptyText || _ctx.t('crud.emptyText')
                      }, null, 8 /* PROPS */, ["description"]))
                ], 2 /* CLASS */)
              ]),
              default: vue.withCtx(() => [
                (!_ctx.virtualize)
                  ? (vue.openBlock(), vue.createBlock(_component_column, {
                      key: 0,
                      columnOption: _ctx.columnOption
                    }, vue.createSlots({
                      header: vue.withCtx(() => [
                        vue.createVNode(_component_column_default, { ref: "columnDefault" }, {
                          expand: vue.withCtx(({ row, index }) => [
                            vue.renderSlot(_ctx.$slots, "expand", {
                              row: row,
                              index: index
                            })
                          ]),
                          _: 3 /* FORWARDED */
                        }, 512 /* NEED_PATCH */)
                      ]),
                      footer: vue.withCtx(() => [
                        vue.createVNode(_component_column_menu, null, {
                          "menu-header": vue.withCtx((scope) => [
                            vue.renderSlot(_ctx.$slots, "menu-header", vue.normalizeProps(vue.guardReactiveProps(scope)))
                          ]),
                          menu: vue.withCtx((scope) => [
                            vue.renderSlot(_ctx.$slots, "menu", vue.normalizeProps(vue.guardReactiveProps(scope)))
                          ]),
                          "menu-btn": vue.withCtx((scope) => [
                            vue.renderSlot(_ctx.$slots, "menu-btn", vue.normalizeProps(vue.guardReactiveProps(scope)))
                          ]),
                          "menu-before": vue.withCtx((scope) => [
                            vue.renderSlot(_ctx.$slots, "menu-before", vue.normalizeProps(vue.guardReactiveProps(scope)))
                          ]),
                          "menu-btn-before": vue.withCtx((scope) => [
                            vue.renderSlot(_ctx.$slots, "menu-btn-before", vue.normalizeProps(vue.guardReactiveProps(scope)))
                          ]),
                          _: 3 /* FORWARDED */
                        })
                      ]),
                      _: 2 /* DYNAMIC */
                    }, [
                      vue.renderList(_ctx.mainSlot, (item) => {
                        return {
                          name: item,
                          fn: vue.withCtx((scope) => [
                            vue.renderSlot(_ctx.$slots, item, vue.normalizeProps(vue.guardReactiveProps(scope)))
                          ])
                        }
                      })
                    ]), 1032 /* PROPS, DYNAMIC_SLOTS */, ["columnOption"]))
                  : vue.createCommentVNode("v-if", true)
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
        vue.renderSlot(_ctx.$slots, "footer")
      ]),
      _: 3 /* FORWARDED */
    }, 8 /* PROPS */, ["shadow", "class"]),
    vue.createCommentVNode(" 分页 "),
    vue.createVNode(_component_table_page, { ref: "tablePage" }, {
      page: vue.withCtx(() => [
        vue.renderSlot(_ctx.$slots, "page")
      ]),
      _: 3 /* FORWARDED */
    }, 512 /* NEED_PATCH */),
    vue.createCommentVNode(" 表单 "),
    vue.createVNode(_component_dialog_form, { ref: "dialogForm" }, vue.createSlots({
      "menu-form": vue.withCtx((scope) => [
        vue.renderSlot(_ctx.$slots, "menu-form", vue.normalizeProps(vue.guardReactiveProps(scope)))
      ]),
      "menu-form-before": vue.withCtx((scope) => [
        vue.renderSlot(_ctx.$slots, "menu-form-before", vue.normalizeProps(vue.guardReactiveProps(scope)))
      ]),
      _: 2 /* DYNAMIC */
    }, [
      vue.renderList(_ctx.formSlot, (item) => {
        return {
          name: item,
          fn: vue.withCtx((scope) => [
            vue.renderSlot(_ctx.$slots, item, vue.normalizeProps(vue.guardReactiveProps(scope)))
          ])
        }
      })
    ]), 1536 /* NEED_PATCH, DYNAMIC_SLOTS */),
    vue.createVNode(_component_dialog_excel, { ref: "dialogExcel" }, null, 512 /* NEED_PATCH */),
    vue.createVNode(_component_dialog_column, { ref: "dialogColumn" }, null, 512 /* NEED_PATCH */),
    vue.createVNode(_component_dialog_filter, { ref: "dialogFilter" }, null, 512 /* NEED_PATCH */)
  ], 2 /* CLASS */))
}

exports.render = render;
