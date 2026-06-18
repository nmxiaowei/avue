/*! Avue.js v3.9.2 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import create from '../../../src/core/create.mjs';
import locale from '../../../src/core/locale.mjs';

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

var script = create({
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

export { script as default };
