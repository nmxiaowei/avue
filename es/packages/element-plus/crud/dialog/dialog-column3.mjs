/*! Avue.js v3.9.4 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { resolveComponent, openBlock, createBlock, withCtx, createElementVNode, createVNode, createTextVNode, toDisplayString, createElementBlock, Fragment, renderList, normalizeClass, createCommentVNode } from 'vue';

const _hoisted_1 = { class: "avue-crud__column-panel" };
const _hoisted_2 = { class: "avue-crud__column-panel__header" };
const _hoisted_3 = {
  ref: "list",
  class: "avue-crud__column-panel__list"
};
const _hoisted_4 = { class: "avue-crud__column-panel__label" };
const _hoisted_5 = { class: "avue-crud__column-panel__actions" };
const _hoisted_6 = { class: "avue-crud__column-panel__footer" };
const _hoisted_7 = { class: "avue-crud__column-panel__footer-actions" };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_checkbox = resolveComponent("el-checkbox");
  const _component_el_button = resolveComponent("el-button");
  const _component_el_tooltip = resolveComponent("el-tooltip");
  const _component_el_popover = resolveComponent("el-popover");

  return (_ctx.triggerRef)
    ? (openBlock(), createBlock(_component_el_popover, {
        key: 0,
        visible: _ctx.columnBox,
        "onUpdate:visible": _cache[0] || (_cache[0] = $event => ((_ctx.columnBox) = $event)),
        "virtual-ref": _ctx.triggerRef,
        "virtual-triggering": "",
        placement: "bottom-end",
        width: _ctx.crud.isMobile ? 320 : 320,
        "popper-class": "avue-crud__column-popper",
        onHide: _ctx.handleHide
      }, {
        default: withCtx(() => [
          createElementVNode("div", _hoisted_1, [
            createElementVNode("div", _hoisted_2, [
              createVNode(_component_el_checkbox, {
                "model-value": _ctx.isAllVisible,
                indeterminate: _ctx.isIndeterminate,
                onChange: _ctx.handleCheckAll
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.t("crud.column.all")), 1 /* TEXT */)
                ]),
                _: 1 /* STABLE */
              }, 8 /* PROPS */, ["model-value", "indeterminate", "onChange"])
            ]),
            createElementVNode("div", _hoisted_3, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.data, (column) => {
                return (openBlock(), createElementBlock("div", {
                  key: column.prop,
                  class: "avue-crud__column-panel__item"
                }, [
                  createVNode(_component_el_checkbox, {
                    "model-value": _ctx.isVisible(column),
                    "aria-label": column.label,
                    onChange: $event => (_ctx.handleVisibleChange(column, $event))
                  }, null, 8 /* PROPS */, ["model-value", "aria-label", "onChange"]),
                  _cache[1] || (_cache[1] = createElementVNode("span", {
                    class: "avue-crud__column-panel__drag",
                    "aria-hidden": "true"
                  }, "⠿", -1 /* HOISTED */)),
                  createElementVNode("span", _hoisted_4, toDisplayString(column.label), 1 /* TEXT */),
                  createElementVNode("div", _hoisted_5, [
                    createVNode(_component_el_tooltip, {
                      content: _ctx.t('crud.column.fixedLeft'),
                      placement: "top"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_button, {
                          text: "",
                          circle: "",
                          icon: "el-icon-d-arrow-left",
                          class: normalizeClass({ 'is-active': _ctx.isFixed(column, 'left') }),
                          "aria-label": _ctx.t('crud.column.fixedLeft'),
                          onClick: $event => (_ctx.handleFixedChange(column, 'left'))
                        }, null, 8 /* PROPS */, ["class", "aria-label", "onClick"])
                      ]),
                      _: 2 /* DYNAMIC */
                    }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["content"]),
                    createVNode(_component_el_tooltip, {
                      content: _ctx.t('crud.column.fixedRight'),
                      placement: "top"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_button, {
                          text: "",
                          circle: "",
                          icon: "el-icon-d-arrow-right",
                          class: normalizeClass({ 'is-active': _ctx.isFixed(column, 'right') }),
                          "aria-label": _ctx.t('crud.column.fixedRight'),
                          onClick: $event => (_ctx.handleFixedChange(column, 'right'))
                        }, null, 8 /* PROPS */, ["class", "aria-label", "onClick"])
                      ]),
                      _: 2 /* DYNAMIC */
                    }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["content"]),
                    createVNode(_component_el_tooltip, {
                      content: _ctx.t('crud.column.filters'),
                      placement: "top"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_button, {
                          text: "",
                          circle: "",
                          icon: "el-icon-filter",
                          class: normalizeClass({ 'is-active': _ctx.isLegacyEnabled(column, 'filters') }),
                          "aria-label": _ctx.t('crud.column.filters'),
                          onClick: $event => (_ctx.handleLegacyChange(column, 'filters'))
                        }, null, 8 /* PROPS */, ["class", "aria-label", "onClick"])
                      ]),
                      _: 2 /* DYNAMIC */
                    }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["content"]),
                    createVNode(_component_el_tooltip, {
                      content: _ctx.t('crud.column.sortable'),
                      placement: "top"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_button, {
                          text: "",
                          circle: "",
                          icon: "el-icon-sort",
                          class: normalizeClass({ 'is-active': _ctx.isLegacyEnabled(column, 'sortable') }),
                          "aria-label": _ctx.t('crud.column.sortable'),
                          onClick: $event => (_ctx.handleLegacyChange(column, 'sortable'))
                        }, null, 8 /* PROPS */, ["class", "aria-label", "onClick"])
                      ]),
                      _: 2 /* DYNAMIC */
                    }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["content"])
                  ])
                ]))
              }), 128 /* KEYED_FRAGMENT */))
            ], 512 /* NEED_PATCH */),
            createElementVNode("div", _hoisted_6, [
              createVNode(_component_el_button, {
                text: "",
                disabled: !_ctx.crud.columnStateEnabled,
                onClick: _ctx.handleReset
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.t("crud.column.restore")), 1 /* TEXT */)
                ]),
                _: 1 /* STABLE */
              }, 8 /* PROPS */, ["disabled", "onClick"]),
              createElementVNode("span", _hoisted_7, [
                createVNode(_component_el_button, {
                  text: "",
                  onClick: _ctx.handleCancel
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(_ctx.t("crud.column.cancel")), 1 /* TEXT */)
                  ]),
                  _: 1 /* STABLE */
                }, 8 /* PROPS */, ["onClick"]),
                createVNode(_component_el_button, {
                  text: "",
                  type: "primary",
                  onClick: _ctx.handleConfirm
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(_ctx.t("crud.column.confirm")), 1 /* TEXT */)
                  ]),
                  _: 1 /* STABLE */
                }, 8 /* PROPS */, ["onClick"])
              ])
            ])
          ])
        ]),
        _: 1 /* STABLE */
      }, 8 /* PROPS */, ["visible", "virtual-ref", "width", "onHide"]))
    : createCommentVNode("v-if", true)
}

export { render };
