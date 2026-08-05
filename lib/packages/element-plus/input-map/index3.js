/*! Avue.js v3.9.3 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

var vue = require('vue');

const _hoisted_1 = { key: 0 };
const _hoisted_2 = { class: "avue-dialog__footer" };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_input = vue.resolveComponent("el-input");
  const _component_el_button = vue.resolveComponent("el-button");
  const _component_el_dialog = vue.resolveComponent("el-dialog");

  return (vue.openBlock(), vue.createElementBlock("div", {
    class: vue.normalizeClass(_ctx.b())
  }, [
    vue.createVNode(_component_el_input, {
      "prefix-icon": _ctx.prefixIcon,
      "suffix-icon": _ctx.suffixIcon,
      size: _ctx.size,
      onClear: _ctx.handleClear,
      clearable: _ctx.clearableVal,
      rows: _ctx.rows,
      autosize: { minRows: _ctx.minRows, maxRows: _ctx.maxRows },
      disabled: _ctx.disabled,
      ref: "main",
      "model-value": _ctx.address,
      onFocus: _ctx.handleShow,
      onClick: _ctx.handleClick,
      placeholder: _ctx.placeholder
    }, null, 8 /* PROPS */, ["prefix-icon", "suffix-icon", "size", "onClear", "clearable", "rows", "autosize", "disabled", "model-value", "onFocus", "onClick", "placeholder"]),
    (_ctx.box)
      ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [
          vue.createVNode(_component_el_dialog, {
            class: "avue-dialog",
            width: _ctx.dialogWidth,
            "before-close": _ctx.beforeClose,
            "append-to-body": _ctx.$AVUE.appendToBody,
            "lock-scroll": "",
            title: _ctx.placeholder,
            onClose: _ctx.handleClose,
            modelValue: _ctx.box,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((_ctx.box) = $event))
          }, {
            default: vue.withCtx(() => [
              (_ctx.box)
                ? (vue.openBlock(), vue.createElementBlock("div", {
                    key: 0,
                    class: vue.normalizeClass(_ctx.b('content'))
                  }, [
                    vue.createVNode(_component_el_input, {
                      class: vue.normalizeClass(_ctx.b('content-input')),
                      id: "map__input",
                      size: _ctx.size,
                      onClear: _ctx.clear,
                      readonly: _ctx.disabled,
                      modelValue: _ctx.formattedAddress,
                      "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((_ctx.formattedAddress) = $event)),
                      clearable: "",
                      placeholder: _ctx.t('map.searchPlaceholder')
                    }, null, 8 /* PROPS */, ["class", "size", "onClear", "readonly", "modelValue", "placeholder"]),
                    vue.createElementVNode("div", {
                      class: vue.normalizeClass(_ctx.b('content-box'))
                    }, [
                      vue.createElementVNode("div", {
                        id: "map__container",
                        class: vue.normalizeClass(_ctx.b('content-container')),
                        tabindex: "0"
                      }, null, 2 /* CLASS */),
                      vue.createElementVNode("div", {
                        id: "map__result",
                        class: vue.normalizeClass(_ctx.b('content-result'))
                      }, null, 2 /* CLASS */)
                    ], 2 /* CLASS */)
                  ], 2 /* CLASS */))
                : vue.createCommentVNode("v-if", true),
              vue.createElementVNode("span", _hoisted_2, [
                (!(_ctx.disabled || _ctx.readonly))
                  ? (vue.openBlock(), vue.createBlock(_component_el_button, {
                      key: 0,
                      type: "primary",
                      size: _ctx.size,
                      icon: "el-icon-check",
                      onClick: _ctx.handleSubmit
                    }, {
                      default: vue.withCtx(() => [
                        vue.createTextVNode(vue.toDisplayString(_ctx.t("common.submitBtn")), 1 /* TEXT */)
                      ]),
                      _: 1 /* STABLE */
                    }, 8 /* PROPS */, ["size", "onClick"]))
                  : vue.createCommentVNode("v-if", true)
              ])
            ]),
            _: 1 /* STABLE */
          }, 8 /* PROPS */, ["width", "before-close", "append-to-body", "title", "onClose", "modelValue"])
        ]))
      : vue.createCommentVNode("v-if", true)
  ], 2 /* CLASS */))
}

exports.render = render;
