<template>
  <div class="data-product">
    <el-row :gutter="gutter">
      <el-col :md="span"
              :xs="24"
              :sm="12"
              v-for="(item, index) in data"
              :key="index">
        <div class="data-product__item"
             @click="item.click && item.click(item)">
          <div class="data-product__img">
            <img :src="item.img" :alt="item.name" />
            <div class="data-product__tag" v-if="item.tag" :style="{backgroundColor: item.tagColor || '#f56c6c'}">
              {{ item.tag }}
            </div>
          </div>
          <div class="data-product__content">
            <div class="data-product__name">{{ item.name }}</div>
            <div class="data-product__desc" v-if="item.desc">{{ item.desc }}</div>
            <div class="data-product__rating" v-if="item.rating !== undefined">
              <el-rate v-model="item.rating" disabled :colors="ratingColors" />
              <span class="data-product__rating-value">{{ item.rating }}</span>
              <span class="data-product__rating-count" v-if="item.ratingCount">({{ item.ratingCount }})</span>
            </div>
            <div class="data-product__price">
              <span class="data-product__price-current">
                <span class="data-product__price-symbol">{{ priceSymbol }}</span>
                {{ item.price }}
              </span>
              <span class="data-product__price-original" v-if="item.originalPrice">
                {{ priceSymbol }}{{ item.originalPrice }}
              </span>
              <span class="data-product__discount" v-if="item.discount">{{ item.discount }}</span>
            </div>
            <div class="data-product__info" v-if="item.sales || item.stock">
              <span v-if="item.sales">{{ t('product.sold', { value: item.sales }) }}</span>
              <span v-if="item.stock">{{ t('product.stock', { value: item.stock }) }}</span>
            </div>
            <div class="data-product__actions" v-if="showActions">
              <el-button type="primary" size="small" @click.stop="handleBuy(item)">
                {{ buyText }}
              </el-button>
              <el-button size="small" @click.stop="handleCart(item)" v-if="showCart">
                {{ t('product.addToCart') }}
              </el-button>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import create from "core/create";
import locale from "core/locale";
export default create({
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
</script>
