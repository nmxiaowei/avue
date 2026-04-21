/*! Avue.js v3.8.6 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { resolveComponent, openBlock, createElementBlock, normalizeStyle, normalizeClass, createVNode, withCtx, createBlock, createCommentVNode, createTextVNode, toDisplayString, createElementVNode } from 'vue';

const _hoisted_1 = { key: 1 };
const _hoisted_2 = ["src"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_input = resolveComponent("el-input");
  const _component_el_tooltip = resolveComponent("el-tooltip");
  const _component_el_form_item = resolveComponent("el-form-item");
  const _component_el_button = resolveComponent("el-button");
  const _component_el_form = resolveComponent("el-form");

  return (openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.b()),
    style: normalizeStyle({width:_ctx.setPx(_ctx.width)})
  }, [
    createVNode(_component_el_form, {
      model: _ctx.form,
      ref: "form",
      size: _ctx.$AVUE.size,
      "label-suffix": ":",
      "label-width": _ctx.setPx(_ctx.labelWidth)
    }, {
      default: withCtx(() => [
        (!_ctx.username.hide)
          ? (openBlock(), createBlock(_component_el_form_item, {
              key: 0,
              label: _ctx.username.label || _ctx.t('login.usernameLabel'),
              rules: _ctx.username.rules,
              "label-width": _ctx.setPx(_ctx.username.labelWidth),
              prop: "username"
            }, {
              default: withCtx(() => [
                createVNode(_component_el_tooltip, {
                  content: _ctx.username.tip,
                  disabled: _ctx.username.tip===undefined,
                  placement: "top-start"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_input, {
                      modelValue: _ctx.form.username,
                      "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((_ctx.form.username) = $event)),
                      "prefix-icon": _ctx.username.prefixIcon || 'el-icon-user',
                      placeholder: _ctx.username.placeholder || _ctx.t('login.usernamePlaceholder'),
                      autocomplete: _ctx.username.autocomplete
                    }, null, 8 /* PROPS */, ["modelValue", "prefix-icon", "placeholder", "autocomplete"])
                  ]),
                  _: 1 /* STABLE */
                }, 8 /* PROPS */, ["content", "disabled"])
              ]),
              _: 1 /* STABLE */
            }, 8 /* PROPS */, ["label", "rules", "label-width"]))
          : createCommentVNode("v-if", true),
        (!_ctx.password.hide)
          ? (openBlock(), createBlock(_component_el_form_item, {
              key: 1,
              label: _ctx.password.label || _ctx.t('login.passwordLabel'),
              rules: _ctx.password.rules,
              "label-width": _ctx.setPx(_ctx.password.labelWidth),
              prop: "password"
            }, {
              default: withCtx(() => [
                createVNode(_component_el_tooltip, {
                  content: _ctx.password.tip,
                  disabled: _ctx.password.tip===undefined,
                  placement: "top-start"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_input, {
                      type: "password",
                      "prefix-icon": _ctx.password.prefixIcon || 'el-icon-unlock',
                      placeholder: _ctx.password.placeholder || _ctx.t('login.passwordPlaceholder'),
                      "show-password": "",
                      modelValue: _ctx.form.password,
                      "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((_ctx.form.password) = $event)),
                      autocomplete: _ctx.password.autocomplete
                    }, null, 8 /* PROPS */, ["prefix-icon", "placeholder", "modelValue", "autocomplete"])
                  ]),
                  _: 1 /* STABLE */
                }, 8 /* PROPS */, ["content", "disabled"])
              ]),
              _: 1 /* STABLE */
            }, 8 /* PROPS */, ["label", "rules", "label-width"]))
          : createCommentVNode("v-if", true),
        (!_ctx.code.hide)
          ? (openBlock(), createBlock(_component_el_form_item, {
              key: 2,
              label: _ctx.code.label || _ctx.t('login.codeLabel'),
              rules: _ctx.code.rules,
              "label-width": _ctx.setPx(_ctx.code.labelWidth),
              prop: "code"
            }, {
              default: withCtx(() => [
                createVNode(_component_el_tooltip, {
                  content: _ctx.code.tip,
                  disabled: _ctx.code.tip===undefined,
                  placement: "top-start"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_el_input, {
                      modelValue: _ctx.form.code,
                      "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => ((_ctx.form.code) = $event)),
                      "prefix-icon": _ctx.code.prefixIcon || 'el-icon-c-scale-to-original',
                      placeholder: _ctx.code.placeholder || _ctx.t('login.codePlaceholder'),
                      autocomplete: _ctx.code.autocomplete
                    }, {
                      append: withCtx(() => [
                        (_ctx.isPhone)
                          ? (openBlock(), createBlock(_component_el_button, {
                              key: 0,
                              type: "primary",
                              class: normalizeClass(_ctx.b('send')),
                              disabled: _ctx.sendDisabled,
                              onClick: _ctx.onSend
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(_ctx.sendText), 1 /* TEXT */)
                              ]),
                              _: 1 /* STABLE */
                            }, 8 /* PROPS */, ["class", "disabled", "onClick"]))
                          : createCommentVNode("v-if", true),
                        (_ctx.isImg)
                          ? (openBlock(), createElementBlock("span", _hoisted_1, [
                              createElementVNode("img", {
                                src: _ctx.codesrc,
                                alt: "",
                                onClick: _cache[2] || (_cache[2] = (...args) => (_ctx.onRefresh && _ctx.onRefresh(...args))),
                                width: "80",
                                height: "25"
                              }, null, 8 /* PROPS */, _hoisted_2)
                            ]))
                          : createCommentVNode("v-if", true)
                      ]),
                      _: 1 /* STABLE */
                    }, 8 /* PROPS */, ["modelValue", "prefix-icon", "placeholder", "autocomplete"])
                  ]),
                  _: 1 /* STABLE */
                }, 8 /* PROPS */, ["content", "disabled"])
              ]),
              _: 1 /* STABLE */
            }, 8 /* PROPS */, ["label", "rules", "label-width"]))
          : createCommentVNode("v-if", true),
        createVNode(_component_el_form_item, null, {
          default: withCtx(() => [
            createVNode(_component_el_button, {
              type: "primary",
              onClick: _ctx.onSubmit,
              class: normalizeClass(_ctx.b('submit'))
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(_ctx.t('login.submitBtn')), 1 /* TEXT */)
              ]),
              _: 1 /* STABLE */
            }, 8 /* PROPS */, ["onClick", "class"])
          ]),
          _: 1 /* STABLE */
        })
      ]),
      _: 1 /* STABLE */
    }, 8 /* PROPS */, ["model", "size", "label-width"])
  ], 6 /* CLASS, STYLE */))
}

export { render };
