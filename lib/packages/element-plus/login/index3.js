/*! Avue.js v3.9.4 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

var vue = require('vue');

const _hoisted_1 = ["disabled"];
const _hoisted_2 = ["src"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_input = vue.resolveComponent("el-input");
  const _component_el_tooltip = vue.resolveComponent("el-tooltip");
  const _component_el_form_item = vue.resolveComponent("el-form-item");
  const _component_el_button = vue.resolveComponent("el-button");
  const _component_el_form = vue.resolveComponent("el-form");

  return (vue.openBlock(), vue.createElementBlock("div", {
    class: vue.normalizeClass(_ctx.b()),
    style: vue.normalizeStyle({ width: _ctx.setPx(_ctx.width) })
  }, [
    vue.createVNode(_component_el_form, {
      ref: "form",
      model: _ctx.form,
      size: _ctx.$AVUE.size,
      "label-width": _ctx.formLabelWidth,
      "label-suffix": ":",
      onKeyup: vue.withKeys(_ctx.onSubmit, ["enter"])
    }, {
      default: vue.withCtx(() => [
        (!_ctx.username.hide)
          ? (vue.openBlock(), vue.createBlock(_component_el_form_item, {
              key: 0,
              label: _ctx.username.label || _ctx.t('login.usernameLabel'),
              rules: _ctx.username.rules,
              prop: "username"
            }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_el_tooltip, {
                  content: _ctx.username.tip,
                  disabled: _ctx.username.tip === undefined,
                  placement: "top-start"
                }, {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_el_input, {
                      modelValue: _ctx.form.username,
                      "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((_ctx.form.username) = $event)),
                      "prefix-icon": _ctx.username.prefixIcon || 'el-icon-user',
                      placeholder: _ctx.username.placeholder || _ctx.t('login.usernamePlaceholder'),
                      autocomplete: _ctx.username.autocomplete || 'username',
                      disabled: _ctx.disabled || _ctx.loading
                    }, null, 8 /* PROPS */, ["modelValue", "prefix-icon", "placeholder", "autocomplete", "disabled"])
                  ]),
                  _: 1 /* STABLE */
                }, 8 /* PROPS */, ["content", "disabled"])
              ]),
              _: 1 /* STABLE */
            }, 8 /* PROPS */, ["label", "rules"]))
          : vue.createCommentVNode("v-if", true),
        (!_ctx.password.hide)
          ? (vue.openBlock(), vue.createBlock(_component_el_form_item, {
              key: 1,
              label: _ctx.password.label || _ctx.t('login.passwordLabel'),
              rules: _ctx.password.rules,
              prop: "password"
            }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_el_tooltip, {
                  content: _ctx.password.tip,
                  disabled: _ctx.password.tip === undefined,
                  placement: "top-start"
                }, {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_el_input, {
                      modelValue: _ctx.form.password,
                      "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((_ctx.form.password) = $event)),
                      type: "password",
                      "show-password": "",
                      "prefix-icon": _ctx.password.prefixIcon || 'el-icon-unlock',
                      placeholder: _ctx.password.placeholder || _ctx.t('login.passwordPlaceholder'),
                      autocomplete: _ctx.password.autocomplete || 'current-password',
                      disabled: _ctx.disabled || _ctx.loading
                    }, null, 8 /* PROPS */, ["modelValue", "prefix-icon", "placeholder", "autocomplete", "disabled"])
                  ]),
                  _: 1 /* STABLE */
                }, 8 /* PROPS */, ["content", "disabled"])
              ]),
              _: 1 /* STABLE */
            }, 8 /* PROPS */, ["label", "rules"]))
          : vue.createCommentVNode("v-if", true),
        (!_ctx.code.hide)
          ? (vue.openBlock(), vue.createBlock(_component_el_form_item, {
              key: 2,
              label: _ctx.code.label || _ctx.t('login.codeLabel'),
              rules: _ctx.code.rules,
              prop: "code"
            }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_el_tooltip, {
                  content: _ctx.code.tip,
                  disabled: _ctx.code.tip === undefined,
                  placement: "top-start"
                }, {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_el_input, {
                      modelValue: _ctx.form.code,
                      "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => ((_ctx.form.code) = $event)),
                      "prefix-icon": _ctx.code.prefixIcon || 'el-icon-c-scale-to-original',
                      placeholder: _ctx.code.placeholder || _ctx.t('login.codePlaceholder'),
                      autocomplete: _ctx.code.autocomplete || 'one-time-code',
                      disabled: _ctx.disabled || _ctx.loading
                    }, {
                      append: vue.withCtx(() => [
                        (_ctx.isPhone)
                          ? (vue.openBlock(), vue.createBlock(_component_el_button, {
                              key: 0,
                              type: "primary",
                              class: vue.normalizeClass(_ctx.b('send')),
                              disabled: _ctx.sendDisabled || _ctx.disabled || _ctx.loading,
                              loading: _ctx.sending,
                              onClick: _ctx.onSend
                            }, {
                              default: vue.withCtx(() => [
                                vue.createTextVNode(vue.toDisplayString(_ctx.sendText), 1 /* TEXT */)
                              ]),
                              _: 1 /* STABLE */
                            }, 8 /* PROPS */, ["class", "disabled", "loading", "onClick"]))
                          : (_ctx.isImg)
                            ? (vue.openBlock(), vue.createElementBlock("button", {
                                key: 1,
                                type: "button",
                                class: vue.normalizeClass(_ctx.b('captcha')),
                                disabled: _ctx.disabled || _ctx.loading,
                                "aria-label": "刷新验证码",
                                onClick: _cache[2] || (_cache[2] = (...args) => (_ctx.onRefresh && _ctx.onRefresh(...args)))
                              }, [
                                vue.createElementVNode("img", {
                                  src: _ctx.codesrc,
                                  alt: "验证码"
                                }, null, 8 /* PROPS */, _hoisted_2)
                              ], 10 /* CLASS, PROPS */, _hoisted_1))
                            : vue.createCommentVNode("v-if", true)
                      ]),
                      _: 1 /* STABLE */
                    }, 8 /* PROPS */, ["modelValue", "prefix-icon", "placeholder", "autocomplete", "disabled"])
                  ]),
                  _: 1 /* STABLE */
                }, 8 /* PROPS */, ["content", "disabled"])
              ]),
              _: 1 /* STABLE */
            }, 8 /* PROPS */, ["label", "rules"]))
          : vue.createCommentVNode("v-if", true),
        vue.createVNode(_component_el_form_item, {
          class: vue.normalizeClass(_ctx.b('actions'))
        }, {
          default: vue.withCtx(() => [
            vue.createVNode(_component_el_button, {
              type: "primary",
              "native-type": "button",
              class: vue.normalizeClass(_ctx.b('submit')),
              disabled: _ctx.disabled,
              loading: _ctx.loading,
              onClick: _ctx.onSubmit
            }, {
              default: vue.withCtx(() => [
                vue.createTextVNode(vue.toDisplayString(_ctx.submitText), 1 /* TEXT */)
              ]),
              _: 1 /* STABLE */
            }, 8 /* PROPS */, ["class", "disabled", "loading", "onClick"])
          ]),
          _: 1 /* STABLE */
        }, 8 /* PROPS */, ["class"]),
        vue.renderSlot(_ctx.$slots, "footer", { form: _ctx.form })
      ]),
      _: 3 /* FORWARDED */
    }, 8 /* PROPS */, ["model", "size", "label-width", "onKeyup"])
  ], 6 /* CLASS, STYLE */))
}

exports.render = render;
