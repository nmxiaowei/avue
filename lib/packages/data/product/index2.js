/*! Avue.js v3.9.4 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var src_core_create = require('../../../src/core/create.js');
var src_core_locale = require('../../../src/core/locale.js');

var script = src_core_create.default({
  name: "data-product",
  mixins: [src_core_locale.default],
  data() {
    return {};
  },
  props: {
    option: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    span() {
      return this.option.span || 6;
    },
    gutter() {
      return this.option.gutter || 20;
    },
    data() {
      return this.option.data || [];
    },
    priceSymbol() {
      return this.option.priceSymbol || '¥';
    },
    showActions() {
      return this.option.showActions !== false;
    },
    showCart() {
      return this.option.showCart !== false;
    },
    buyText() {
      return this.option.buyText || this.t('product.buyNow');
    },
    ratingColors() {
      return this.option.ratingColors || ['#F7BA2A', '#F7BA2A', '#F7BA2A'];
    }
  },
  methods: {
    handleBuy(item) {
      this.$emit('buy', item);
      item.onBuy && item.onBuy(item);
    },
    handleCart(item) {
      this.$emit('cart', item);
      item.onCart && item.onCart(item);
    }
  }
});

exports.default = script;
