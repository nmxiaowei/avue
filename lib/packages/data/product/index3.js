/*! Avue.js v3.9.0 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

var vue = require('vue');

const _hoisted_1 = { class: "data-product" };
const _hoisted_2 = ["onClick"];
const _hoisted_3 = { class: "data-product__img" };
const _hoisted_4 = ["src", "alt"];
const _hoisted_5 = { class: "data-product__content" };
const _hoisted_6 = { class: "data-product__name" };
const _hoisted_7 = {
  key: 0,
  class: "data-product__desc"
};
const _hoisted_8 = {
  key: 1,
  class: "data-product__rating"
};
const _hoisted_9 = { class: "data-product__rating-value" };
const _hoisted_10 = {
  key: 0,
  class: "data-product__rating-count"
};
const _hoisted_11 = { class: "data-product__price" };
const _hoisted_12 = { class: "data-product__price-current" };
const _hoisted_13 = { class: "data-product__price-symbol" };
const _hoisted_14 = {
  key: 0,
  class: "data-product__price-original"
};
const _hoisted_15 = {
  key: 1,
  class: "data-product__discount"
};
const _hoisted_16 = {
  key: 2,
  class: "data-product__info"
};
const _hoisted_17 = { key: 0 };
const _hoisted_18 = { key: 1 };
const _hoisted_19 = {
  key: 3,
  class: "data-product__actions"
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_rate = vue.resolveComponent("el-rate");
  const _component_el_button = vue.resolveComponent("el-button");
  const _component_el_col = vue.resolveComponent("el-col");
  const _component_el_row = vue.resolveComponent("el-row");

  return (vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [
    vue.createVNode(_component_el_row, { gutter: _ctx.gutter }, {
      default: vue.withCtx(() => [
        (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.data, (item, index) => {
          return (vue.openBlock(), vue.createBlock(_component_el_col, {
            md: _ctx.span,
            xs: 24,
            sm: 12,
            key: index
          }, {
            default: vue.withCtx(() => [
              vue.createElementVNode("div", {
                class: "data-product__item",
                onClick: $event => (item.click && item.click(item))
              }, [
                vue.createElementVNode("div", _hoisted_3, [
                  vue.createElementVNode("img", {
                    src: item.img,
                    alt: item.name
                  }, null, 8 /* PROPS */, _hoisted_4),
                  (item.tag)
                    ? (vue.openBlock(), vue.createElementBlock("div", {
                        key: 0,
                        class: "data-product__tag",
                        style: vue.normalizeStyle({backgroundColor: item.tagColor || '#f56c6c'})
                      }, vue.toDisplayString(item.tag), 5 /* TEXT, STYLE */))
                    : vue.createCommentVNode("v-if", true)
                ]),
                vue.createElementVNode("div", _hoisted_5, [
                  vue.createElementVNode("div", _hoisted_6, vue.toDisplayString(item.name), 1 /* TEXT */),
                  (item.desc)
                    ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_7, vue.toDisplayString(item.desc), 1 /* TEXT */))
                    : vue.createCommentVNode("v-if", true),
                  (item.rating !== undefined)
                    ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_8, [
                        vue.createVNode(_component_el_rate, {
                          modelValue: item.rating,
                          "onUpdate:modelValue": $event => ((item.rating) = $event),
                          disabled: "",
                          colors: _ctx.ratingColors
                        }, null, 8 /* PROPS */, ["modelValue", "onUpdate:modelValue", "colors"]),
                        vue.createElementVNode("span", _hoisted_9, vue.toDisplayString(item.rating), 1 /* TEXT */),
                        (item.ratingCount)
                          ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_10, "(" + vue.toDisplayString(item.ratingCount) + ")", 1 /* TEXT */))
                          : vue.createCommentVNode("v-if", true)
                      ]))
                    : vue.createCommentVNode("v-if", true),
                  vue.createElementVNode("div", _hoisted_11, [
                    vue.createElementVNode("span", _hoisted_12, [
                      vue.createElementVNode("span", _hoisted_13, vue.toDisplayString(_ctx.priceSymbol), 1 /* TEXT */),
                      vue.createTextVNode(" " + vue.toDisplayString(item.price), 1 /* TEXT */)
                    ]),
                    (item.originalPrice)
                      ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_14, vue.toDisplayString(_ctx.priceSymbol) + vue.toDisplayString(item.originalPrice), 1 /* TEXT */))
                      : vue.createCommentVNode("v-if", true),
                    (item.discount)
                      ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_15, vue.toDisplayString(item.discount), 1 /* TEXT */))
                      : vue.createCommentVNode("v-if", true)
                  ]),
                  (item.sales || item.stock)
                    ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_16, [
                        (item.sales)
                          ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_17, vue.toDisplayString(_ctx.t('product.sold', { value: item.sales })), 1 /* TEXT */))
                          : vue.createCommentVNode("v-if", true),
                        (item.stock)
                          ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_18, vue.toDisplayString(_ctx.t('product.stock', { value: item.stock })), 1 /* TEXT */))
                          : vue.createCommentVNode("v-if", true)
                      ]))
                    : vue.createCommentVNode("v-if", true),
                  (_ctx.showActions)
                    ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_19, [
                        vue.createVNode(_component_el_button, {
                          type: "primary",
                          size: "small",
                          onClick: vue.withModifiers($event => (_ctx.handleBuy(item)), ["stop"])
                        }, {
                          default: vue.withCtx(() => [
                            vue.createTextVNode(vue.toDisplayString(_ctx.buyText), 1 /* TEXT */)
                          ]),
                          _: 2 /* DYNAMIC */
                        }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["onClick"]),
                        (_ctx.showCart)
                          ? (vue.openBlock(), vue.createBlock(_component_el_button, {
                              key: 0,
                              size: "small",
                              onClick: vue.withModifiers($event => (_ctx.handleCart(item)), ["stop"])
                            }, {
                              default: vue.withCtx(() => [
                                vue.createTextVNode(vue.toDisplayString(_ctx.t('product.addToCart')), 1 /* TEXT */)
                              ]),
                              _: 2 /* DYNAMIC */
                            }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["onClick"]))
                          : vue.createCommentVNode("v-if", true)
                      ]))
                    : vue.createCommentVNode("v-if", true)
                ])
              ], 8 /* PROPS */, _hoisted_2)
            ]),
            _: 2 /* DYNAMIC */
          }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["md"]))
        }), 128 /* KEYED_FRAGMENT */))
      ]),
      _: 1 /* STABLE */
    }, 8 /* PROPS */, ["gutter"])
  ]))
}

exports.render = render;
