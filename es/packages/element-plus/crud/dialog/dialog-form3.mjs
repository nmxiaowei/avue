/*! Avue.js v3.9.2 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { resolveComponent, resolveDirective, openBlock, createBlock, resolveDynamicComponent, mergeProps, withCtx, withDirectives, createSlots, renderList, renderSlot, normalizeProps, guardReactiveProps, createElementVNode, normalizeClass, createTextVNode, toDisplayString, createCommentVNode, createVNode } from 'vue';

const _hoisted_1 = { class: "el-dialog__title" };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_icon = resolveComponent("el-icon");
  const _component_avue_form = resolveComponent("avue-form");
  const _component_el_button = resolveComponent("el-button");
  const _directive_loading = resolveDirective("loading");

  return (_ctx.boxVisible)
    ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.dialogType), mergeProps({
        key: 0,
        draggable: _ctx.validData(_ctx.crud.tableOption.dialogDrag, _ctx.config.dialogDrag),
        class: [
      'avue-dialog',
      _ctx.b('dialog'),
      this.crud.tableOption.dialogCustomClass,
    ],
        "append-to-body": _ctx.validData(_ctx.crud.tableOption.dialogAppendToBody, true),
        top: _ctx.dialogTop,
        title: _ctx.dialogTitle,
        "close-on-press-escape": _ctx.crud.tableOption.dialogEscape,
        "close-on-click-modal": _ctx.validData(_ctx.crud.tableOption.dialogClickModal, false),
        modal: _ctx.crud.tableOption.dialogModal,
        "modal-penetrable": _ctx.crud.tableOption.modalPenetrable,
        "show-close": _ctx.crud.tableOption.dialogCloseBtn,
        "header-class": _ctx.crud.tableOption.headerClass,
        "body-class": _ctx.crud.tableOption.bodyClass,
        "footer-class": _ctx.crud.tableOption.footerClass,
        modelValue: _ctx.boxVisible,
        "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => ((_ctx.boxVisible) = $event))
      }, _ctx.params, { "before-close": _ctx.hide }), {
        header: withCtx(() => [
          createElementVNode("div", {
            class: normalizeClass(_ctx.b('dialog__header'))
          }, [
            createElementVNode("span", _hoisted_1, toDisplayString(_ctx.dialogTitle), 1 /* TEXT */),
            createElementVNode("div", {
              class: normalizeClass(_ctx.b('dialog__menu'))
            }, [
              createVNode(_component_el_icon, {
                class: "el-dialog__close",
                onClick: _ctx.handleFullScreen
              }, {
                default: withCtx(() => [
                  (openBlock(), createBlock(resolveDynamicComponent(_ctx.fullscreen ? 'el-icon-copy-document' : 'el-icon-full-screen')))
                ]),
                _: 1 /* STABLE */
              }, 8 /* PROPS */, ["onClick"])
            ], 2 /* CLASS */)
          ], 2 /* CLASS */)
        ]),
        default: withCtx(() => [
          withDirectives((openBlock(), createBlock(_component_avue_form, mergeProps({
            modelValue: _ctx.crud.tableForm,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((_ctx.crud.tableForm) = $event)),
            status: _ctx.disabled,
            "onUpdate:status": _cache[1] || (_cache[1] = $event => ((_ctx.disabled) = $event)),
            ref: "tableForm",
            onChange: _ctx.handleChange,
            onSubmit: _ctx.handleSubmit,
            onResetChange: _ctx.hide,
            onTabClick: _ctx.handleTabClick,
            onError: _ctx.handleError
          }, _ctx.$uploadFun(null, _ctx.crud), {
            "element-loading-text": _ctx.crud.tableOption.loadingText,
            "element-loading-spinner": _ctx.crud.tableOption.loadingSpinner,
            "element-loading-svg": _ctx.crud.tableOption.loadingSvg,
            "element-loading-background": _ctx.crud.tableOption.loadingBackground,
            option: _ctx.option
          }), createSlots({ _: 2 /* DYNAMIC */ }, [
            renderList(_ctx.crud.formSlot, (item) => {
              return {
                name: _ctx.getSlotName(item),
                fn: withCtx((scope) => [
                  renderSlot(_ctx.$slots, item, normalizeProps(guardReactiveProps(Object.assign(scope, { type: _ctx.boxType }))))
                ])
              }
            })
          ]), 1040 /* FULL_PROPS, DYNAMIC_SLOTS */, ["modelValue", "status", "onChange", "onSubmit", "onResetChange", "onTabClick", "onError", "element-loading-text", "element-loading-spinner", "element-loading-svg", "element-loading-background", "option"])), [
            [_directive_loading, _ctx.loading]
          ]),
          createElementVNode("span", {
            class: normalizeClass(["avue-dialog__footer", 'avue-dialog__footer--' + _ctx.dialogMenuPosition])
          }, [
            renderSlot(_ctx.$slots, "menu-form-before", normalizeProps(guardReactiveProps(_ctx.menuParams()))),
            (_ctx.validData(_ctx.option.mockBtn, false) && !_ctx.isView)
              ? (openBlock(), createBlock(_component_el_button, {
                  key: 0,
                  type: "primary",
                  onClick: (_ctx.$refs.tableForm || {}).handleMock,
                  loading: _ctx.disabled || _ctx.loading,
                  size: _ctx.crud.size,
                  icon: _ctx.option.mockIcon
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(_ctx.option.mockText), 1 /* TEXT */)
                  ]),
                  _: 1 /* STABLE */
                }, 8 /* PROPS */, ["onClick", "loading", "size", "icon"]))
              : createCommentVNode("v-if", true),
            (_ctx.validData(_ctx.option.submitBtn, true) && !_ctx.isView)
              ? (openBlock(), createBlock(_component_el_button, {
                  key: 1,
                  onClick: _ctx.submit,
                  loading: _ctx.disabled || _ctx.loading,
                  size: _ctx.crud.size,
                  icon: _ctx.option.submitIcon,
                  type: "primary"
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(_ctx.option.submitText), 1 /* TEXT */)
                  ]),
                  _: 1 /* STABLE */
                }, 8 /* PROPS */, ["onClick", "loading", "size", "icon"]))
              : createCommentVNode("v-if", true),
            (_ctx.validData(_ctx.option.emptyBtn, true) && !_ctx.isView)
              ? (openBlock(), createBlock(_component_el_button, {
                  key: 2,
                  onClick: _ctx.reset,
                  disabled: _ctx.disabled || _ctx.loading,
                  size: _ctx.crud.size,
                  icon: _ctx.option.emptyIcon
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(_ctx.option.emptyText), 1 /* TEXT */)
                  ]),
                  _: 1 /* STABLE */
                }, 8 /* PROPS */, ["onClick", "disabled", "size", "icon"]))
              : createCommentVNode("v-if", true),
            renderSlot(_ctx.$slots, "menu-form", normalizeProps(guardReactiveProps(_ctx.menuParams())))
          ], 2 /* CLASS */)
        ]),
        _: 3 /* FORWARDED */
      }, 16 /* FULL_PROPS */, ["draggable", "class", "append-to-body", "top", "title", "close-on-press-escape", "close-on-click-modal", "modal", "modal-penetrable", "show-close", "header-class", "body-class", "footer-class", "modelValue", "before-close"]))
    : createCommentVNode("v-if", true)
}

export { render };
