/*! Avue.js v3.8.6 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

var vue = require('vue');

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_avue_form = vue.resolveComponent("avue-form");
  const _component_el_button = vue.resolveComponent("el-button");

  return (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($options.dialogType), vue.mergeProps({
    modelValue: $data.visible,
    "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => (($data.visible) = $event)),
    "destroy-on-close": "",
    class: "avue-dialog",
    beforeClose: $options.beforeClose
  }, $data.dialog), {
    default: vue.withCtx(() => [
      vue.createVNode(_component_avue_form, {
        ref: "form",
        option: {..._ctx.deepClone($data.option),...{menuBtn: false}},
        modelValue: $data.data,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => (($data.data) = $event)),
        status: $data.disabled,
        "onUpdate:status": _cache[1] || (_cache[1] = $event => (($data.disabled) = $event)),
        onSubmit: $options.handleSubmit,
        onResetChange: $options.close
      }, null, 8 /* PROPS */, ["option", "modelValue", "status", "onSubmit", "onResetChange"]),
      (_ctx.validData($data.option.menuBtn,true))
        ? (vue.openBlock(), vue.createElementBlock("span", {
            key: 0,
            class: vue.normalizeClass(["avue-dialog__footer", 'avue-dialog__footer--'+$options.menuPosition])
          }, [
            (_ctx.validData($data.option.submitBtn,true))
              ? (vue.openBlock(), vue.createBlock(_component_el_button, {
                  key: 0,
                  onClick: $options.submit,
                  size: _ctx.$AVUE.size,
                  icon: $data.option.submitIcon,
                  loading: $data.disabled,
                  type: "primary"
                }, {
                  default: vue.withCtx(() => [
                    vue.createTextVNode(vue.toDisplayString($data.option.submitText), 1 /* TEXT */)
                  ]),
                  _: 1 /* STABLE */
                }, 8 /* PROPS */, ["onClick", "size", "icon", "loading"]))
              : vue.createCommentVNode("v-if", true),
            (_ctx.validData($data.option.emptyBtn,true))
              ? (vue.openBlock(), vue.createBlock(_component_el_button, {
                  key: 1,
                  onClick: $options.reset,
                  disabled: $data.disabled,
                  size: _ctx.$AVUE.size,
                  icon: $data.option.emptyIcon 
                }, {
                  default: vue.withCtx(() => [
                    vue.createTextVNode(vue.toDisplayString($data.option.emptyText), 1 /* TEXT */)
                  ]),
                  _: 1 /* STABLE */
                }, 8 /* PROPS */, ["onClick", "disabled", "size", "icon"]))
              : vue.createCommentVNode("v-if", true)
          ], 2 /* CLASS */))
        : vue.createCommentVNode("v-if", true)
    ]),
    _: 1 /* STABLE */
  }, 16 /* FULL_PROPS */, ["modelValue", "beforeClose"]))
}

exports.render = render;
