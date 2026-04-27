/*! Avue.js v3.9.0 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import { resolveComponent, openBlock, createElementBlock, createVNode, withCtx, Fragment, renderList, createBlock, createElementVNode, normalizeStyle, toDisplayString, createCommentVNode, createTextVNode, withModifiers } from 'vue';

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
  const _component_el_rate = resolveComponent("el-rate");
  const _component_el_button = resolveComponent("el-button");
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
                class: "data-product__item",
                onClick: $event => (item.click && item.click(item))
              }, [
                createElementVNode("div", _hoisted_3, [
                  createElementVNode("img", {
                    src: item.img,
                    alt: item.name
                  }, null, 8 /* PROPS */, _hoisted_4),
                  (item.tag)
                    ? (openBlock(), createElementBlock("div", {
                        key: 0,
                        class: "data-product__tag",
                        style: normalizeStyle({backgroundColor: item.tagColor || '#f56c6c'})
                      }, toDisplayString(item.tag), 5 /* TEXT, STYLE */))
                    : createCommentVNode("v-if", true)
                ]),
                createElementVNode("div", _hoisted_5, [
                  createElementVNode("div", _hoisted_6, toDisplayString(item.name), 1 /* TEXT */),
                  (item.desc)
                    ? (openBlock(), createElementBlock("div", _hoisted_7, toDisplayString(item.desc), 1 /* TEXT */))
                    : createCommentVNode("v-if", true),
                  (item.rating !== undefined)
                    ? (openBlock(), createElementBlock("div", _hoisted_8, [
                        createVNode(_component_el_rate, {
                          modelValue: item.rating,
                          "onUpdate:modelValue": $event => ((item.rating) = $event),
                          disabled: "",
                          colors: _ctx.ratingColors
                        }, null, 8 /* PROPS */, ["modelValue", "onUpdate:modelValue", "colors"]),
                        createElementVNode("span", _hoisted_9, toDisplayString(item.rating), 1 /* TEXT */),
                        (item.ratingCount)
                          ? (openBlock(), createElementBlock("span", _hoisted_10, "(" + toDisplayString(item.ratingCount) + ")", 1 /* TEXT */))
                          : createCommentVNode("v-if", true)
                      ]))
                    : createCommentVNode("v-if", true),
                  createElementVNode("div", _hoisted_11, [
                    createElementVNode("span", _hoisted_12, [
                      createElementVNode("span", _hoisted_13, toDisplayString(_ctx.priceSymbol), 1 /* TEXT */),
                      createTextVNode(" " + toDisplayString(item.price), 1 /* TEXT */)
                    ]),
                    (item.originalPrice)
                      ? (openBlock(), createElementBlock("span", _hoisted_14, toDisplayString(_ctx.priceSymbol) + toDisplayString(item.originalPrice), 1 /* TEXT */))
                      : createCommentVNode("v-if", true),
                    (item.discount)
                      ? (openBlock(), createElementBlock("span", _hoisted_15, toDisplayString(item.discount), 1 /* TEXT */))
                      : createCommentVNode("v-if", true)
                  ]),
                  (item.sales || item.stock)
                    ? (openBlock(), createElementBlock("div", _hoisted_16, [
                        (item.sales)
                          ? (openBlock(), createElementBlock("span", _hoisted_17, toDisplayString(_ctx.t('product.sold', { value: item.sales })), 1 /* TEXT */))
                          : createCommentVNode("v-if", true),
                        (item.stock)
                          ? (openBlock(), createElementBlock("span", _hoisted_18, toDisplayString(_ctx.t('product.stock', { value: item.stock })), 1 /* TEXT */))
                          : createCommentVNode("v-if", true)
                      ]))
                    : createCommentVNode("v-if", true),
                  (_ctx.showActions)
                    ? (openBlock(), createElementBlock("div", _hoisted_19, [
                        createVNode(_component_el_button, {
                          type: "primary",
                          size: "small",
                          onClick: withModifiers($event => (_ctx.handleBuy(item)), ["stop"])
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(_ctx.buyText), 1 /* TEXT */)
                          ]),
                          _: 2 /* DYNAMIC */
                        }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["onClick"]),
                        (_ctx.showCart)
                          ? (openBlock(), createBlock(_component_el_button, {
                              key: 0,
                              size: "small",
                              onClick: withModifiers($event => (_ctx.handleCart(item)), ["stop"])
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(_ctx.t('product.addToCart')), 1 /* TEXT */)
                              ]),
                              _: 2 /* DYNAMIC */
                            }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["onClick"]))
                          : createCommentVNode("v-if", true)
                      ]))
                    : createCommentVNode("v-if", true)
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

export { render };
