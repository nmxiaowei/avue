/*! Avue.js v3.9.0 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import create from '../../../src/core/create.mjs';
import locale from '../../../src/core/locale.mjs';

var script = create({
  name: "data-countdown",
  mixins: [locale],
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

export { script as default };
