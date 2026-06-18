/*! Avue.js v3.9.2 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import create from '../../../src/core/create.mjs';
import locale from '../../../src/core/locale.mjs';

var script = create({
  name: "data-product",
  mixins: [locale],
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

export { script as default };
