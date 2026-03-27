<template>
  <div class="data-rank">
    <div class="data-rank__header" v-if="title">
      <span class="data-rank__title">{{ title }}</span>
    </div>
    <div class="data-rank__list">
      <div class="data-rank__item"
           v-for="(item, index) in data"
           :key="index"
           @click="item.click && item.click(item)">
        <div class="data-rank__index" :class="getRankClass(index)">
          <span v-if="index < 3">{{ getMedal(index) }}</span>
          <span v-else>{{ index + 1 }}</span>
        </div>
        <div class="data-rank__avatar" v-if="item.avatar">
          <img :src="item.avatar" :alt="item.name" />
        </div>
        <div class="data-rank__info">
          <div class="data-rank__name">{{ item.name }}</div>
          <div class="data-rank__desc" v-if="item.desc">{{ item.desc }}</div>
        </div>
        <div class="data-rank__value">
          <avue-count-up :animation="animation"
                         :decimals="item.decimals || 0"
                         :end="item.value"></avue-count-up>
          <span class="data-rank__unit" v-if="item.unit || unit">{{ item.unit || unit }}</span>
        </div>
        <div class="data-rank__bar" v-if="showBar">
          <el-progress :percentage="getPercentage(item.value)"
                       :show-text="false"
                       :stroke-width="6"
                       :color="item.color || barColor"></el-progress>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import create from "core/create";
export default create({
  name: "data-rank",
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
    animation() {
      return this.option.animation !== false;
    },
    unit() {
      return this.option.unit || '';
    },
    showBar() {
      return this.option.showBar !== false;
    },
    barColor() {
      return this.option.barColor || '#409eff';
    },
    data() {
      return this.option.data || [];
    },
    maxValue() {
      if (this.data.length === 0) return 100;
      return Math.max(...this.data.map(item => item.value || 0));
    }
  },
  methods: {
    getRankClass(index) {
      if (index === 0) return 'is-first';
      if (index === 1) return 'is-second';
      if (index === 2) return 'is-third';
      return '';
    },
    getMedal(index) {
      const medals = ['🥇', '🥈', '🥉'];
      return medals[index] || '';
    },
    getPercentage(value) {
      return Math.round((value / this.maxValue) * 100);
    }
  }
});
</script>
