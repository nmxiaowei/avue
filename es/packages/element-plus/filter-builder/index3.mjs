/*! Avue.js v3.9.4 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { resolveComponent, openBlock, createElementBlock, normalizeClass, createElementVNode, createVNode, withCtx, createTextVNode, createBlock, createCommentVNode, Fragment, renderList } from 'vue';

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_radio_button = resolveComponent("el-radio-button");
  const _component_el_radio_group = resolveComponent("el-radio-group");
  const _component_el_button = resolveComponent("el-button");
  const _component_el_icon_plus = resolveComponent("el-icon-plus");
  const _component_el_icon = resolveComponent("el-icon");
  const _component_el_option = resolveComponent("el-option");
  const _component_el_select = resolveComponent("el-select");
  const _component_el_date_picker = resolveComponent("el-date-picker");
  const _component_el_input_number = resolveComponent("el-input-number");
  const _component_el_input = resolveComponent("el-input");
  const _component_el_icon_delete = resolveComponent("el-icon-delete");
  const _component_el_empty = resolveComponent("el-empty");

  return (openBlock(), createElementBlock("section", {
    class: normalizeClass(_ctx.b())
  }, [
    createElementVNode("header", {
      class: normalizeClass(_ctx.b('header'))
    }, [
      createElementVNode("div", {
        class: normalizeClass(_ctx.b('logic'))
      }, [
        createElementVNode("span", {
          class: normalizeClass(_ctx.b('logic-label'))
        }, "满足以下", 2 /* CLASS */),
        createVNode(_component_el_radio_group, {
          modelValue: _ctx.filter.logic,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((_ctx.filter.logic) = $event)),
          disabled: _ctx.disabled,
          size: "small",
          onChange: _ctx.emitChange
        }, {
          default: withCtx(() => [
            createVNode(_component_el_radio_button, { label: "and" }, {
              default: withCtx(() => _cache[1] || (_cache[1] = [
                createTextVNode("所有条件")
              ])),
              _: 1 /* STABLE */
            }),
            createVNode(_component_el_radio_button, { label: "or" }, {
              default: withCtx(() => _cache[2] || (_cache[2] = [
                createTextVNode("任一条件")
              ])),
              _: 1 /* STABLE */
            })
          ]),
          _: 1 /* STABLE */
        }, 8 /* PROPS */, ["modelValue", "disabled", "onChange"])
      ], 2 /* CLASS */),
      createElementVNode("div", {
        class: normalizeClass(_ctx.b('actions'))
      }, [
        (_ctx.filter.rules.length)
          ? (openBlock(), createBlock(_component_el_button, {
              key: 0,
              text: "",
              disabled: _ctx.disabled,
              onClick: _ctx.clearRules
            }, {
              default: withCtx(() => _cache[3] || (_cache[3] = [
                createTextVNode(" 清空 ")
              ])),
              _: 1 /* STABLE */
            }, 8 /* PROPS */, ["disabled", "onClick"]))
          : createCommentVNode("v-if", true),
        createVNode(_component_el_button, {
          type: "primary",
          disabled: _ctx.disabled || !_ctx.fields.length,
          onClick: _ctx.addRule
        }, {
          default: withCtx(() => [
            createVNode(_component_el_icon, null, {
              default: withCtx(() => [
                createVNode(_component_el_icon_plus)
              ]),
              _: 1 /* STABLE */
            }),
            _cache[4] || (_cache[4] = createTextVNode(" 添加条件 "))
          ]),
          _: 1 /* STABLE */
        }, 8 /* PROPS */, ["disabled", "onClick"])
      ], 2 /* CLASS */)
    ], 2 /* CLASS */),
    (_ctx.filter.rules.length)
      ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(_ctx.b('rules'))
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.filter.rules, (rule) => {
            return (openBlock(), createElementBlock("div", {
              key: rule.id,
              class: normalizeClass(_ctx.b('rule'))
            }, [
              createVNode(_component_el_select, {
                modelValue: rule.field,
                "onUpdate:modelValue": $event => ((rule.field) = $event),
                disabled: _ctx.disabled,
                filterable: "",
                placeholder: "选择字段",
                onChange: $event => (_ctx.handleFieldChange(rule))
              }, {
                default: withCtx(() => [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.fields, (field) => {
                    return (openBlock(), createBlock(_component_el_option, {
                      key: field.value,
                      label: field.label,
                      value: field.value
                    }, null, 8 /* PROPS */, ["label", "value"]))
                  }), 128 /* KEYED_FRAGMENT */))
                ]),
                _: 2 /* DYNAMIC */
              }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["modelValue", "onUpdate:modelValue", "disabled", "onChange"]),
              createVNode(_component_el_select, {
                modelValue: rule.operator,
                "onUpdate:modelValue": $event => ((rule.operator) = $event),
                disabled: _ctx.disabled || !rule.field,
                placeholder: "选择条件",
                onChange: _ctx.emitChange
              }, {
                default: withCtx(() => [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.getOperators(rule), (operator) => {
                    return (openBlock(), createBlock(_component_el_option, {
                      key: operator.value,
                      label: operator.label,
                      value: operator.value
                    }, null, 8 /* PROPS */, ["label", "value"]))
                  }), 128 /* KEYED_FRAGMENT */))
                ]),
                _: 2 /* DYNAMIC */
              }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["modelValue", "onUpdate:modelValue", "disabled", "onChange"]),
              (_ctx.needsValue(rule))
                ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                    (_ctx.getFieldType(rule) === 'select')
                      ? (openBlock(), createBlock(_component_el_select, {
                          key: 0,
                          modelValue: rule.value,
                          "onUpdate:modelValue": $event => ((rule.value) = $event),
                          disabled: _ctx.disabled || !rule.field,
                          multiple: _ctx.isMultipleValue(rule),
                          clearable: "",
                          filterable: "",
                          "collapse-tags": "",
                          "collapse-tags-tooltip": "",
                          placeholder: "选择值",
                          onChange: _ctx.emitChange
                        }, {
                          default: withCtx(() => [
                            (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.getFieldOptions(rule), (option) => {
                              return (openBlock(), createBlock(_component_el_option, {
                                key: _ctx.getOptionValue(option),
                                label: _ctx.getOptionLabel(option),
                                value: _ctx.getOptionValue(option)
                              }, null, 8 /* PROPS */, ["label", "value"]))
                            }), 128 /* KEYED_FRAGMENT */))
                          ]),
                          _: 2 /* DYNAMIC */
                        }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["modelValue", "onUpdate:modelValue", "disabled", "multiple", "onChange"]))
                      : (_ctx.getFieldType(rule) === 'boolean')
                        ? (openBlock(), createBlock(_component_el_select, {
                            key: 1,
                            modelValue: rule.value,
                            "onUpdate:modelValue": $event => ((rule.value) = $event),
                            disabled: _ctx.disabled || !rule.field,
                            clearable: "",
                            placeholder: "选择值",
                            onChange: _ctx.emitChange
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_el_option, {
                                label: "是",
                                value: true
                              }),
                              createVNode(_component_el_option, {
                                label: "否",
                                value: false
                              })
                            ]),
                            _: 2 /* DYNAMIC */
                          }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["modelValue", "onUpdate:modelValue", "disabled", "onChange"]))
                        : (_ctx.getFieldType(rule) === 'date')
                          ? (openBlock(), createBlock(_component_el_date_picker, {
                              key: 2,
                              modelValue: rule.value,
                              "onUpdate:modelValue": $event => ((rule.value) = $event),
                              disabled: _ctx.disabled || !rule.field,
                              clearable: "",
                              type: "date",
                              "value-format": "YYYY-MM-DD",
                              placeholder: "选择日期",
                              onChange: _ctx.emitChange
                            }, null, 8 /* PROPS */, ["modelValue", "onUpdate:modelValue", "disabled", "onChange"]))
                          : (_ctx.getFieldType(rule) === 'datetime')
                            ? (openBlock(), createBlock(_component_el_date_picker, {
                                key: 3,
                                modelValue: rule.value,
                                "onUpdate:modelValue": $event => ((rule.value) = $event),
                                disabled: _ctx.disabled || !rule.field,
                                clearable: "",
                                type: "datetime",
                                "value-format": "YYYY-MM-DD HH:mm:ss",
                                placeholder: "选择日期时间",
                                onChange: _ctx.emitChange
                              }, null, 8 /* PROPS */, ["modelValue", "onUpdate:modelValue", "disabled", "onChange"]))
                            : (_ctx.getFieldType(rule) === 'daterange')
                              ? (openBlock(), createBlock(_component_el_date_picker, {
                                  key: 4,
                                  modelValue: rule.value,
                                  "onUpdate:modelValue": $event => ((rule.value) = $event),
                                  disabled: _ctx.disabled || !rule.field,
                                  clearable: "",
                                  type: "daterange",
                                  "value-format": "YYYY-MM-DD",
                                  "range-separator": "至",
                                  "start-placeholder": "开始日期",
                                  "end-placeholder": "结束日期",
                                  onChange: _ctx.emitChange
                                }, null, 8 /* PROPS */, ["modelValue", "onUpdate:modelValue", "disabled", "onChange"]))
                              : (_ctx.getFieldType(rule) === 'number')
                                ? (openBlock(), createBlock(_component_el_input_number, {
                                    key: 5,
                                    modelValue: rule.value,
                                    "onUpdate:modelValue": $event => ((rule.value) = $event),
                                    disabled: _ctx.disabled || !rule.field,
                                    "controls-position": "right",
                                    precision: _ctx.getField(rule).precision,
                                    step: _ctx.getField(rule).step || 1,
                                    onChange: _ctx.emitChange
                                  }, null, 8 /* PROPS */, ["modelValue", "onUpdate:modelValue", "disabled", "precision", "step", "onChange"]))
                                : (openBlock(), createBlock(_component_el_input, {
                                    key: 6,
                                    modelValue: rule.value,
                                    "onUpdate:modelValue": $event => ((rule.value) = $event),
                                    disabled: _ctx.disabled || !rule.field,
                                    clearable: "",
                                    placeholder: _ctx.getField(rule).placeholder || '输入值',
                                    onChange: _ctx.emitChange
                                  }, null, 8 /* PROPS */, ["modelValue", "onUpdate:modelValue", "disabled", "placeholder", "onChange"]))
                  ], 64 /* STABLE_FRAGMENT */))
                : (openBlock(), createElementBlock("div", {
                    key: 1,
                    class: normalizeClass(_ctx.b('empty-value'))
                  }, "无需填写值", 2 /* CLASS */)),
              createVNode(_component_el_button, {
                class: normalizeClass(_ctx.b('remove')),
                disabled: _ctx.disabled,
                text: "",
                type: "danger",
                "aria-label": `删除${_ctx.getField(rule).label || '条件'}`,
                onClick: $event => (_ctx.removeRule(rule.id))
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_icon, null, {
                    default: withCtx(() => [
                      createVNode(_component_el_icon_delete)
                    ]),
                    _: 1 /* STABLE */
                  })
                ]),
                _: 2 /* DYNAMIC */
              }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["class", "disabled", "aria-label", "onClick"])
            ], 2 /* CLASS */))
          }), 128 /* KEYED_FRAGMENT */))
        ], 2 /* CLASS */))
      : (openBlock(), createBlock(_component_el_empty, {
          key: 1,
          "image-size": 72,
          description: _ctx.emptyText
        }, {
          default: withCtx(() => [
            createVNode(_component_el_button, {
              type: "primary",
              disabled: _ctx.disabled || !_ctx.fields.length,
              onClick: _ctx.addRule
            }, {
              default: withCtx(() => _cache[5] || (_cache[5] = [
                createTextVNode(" 添加第一个条件 ")
              ])),
              _: 1 /* STABLE */
            }, 8 /* PROPS */, ["disabled", "onClick"])
          ]),
          _: 1 /* STABLE */
        }, 8 /* PROPS */, ["description"]))
  ], 2 /* CLASS */))
}

export { render };
