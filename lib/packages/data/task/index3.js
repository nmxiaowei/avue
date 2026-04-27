/*! Avue.js v3.9.0 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

var vue = require('vue');

const _hoisted_1 = { class: "data-task" };
const _hoisted_2 = {
  key: 0,
  class: "data-task__header"
};
const _hoisted_3 = { class: "data-task__title" };
const _hoisted_4 = { class: "data-task__count" };
const _hoisted_5 = { class: "data-task__progress" };
const _hoisted_6 = { class: "data-task__list" };
const _hoisted_7 = { class: "data-task__content" };
const _hoisted_8 = { class: "data-task__text" };
const _hoisted_9 = {
  key: 0,
  class: "data-task__meta"
};
const _hoisted_10 = {
  key: 0,
  class: "data-task__deadline"
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_progress = vue.resolveComponent("el-progress");
  const _component_el_checkbox = vue.resolveComponent("el-checkbox");
  const _component_el_tag = vue.resolveComponent("el-tag");

  return (vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [
    (_ctx.title)
      ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_2, [
          vue.createElementVNode("span", _hoisted_3, vue.toDisplayString(_ctx.title), 1 /* TEXT */),
          vue.createElementVNode("span", _hoisted_4, vue.toDisplayString(_ctx.completedCount) + "/" + vue.toDisplayString(_ctx.data.length), 1 /* TEXT */)
        ]))
      : vue.createCommentVNode("v-if", true),
    vue.createElementVNode("div", _hoisted_5, [
      vue.createVNode(_component_el_progress, {
        percentage: _ctx.progressPercent,
        "stroke-width": 8,
        "show-text": false
      }, null, 8 /* PROPS */, ["percentage"])
    ]),
    vue.createElementVNode("div", _hoisted_6, [
      (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.data, (item, index) => {
        return (vue.openBlock(), vue.createElementBlock("div", {
          class: vue.normalizeClass(["data-task__item", {'is-completed': item.completed}]),
          key: index
        }, [
          vue.createVNode(_component_el_checkbox, {
            modelValue: item.completed,
            "onUpdate:modelValue": $event => ((item.completed) = $event),
            onChange: $event => (_ctx.handleChange(item, index))
          }, null, 8 /* PROPS */, ["modelValue", "onUpdate:modelValue", "onChange"]),
          vue.createElementVNode("div", _hoisted_7, [
            vue.createElementVNode("div", _hoisted_8, vue.toDisplayString(item.title), 1 /* TEXT */),
            (item.deadline || item.priority)
              ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_9, [
                  (item.deadline)
                    ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_10, vue.toDisplayString(item.deadline), 1 /* TEXT */))
                    : vue.createCommentVNode("v-if", true),
                  (item.priority)
                    ? (vue.openBlock(), vue.createBlock(_component_el_tag, {
                        key: 1,
                        size: "small",
                        type: _ctx.getPriorityType(item.priority)
                      }, {
                        default: vue.withCtx(() => [
                          vue.createTextVNode(vue.toDisplayString(item.priority), 1 /* TEXT */)
                        ]),
                        _: 2 /* DYNAMIC */
                      }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["type"]))
                    : vue.createCommentVNode("v-if", true)
                ]))
              : vue.createCommentVNode("v-if", true)
          ])
        ], 2 /* CLASS */))
      }), 128 /* KEYED_FRAGMENT */))
    ])
  ]))
}

exports.render = render;
