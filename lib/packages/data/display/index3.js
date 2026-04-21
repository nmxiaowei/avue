/*! Avue.js v3.8.6 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

var vue = require('vue');

const _hoisted_1 = { class: "avue-data-display" };
const _hoisted_2 = ["href", "onClick", "target"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_avue_count_up = vue.resolveComponent("avue-count-up");
  const _component_el_col = vue.resolveComponent("el-col");
  const _component_el_row = vue.resolveComponent("el-row");

  return (vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [
    vue.createVNode(_component_el_row, { span: 24 }, {
      default: vue.withCtx(() => [
        (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.data, (item, index) => {
          return (vue.openBlock(), vue.createBlock(_component_el_col, {
            key: index,
            md: _ctx.span,
            xs: 12,
            sm: 12
          }, {
            default: vue.withCtx(() => [
              vue.createElementVNode("div", {
                class: "item",
                style: vue.normalizeStyle({color:_ctx.color})
              }, [
                vue.createElementVNode("a", {
                  href: item.href,
                  onClick: $event => (item.click&&item.click(item)),
                  target: item.target
                }, [
                  vue.createVNode(_component_avue_count_up, {
                    animation: item.animation || _ctx.animation,
                    decimals: item.decimals || _ctx.decimals,
                    class: "count",
                    style: vue.normalizeStyle({color:item.color}),
                    end: item.count
                  }, null, 8 /* PROPS */, ["animation", "decimals", "style", "end"]),
                  _cache[0] || (_cache[0] = vue.createElementVNode("span", { class: "splitLine" }, null, -1 /* HOISTED */)),
                  vue.createElementVNode("div", {
                    class: "title",
                    style: vue.normalizeStyle({color:item.fontColor})
                  }, vue.toDisplayString(item.title), 5 /* TEXT, STYLE */)
                ], 8 /* PROPS */, _hoisted_2)
              ], 4 /* STYLE */)
            ]),
            _: 2 /* DYNAMIC */
          }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["md"]))
        }), 128 /* KEYED_FRAGMENT */))
      ]),
      _: 1 /* STABLE */
    })
  ]))
}

exports.render = render;
