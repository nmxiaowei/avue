/*! Avue.js v3.8.6 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

var vue = require('vue');

const _hoisted_1 = { class: "el-dialog__title" };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_icon = vue.resolveComponent("el-icon");
  const _component_avue_form = vue.resolveComponent("avue-form");
  const _component_el_button = vue.resolveComponent("el-button");
  const _directive_loading = vue.resolveDirective("loading");

  return (_ctx.boxVisible)
    ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.dialogType), vue.mergeProps({
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
        header: vue.withCtx(() => [
          vue.createElementVNode("div", {
            class: vue.normalizeClass(_ctx.b('dialog__header'))
          }, [
            vue.createElementVNode("span", _hoisted_1, vue.toDisplayString(_ctx.dialogTitle), 1 /* TEXT */),
            vue.createElementVNode("div", {
              class: vue.normalizeClass(_ctx.b('dialog__menu'))
            }, [
              vue.createVNode(_component_el_icon, {
                class: "el-dialog__close",
                onClick: _ctx.handleFullScreen
              }, {
                default: vue.withCtx(() => [
                  (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.fullscreen ? 'el-icon-copy-document' : 'el-icon-full-screen')))
                ]),
                _: 1 /* STABLE */
              }, 8 /* PROPS */, ["onClick"])
            ], 2 /* CLASS */)
          ], 2 /* CLASS */)
        ]),
        default: vue.withCtx(() => [
          vue.withDirectives((vue.openBlock(), vue.createBlock(_component_avue_form, vue.mergeProps({
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
          }), vue.createSlots({ _: 2 /* DYNAMIC */ }, [
            vue.renderList(_ctx.crud.formSlot, (item) => {
              return {
                name: _ctx.getSlotName(item),
                fn: vue.withCtx((scope) => [
                  vue.renderSlot(_ctx.$slots, item, vue.normalizeProps(vue.guardReactiveProps(Object.assign(scope, { type: _ctx.boxType }))))
                ])
              }
            })
          ]), 1040 /* FULL_PROPS, DYNAMIC_SLOTS */, ["modelValue", "status", "onChange", "onSubmit", "onResetChange", "onTabClick", "onError", "element-loading-text", "element-loading-spinner", "element-loading-svg", "element-loading-background", "option"])), [
            [_directive_loading, _ctx.loading]
          ]),
          vue.createElementVNode("span", {
            class: vue.normalizeClass(["avue-dialog__footer", 'avue-dialog__footer--' + _ctx.dialogMenuPosition])
          }, [
            vue.renderSlot(_ctx.$slots, "menu-form-before", vue.normalizeProps(vue.guardReactiveProps(_ctx.menuParams()))),
            (_ctx.validData(_ctx.option.mockBtn, false) && !_ctx.isView)
              ? (vue.openBlock(), vue.createBlock(_component_el_button, {
                  key: 0,
                  type: "primary",
                  onClick: (_ctx.$refs.tableForm || {}).handleMock,
                  loading: _ctx.disabled || _ctx.loading,
                  size: _ctx.crud.size,
                  icon: _ctx.option.mockIcon
                }, {
                  default: vue.withCtx(() => [
                    vue.createTextVNode(vue.toDisplayString(_ctx.option.mockText), 1 /* TEXT */)
                  ]),
                  _: 1 /* STABLE */
                }, 8 /* PROPS */, ["onClick", "loading", "size", "icon"]))
              : vue.createCommentVNode("v-if", true),
            (_ctx.validData(_ctx.option.submitBtn, true) && !_ctx.isView)
              ? (vue.openBlock(), vue.createBlock(_component_el_button, {
                  key: 1,
                  onClick: _ctx.submit,
                  loading: _ctx.disabled || _ctx.loading,
                  size: _ctx.crud.size,
                  icon: _ctx.option.submitIcon,
                  type: "primary"
                }, {
                  default: vue.withCtx(() => [
                    vue.createTextVNode(vue.toDisplayString(_ctx.option.submitText), 1 /* TEXT */)
                  ]),
                  _: 1 /* STABLE */
                }, 8 /* PROPS */, ["onClick", "loading", "size", "icon"]))
              : vue.createCommentVNode("v-if", true),
            (_ctx.validData(_ctx.option.emptyBtn, true) && !_ctx.isView)
              ? (vue.openBlock(), vue.createBlock(_component_el_button, {
                  key: 2,
                  onClick: _ctx.reset,
                  disabled: _ctx.disabled || _ctx.loading,
                  size: _ctx.crud.size,
                  icon: _ctx.option.emptyIcon
                }, {
                  default: vue.withCtx(() => [
                    vue.createTextVNode(vue.toDisplayString(_ctx.option.emptyText), 1 /* TEXT */)
                  ]),
                  _: 1 /* STABLE */
                }, 8 /* PROPS */, ["onClick", "disabled", "size", "icon"]))
              : vue.createCommentVNode("v-if", true),
            vue.renderSlot(_ctx.$slots, "menu-form", vue.normalizeProps(vue.guardReactiveProps(_ctx.menuParams())))
          ], 2 /* CLASS */)
        ]),
        _: 3 /* FORWARDED */
      }, 16 /* FULL_PROPS */, ["draggable", "class", "append-to-body", "top", "title", "close-on-press-escape", "close-on-click-modal", "modal", "modal-penetrable", "show-close", "header-class", "body-class", "footer-class", "modelValue", "before-close"]))
    : vue.createCommentVNode("v-if", true)
}

exports.render = render;
