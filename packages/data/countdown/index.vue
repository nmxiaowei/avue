<template>
  <div class="data-countdown">
    <el-row :gutter="gutter">
      <el-col :md="span"
              :xs="24"
              :sm="12"
              v-for="(item, index) in data"
              :key="index">
        <div class="data-countdown__item" :style="getItemStyle(item)">
          <div class="data-countdown__title" v-if="item.title">{{ item.title }}</div>
          <div class="data-countdown__timer">
            <div class="data-countdown__block" v-if="showDays">
              <span class="data-countdown__number">{{ formatNumber(item.days || 0) }}</span>
              <span class="data-countdown__label">天</span>
            </div>
            <span class="data-countdown__separator" v-if="showDays">:</span>
            <div class="data-countdown__block">
              <span class="data-countdown__number">{{ formatNumber(item.hours || 0) }}</span>
              <span class="data-countdown__label">时</span>
            </div>
            <span class="data-countdown__separator">:</span>
            <div class="data-countdown__block">
              <span class="data-countdown__number">{{ formatNumber(item.minutes || 0) }}</span>
              <span class="data-countdown__label">分</span>
            </div>
            <span class="data-countdown__separator">:</span>
            <div class="data-countdown__block">
              <span class="data-countdown__number">{{ formatNumber(item.seconds || 0) }}</span>
              <span class="data-countdown__label">秒</span>
            </div>
          </div>
          <div class="data-countdown__desc" v-if="item.desc">{{ item.desc }}</div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import create from "core/create";
export default create({
  name: "data-countdown",
  data() {
    return {
      timers: []
    };
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
    showDays() {
      return this.option.showDays !== false;
    },
    data() {
      return this.option.data || [];
    }
  },
  methods: {
    getItemStyle(item) {
      return {
        background: item.background || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      };
    },
    formatNumber(num) {
      return num < 10 ? '0' + num : num;
    }
  }
});
</script>
