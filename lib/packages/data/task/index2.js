/*! Avue.js v3.9.3 | (c) 2017-2026 Smallwei | Released under the MIT License. */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var src_core_create = require('../../../src/core/create.js');
var src_core_locale = require('../../../src/core/locale.js');

const PRIORITY_TYPES = {
  high: 'danger',
  medium: 'warning',
  low: 'info'
};

var script = src_core_create.default({
  name: "data-task",
  mixins: [src_core_locale.default],
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

exports.default = script;
