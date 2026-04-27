/*! Avue.js v3.9.0 | (c) 2017-2026 Smallwei | Released under the MIT License. */
import create from '../../../src/core/create.mjs';
import locale from '../../../src/core/locale.mjs';

const PRIORITY_TYPES = {
  high: 'danger',
  medium: 'warning',
  low: 'info'
};

var script = create({
  name: "data-task",
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
    data() {
      return this.option.data || [];
    },
    completedCount() {
      return this.data.filter(item => item.completed).length;
    },
    progressPercent() {
      if (this.data.length === 0) return 0;
      return Math.round((this.completedCount / this.data.length) * 100);
    }
  },
  methods: {
    handleChange(item, index) {
      this.$emit('change', { item, index, completed: item.completed });
    },
    getPriorityType(priority) {
      const normalized = String(priority || '').trim().toLowerCase();
      const aliases = this.t('task.priorityAliases') || {};
      const matchedKey = Object.keys(PRIORITY_TYPES).find((key) => {
        const values = Array.isArray(aliases[key]) ? aliases[key] : [];
        return values.some((value) => String(value).trim().toLowerCase() === normalized);
      });
      return PRIORITY_TYPES[matchedKey || normalized] || '';
    }
  }
});

export { script as default };
