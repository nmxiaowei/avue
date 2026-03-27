<template>
  <div class="data-dashboard">
    <el-row :gutter="gutter">
      <el-col :md="span"
              :xs="24"
              :sm="12"
              v-for="(item, index) in data"
              :key="index">
        <div class="data-dashboard__item" :style="getItemStyle(item)">
          <div class="data-dashboard__header">
            <span class="data-dashboard__title">{{ item.title }}</span>
            <el-tag v-if="item.status" size="small" :type="item.statusType || ''">{{ item.status }}</el-tag>
          </div>
          <div class="data-dashboard__value">
            <avue-count-up :animation="animation"
                           :decimals="item.decimals || 0"
                           :end="item.value"></avue-count-up>
            <span class="data-dashboard__unit" v-if="item.unit">{{ item.unit }}</span>
          </div>
          <div class="data-dashboard__chart" v-if="item.chartData">
            <div class="data-dashboard__bar"
                 v-for="(bar, idx) in item.chartData"
                 :key="idx"
                 :style="{height: bar + '%', backgroundColor: item.chartColor || '#409eff'}">
            </div>
          </div>
          <div class="data-dashboard__footer" v-if="item.footerText">
            <span>{{ item.footerText }}</span>
            <span v-if="item.footerValue" :style="{color: item.footerColor}">{{ item.footerValue }}</span>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import create from "core/create";
export default create({
  name: "data-dashboard",
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
    animation() {
      return this.option.animation !== false;
    },
    data() {
      return this.option.data || [];
    }
  },
  methods: {
    getItemStyle(item) {
      return {
        backgroundColor: item.backgroundColor || '#fff'
      };
    }
  }
});
</script>
