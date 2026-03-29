<template>
  <div class="data-weather">
    <el-row :gutter="gutter">
      <el-col :md="span"
              :xs="24"
              :sm="12"
              v-for="(item, index) in data"
              :key="index">
        <div class="data-weather__item"
             :style="getItemStyle(item)"
             @click="item.click && item.click(item)">
          <div class="data-weather__header">
            <span class="data-weather__city">{{ item.city }}</span>
            <span class="data-weather__date">{{ item.date }}</span>
          </div>
          <div class="data-weather__body">
            <div class="data-weather__icon">
              <i :class="getWeatherIcon(item.weather)" :style="{fontSize: '48px'}"></i>
            </div>
            <div class="data-weather__temp">
              <span class="data-weather__temp-value">{{ item.temp }}</span>
              <span class="data-weather__temp-unit">°C</span>
            </div>
          </div>
          <div class="data-weather__footer">
            <span class="data-weather__desc">{{ item.weather }}</span>
            <span class="data-weather__wind" v-if="item.wind">{{ item.wind }}</span>
          </div>
          <div class="data-weather__range" v-if="item.tempLow !== undefined">
            {{ item.tempLow }}° ~ {{ item.tempHigh }}°
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import create from "core/create";
import locale from "core/locale";

const WEATHER_GRADIENTS = {
  sunny: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  cloudy: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)',
  overcast: 'linear-gradient(135deg, #bdc3c7 0%, #2c3e50 100%)',
  rain: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  snow: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)'
};

const WEATHER_ICONS = {
  sunny: 'el-icon-sunny',
  cloudy: 'el-icon-partly-cloudy',
  overcast: 'el-icon-cloudy',
  rain: 'el-icon-heavy-rain',
  snow: 'el-icon-ice-cream'
};

export default create({
  name: "data-weather",
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
    }
  },
  methods: {
    normalizeWeatherKey(weather) {
      const normalized = String(weather || '').trim().toLowerCase();
      const aliases = this.t('weather.aliases') || {};
      const matchedKey = Object.keys(WEATHER_GRADIENTS).find((key) => {
        const values = Array.isArray(aliases[key]) ? aliases[key] : [];
        return values.some((value) => String(value).trim().toLowerCase() === normalized);
      });
      return matchedKey || normalized;
    },
    getItemStyle(item) {
      const weatherKey = this.normalizeWeatherKey(item.weather);
      return {
        background: item.background || WEATHER_GRADIENTS[weatherKey] || WEATHER_GRADIENTS.sunny
      };
    },
    getWeatherIcon(weather) {
      const weatherKey = this.normalizeWeatherKey(weather);
      return WEATHER_ICONS[weatherKey] || WEATHER_ICONS.sunny;
    }
  }
});
</script>
