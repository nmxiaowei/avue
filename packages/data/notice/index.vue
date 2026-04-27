<template>
  <div class="data-notice">
    <div class="data-notice__header" v-if="title">
      <span class="data-notice__title">{{ title }}</span>
      <span class="data-notice__more" v-if="showMore" @click="handleMore">{{ moreText }}</span>
    </div>
    <div class="data-notice__list">
      <div class="data-notice__item"
           v-for="(item, index) in data"
           :key="index"
           @click="handleClick(item)">
        <div class="data-notice__tag" v-if="item.tag" :style="{backgroundColor: item.tagColor || '#409eff'}">
          {{ item.tag }}
        </div>
        <div class="data-notice__content">
          <div class="data-notice__text">{{ item.title }}</div>
          <div class="data-notice__date" v-if="item.date">{{ item.date }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import create from "core/create";
import locale from "core/locale";
export default create({
  name: "data-notice",
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
    title() {
      return this.option.title;
    },
    showMore() {
      return this.option.showMore !== false;
    },
    moreText() {
      return this.option.moreText || this.t('common.more');
    },
    data() {
      return this.option.data || [];
    }
  },
  methods: {
    handleClick(item) {
      this.$emit('click', item);
      item.click && item.click(item);
    },
    handleMore() {
      this.$emit('more');
    }
  }
});
</script>
