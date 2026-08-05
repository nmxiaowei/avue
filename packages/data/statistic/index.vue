<template>
  <div class="data-statistic">
    <el-row :gutter="gutter">
      <el-col :md="span"
              :xs="24"
              :sm="12"
              v-for="(item, index) in data"
              :key="index">
        <div class="data-statistic__item"
             :style="getItemStyle(item)"
             @click="item.click && item.click(item)">
          <div class="data-statistic__icon" v-if="item.icon">
            <icon-temp :text="item.icon"
                       :color="item.iconColor || '#409eff'"
                       :size="item.iconSize || 40"
                       :icon-style="getIconStyle(item)"></icon-temp>
          </div>
          <div class="data-statistic__content">
            <div class="data-statistic__title">{{ item.title }}</div>
            <div class="data-statistic__value" :style="{color: item.valueColor}">
              <span class="data-statistic__prefix" v-if="item.prefix">{{ item.prefix }}</span>
              <avue-count-up :animation="item.animation !== false"
                             :decimals="item.decimals || 0"
                             :end="item.value"></avue-count-up>
              <span class="data-statistic__suffix" v-if="item.suffix">{{ item.suffix }}</span>
            </div>
            <div class="data-statistic__trend" v-if="item.trend !== undefined">
              <span :class="['data-statistic__trend-icon', item.trend >= 0 ? 'is-up' : 'is-down']">
                {{ item.trend >= 0 ? '↑' : '↓' }}
              </span>
              <span class="data-statistic__trend-value">{{ Math.abs(item.trend) }}%</span>
              <span class="data-statistic__trend-text" v-if="item.trendText">{{ item.trendText }}</span>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import create from "core/create";
import iconTemp from "common/components/icon/index";
export default create({
  name: "data-statistic",
  components: {
    iconTemp
  },
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
    }
  },
  methods: {
    getIconStyle(item) {
      const size = (item.iconSize || 40) + 'px';
      return {
        color: item.iconColor || '#409eff',
        fontSize: size,
        width: size,
        height: size
      };
    },
    getItemStyle(item) {
      return {
        backgroundColor: item.backgroundColor || '#fff',
        borderColor: item.borderColor || '#ebeef5'
      };
    }
  }
});
</script>
