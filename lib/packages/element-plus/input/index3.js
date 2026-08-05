/*! Avue.js v3.9.3 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

var vue = require('vue');

const _hoisted_1 = {
  key: 0,
  class: "avue-input__phone"
};
const _hoisted_2 = { style: {"float":"left"} };
const _hoisted_3 = { style: {"float":"right","color":"#8492a6","font-size":"12px"} };
const _hoisted_4 = { class: "avue-input__code" };
const _hoisted_5 = ["value", "disabled", "readonly", "onInput", "onKeydown"];
const _hoisted_6 = { class: "avue-input__plate" };
const _hoisted_7 = { class: "avue-input__ip" };
const _hoisted_8 = ["value", "disabled", "readonly", "onInput", "onKeydown"];
const _hoisted_9 = {
  key: 0,
  class: "avue-input__ip-dot"
};
const _hoisted_10 = { class: "avue-input__mac" };
const _hoisted_11 = ["value", "disabled", "readonly", "onInput", "onKeydown"];
const _hoisted_12 = {
  key: 0,
  class: "avue-input__mac-sep"
};
const _hoisted_13 = { class: "avue-input__bank-card-type" };
const _hoisted_14 = { class: "avue-input__id-card-info" };
const _hoisted_15 = { class: "avue-input__email-valid" };
const _hoisted_16 = { class: "avue-input__uscc-valid" };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_option = vue.resolveComponent("el-option");
  const _component_el_select = vue.resolveComponent("el-select");
  const _component_el_input = vue.resolveComponent("el-input");
  const _component_el_button = vue.resolveComponent("el-button");
  const _component_el_tooltip = vue.resolveComponent("el-tooltip");

  return (vue.openBlock(), vue.createElementBlock("div", {
    class: vue.normalizeClass(_ctx.b())
  }, [
    vue.createCommentVNode(" 手机号输入（带国际区号，需要特殊布局） "),
    (_ctx.isPhone)
      ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [
          vue.createVNode(_component_el_select, {
            modelValue: _ctx.phoneCode,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((_ctx.phoneCode) = $event)),
            class: "avue-input__phone-code",
            size: _ctx.size,
            disabled: _ctx.disabled,
            placeholder: _ctx.phoneCodePlaceholderText,
            filterable: "",
            style: {"width":"120px"}
          }, {
            default: vue.withCtx(() => [
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.phoneCodeList, (item) => {
                return (vue.openBlock(), vue.createBlock(_component_el_option, {
                  key: item.code,
                  label: item.label,
                  value: item.code
                }, {
                  default: vue.withCtx(() => [
                    vue.createElementVNode("span", _hoisted_2, vue.toDisplayString(item.name), 1 /* TEXT */),
                    vue.createElementVNode("span", _hoisted_3, vue.toDisplayString(item.code), 1 /* TEXT */)
                  ]),
                  _: 2 /* DYNAMIC */
                }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["label", "value"]))
              }), 128 /* KEYED_FRAGMENT */))
            ]),
            _: 1 /* STABLE */
          }, 8 /* PROPS */, ["modelValue", "size", "disabled", "placeholder"]),
          vue.createVNode(_component_el_input, {
            class: "avue-input__phone-input",
            size: _ctx.size,
            clearable: _ctx.clearableVal,
            modelValue: _ctx.phoneNumber,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((_ctx.phoneNumber) = $event)),
            onKeyup: _cache[2] || (_cache[2] = vue.withKeys($event => (_ctx.isSearch?_ctx.appendClick(_ctx.text):''), ["enter"])),
            onClick: _ctx.handleClick,
            maxlength: _ctx.phoneMaxLength,
            "prefix-icon": _ctx.prefixIcon,
            "suffix-icon": _ctx.suffixIcon,
            readonly: _ctx.readonly,
            placeholder: _ctx.phonePlaceholderText,
            onFocus: _ctx.handleFocus,
            onBlur: _ctx.handlePhoneBlur,
            disabled: _ctx.disabled,
            style: {"flex":"1"}
          }, null, 8 /* PROPS */, ["size", "clearable", "modelValue", "onClick", "maxlength", "prefix-icon", "suffix-icon", "readonly", "placeholder", "onFocus", "onBlur", "disabled"])
        ]))
      : (_ctx.isCode)
        ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
            vue.createCommentVNode(" 验证码输入（分段输入框） "),
            vue.createElementVNode("div", _hoisted_4, [
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.codeValues, (val, index) => {
                return (vue.openBlock(), vue.createElementBlock("input", {
                  key: index,
                  type: "text",
                  maxlength: "1",
                  class: vue.normalizeClass(["avue-input__code-item", { 'is-disabled': _ctx.disabled }]),
                  value: val,
                  disabled: _ctx.disabled,
                  readonly: _ctx.readonly,
                  onInput: $event => (_ctx.handleCodeInput($event, index)),
                  onKeydown: $event => (_ctx.handleCodeKeydown($event, index)),
                  onPaste: _cache[3] || (_cache[3] = $event => (_ctx.handleCodePaste($event))),
                  onFocus: _cache[4] || (_cache[4] = (...args) => (_ctx.handleFocus && _ctx.handleFocus(...args))),
                  onBlur: _cache[5] || (_cache[5] = (...args) => (_ctx.handleBlur && _ctx.handleBlur(...args))),
                  ref_for: true,
                  ref: el => _ctx.codeRefs[index] = el
                }, null, 42 /* CLASS, PROPS, NEED_HYDRATION */, _hoisted_5))
              }), 128 /* KEYED_FRAGMENT */))
            ])
          ], 64 /* STABLE_FRAGMENT */))
        : (_ctx.isPlate)
          ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 2 }, [
              vue.createCommentVNode(" 车牌号输入（省份选择 + 车牌号） "),
              vue.createElementVNode("div", _hoisted_6, [
                vue.createVNode(_component_el_select, {
                  modelValue: _ctx.plateProvince,
                  "onUpdate:modelValue": _cache[6] || (_cache[6] = $event => ((_ctx.plateProvince) = $event)),
                  class: "avue-input__plate-province",
                  size: _ctx.size,
                  disabled: _ctx.disabled,
                  style: {"width":"70px"}
                }, {
                  default: vue.withCtx(() => [
                    (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.resolvedPlateProvinceList, (item) => {
                      return (vue.openBlock(), vue.createBlock(_component_el_option, {
                        key: item,
                        label: item,
                        value: item
                      }, null, 8 /* PROPS */, ["label", "value"]))
                    }), 128 /* KEYED_FRAGMENT */))
                  ]),
                  _: 1 /* STABLE */
                }, 8 /* PROPS */, ["modelValue", "size", "disabled"]),
                vue.createVNode(_component_el_input, {
                  class: "avue-input__plate-number",
                  size: _ctx.size,
                  clearable: _ctx.clearableVal,
                  modelValue: _ctx.plateNumber,
                  "onUpdate:modelValue": _cache[7] || (_cache[7] = $event => ((_ctx.plateNumber) = $event)),
                  onClick: _ctx.handleClick,
                  maxlength: 7,
                  readonly: _ctx.readonly,
                  placeholder: _ctx.platePlaceholderText,
                  onFocus: _ctx.handleFocus,
                  onBlur: _ctx.handlePlateBlur,
                  onInput: _ctx.handlePlateInput,
                  disabled: _ctx.disabled,
                  style: {"flex":"1"}
                }, null, 8 /* PROPS */, ["size", "clearable", "modelValue", "onClick", "readonly", "placeholder", "onFocus", "onBlur", "onInput", "disabled"])
              ])
            ], 64 /* STABLE_FRAGMENT */))
          : (_ctx.isIp)
            ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 3 }, [
                vue.createCommentVNode(" IP地址输入（4段输入框） "),
                vue.createElementVNode("div", _hoisted_7, [
                  (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.ipSegments, (seg, index) => {
                    return (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: index }, [
                      vue.createElementVNode("input", {
                        type: "text",
                        class: vue.normalizeClass(["avue-input__ip-segment", { 'is-disabled': _ctx.disabled }]),
                        maxlength: "3",
                        value: seg,
                        disabled: _ctx.disabled,
                        readonly: _ctx.readonly,
                        onInput: $event => (_ctx.handleIpInput($event, index)),
                        onKeydown: $event => (_ctx.handleIpKeydown($event, index)),
                        onFocus: _cache[8] || (_cache[8] = (...args) => (_ctx.handleFocus && _ctx.handleFocus(...args))),
                        onBlur: _cache[9] || (_cache[9] = (...args) => (_ctx.handleBlur && _ctx.handleBlur(...args))),
                        ref_for: true,
                        ref: el => _ctx.ipRefs[index] = el
                      }, null, 42 /* CLASS, PROPS, NEED_HYDRATION */, _hoisted_8),
                      (index < 3)
                        ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_9, "."))
                        : vue.createCommentVNode("v-if", true)
                    ], 64 /* STABLE_FRAGMENT */))
                  }), 128 /* KEYED_FRAGMENT */))
                ])
              ], 64 /* STABLE_FRAGMENT */))
            : (_ctx.isMac)
              ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 4 }, [
                  vue.createCommentVNode(" MAC地址输入（6段输入框） "),
                  vue.createElementVNode("div", _hoisted_10, [
                    (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.macSegments, (seg, index) => {
                      return (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: index }, [
                        vue.createElementVNode("input", {
                          type: "text",
                          class: vue.normalizeClass(["avue-input__mac-segment", { 'is-disabled': _ctx.disabled }]),
                          maxlength: "2",
                          value: seg,
                          disabled: _ctx.disabled,
                          readonly: _ctx.readonly,
                          onInput: $event => (_ctx.handleMacInput($event, index)),
                          onKeydown: $event => (_ctx.handleMacKeydown($event, index)),
                          onFocus: _cache[10] || (_cache[10] = (...args) => (_ctx.handleFocus && _ctx.handleFocus(...args))),
                          onBlur: _cache[11] || (_cache[11] = (...args) => (_ctx.handleBlur && _ctx.handleBlur(...args))),
                          ref_for: true,
                          ref: el => _ctx.macRefs[index] = el
                        }, null, 42 /* CLASS, PROPS, NEED_HYDRATION */, _hoisted_11),
                        (index < 5)
                          ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_12, vue.toDisplayString(_ctx.macSeparator), 1 /* TEXT */))
                          : vue.createCommentVNode("v-if", true)
                      ], 64 /* STABLE_FRAGMENT */))
                    }), 128 /* KEYED_FRAGMENT */))
                  ])
                ], 64 /* STABLE_FRAGMENT */))
              : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 5 }, [
                  vue.createCommentVNode(" 统一输入框（货币、银行卡、身份证、邮箱、社会信用代码、默认类型） "),
                  vue.createVNode(_component_el_input, {
                    class: vue.normalizeClass(_ctx.inputClass),
                    size: _ctx.size,
                    clearable: _ctx.clearableVal,
                    modelValue: _ctx.inputValue,
                    "onUpdate:modelValue": _cache[15] || (_cache[15] = $event => ((_ctx.inputValue) = $event)),
                    onKeyup: _cache[16] || (_cache[16] = vue.withKeys($event => (_ctx.isSearch?_ctx.appendClick(_ctx.text):''), ["enter"])),
                    onClick: _ctx.handleClick,
                    type: _ctx.inputType,
                    maxlength: _ctx.inputMaxlength,
                    minlength: _ctx.minlength,
                    "show-password": _ctx.typeParam=='password'?_ctx.showPassword:false,
                    rows: _ctx.rows,
                    autosize: { minRows: _ctx.minRows, maxRows: _ctx.maxRows},
                    "prefix-icon": _ctx.inputPrefixIcon,
                    "suffix-icon": _ctx.inputSuffixIcon,
                    readonly: _ctx.readonly,
                    placeholder: _ctx.inputPlaceholder,
                    "show-word-limit": _ctx.isDefault && _ctx.showWordLimit,
                    onFocus: _ctx.onFocus,
                    onBlur: _ctx.onBlur,
                    onInput: _ctx.onInput,
                    disabled: _ctx.disabled,
                    autocomplete: _ctx.autocomplete,
                    formatter: _ctx.isDefault ? _ctx.formatters : undefined,
                    parser: _ctx.isDefault ? _ctx.parser : undefined
                  }, vue.createSlots({ _: 2 /* DYNAMIC */ }, [
                    (_ctx.showPrepend)
                      ? {
                          name: "prepend",
                          fn: vue.withCtx(() => [
                            vue.createElementVNode("span", {
                              onClick: _cache[12] || (_cache[12] = $event => (_ctx.prependClick && _ctx.prependClick(_ctx.text)))
                            }, vue.toDisplayString(_ctx.prependText), 1 /* TEXT */)
                          ]),
                          key: "0"
                        }
                      : undefined,
                    (_ctx.showAppend)
                      ? {
                          name: "append",
                          fn: vue.withCtx(() => [
                            vue.createElementVNode("span", {
                              onClick: _cache[13] || (_cache[13] = $event => (_ctx.appendClick && _ctx.appendClick(_ctx.text)))
                            }, vue.toDisplayString(_ctx.appendText), 1 /* TEXT */)
                          ]),
                          key: "1"
                        }
                      : (_ctx.isSearch)
                        ? {
                            name: "append",
                            fn: vue.withCtx(() => [
                              vue.createVNode(_component_el_button, {
                                icon: "el-icon-search",
                                onClick: _cache[14] || (_cache[14] = $event => (_ctx.appendClick(_ctx.text)))
                              })
                            ]),
                            key: "2"
                          }
                        : undefined,
                    (_ctx.isBankCard && _ctx.showBankCardType && _ctx.bankCardType)
                      ? {
                          name: "suffix",
                          fn: vue.withCtx(() => [
                            vue.createElementVNode("span", _hoisted_13, vue.toDisplayString(_ctx.bankCardType), 1 /* TEXT */)
                          ]),
                          key: "3"
                        }
                      : (_ctx.isIdCard && _ctx.showIdCardInfo && _ctx.idCardInfo)
                        ? {
                            name: "suffix",
                            fn: vue.withCtx(() => [
                              vue.createVNode(_component_el_tooltip, {
                                content: _ctx.idCardInfoText,
                                placement: "top"
                              }, {
                                default: vue.withCtx(() => [
                                  vue.createElementVNode("span", _hoisted_14, vue.toDisplayString(_ctx.idCardValid ? '✓' : '✗'), 1 /* TEXT */)
                                ]),
                                _: 1 /* STABLE */
                              }, 8 /* PROPS */, ["content"])
                            ]),
                            key: "4"
                          }
                        : (_ctx.isEmail && _ctx.emailValid !== null)
                          ? {
                              name: "suffix",
                              fn: vue.withCtx(() => [
                                vue.createElementVNode("span", _hoisted_15, vue.toDisplayString(_ctx.emailValid ? '✓' : '✗'), 1 /* TEXT */)
                              ]),
                              key: "5"
                            }
                          : (_ctx.isUscc && _ctx.usccValid !== null)
                            ? {
                                name: "suffix",
                                fn: vue.withCtx(() => [
                                  vue.createElementVNode("span", _hoisted_16, vue.toDisplayString(_ctx.usccValid ? '✓' : '✗'), 1 /* TEXT */)
                                ]),
                                key: "6"
                              }
                            : undefined
                  ]), 1032 /* PROPS, DYNAMIC_SLOTS */, ["class", "size", "clearable", "modelValue", "onClick", "type", "maxlength", "minlength", "show-password", "rows", "autosize", "prefix-icon", "suffix-icon", "readonly", "placeholder", "show-word-limit", "onFocus", "onBlur", "onInput", "disabled", "autocomplete", "formatter", "parser"])
                ], 64 /* STABLE_FRAGMENT */))
  ], 2 /* CLASS */))
}

exports.render = render;
