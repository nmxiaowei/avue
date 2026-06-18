/*! Avue.js v3.9.2 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { resolveComponent, openBlock, createElementBlock, createVNode, withCtx, Fragment, renderList, createBlock, createElementVNode, normalizeStyle, toDisplayString, createTextVNode, createCommentVNode } from 'vue';

const _hoisted_1 = { class: "data-dashboard" };
const _hoisted_2 = { class: "data-dashboard__header" };
const _hoisted_3 = { class: "data-dashboard__title" };
const _hoisted_4 = { class: "data-dashboard__value" };
const _hoisted_5 = {
  key: 0,
  class: "data-dashboard__unit"
};
const _hoisted_6 = {
  key: 0,
  class: "data-dashboard__chart"
};
const _hoisted_7 = {
  key: 1,
  class: "data-dashboard__footer"
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_tag = resolveComponent("el-tag");
  const _component_avue_count_up = resolveComponent("avue-count-up");
  const _component_el_col = resolveComponent("el-col");
  const _component_el_row = resolveComponent("el-row");

  return (openBlock(), createElementBlock("div", _hoisted_1, [
    createVNode(_component_el_row, { gutter: _ctx.gutter }, {
      default: withCtx(() => [
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.data, (item, index) => {
          return (openBlock(), createBlock(_component_el_col, {
            md: _ctx.span,
            xs: 24,
            sm: 12,
            key: index
          }, {
            default: withCtx(() => [
              createElementVNode("div", {
                class: "data-dashboard__item",
                style: normalizeStyle(_ctx.getItemStyle(item))
              }, [
                createElementVNode("div", _hoisted_2, [
                  createElementVNode("span", _hoisted_3, toDisplayString(item.title), 1 /* TEXT */),
                  (item.status)
                    ? (openBlock(), createBlock(_component_el_tag, {
                        key: 0,
                        size: "small",
                        type: item.statusType || ''
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(item.status), 1 /* TEXT */)
                        ]),
                        _: 2 /* DYNAMIC */
                      }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["type"]))
                    : createCommentVNode("v-if", true)
                ]),
                createElementVNode("div", _hoisted_4, [
                  createVNode(_component_avue_count_up, {
                    animation: _ctx.animation,
                    decimals: item.decimals || 0,
                    end: item.value
                  }, null, 8 /* PROPS */, ["animation", "decimals", "end"]),
                  (item.unit)
                    ? (openBlock(), createElementBlock("span", _hoisted_5, toDisplayString(item.unit), 1 /* TEXT */))
                    : createCommentVNode("v-if", true)
                ]),
                (item.chartData)
                  ? (openBlock(), createElementBlock("div", _hoisted_6, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(item.chartData, (bar, idx) => {
                        return (openBlock(), createElementBlock("div", {
                          class: "data-dashboard__bar",
                          key: idx,
                          style: normalizeStyle({height: bar + '%', backgroundColor: item.chartColor || '#409eff'})
                        }, null, 4 /* STYLE */))
                      }), 128 /* KEYED_FRAGMENT */))
                    ]))
                  : createCommentVNode("v-if", true),
                (item.footerText)
                  ? (openBlock(), createElementBlock("div", _hoisted_7, [
                      createElementVNode("span", null, toDisplayString(item.footerText), 1 /* TEXT */),
                      (item.footerValue)
                        ? (openBlock(), createElementBlock("span", {
                            key: 0,
                            style: normalizeStyle({color: item.footerColor})
                          }, toDisplayString(item.footerValue), 5 /* TEXT, STYLE */))
                        : createCommentVNode("v-if", true)
                    ]))
                  : createCommentVNode("v-if", true)
              ], 4 /* STYLE */)
            ]),
            _: 2 /* DYNAMIC */
          }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["md"]))
        }), 128 /* KEYED_FRAGMENT */))
      ]),
      _: 1 /* STABLE */
    }, 8 /* PROPS */, ["gutter"])
  ]))
}

export { render };
