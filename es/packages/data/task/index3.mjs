/*! Avue.js v3.9.3 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { resolveComponent, openBlock, createElementBlock, createElementVNode, toDisplayString, createCommentVNode, createVNode, Fragment, renderList, normalizeClass, createBlock, withCtx, createTextVNode } from 'vue';

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
  const _component_el_progress = resolveComponent("el-progress");
  const _component_el_checkbox = resolveComponent("el-checkbox");
  const _component_el_tag = resolveComponent("el-tag");

  return (openBlock(), createElementBlock("div", _hoisted_1, [
    (_ctx.title)
      ? (openBlock(), createElementBlock("div", _hoisted_2, [
          createElementVNode("span", _hoisted_3, toDisplayString(_ctx.title), 1 /* TEXT */),
          createElementVNode("span", _hoisted_4, toDisplayString(_ctx.completedCount) + "/" + toDisplayString(_ctx.data.length), 1 /* TEXT */)
        ]))
      : createCommentVNode("v-if", true),
    createElementVNode("div", _hoisted_5, [
      createVNode(_component_el_progress, {
        percentage: _ctx.progressPercent,
        "stroke-width": 8,
        "show-text": false
      }, null, 8 /* PROPS */, ["percentage"])
    ]),
    createElementVNode("div", _hoisted_6, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.data, (item, index) => {
        return (openBlock(), createElementBlock("div", {
          class: normalizeClass(["data-task__item", {'is-completed': item.completed}]),
          key: index
        }, [
          createVNode(_component_el_checkbox, {
            modelValue: item.completed,
            "onUpdate:modelValue": $event => ((item.completed) = $event),
            onChange: $event => (_ctx.handleChange(item, index))
          }, null, 8 /* PROPS */, ["modelValue", "onUpdate:modelValue", "onChange"]),
          createElementVNode("div", _hoisted_7, [
            createElementVNode("div", _hoisted_8, toDisplayString(item.title), 1 /* TEXT */),
            (item.deadline || item.priority)
              ? (openBlock(), createElementBlock("div", _hoisted_9, [
                  (item.deadline)
                    ? (openBlock(), createElementBlock("span", _hoisted_10, toDisplayString(item.deadline), 1 /* TEXT */))
                    : createCommentVNode("v-if", true),
                  (item.priority)
                    ? (openBlock(), createBlock(_component_el_tag, {
                        key: 1,
                        size: "small",
                        type: _ctx.getPriorityType(item.priority)
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(item.priority), 1 /* TEXT */)
                        ]),
                        _: 2 /* DYNAMIC */
                      }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["type"]))
                    : createCommentVNode("v-if", true)
                ]))
              : createCommentVNode("v-if", true)
          ])
        ], 2 /* CLASS */))
      }), 128 /* KEYED_FRAGMENT */))
    ])
  ]))
}

export { render };
